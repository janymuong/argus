
from django.contrib import admin

from .models import ScreeningRecord


@admin.register(ScreeningRecord)
class ScreeningRecordAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient",
        "clinician",
        "predicted_class",
        "confidence",
        "created_at",
    )

    list_filter = (
        "predicted_class",
        "created_at",
    )

    search_fields = (
        "patient__username",
        "clinician__username",
        "predicted_class",
    )

    readonly_fields = (
        "created_at",
    )

    date_hierarchy = "created_at"

    ordering = ("-created_at",)

    list_select_related = (
        "patient",
        "clinician",
    )

    fieldsets = (
        (
            "Screening participants",
            {
                "fields": ("patient", "clinician"),
            },
        ),
        (
            "Prediction results",
            {
                "fields": (
                    "predicted_class",
                    "confidence",
                    "all_probabilities",
                ),
            },
        ),
        (
            "Record information",
            {
                "fields": ("created_at",),
            },
        ),
    )
