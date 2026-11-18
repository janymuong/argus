
from django.conf import settings
from django.db import models


class ScreeningRecord(models.Model):
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="patient_screenings",
    )

    clinician = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="clinician_screenings",
    )

    predicted_class = models.CharField(
        max_length=64,
    )

    confidence = models.FloatField()

    all_probabilities = models.JSONField(
        default=dict,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Screening record"
        verbose_name_plural = "Screening records"

    def __str__(self):
        return (
            f"Screening for {self.patient.username} "
            f"on {self.created_at:%Y-%m-%d %H:%M}"
        )
