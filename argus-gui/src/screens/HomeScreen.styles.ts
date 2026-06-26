import { StyleSheet } from "react-native";
import { colors, radii, spacing, typography } from "../theme/tokens";

export const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: 56,
    gap: spacing.md,
  },
  logoRow: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  preview: {
    width: 260,
    height: 260,
    borderRadius: radii.lg,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonRow: {
    width: "100%",
    marginVertical: spacing.xs,
  },
  spacer: {
    marginVertical: spacing.lg,
  },
  resultBox: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.successBg,
    width: "100%",
  },
  resultLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  breakdownTitle: {
    marginTop: spacing.sm,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  errorBox: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.errorBg,
    width: "100%",
  },
  errorText: {
    color: colors.error,
  },
  disclaimerBox: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
