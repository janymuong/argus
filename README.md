# <img src="./argus-gui/assets/argus-logo.svg" height="64" style="vertical-align: middle; margin-right: 1px;">

argus explores diabetic retinopathy (dr) screening — the kind of work google health has pioneered — can be rebuilt from scratch, end to end: model training, api serving, and a mobile app.

`diabetic retinopathy` is damage to the **retina's blood vessels caused by diabetes**, and is a leading cause of preventable blindness worldwide. ai screening tools (cnns trained on retinal fundus photos) have shown they can
match or exceed specialist-level accuracy at detecting it, which is why
they're being deployed in regions with few ophthalmologists.

> disclaimer: **at the moment this project is not a medical device and is not for clinical use.**

## what it does:

given a retinal fundus photo, argus predicts a `dr` severity grade:

| class | meaning |
|-------|---------|
| 0 | no dr |
| 1 | mild |
| 2 | moderate |
| 3 | severe |
| 4 | proliferative dr |

## stack

- **model:** pytorch, efficientnet-b0 backbone (imagenet-pretrained),
  fine-tuned on the eyePACS/kaggle diabetic retinopathy detection dataset.
  exported to onnx for serving.
- **training environment:** python, gpu-accelerated, pytorch.
- **API:** strawberry django, with rbac, and jwt authentication; the `predict` mutation accepts an image upload and is restricted server-side to clinicians.
- **mobile app:** react native (expo), typescript, w/ auth.


## files:

```
argus/
├── model/              # training script, requirements, checkpoints/
├── backend/            # django + strawberry graphql backend
├── argus-gui/          # expo / react native / typescript mobile app/frontend
├── README.md
└── TODO.md
```

## status

early stage — see `TODO.md` for current progress and next steps.
