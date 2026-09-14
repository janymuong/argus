"""GraphQL schema for Argus diagnosis and authentication."""

from io import BytesIO
from enum import Enum
from typing import Annotated, List, Optional, Union

import strawberry
from strawberry.types import Info
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from strawberry.file_uploads import Upload
from PIL import Image, UnidentifiedImageError

from diagnosis.inference import get_model


User = get_user_model()


@strawberry.enum
class UserRole(str, Enum):
    PATIENT = "patient"
    CLINICIAN = "clinician"
    ADMIN = "admin"


@strawberry.type
class UserType:
    id: strawberry.ID
    username: str
    email: str
    role: UserRole


def to_user_type(user: User) -> UserType:
    return UserType(
        id=strawberry.ID(str(user.pk)),
        username=user.username,
        email=user.email,
        role=UserRole(user.role),
    )


@strawberry.type
class AuthPayload:
    success: bool
    message: str
    user: Optional[UserType] = None
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None


@strawberry.type
class LogoutPayload:
    success: bool
    message: str


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


PredictionResponse = Annotated[
    Union[PredictionResult, PredictionError],
    strawberry.union("PredictionResponse"),
]


def get_request(info: Info):
    """Return the Django request from Strawberry's GraphQL context."""
    context = info.context

    request = getattr(context, "request", None)
    if request is not None:
        return request

    if isinstance(context, dict):
        return context.get("request")

    return None


def authenticated_user(info: Info):
    """Return the authenticated Django user, or None."""
    request = get_request(info)

    if request is None:
        return None

    user = getattr(request, "user", None)

    if not user or not user.is_authenticated:
        return None

    return user


@strawberry.type
class Query:
    @strawberry.field
    def health(self) -> str:
        return "ok"

    @strawberry.field
    def me(self, info: Info) -> Optional[UserType]:
        user = authenticated_user(info)
        return to_user_type(user) if user else None


@strawberry.type
class Mutation:
    @strawberry.mutation
    def register(
        self,
        username: str,
        password: str,
        email: str = "",
    ) -> AuthPayload:
        username = username.strip()
        email = email.strip().lower()

        if not username:
            return AuthPayload(
                success=False,
                message="Username is required.",
            )

        if not password:
            return AuthPayload(
                success=False,
                message="Password is required.",
            )

        if User.objects.filter(username__iexact=username).exists():
            return AuthPayload(
                success=False,
                message="That username is already in use.",
            )

        if email and User.objects.filter(email__iexact=email).exists():
            return AuthPayload(
                success=False,
                message="That email address is already in use.",
            )

        # public registration for patients.
        user = User(
            username=username,
            email=email,
            role=User.Role.PATIENT,
        )

        try:
            validate_password(password, user=user)
        except ValidationError as exc:
            return AuthPayload(
                success=False,
                message=" ".join(exc.messages),
            )

        user.set_password(password)
        user.save()

        return _issue_tokens(
            user,
            "Registration successful.",
        )


    @strawberry.mutation
    def create_clinician(
        self,
        info: Info,
        username: str,
        password: str,
        email: str = "",
    ) -> AuthPayload:
        admin_user = authenticated_user(info)

        if admin_user is None:
            return AuthPayload(
                success=False,
                message="Authentication required.",
            )

        if admin_user.role != User.Role.ADMIN:
            return AuthPayload(
                success=False,
                message="Only administrators can create clinician accounts.",
            )

        username = username.strip()
        email = email.strip().lower()

        if not username:
            return AuthPayload(
                success=False,
                message="Username is required.",
            )

        if not password:
            return AuthPayload(
                success=False,
                message="Password is required.",
            )

        if User.objects.filter(username__iexact=username).exists():
            return AuthPayload(
                success=False,
                message="That username is already in use.",
            )

        if email and User.objects.filter(email__iexact=email).exists():
            return AuthPayload(
                success=False,
                message="That email address is already in use.",
            )

        clinician = User(
            username=username,
            email=email,
            role=User.Role.CLINICIAN,
        )

        try:
            validate_password(password, user=clinician)
        except ValidationError as exc:
            return AuthPayload(
                success=False,
                message=" ".join(exc.messages),
            )

        clinician.set_password(password)
        clinician.save()

        return AuthPayload(
            success=True,
            message="Clinician account created successfully.",
            user=to_user_type(clinician),
        )

    
    @strawberry.mutation
    def login(
        self,
        username: str,
        password: str,
    ) -> AuthPayload:
        username = username.strip()

        user = authenticate(
            username=username,
            password=password,
        )

        if user is None:
            return AuthPayload(
                success=False,
                message="Invalid username or password.",
            )

        if not user.is_active:
            return AuthPayload(
                success=False,
                message="This account is inactive.",
            )

        return _issue_tokens(
            user,
            "Login successful.",
        )

    @strawberry.mutation
    def logout(
        self,
        refresh_token: str,
    ) -> LogoutPayload:
        if not refresh_token:
            return LogoutPayload(
                success=False,
                message="Refresh token is required.",
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return LogoutPayload(
                success=True,
                message="Logged out successfully.",
            )

        except TokenError:
            # Logout should be idempotent from the client's perspective.
            return LogoutPayload(
                success=True,
                message="Logged out.",
            )

    @strawberry.mutation
    def predict(
        self,
        info: Info,
        image: Upload,
    ) -> PredictionResponse:
        user = authenticated_user(info)

        if user is None:
            return PredictionError(
                message="Authentication required.",
            )

        if user.role != User.Role.CLINICIAN:
            return PredictionError(
                message="Only clinicians can run predictions.",
            )

        raw_bytes = image.read()

        try:
            pil_image = Image.open(BytesIO(raw_bytes))
            pil_image.load()

        except UnidentifiedImageError:
            return PredictionError(
                message="Uploaded file is not a valid image.",
            )

        try:
            model = get_model()

        except FileNotFoundError as exc:
            return PredictionError(
                message=str(exc),
            )

        result = model.predict(pil_image)

        return PredictionResult(
            predicted_class=result["predicted_class"],
            confidence=result["confidence"],
            all_probabilities=[
                ClassProbability(
                    label=label,
                    probability=prob,
                )
                for label, prob in result["all_probabilities"].items()
            ],
        )


def _issue_tokens(
    user: User,
    message: str,
) -> AuthPayload:
    refresh = RefreshToken.for_user(user)

    return AuthPayload(
        success=True,
        message=message,
        user=to_user_type(user),
        access_token=str(refresh.access_token),
        refresh_token=str(refresh),
    )


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)