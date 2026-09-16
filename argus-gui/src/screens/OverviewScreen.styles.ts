import { StyleSheet } from "react-native";

import {
    colors,
    radii,
    spacing,
} from "../theme/tokens";

export const overviewStyles = StyleSheet.create({
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
     * WELCOME
     */

    welcomeCard: {
        width: "100%",
        backgroundColor: colors.primaryDark,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        gap: spacing.md,
    },

    welcomeTop: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.lg,
    },

    eyebrow: {
        color: colors.accent,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.3,
        marginBottom: spacing.xs,
    },

    title: {
        color: colors.textPrimary,
        fontSize: 29,
        lineHeight: 36,
        fontWeight: "700",
    },

    subtitle: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "600",
        marginTop: spacing.xs,
    },

    description: {
        color: "rgba(255,255,255,0.68)",
        fontSize: 14,
        lineHeight: 21,
        maxWidth: 760,
    },

    clinicalBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radii.pill,
        backgroundColor: "rgba(67,181,129,0.12)",
        borderWidth: 1,
        borderColor: "rgba(67,181,129,0.32)",
    },

    clinicalBadgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.success,
    },

    clinicalBadgeText: {
        color: colors.success,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.8,
    },

    /*
     * SECTION
     */

    sectionHeader: {
        width: "100%",
        paddingHorizontal: spacing.xs,
    },

    sectionEyebrow: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: "700",
        marginTop: 2,
    },

    /*
     * TOOLS
     */

    toolGrid: {
        width: "100%",
        flexDirection: "row",
        gap: spacing.md,
    },

    primaryToolCard: {
        flex: 1.5,
        minHeight: 280,
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.primary,
        padding: spacing.lg,
        gap: spacing.sm,
    },

    secondaryToolCard: {
        flex: 1,
        minHeight: 280,
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        gap: spacing.sm,
    },

    toolIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.primaryDark,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.xs,
    },

    toolIconText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: "800",
    },

    toolIconMuted: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.xs,
    },

    toolIconMutedText: {
        color: colors.textSecondary,
        fontSize: 21,
    },

    toolEyebrow: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.9,
    },

    toolTitle: {
        color: colors.textPrimary,
        fontSize: 19,
        fontWeight: "700",
    },

    toolDescription: {
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 19,
        maxWidth: 430,
        flex: 1,
    },

    toolButton: {
        width: "100%",
        marginTop: spacing.sm,
    },

    comingSoonBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: spacing.sm,
        paddingVertical: 5,
        borderRadius: radii.pill,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
    },

    comingSoonText: {
        color: colors.textSecondary,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.8,
    },

    /*
     * SYSTEM STATUS
     */

    statusCard: {
        width: "100%",
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: radii.md,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
    },

    statusIndicator: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colors.successBg,
        alignItems: "center",
        justifyContent: "center",
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.success,
    },

    statusContent: {
        flex: 1,
        gap: 2,
    },

    statusTitle: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: "700",
    },

    statusText: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 17,
    },

    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radii.pill,
        backgroundColor: colors.successBg,
        borderWidth: 1,
        borderColor: colors.success,
    },

    statusBadgeText: {
        color: colors.success,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.7,
    },

    /*
     * DISCLAIMER
     */

    disclaimerBox: {
        width: "100%",
        paddingHorizontal: spacing.md,
    },

    disclaimerText: {
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 17,
        textAlign: "center",
    },

    /*
     * PATIENT
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

    patientLogo: {
        width: 92,
        height: 92,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.xs,
    },

    patientLogoCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: colors.primaryDark,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.accent,
    },

    patientLogoText: {
        color: colors.textOnPrimary,
        fontSize: 27,
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
});