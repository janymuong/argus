# Argus

Argus explores how AI-assisted diabetic retinopathy (DR) screening — the kind of work Google Health has pioneered — can be rebuilt from scratch, end to end: model training, API serving, and a mobile app.

Diabetic retinopathy is damage to the retina's blood vessels caused by
diabetes, and is a leading cause of preventable blindness worldwide. AI
screening tools (CNNs trained on retinal fundus photos) have shown they can
match or exceed specialist-level accuracy at detecting it, which is why
they're being deployed in regions with few ophthalmologists.

**This project is not a medical device and is not for clinical use.** It's a
personal build of the full stack of training a real-world computer vision model and shipping it into a usable app.

## What it does

Given a retinal fundus photo, Argus predicts a DR severity grade:

| Class | Meaning |
|-------|---------|
| 0 | No DR |
| 1 | Mild |
| 2 | Moderate |
| 3 | Severe |
| 4 | Proliferative DR |

## Stack

- **Model:** PyTorch, EfficientNet-B0 backbone (ImageNet-pretrained),
  fine-tuned on the EyePACS/Kaggle Diabetic Retinopathy Detection dataset.
  Exported to ONNX for serving.
- **Training environment:** Arch Linux, GPU-accelerated, Python venv.
- **API:** Django + Strawberry GraphQL, serving predictions via a single
  `predict` mutation that accepts an image upload.
- **Mobile app:** React Native (Expo), TypeScript, calling the GraphQL API
  to upload a photo and display the predicted grade + confidence.

## Project layout

```
argus/
├── model/              # training script, requirements, checkpoints/
├── backend/            # Django + Strawberry GraphQL backend
├── app/                # Expo / React Native / TypeScript mobile app
├── README.md
└── TODO.md
```

## Status

Early stage — see `TODO.md` for current progress and next steps.
