# <img src="./argus-gui/assets/argus-logo.svg" height="64" style="vertical-align: middle; margin-right: 1px;">

argus explores how AI-assisted diabetic retinopathy (DR) screening — the kind of work google health has pioneered — can be rebuilt from scratch, end to end: model training, api serving, and a mobile app.

`diabetic retinopathy` is damage to the **retina's blood vessels caused by diabetes**, and is a leading cause of preventable blindness worldwide. ai
screening tools (cnns trained on retinal fundus photos) have shown they can
match or exceed specialist-level accuracy at detecting it, which is why
they're being deployed in regions with few ophthalmologists.

> disclaimer: **at the moment this project is not a medical device and is not for clinical use.**

## what it does:

given a retinal fundus photo, argus predicts a DR severity grade:

| class | meaning |
|-------|---------|
| 0 | no dr |
| 1 | mild |
| 2 | moderate |
| 3 | severe |
| 4 | proliferative dr |

## stack

- **Model:** PyTorch, EfficientNet-B0 backbone (ImageNet-pretrained),
  fine-tuned on the EyePACS/Kaggle Diabetic Retinopathy Detection dataset.
  Exported to ONNX for serving.
- **Training Environment:** Arch Linux, GPU-accelerated, Python venv.
- **API:** Django + Strawberry GraphQL, serving predictions via a single
  `predict` mutation that accepts an image upload.
- **Mobile app:** React Native (Expo), TypeScript, calling the GraphQL API
  to upload a photo and display the predicted grade + confidence.

## MCP integration

- **Research MCP server:** wraps arXiv search and paper extraction tools.
- **Argus prediction MCP tool:** exposes the same retinal screening flow through
  `predict_retina_image(image_path)` so an MCP client can call the model as a
  tool instead of going through the UI.
- the backend stays GraphQL-first, which keeps the mobile/web app and the MCP
  story aligned instead of splitting the inference logic across separate stacks.

## one-command run:

```bash
python run-argus.py # do within the root directory
```

## environment variables

put shared secrets and local dev overrides in a single root file:

```bash
./.env
```

suggested entries:

```bash
OPENAI_API_KEY=your_key_here
ARGUS_GRAPHQL_URL=http://127.0.0.1:8000/graphql/
```


## structure/layout

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
