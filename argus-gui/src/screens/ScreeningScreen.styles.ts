import { StyleSheet } from "react-native";

import {
  colors,
  radii,
  spacing,
} from "../theme/tokens";

export const screeningStyles = StyleSheet.create({
  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  page: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },

  shell: {
    width: "100%",
    maxWidth: 1180,
    gap: spacing.lg,
  },

  /*
   * ---------------------------------------------------------
   * CLINICAL HERO
   * ---------------------------------------------------------
   */

  heroCard: {
    width: "100%",
    backgroundColor: colors.primaryDark,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  heroStatusRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
  },

  heroHeading: {
    flex: 1,
    maxWidth: 820,
    gap: spacing.sm,
  },

  heroEyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
  },

  heroTitle: {
    color: colors.textOnPrimary,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },

  heroCopy: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 720,
  },

  readyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: "rgba(67,181,129,0.10)",
    borderWidth: 1,
    borderColor: "rgba(67,181,129,0.28)",
    gap: spacing.xs,
    marginTop: 2,
  },

  readyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },

  readyText: {
    color: colors.success,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /*
   * ---------------------------------------------------------
   * WORKSPACE
   * ---------------------------------------------------------
   */

  workspaceCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },

  workspaceHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  workspaceHeaderMain: {
    flex: 1,
  },

  workspaceEyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "700",
  },

  sectionDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.xs,
    maxWidth: 760,
  },

  imageReadyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: "rgba(67,181,129,0.45)",
    gap: spacing.xs,
  },

  imageReadyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  imageReadyText: {
    color: colors.success,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  /*
   * ---------------------------------------------------------
   * CASE STRIP
   * ---------------------------------------------------------
   */

  caseStrip: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.xs,
  },

  caseStripCompact: {
    flexDirection: "column",
  },

  caseItem: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    gap: 3,
  },

  caseDivider: {
    width: 1,
    backgroundColor: colors.border,
  },

  caseLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.9,
  },

  caseValue: {
    color: colors.textPrimary,
    fontSize: 12,
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

  /*
   * ---------------------------------------------------------
   * EYE SELECTOR
   * ---------------------------------------------------------
   */

  eyeSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  eyeOption: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  eyeOptionActive: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primary,
  },

  eyeOptionPressed: {
    backgroundColor: colors.primaryDark,
  },

  eyeOptionText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "700",
  },

  eyeOptionTextActive: {
    color: colors.primary,
  },

  /*
   * ---------------------------------------------------------
   * WORKSPACE GRID
   * ---------------------------------------------------------
   */

  workspaceGrid: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.md,
  },

  workspaceGridCompact: {
    flexDirection: "column",
  },

  imageColumn: {
    flex: 1.65,
    minWidth: 0,
    gap: spacing.sm,
  },

  /*
   * ---------------------------------------------------------
   * IMAGE PANEL
   * ---------------------------------------------------------
   */

  imagePanelHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xs,
  },

  imagePanelTitle: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  imagePanelMeta: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 0.7,
    marginTop: 2,
  },

  imageMetaBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
  },

  imageMetaBadgeText: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
  },

  workspaceFrame: {
    width: "100%",
    minHeight: 440,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#08181D",
  },

  preview: {
    width: "100%",
    maxWidth: 580,
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#000000",
  },

  emptyPreview: {
    width: "100%",
    maxWidth: 580,
    aspectRatio: 1,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },

  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },

  emptyIconText: {
    color: colors.primary,
    fontSize: 25,
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
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 430,
  },

  emptyPreviewHint: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: spacing.xs,
  },

  /*
   * ---------------------------------------------------------
   * ACTIONS
   * ---------------------------------------------------------
   */

  actionStack: {
    width: "100%",
    gap: spacing.sm,
  },

  processingBar: {
    width: "100%",
    minHeight: 42,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  processingIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },

  processingText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },

  imageNote: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
  },

  imageNoteIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 6,
  },

  imageNoteText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 16,
  },

  /*
   * ---------------------------------------------------------
   * CLINICAL CONTEXT
   * ---------------------------------------------------------
   */

  clinicalPanel: {
    flex: 1,
    minWidth: 260,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },

  clinicalPanelEyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.1,
    marginBottom: spacing.xs,
  },

  clinicalPanelTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },

  infoList: {
    gap: spacing.md,
  },

  infoItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },

  infoMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    backgroundColor: colors.primary,
  },

  infoMarkerSuccess: {
    backgroundColor: colors.success,
  },

  infoContent: {
    flex: 1,
    gap: 3,
  },

  infoLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.9,
  },

  infoValue: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
  },

  panelDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  workflowNote: {
    gap: spacing.xs,
  },

  workflowNoteTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },

  workflowNoteText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 19,
  },

  /*
   * ---------------------------------------------------------
   * AI ANALYSIS
   * ---------------------------------------------------------
   */

  analysisState: {
    width: "100%",
    minHeight: 230,
    marginTop: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  analysisOrbArea: {
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
  },

  analysisOrbGlow: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },

  analysisOrb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  analysisOrbText: {
    color: colors.textOnPrimary,
    fontSize: 24,
    fontWeight: "700",
  },

  analysisTextBlock: {
    alignItems: "center",
    maxWidth: 620,
    gap: spacing.xs,
  },

  analysisEyebrow: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.3,
  },

  analysisTitle: {
    color: colors.textOnPrimary,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "700",
    textAlign: "center",
  },

  analysisStep: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    maxWidth: 520,
  },

  analysisStages: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },

  analysisStage: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  analysisStageDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },

  analysisStageDotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  analysisStageText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "600",
  },

  analysisStageTextActive: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: "600",
  },

  analysisStageLine: {
    width: 30,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },

  /*
   * ---------------------------------------------------------
   * RESULT
   * ---------------------------------------------------------
   */

  resultBox: {
    width: "100%",
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },

  resultTopRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  resultHeader: {
    flex: 1,
    gap: spacing.xs,
  },

  resultEyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  resultLabel: {
    color: colors.textPrimary,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "700",
  },

  resultStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
  },

  resultStatusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  resultStatusText: {
    color: colors.primary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  resultSummaryRow: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm,
  },

  resultSummaryCard: {
    flex: 1,
    minHeight: 58,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 3,
  },

  resultSummaryLabel: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  resultSummaryValue: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },

  resultConfidencePanel: {
    width: "100%",
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: "rgba(67,181,129,0.45)",
  },

  confidenceHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  resultConfidenceLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  resultConfidenceSubtext: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
    maxWidth: 500,
  },

  resultConfidence: {
    color: colors.success,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "700",
  },

  resultConfidenceTrack: {
    width: "100%",
    height: 7,
    marginTop: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },

  resultConfidenceFill: {
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.success,
  },

  resultDivider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },

  distributionHeader: {
    width: "100%",
  },

  breakdownTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },

  distributionDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },

  distributionList: {
    width: "100%",
    gap: spacing.xs,
  },

  resultRow: {
    width: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
  },

  resultRowActive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  resultRowHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },

  resultNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  predictedMarker: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },

  resultName: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  resultNameActive: {
    color: colors.textPrimary,
    fontWeight: "700",
  },

  resultScore: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },

  resultScoreActive: {
    color: colors.primary,
    fontWeight: "700",
  },

  resultBarTrack: {
    width: "100%",
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },

  resultBarFill: {
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
    opacity: 0.55,
  },

  resultBarFillActive: {
    backgroundColor: colors.primary,
    opacity: 1,
  },

  /*
   * ---------------------------------------------------------
   * CLINICAL REVIEW
   * ---------------------------------------------------------
   */

  interpretationBox: {
    width: "100%",
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },

  interpretationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  interpretationIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  interpretationIconText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "800",
  },

  interpretationTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },

  interpretationEyebrow: {
    color: colors.textSecondary,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
    marginTop: 2,
  },

  interpretationText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 19,
  },

  resultActions: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm,
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
    marginTop: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.error,
    width: "100%",
    gap: spacing.xs,
  },

  errorTitle: {
    color: colors.error,
    fontSize: 15,
    fontWeight: "700",
  },

  errorText: {
    color: colors.error,
    fontSize: 13,
    lineHeight: 20,
  },

  errorAction: {
    marginTop: spacing.sm,
    maxWidth: 180,
  },

  /*
   * ---------------------------------------------------------
   * DISCLAIMER
   * ---------------------------------------------------------
   */

  disclaimerBox: {
    width: "100%",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },

  disclaimerText: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 17,
  },

  /*
   * ---------------------------------------------------------
   * PATIENT VIEW
   * ---------------------------------------------------------
   */

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
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.primary,
    opacity: 0.18,
  },

  patientOrb: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.accent,
  },

  patientOrbText: {
    color: colors.textOnPrimary,
    fontSize: 27,
    fontWeight: "700",
  },

  patientEyebrow: {
    color: colors.accent,
    fontSize: 11,
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
});