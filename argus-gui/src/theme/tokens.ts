/**
 * Argus clinical design tokens.
 *
 * Dark clinical interface:
 * - Deep navy/teal application background
 * - Elevated clinical surfaces
 * - High-contrast typography
 * - Teal for system/AI activity
 * - Gold reserved for important attention states
 * - Green reserved for successful/positive states
 */

export const colors = {
  // Brand / clinical primary
  primary: "#2A9DA6",
  primaryDark: "#0B252B",
  accent: "#E8A23C",

  // Surfaces
  background: "#071317",
  surface: "#0D1D22",
  surfaceMuted: "#12272D",

  // Text
  textPrimary: "#E8F1F2",
  textSecondary: "#8FA7AC",
  textOnPrimary: "#FFFFFF",

  // Feedback
  success: "#43B581",
  successBg: "#102D27",

  error: "#E56B6F",
  errorBg: "#321A1D",

  border: "#244148",
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
  title: {
    fontSize: 30,
    fontWeight: "600" as const,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "400" as const,
  },

  body: {
    fontSize: 15,
    fontWeight: "400" as const,
  },

  label: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
};