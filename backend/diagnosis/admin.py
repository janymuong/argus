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
        "review_status",
        "follow_up_required",
        "created_at",
    )

    list_filter = (
        "predicted_class",
        "follow_up_required",
        "reviewed_at",
        "created_at",
    )

    search_fields = (
        "patient__username",
        "clinician__username",
        "reviewed_by__username",
        "predicted_class",
        "clinical_assessment",
    )

    readonly_fields = (
        "created_at",
        "reviewed_at",
    )

    date_hierarchy = "created_at"

    ordering = ("-created_at",)

    list_select_related = (
        "patient",
        "clinician",
        "reviewed_by",
    )

    fieldsets = (
        (
            "Screening participants",
            {
                "fields": (
                    "patient",
                    "clinician",
                )
            },
        ),
        (
            "AI prediction",
            {
                "fields": (
                    "predicted_class",
                    "confidence",
                    "all_probabilities",
                )
            },
        ),
        (
            "Clinical review",
            {
                "fields": (
                    "clinical_assessment",
                    "follow_up_required",
                    "reviewed_by",
                    "reviewed_at",
                )
            },
        ),
        (
            "Record information",
            {
                "fields": ("created_at",)
            },
        ),
    )

    @admin.display(boolean=True, description="Reviewed")
    def review_status(self, obj):
        return obj.is_reviewed
