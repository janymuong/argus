"""
Argus — Diabetic Retinopathy classifier training script.

Dataset assumed: EyePACS / Kaggle "Diabetic Retinopathy Detection" format
    data/
      train_images/
        10_left.jpeg
        10_right.jpeg
        ...
      train.csv      # columns: image, level   (level = 0..4 severity)

Usage:
    python train.py --data-dir ./data --epochs 15 --batch-size 32

Output:
    checkpoints/argus_model_best.pt     (PyTorch state dict)
    checkpoints/argus_model.onnx        (for serving / mobile export)
"""

import argparse
import os
from pathlib import Path

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from PIL import Image
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from torch.utils.data import Dataset, DataLoader
from torchvision import models, transforms

NUM_CLASSES = 5  # 0=No DR, 1=Mild, 2=Moderate, 3=Severe, 4=Proliferative
IMG_SIZE = 224


# --------------------------------------------------------------------------- #
# Dataset
# --------------------------------------------------------------------------- #
class RetinaDataset(Dataset):
    def __init__(self, df: pd.DataFrame, image_dir: Path, transform=None):
        self.df = df.reset_index(drop=True)
        self.image_dir = image_dir
        self.transform = transform

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]
        img_path = self.image_dir / f"{row['image']}.jpeg"
        if not img_path.exists():
            img_path = self.image_dir / f"{row['image']}.jpg"
        image = Image.open(img_path).convert("RGB")
        if self.transform:
            image = self.transform(image)
        label = int(row["level"])
        return image, label


def build_transforms():
    # ImageNet normalization stats, since we're using an ImageNet-pretrained backbone
    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
    )

    train_tf = transforms.Compose(
        [
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ColorJitter(brightness=0.2, contrast=0.2),
            transforms.ToTensor(),
            normalize,
        ]
    )
    val_tf = transforms.Compose(
        [
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor(),
            normalize,
        ]
    )
    return train_tf, val_tf


# --------------------------------------------------------------------------- #
# Model
# --------------------------------------------------------------------------- #
def build_model(num_classes=NUM_CLASSES, freeze_backbone=True):
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1)

    if freeze_backbone:
        for param in model.features.parameters():
            param.requires_grad = False

    # Replace classifier head
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.Dropout(p=0.3),
        nn.Linear(256, num_classes),
    )
    return model


# --------------------------------------------------------------------------- #
# Train / eval loops
# --------------------------------------------------------------------------- #
def run_epoch(model, loader, criterion, optimizer, device, train=True):
    model.train() if train else model.eval()
    total_loss, correct, total = 0.0, 0, 0

    context = torch.enable_grad() if train else torch.no_grad()
    with context:
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)

            if train:
                optimizer.zero_grad()

            outputs = model(images)
            loss = criterion(outputs, labels)

            if train:
                loss.backward()
                optimizer.step()

            total_loss += loss.item() * images.size(0)
            preds = outputs.argmax(dim=1)
            correct += (preds == labels).sum().item()
            total += images.size(0)

    return total_loss / total, correct / total


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-dir", type=str, required=True, help="Path containing train.csv and train_images/")
    parser.add_argument("--epochs", type=int, default=15)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--lr", type=float, default=1e-3)
    parser.add_argument("--unfreeze-after", type=int, default=5, help="Epoch to start fine-tuning backbone")
    parser.add_argument("--out-dir", type=str, default="checkpoints")
    args = parser.parse_args()

    device = torch.device("cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu")
    print(f"Using device: {device}")

    data_dir = Path(args.data_dir)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    # ---- Data ---- #
    df = pd.read_csv(data_dir / "train.csv")
    train_df, val_df = train_test_split(df, test_size=0.15, stratify=df["level"], random_state=42)

    train_tf, val_tf = build_transforms()
    train_ds = RetinaDataset(train_df, data_dir / "train_images", train_tf)
    val_ds = RetinaDataset(val_df, data_dir / "train_images", val_tf)

    train_loader = DataLoader(train_ds, batch_size=args.batch_size, shuffle=True, num_workers=4, pin_memory=True)
    val_loader = DataLoader(val_ds, batch_size=args.batch_size, shuffle=False, num_workers=4, pin_memory=True)

    # ---- Class weights (dataset is imbalanced toward class 0) ---- #
    class_weights = compute_class_weight(
        class_weight="balanced", classes=np.arange(NUM_CLASSES), y=train_df["level"].values
    )
    class_weights = torch.tensor(class_weights, dtype=torch.float32).to(device)
    print(f"Class weights: {class_weights.tolist()}")

    # ---- Model ---- #
    model = build_model(freeze_backbone=True).to(device)
    criterion = nn.CrossEntropyLoss(weight=class_weights)
    optimizer = torch.optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=args.lr)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode="max", factor=0.5, patience=2)

    best_val_acc = 0.0

    for epoch in range(args.epochs):
        # Unfreeze backbone partway through for fine-tuning
        if epoch == args.unfreeze_after:
            print("Unfreezing backbone for fine-tuning...")
            for param in model.features.parameters():
                param.requires_grad = True
            optimizer = torch.optim.Adam(model.parameters(), lr=args.lr * 0.1)

        train_loss, train_acc = run_epoch(model, train_loader, criterion, optimizer, device, train=True)
        val_loss, val_acc = run_epoch(model, val_loader, criterion, optimizer, device, train=False)
        scheduler.step(val_acc)

        print(
            f"Epoch {epoch+1}/{args.epochs} | "
            f"train_loss={train_loss:.4f} train_acc={train_acc:.4f} | "
            f"val_loss={val_loss:.4f} val_acc={val_acc:.4f}"
        )

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), out_dir / "argus_model_best.pt")
            print(f"  -> Saved new best model (val_acc={val_acc:.4f})")

    # ---- Export to ONNX for serving ---- #
    model.load_state_dict(torch.load(out_dir / "argus_model_best.pt", map_location=device))
    model.eval()
    dummy_input = torch.randn(1, 3, IMG_SIZE, IMG_SIZE).to(device)
    onnx_path = out_dir / "argus_model.onnx"
    torch.onnx.export(
        model,
        dummy_input,
        onnx_path,
        input_names=["input"],
        output_names=["output"],
        dynamic_axes={"input": {0: "batch_size"}, "output": {0: "batch_size"}},
        opset_version=13,
    )
    print(f"Exported ONNX model to {onnx_path}")
    print(f"Best validation accuracy: {best_val_acc:.4f}")


if __name__ == "__main__":
    main()
