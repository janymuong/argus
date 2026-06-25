# argus

argus explores how AI-assisted diabetic retinopathy (DR) screening — the kind of work google health has pioneered — can be rebuilt from scratch, end to end: model training, api serving, and a mobile app.

`diabetic retinopathy` is damage to the **retina's blood vessels caused by diabetes**, and is a leading cause of preventable blindness worldwide. ai
screening tools (cnns trained on retinal fundus photos) have shown they can
match or exceed specialist-level accuracy at detecting it, which is why
they're being deployed in regions with few ophthalmologists.

> DISCLAIMER: **at the moment this project is not a medical device and is not for clinical use.**

## WHAT it DOES

given a retinal fundus photo, argus predicts a DR severity grade:

| class | meaning |
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

## structure/layout

```
argus/
├── model/              # training script, requirements, checkpoints/
├── backend/            # django + strawberry graphQL backend
├── argus-gui/          # expo / react native / typescript mobile app/frontend
├── README.md
└── TODO.md
```

## status

early stage — see `TODO.md` for current progress and next steps.
