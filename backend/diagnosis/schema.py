"""
GraphQL schema for Argus.

Single mutation: `predict(image: Upload!) -> PredictionResult`

Image upload uses the GraphQL multipart request spec, which Strawberry
supports out of the box via the `Upload` scalar. On the client side
(Expo/React Native), this means sending a multipart form-data request with
an `operations` field (the GraphQL query) and a `map` field, rather than a
plain JSON body — most GraphQL client libraries (urql, Apollo) have a
multipart upload link/exchange that handles this automatically.
"""

from io import BytesIO
from typing import Annotated, List, Union

import strawberry
from PIL import Image, UnidentifiedImageError
from strawberry.file_uploads import Upload

from diagnosis.inference import get_model


@strawberry.type
class ClassProbability:
    label: str
    probability: float


@strawberry.type
class PredictionResult:
    predicted_class: str
    confidence: float
    all_probabilities: List[ClassProbability]


@strawberry.type
class PredictionError:
    message: str

# PredictionResponse = strawberry.union("PredictionResponse")(PredictionResult | PredictionError)
# PredictionResponse = Annotated[strawberry.union("PredictionResponse"), PredictionResult | PredictionError]

PredictionResponse = Annotated[
    Union[PredictionResult, PredictionError], strawberry.union("PredictionResponse")
]

@strawberry.type
class Query:
    @strawberry.field
    def health(self) -> str:
        return "ok"


@strawberry.type
class Mutation:
    @strawberry.mutation
    def predict(self, image: Upload) -> PredictionResponse:
        raw_bytes = image.read()

        try:
            pil_image = Image.open(BytesIO(raw_bytes))
            pil_image.load()  # force decode now, so corrupt files fail here, not later
        except UnidentifiedImageError:
            return PredictionError(message="Uploaded file is not a valid image.")

        try:
            model = get_model()
        except FileNotFoundError as exc:
            return PredictionError(message=str(exc))

        result = model.predict(pil_image)

        return PredictionResult(
            predicted_class=result["predicted_class"],
            confidence=result["confidence"],
            all_probabilities=[
                ClassProbability(label=label, probability=prob)
                for label, prob in result["all_probabilities"].items()
            ],
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
