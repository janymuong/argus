# Argus Backend (Django + Strawberry GraphQL)

## Setup

```bash
cd backend
python -m venv .argus_env
source venv/bin/activate

pip install -r requirements.txt
```

> **NOTE**: `onnxruntime` doesn't need to match the
> training environment's Python version, since the model is loaded via
> ONNX, not PyTorch.

## Before running: point it at trained model

`argus_api/settings.py` expects the ONNX model at:

```
../model/checkpoints/argus_model.onnx
```

## Run it

```bash
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

`0.0.0.0` (not just `127.0.0.1`) so that phone running Expo on the same
Wi-Fi network can reach it via machine's LAN IP.

## Try it

Visit `http://localhost:8000/graphql/` for the GraphiQL playground.

Example mutation (GraphiQL doesn't support file upload directly in its UI —
use `curl` to test the upload path):

```bash
curl http://localhost:8000/graphql/ \
  -F operations='{ "query": "mutation($file: Upload!) { predict(image: $file) { ... on PredictionResult { predictedClass confidence } ... on PredictionError { message } } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@/path/to/some_fundus_image.jpeg
```

## Notes

- The ONNX model is loaded **once**, on first request, and cached in
  `diagnosis/inference.py` — not reloaded per request.
- `predict` returns a union type (`PredictionResult | PredictionError`) so
  bad uploads or a missing model file come back as a structured GraphQL
  error response rather than a 500.
- CORS is wide open (`CORS_ALLOW_ALL_ORIGINS = True`) for local dev only.
