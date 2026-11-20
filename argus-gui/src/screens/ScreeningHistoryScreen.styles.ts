
import { StyleSheet } from "react-native";
import { colors, radii, spacing } from "../theme/tokens";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.xl,
        gap: spacing.lg,
        maxWidth: 1100,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.md,
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.4,
        marginBottom: spacing.xs,
    },
    title: {
        color: colors.textPrimary,
        fontSize: 28,
        fontWeight: "700",
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: spacing.xs,
    },
    refreshButton: {
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    refreshButtonPressed: {
        opacity: 0.7,
    },
    refreshText: {
        color: colors.textPrimary,
        fontWeight: "600",
    },
    stateCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.xl,
        minHeight: 180,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
    },
    stateText: {
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 21,
    },
    errorTitle: {
        color: colors.error,
        fontSize: 17,
        fontWeight: "700",
    },
    retryText: {
        color: colors.primary,
        fontWeight: "700",
        marginTop: spacing.sm,
    },
    emptyIcon: {
        color: colors.primary,
        fontSize: 34,
    },
    emptyTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: "700",
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.surface,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
    },
    summaryValue: {
        color: colors.textPrimary,
        fontSize: 25,
        fontWeight: "700",
    },
    summaryLabel: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
        marginTop: 3,
    },
    summaryHint: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    recordCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        gap: spacing.md,
    },
    recordTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: spacing.md,
    },
    recordIdentity: {
        flex: 1,
    },
    recordLabel: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
    },
    recordDate: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 5,
    },
    confidenceBadge: {
        backgroundColor: colors.successBg,
        borderRadius: radii.pill,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    confidenceText: {
        color: colors.success,
        fontWeight: "700",
        fontSize: 13,
    },
    resultSection: {
        gap: 5,
    },
    resultLabel: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
    },
    resultValue: {
        color: colors.textPrimary,
        fontSize: 21,
        fontWeight: "700",
    },
    participants: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md,
    },
    participant: {
        gap: 4,
    },
    participantLabel: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
    },
    participantValue: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: "600",
    },
    detailsButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md,
    },
    detailsButtonText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 13,
    },
    detailsArrow: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: "600",
    },
    probabilities: {
        backgroundColor: colors.surfaceMuted,
        borderRadius: radii.md,
        padding: spacing.md,
        gap: spacing.md,
    },
    probabilityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: spacing.md,
    },
    probabilityLabel: {
        color: colors.textSecondary,
        fontSize: 13,
    },
    probabilityValue: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: "700",
    },
    disclaimer: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 17,
        textAlign: "center",
        marginTop: spacing.md,
    },
    reviewStatus: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md,
    },

    reviewStatusLabel: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1,
    },

    reviewStatusValue: {
        fontSize: 12,
        fontWeight: "700",
    },

    reviewedText: {
        color: colors.success,
    },

    pendingText: {
        color: colors.accent,
    },

    reviewPanel: {
        backgroundColor: colors.surfaceMuted,
        borderRadius: radii.md,
        padding: spacing.lg,
        gap: spacing.md,
    },

    reviewPanelTitle: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
    },

    assessmentText: {
        color: colors.textPrimary,
        fontSize: 14,
        lineHeight: 21,
    },

    reviewMeta: {
        color: colors.textSecondary,
        fontSize: 11,
    },

    followUpText: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: "600",
    },

    inputLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "600",
    },

    assessmentInput: {
        minHeight: 120,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        padding: spacing.md,
        color: colors.textPrimary,
        fontSize: 14,
        lineHeight: 21,
    },

    followUpToggle: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.sm,
        alignItems: "center",
        justifyContent: "center",
    },

    checkboxSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    checkboxTick: {
        color: colors.textOnPrimary,
        fontWeight: "700",
        fontSize: 13,
    },

    followUpLabel: {
        color: colors.textPrimary,
        fontSize: 13,
    },

    reviewMessage: {
        color: colors.accent,
        fontSize: 12,
        lineHeight: 18,
    },

    submitReviewButton: {
        backgroundColor: colors.primary,
        borderRadius: radii.md,
        padding: spacing.md,
        alignItems: "center",
    },

    submitReviewText: {
        color: colors.textOnPrimary,
        fontSize: 13,
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.6,
    },
});
