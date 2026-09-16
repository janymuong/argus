import { StyleSheet } from "react-native";
import { colors, radii, spacing, typography } from "../theme/tokens";

export const homeStyles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  shell: {
    width: "100%",
    maxWidth: 960,
    gap: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroEyebrow: {
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "700",
  },
  heroTitle: {
    color: colors.textOnPrimary,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
  },
  heroCopy: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 15,
    lineHeight: 22,
  },
  logoRow: {
    marginBottom: spacing.xs,
    alignSelf: "flex-start",
  },
  statRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: 160,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: spacing.md,
    gap: 2,
  },
  statLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  statValue: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  workspaceCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  workspaceFrame: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  actionStack: {
    gap: spacing.xs,
  },
  loading: {
    marginVertical: spacing.sm,
  },
  preview: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    aspectRatio: 1,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  emptyPreview: {
    width: "100%",
    maxWidth: 500,
    aspectRatio: 1,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.xs,
  },
  emptyPreviewTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  emptyPreviewCopy: {
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  resultBox: {
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.successBg,
    width: "100%",
    gap: spacing.xs,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  resultConfidence: {
    color: colors.success,
    fontSize: 14,
    fontWeight: "600",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  breakdownTitle: {
    marginTop: spacing.sm,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  resultName: {
    color: colors.textPrimary,
  },
  resultScore: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  errorBox: {
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.errorBg,
    width: "100%",
  },
  errorText: {
    color: colors.error,
  },

  // patient card
  patientCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing.md,
  },

  patientOrbArea: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },

  patientOrbGlow: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.accent,
    opacity: 0.7,
  },

  patientOrb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.accent,
  },

  patientOrbText: {
    color: colors.textOnPrimary,
    fontSize: 26,
    fontWeight: "700",
  },

  patientEyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  patientTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    textAlign: "center",
    maxWidth: 680,
  },

  patientCopy: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 650,
  },

  patientInfoCard: {
    width: "100%",
    maxWidth: 680,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },

  patientInfoTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  patientInfoItem: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },

  patientStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  patientStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },

  patientStatusText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },


  // disclaimer
  disclaimerBox: {
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
