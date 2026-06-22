# Argus — TODO & Progress

Last updated: 2026-06-22

## Legend
- [ ] not started
- [~] in progress
- [x] done

---

## 1. Environment setup
- [~] Python version on GPU machine (3.14, fllback to 3.12)
- [ ] Create venv on Arch GPU machine
- [ ] Install PyTorch with correct CUDA build, verify `torch.cuda.is_available()`
- [ ] Install remaining training deps (`requirements.txt`)

## 2. Data
- [ ] Download EyePACS / Kaggle Diabetic Retinopathy Detection dataset
- [ ] Verify `train.csv` + `train_images/` structure matches script expectations
- [ ] Sanity-check class distribution (heavy skew toward "No DR")

## 3. Model training
- [x] Write `train.py` (EfficientNet-B0, transfer learning, class-weighted loss)
- [ ] First training run (frozen backbone, head only) — sanity check it runs end-to-end
- [ ] Full run with fine-tuning unfreeze
- [ ] Evaluate val accuracy / confusion matrix per class
- [ ] Export to ONNX (`argus_model.onnx`) and verify it loads correctly outside PyTorch
- [ ] (stretch) Inception-v3 backbone for comparison vs EfficientNet-B0

## 4. Backend API (Django + Strawberry GraphQL)
- [ ] Scaffold Django project + app
- [ ] Make Strawberry GraphQL schema
- [ ] Implement `predict` mutation (image `Upload` scalar -> class + confidence)
- [ ] Load ONNX model once at startup via `onnxruntime`, not per-request
- [ ] Basic image validation (size/format) before inference
- [ ] (stretch) Log predictions / uploads via Django admin for inspection

## 5. Mobile app (Expo / React Native / TypeScript)
- [ ] Scaffold Expo project
- [ ] Image picker / camera capture screen
- [ ] GraphQL client setup (multipart upload to `predict` mutation)
- [ ] Results screen (predicted grade + confidence, plain-language explanation)
- [ ] Basic styling / app branding (Argus name + icon)

## 6. Polish / wrap-up
- [ ] Clear in-app disclaimer (not a medical device)


---

## Notes / decisions log
- **EfficientNet-B0** over Inception-v3 for faster training, comparable accuracy.
- **Django + Strawberry GraphQL** over REST per preference, despite GraphQL
  being a slight architectural mismatch for a single fixed-shape "upload image -> get
  prediction" operation. Upload handled via `Upload` scalar (multipart spec).
- Model exported to **ONNX** specifically so the API server doesn't need PyTorch as a runtime dependency, and to keep the door open for on-device mobile inference later.
