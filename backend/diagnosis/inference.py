'''
Loads the Argus ONNX model once (at process start) and exposes a single
`predict_image` function used by the GraphQL mutation.

heavy ONNX Runtime session creation at import time — not per
request — is the whole point: it's the difference between a ~5ms inference
and re-loading a model graph on every API call.
'''

import numpy as np
import onnxruntime as ort
from django.conf import settings
from PIL import Image

# ImageNet normalization stats
# match training preprocessing exactly
_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
_STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)


class ArgusModel:
    '''Thin wrapper around an ONNX Runtime session for DR classification.'''

    def __init__(self, model_path):
        self.session = ort.InferenceSession(
            str(model_path), providers=["CPUExecutionProvider"]
        )
        self.input_name = self.session.get_inputs()[0].name
        self.class_names = settings.ARGUS_CLASS_NAMES
        self.img_size = settings.ARGUS_IMG_SIZE

    def _preprocess(self, image: Image.Image) -> np.ndarray:
        image = image.convert("RGB").resize((self.img_size, self.img_size))
        arr = np.asarray(image, dtype=np.float32) / 255.0
        arr = (arr - _MEAN) / _STD
        arr = arr.transpose(2, 0, 1)  # HWC -> CHW
        arr = np.expand_dims(arr, axis=0)  # add batch dim
        return arr.astype(np.float32)

    def predict(self, image: Image.Image):
        input_tensor = self._preprocess(image)
        outputs = self.session.run(None, {self.input_name: input_tensor})
        logits = outputs[0][0]

        # softmax
        exp = np.exp(logits - np.max(logits))
        probs = exp / exp.sum()

        predicted_idx = int(np.argmax(probs))
        return {
            "predicted_class": self.class_names[predicted_idx],
            "predicted_index": predicted_idx,
            "confidence": float(probs[predicted_idx]),
            "all_probabilities": {
                name: float(p) for name, p in zip(self.class_names, probs)
            },
        }


# loaded once when this module is first imported (i.e. at Django startup,
# since the schema module imports this at import time).
_model_instance = None


def get_model() -> ArgusModel:
    global _model_instance
    if _model_instance is None:
        if not settings.ARGUS_MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Argus model not found at {settings.ARGUS_MODEL_PATH}. "
                "Run training and export to ONNX first, or update "
                "ARGUS_MODEL_PATH in settings.py."
            )
        _model_instance = ArgusModel(settings.ARGUS_MODEL_PATH)
    return _model_instance
