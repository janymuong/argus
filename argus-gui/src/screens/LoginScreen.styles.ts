import { StyleSheet } from "react-native";
import { colors, radii, spacing } from "../theme/tokens";

export const loginStyles = StyleSheet.create({
  keyboard: { flex: 1, backgroundColor: colors.background },
  page: { flexGrow: 1, minHeight: "100%", justifyContent: "center", alignItems: "center", padding: spacing.lg },
  card: { width: "100%", maxWidth: 460, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, padding: spacing.xl, gap: spacing.xl },
  brand: { alignItems: "center", gap: spacing.xs },
  brandCaption: { color: colors.textSecondary, fontSize: 9, fontWeight: "700", letterSpacing: 1.5 },
  heading: { gap: spacing.xs },
  title: { color: colors.textPrimary, fontSize: 28, lineHeight: 35, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20 },
  form: { gap: spacing.md },
  field: { gap: spacing.xs },
  label: { color: colors.textSecondary, fontSize: 10, fontWeight: "700", letterSpacing: 0.9 },
  input: { width: "100%", height: 49, paddingHorizontal: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceMuted, color: colors.textPrimary, fontSize: 14, outlineStyle: "none" as any },
  error: { backgroundColor: colors.errorBg, borderWidth: 1, borderColor: colors.error, borderRadius: radii.md, padding: spacing.md },
  errorText: { color: colors.error, fontSize: 12, lineHeight: 18 },
  registerRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 5, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  registerText: { color: colors.textSecondary, fontSize: 12 },
  registerLink: { color: colors.primary, fontSize: 12, fontWeight: "700" },
  disclaimer: { color: colors.textSecondary, fontSize: 10, lineHeight: 16, textAlign: "center", opacity: 0.8 },
  footer: { color: colors.textSecondary, fontSize: 8, fontWeight: "700", letterSpacing: 1.2, marginTop: spacing.lg },
});
