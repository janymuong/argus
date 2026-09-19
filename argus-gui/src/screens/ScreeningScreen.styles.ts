import { StyleSheet } from "react-native";

import {
  colors,
  spacing,
  radii,
} from "../theme/tokens";

export const screeningStyles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  shell: {
    width: "100%",
    maxWidth: 1500,
    alignSelf: "center",
    gap: spacing.lg,
  },

  /*
   * ---------------------------------------------------------
   * SCREENING WORKSPACE
   * ---------------------------------------------------------
   */

  workspaceCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },

  workspaceHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },

  workspaceHeaderMain: {
    flex: 1,
    minWidth: 0,
  },

  workspaceEyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: spacing.xs,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
  },

  sectionDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.xs,
    maxWidth: 620,
  },

  imageReadyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },

  imageReadyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  imageReadyText: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  /*
   * ---------------------------------------------------------
   * CASE INFORMATION
   * ---------------------------------------------------------
   */

  caseStrip: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },

  caseStripCompact: {
    flexDirection: "column",
    alignItems: "stretch",
  },

  caseItem: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  caseDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },

  caseLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 3,
  },

  caseValue: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "600",
  },

  caseStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  caseStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  caseStatusDotBusy: {
    backgroundColor: colors.accent,
  },

  eyeSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  eyeOption: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radii.sm,
  },

  eyeOptionActive: {
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
  },

  eyeOptionPressed: {
    backgroundColor: colors.surfaceMuted,
  },

  eyeOptionText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "600",
  },

  eyeOptionTextActive: {
    color: colors.primary,
  },

  /*
   * ---------------------------------------------------------
   * MAIN WORKSPACE
   * ---------------------------------------------------------
   */

  workspaceGrid: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.lg,
  },

  workspaceGridCompact: {
    flexDirection: "column",
  },

  imageColumn: {
    flex: 1.55,
    minWidth: 0,
  },

  imagePanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  imagePanelTitle: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.9,
  },

  imagePanelMeta: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
    marginTop: 2,
  },

  imageMetaBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },

  imageMetaBadgeText: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  workspaceFrame: {
    width: "100%",
    minHeight: 330,
    borderRadius: radii.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  preview: {
    width: "100%",
    height: 420,
  },

  emptyPreview: {
    minHeight: 330,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },

  emptyIconText: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "300",
  },

  emptyPreviewTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  emptyPreviewCopy: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    maxWidth: 420,
    marginTop: spacing.xs,
  },

  emptyPreviewHint: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginTop: spacing.md,
    opacity: 0.65,
  },

  actionStack: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },

  processingBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },

  processingIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },

  processingText: {
    color: colors.textSecondary,
    fontSize: 10,
  },

  imageNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: 2,
  },

  imageNoteIndicator: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 5,
  },

  imageNoteText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 14,
  },

  /*
   * ---------------------------------------------------------
   * CLINICAL CONTEXT
   * ---------------------------------------------------------
   */

  clinicalPanel: {
    flex: 0.8,
    minWidth: 260,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
  },

  clinicalPanelEyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  clinicalPanelTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },

  infoList: {
    gap: spacing.md,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },

  infoMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginTop: 5,
  },

  infoMarkerSuccess: {
    backgroundColor: colors.success,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 2,
  },

  infoValue: {
    color: colors.textPrimary,
    fontSize: 11,
    lineHeight: 16,
  },

  panelDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  workflowNote: {
    gap: spacing.xs,
  },

  workflowNoteTitle: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "700",
  },

  workflowNoteText: {
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 14,
  },

  /*
   * ---------------------------------------------------------
   * AI ANALYSIS / LOADING
   * ---------------------------------------------------------
   */

  analysisState: {
    marginTop: spacing.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    alignItems: "center",
  },

  analysisOrbArea: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },

  analysisOrbGlow: {
    position: "absolute",
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primary,
    opacity: 0.45,
  },

  analysisOrb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  analysisOrbText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "800",
  },

  analysisTextBlock: {
    alignItems: "center",
    maxWidth: 600,
  },

  analysisEyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  analysisTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  analysisStep: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: spacing.xs,
  },

  analysisStages: {
    width: "100%",
    maxWidth: 700,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
  },

  analysisStage: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  analysisStageDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  analysisStageDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  analysisStageDotComplete: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
  },

  analysisStageCheck: {
    color: colors.background,
    fontSize: 8,
    fontWeight: "900",
    lineHeight: 10,
  },

  analysisStageLine: {
    flex: 1,
    maxWidth: 70,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },

  analysisStageLineComplete: {
    backgroundColor: colors.success,
  },

  analysisStageText: {
    color: colors.textSecondary,
    fontSize: 8,
  },

  analysisStageTextActive: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "700",
  },

  analysisStageTextComplete: {
    color: colors.success,
  },

  /*
   * ---------------------------------------------------------
   * RESULT
   * ---------------------------------------------------------
   */

  resultBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },

  resultTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
  },

  resultHeader: {
    flex: 1,
    minWidth: 0,
  },

  resultEyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  resultLabel: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },

  resultMeta: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
  },

  resultStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  resultStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  resultStatusText: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  /*
   * PRIMARY CONFIDENCE
   */

  primaryConfidence: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  primaryConfidenceHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  primaryConfidenceLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  primaryConfidenceDescription: {
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 2,
  },

  primaryConfidenceValue: {
    color: colors.success,
    fontSize: 21,
    fontWeight: "800",
  },

  primaryConfidenceTrack: {
    width: "100%",
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surfaceMuted,
    overflow: "hidden",
    marginTop: spacing.sm,
  },

  primaryConfidenceFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  /*
   * OTHER PROBABILITIES
   */

  secondaryProbabilities: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  secondaryProbabilitiesLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },

  probabilityInlineList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: spacing.lg,
    rowGap: spacing.sm,
  },

  probabilityInlineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  probabilityInlineName: {
    color: colors.textSecondary,
    fontSize: 10,
  },

  probabilityInlineValue: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    opacity: 0.75,
  },

  /*
   * CLINICAL REVIEW
   */

  clinicalReview: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  clinicalReviewHeading: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.sm,
  },

  clinicalReviewTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },

  clinicalReviewEyebrow: {
    color: colors.textSecondary,
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  clinicalReviewText: {
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 15,
    marginTop: spacing.xs,
    maxWidth: 900,
  },

  /*
   * RESULT ACTIONS
   */

  resultActions: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  resultActionPrimary: {
    flex: 1,
  },

  resultActionSecondary: {
    flex: 1,
  },

  /*
   * ---------------------------------------------------------
   * ERROR
   * ---------------------------------------------------------
   */

  errorBox: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radii.md,
  },

  errorTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },

  errorText: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 16,
    marginTop: spacing.xs,
  },

  errorAction: {
    marginTop: spacing.md,
  },

  /*
   * ---------------------------------------------------------
   * DISCLAIMER
   * ---------------------------------------------------------
   */

  disclaimerBox: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  disclaimerText: {
    color: colors.textSecondary,
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    opacity: 0.75,
  },

  /*
   * ---------------------------------------------------------
   * PATIENT VIEW
   * ---------------------------------------------------------
   */

  patientCard: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: "center",
  },

  patientOrbArea: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  patientOrbGlow: {
    position: "absolute",
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    opacity: 0.35,
  },

  patientOrb: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  patientOrbText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "800",
  },

  patientEyebrow: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  patientTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: spacing.sm,
  },

  patientCopy: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    maxWidth: 600,
    marginTop: spacing.sm,
  },

  patientInfoCard: {
    width: "100%",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },

  patientInfoTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },

  patientInfoItem: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 16,
  },

  patientStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.lg,
  },

  patientStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  patientStatusText: {
    color: colors.textSecondary,
    fontSize: 9,
  },
});