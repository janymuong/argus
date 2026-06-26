/**
 * Argus design tokens.
 *
 * Keeping color/spacing values here (rather than inline in each
 * StyleSheet) means a future re-theme is a one-file change, and the
 * eagle-eye teal in the logo has a matching home in the UI palette.
 */

export const colors = {
  // Brand
  primary: "#1f6f78", // deep teal, matches the eagle head in the logo
  primaryDark: "#0f4a50",
  accent: "#e8a23c", // beak gold, used sparingly for emphasis

  // Surfaces
  background: "#fafafa",
  surface: "#ffffff",
  surfaceMuted: "#f0f4f4",

  // Text
  textPrimary: "#1f2937",
  textSecondary: "#6b7280",
  textOnPrimary: "#ffffff",

  // Feedback
  success: "#2f855a",
  successBg: "#eafaf0",
  error: "#a33333",
  errorBg: "#fdecea",

  border: "#e2e8e8",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  title: { fontSize: 30, fontWeight: "600" as const },
  subtitle: { fontSize: 14, fontWeight: "400" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  label: { fontSize: 16, fontWeight: "600" as const },
};
