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
## Specifics:

### What is already done

| Area                                                            | Status |
| --------------------------------------------------------------- | ------ |
| Custom user roles                                               | ✅      |
| Patient / clinician / admin role model                          | ✅      |
| JWT authentication                                              | ✅      |
| Login / logout / `me`                                           | ✅      |
| Public registration restricted to patients                      | ✅      |
| Admin-created clinician accounts                                | ✅      |
| Clinician-only prediction access                                | ✅      |
| Persistent clinician sidebar                                    | ✅      |
| Overview dashboard                                              | ✅      |
| Screening workspace                                             | ✅      |
| Screening result hierarchy                                      | ✅      |
| Probability display simplified                                  | ✅      |
| Processing/loading experience                                   | ✅      |
| Clinical disclaimer                                             | ✅      |
| Responsive screening layout                                     | ✅      |
| Screening navigation cleanup / `HomeScreen` → `ScreeningScreen` | ✅      |

The current screening workflow now has a clear image-selection state, screening action, processing state, and result state.  The result also has a dedicated clinical-review/disclaimer section rather than treating the model output as a diagnosis. 

### Unfinished

Four meaningful areas left:

#### 1. **Patient experience** — next

The patient side exists conceptually, but it isn't a complete workflow yet.

The screening component already contains patient-facing content explaining that screening starts with their clinician.  But the authenticated shell currently centers around the clinician workspace, and the patient path isn't really developed as its own experience.

So we should decide what a patient actually sees after logging in:

**Patient → Patient dashboard → screening status / results / information**

rather than simply giving them the clinician-oriented workspace.

---

#### 2. **Screening history**

> marked **SOON** in the sidebar. 

This is actually a significant product feature because once screening works, the natural next question is:

> "What happened to my previous screenings?"

That means we eventually need persistence rather than the current local `result` state.

---

#### 3. **Patients / clinician management**

> **SOON**. 

This would become the clinician/admin workflow for seeing patients and, eventually, their screening records.

---

#### 4. **Production hardening**

After the workflows are established:

* better authentication/session failure handling
* API error handling
* image validation
* permissions/security checks
* prediction auditability
* backend validation
* deployment configuration
* testing
* potentially proper result persistence/audit records

---

# Patient Experience / Patient Dashboard.

Not history yet.

The reason is architectural: we already have `patient` as a real role, but the UI hasn't yet been given a proper role-specific experience. This is the **before** building history and patient records, before persistence. 


### The Patient screen should be roughly:

```text
ARGUS
Patient

Good evening, [username]

YOUR SCREENING
────────────────────────────────

Your retinal screening is managed
with your clinical care team.

        ● Screening status
          No screening yet

────────────────────────────────

WHAT ARGUS DOES

Argus helps clinicians analyze
retinal images as decision support.

────────────────────────────────

WHAT TO EXPECT

1. Your clinician captures your image
2. Argus analyzes the retinal image
3. Your clinician reviews the result
4. Your clinician discusses the result with you

────────────────────────────────

Important
Argus is decision support and does
not replace professional clinical judgment.
```

> **patients should not see the clinician's "Run retinal screening" workflow**.

We had a patient branch inside `ScreeningScreen`, but that is the wrong place to make the patient experience live long-term; it's better to make the authenticated shell genuinely role-aware. The existing patient branch confirms that we anticipated this distinction, but it was intentionally left unfinished. 

### The sequence becomes:

**Patient dashboard → screening history → patient/clinician records → admin/management → production hardening.**




---

## Notes / decisions log
- **EfficientNet-B0** over Inception-v3 for faster training, comparable accuracy.
- **Django + Strawberry GraphQL** over REST per preference, despite GraphQL
  being a slight architectural mismatch for a single fixed-shape "upload image -> get
  prediction" operation. Upload handled via `Upload` scalar (multipart spec).
- Model exported to **ONNX** specifically so the API server doesn't need PyTorch as a runtime dependency, and to keep the door open for on-device mobile inference later.
