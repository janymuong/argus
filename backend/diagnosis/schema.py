"""GraphQL schema for Argus diagnosis and authentication."""

from io import BytesIO
from enum import Enum
from datetime import datetime
from typing import Annotated, List, Optional, Union

import strawberry
from strawberry.types import Info
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from strawberry.file_uploads import Upload
from PIL import Image, UnidentifiedImageError
from django.utils import timezone

from diagnosis.inference import get_model
from diagnosis.models import ScreeningRecord


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


def to_user_type(user: User) -> UserType: # type: ignore
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
class ScreeningRecordType:
    id: strawberry.ID
    patient_username: str
    clinician_username: str
    predicted_class: str
    confidence: float
    all_probabilities: List[ClassProbability]
    created_at: datetime
    clinical_assessment: str
    follow_up_required: bool
    reviewed_by_username: Optional[str]
    reviewed_at: Optional[datetime]
    is_reviewed: bool

@strawberry.type
class ScreeningReviewPayload:
    success: bool
    message: str
    record: Optional[ScreeningRecordType] = None

@strawberry.type
class PredictionResult:
    screening_record_id: strawberry.ID
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

def to_screening_record_type(record: ScreeningRecord) -> ScreeningRecordType:
    return ScreeningRecordType(
        id=strawberry.ID(str(record.pk)),
        patient_username=record.patient.username,
        clinician_username=record.clinician.username,
        predicted_class=record.predicted_class,
        confidence=record.confidence,
        all_probabilities=[
            ClassProbability(
                label=label,
                probability=float(probability),
            )
            for label, probability in (record.all_probabilities or {}).items()
        ],
        created_at=record.created_at,
        clinical_assessment=record.clinical_assessment,
        follow_up_required=record.follow_up_required,
        reviewed_by_username=(
            record.reviewed_by.username if record.reviewed_by else None
        ),
        reviewed_at=record.reviewed_at,
        is_reviewed=record.is_reviewed,
    )

@strawberry.type
class Query:
    @strawberry.field
    def health(self) -> str:
        return "ok"

    @strawberry.field
    def me(self, info: Info) -> Optional[UserType]:
        user = authenticated_user(info)
        return to_user_type(user) if user else None

    @strawberry.field
    def patients(self, info: Info) -> List[UserType]:
        """List active patient accounts for an authenticated clinician."""
        user = authenticated_user(info)
        if user is None or user.role != User.Role.CLINICIAN:
            return []

        return [
            to_user_type(patient)
            for patient in User.objects.filter(
                role=User.Role.PATIENT,
                is_active=True,
            ).order_by("username")
        ]

    @strawberry.field
    def screening_history(self, info: Info,) -> List[ScreeningRecordType]:
        """
        Return screening records visible to the authenticated user.

        Clinicians see records they performed.
        Patients see their own records.
        Administrators can see all records.
        """
        user = authenticated_user(info)

        if user is None:
            return []

        records = ScreeningRecord.objects.select_related(
            "patient",
            "clinician",
        )

        if user.role == User.Role.CLINICIAN:
            records = records.filter(clinician=user)

        elif user.role == User.Role.PATIENT:
            records = records.filter(patient=user)

        elif user.role != User.Role.ADMIN:
            return []

        return [
            to_screening_record_type(record)
            for record in records.order_by("-created_at")
        ]

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
    def review_screening(
        self,
        info: Info,
        record_id: strawberry.ID,
        clinical_assessment: str,
        follow_up_required: bool = False,
    ) -> ScreeningReviewPayload:
        clinician = authenticated_user(info)

        if clinician is None:
            return ScreeningReviewPayload(
                success=False,
                message="Authentication required.",
            )

        if clinician.role != User.Role.CLINICIAN:
            return ScreeningReviewPayload(
                success=False,
                message="Only clinicians can review screening records.",
            )

        assessment = clinical_assessment.strip()

        if not assessment:
            return ScreeningReviewPayload(
                success=False,
                message="A clinical assessment is required.",
            )

        try:
            record_pk = int(record_id)
        except (TypeError, ValueError):
            return ScreeningReviewPayload(
                success=False,
                message="Invalid screening record ID.",
            )

        with transaction.atomic():
            try:
                record = (
                    ScreeningRecord.objects
                    .select_for_update()
                    .select_related("patient", "clinician", "reviewed_by")
                    .get(pk=record_pk)
                )
            except ScreeningRecord.DoesNotExist:
                return ScreeningReviewPayload(
                    success=False,
                    message="Screening record not found.",
                )

            if record.clinician_id != clinician.pk:
                return ScreeningReviewPayload(
                    success=False,
                    message="You can only review screenings you performed.",
                )

            if record.is_reviewed:
                return ScreeningReviewPayload(
                    success=False,
                    message="This screening has already been reviewed.",
                )

            record.clinical_assessment = assessment
            record.follow_up_required = follow_up_required
            record.reviewed_by = clinician
            record.reviewed_at = timezone.now()

            record.save(
                update_fields=[
                    "clinical_assessment",
                    "follow_up_required",
                    "reviewed_by",
                    "reviewed_at",
                ]
            )

        record.refresh_from_db()

        return ScreeningReviewPayload(
            success=True,
            message="Clinical review saved successfully.",
            record=to_screening_record_type(record),
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
        patient_id: strawberry.ID,
    ) -> PredictionResponse:
        clinician = authenticated_user(info)

        if clinician is None:
            return PredictionError(message="Authentication required.")

        if clinician.role != User.Role.CLINICIAN:
            return PredictionError(message="Only clinicians can run predictions.")

        try:
            patient = User.objects.get(
                pk=int(patient_id),
                role=User.Role.PATIENT,
                is_active=True,
            )
        except (User.DoesNotExist, TypeError, ValueError):
            return PredictionError(
                message="Select a valid, active patient before screening."
            )

        raw_bytes = image.read()

        try:
            pil_image = Image.open(BytesIO(raw_bytes))
            pil_image.load()
        except (UnidentifiedImageError, OSError):
            return PredictionError(
                message="Uploaded file is not a valid image."
            )

        try:
            model = get_model()
        except FileNotFoundError as exc:
            return PredictionError(message=str(exc))

        result = model.predict(pil_image)
        probabilities = {
            str(label): float(probability)
            for label, probability in result["all_probabilities"].items()
        }
        predicted_class = str(result["predicted_class"])
        confidence = float(result["confidence"])

        # Persist the prediction and its participants together.
        with transaction.atomic():
            record = ScreeningRecord.objects.create(
                patient=patient,
                clinician=clinician,
                predicted_class=predicted_class,
                confidence=confidence,
                all_probabilities=probabilities,
            )

        return PredictionResult(
            screening_record_id=strawberry.ID(str(record.pk)),
            predicted_class=predicted_class,
            confidence=confidence,
            all_probabilities=[
                ClassProbability(label=label, probability=probability)
                for label, probability in probabilities.items()
            ],
        )


def _issue_tokens(
    user: User, # type: ignore
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