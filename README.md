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

- **model:** PyTorch, EfficientNet-B0 backbone (ImageNet-pretrained),
  fine-tuned on the EyePACS/Kaggle Diabetic Retinopathy Detection dataset.
  Exported to ONNX for serving.
- **training environment:** Arch Linux, GPU-accelerated, Python venv.
- **API:** Django + Strawberry GraphQL, serving predictions via a single
  `predict` mutation that accepts an image upload.
- **mobile app:** React Native (Expo), TypeScript, calling the GraphQL API
  to upload a photo and display the predicted grade + confidence.

## MCP integration

- **research MCP server:** wraps arXiv search and paper extraction tools.
- **Argus prediction MCP tool:** exposes the same retinal screening flow through
  `predict_retina_image(image_path)` so an MCP client can call the model as a
  tool instead of going through the UI.
- The backend stays GraphQL-first, which keeps the mobile/web app and the MCP
  story aligned instead of splitting the inference logic across separate stacks.

## web direction

- The Expo app already runs on web, and the home screen is being reshaped into
  a centered, card-based layout so it reads like a demo app on desktop as well
  as mobile.

## one-command dev

From the repo root you can start the backend and Expo web frontend with a
single command:

```bash
python dev.py
```

That script runs Django migrations first, then starts:
- `backend/` with `python manage.py runserver 0.0.0.0:8000`
- `argus-gui/` with `yarn expo start --web`

The backend and MCP code still share one Python environment at the repo root:
`.argus_env`. Run the MCP agent separately when you want the tool-calling demo.

## environment variables

Put shared secrets and local dev overrides in a single root file:

```bash
./.env
```

Suggested entries:

```bash
OPENAI_API_KEY=your_key_here
ARGUS_GRAPHQL_URL=http://127.0.0.1:8000/graphql/
```

The MCP client and server load that root `.env` directly. Django can also read
the same variables from the shell if you export them before launching.

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
