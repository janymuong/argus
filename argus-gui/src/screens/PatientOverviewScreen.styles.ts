import { StyleSheet } from "react-native";
import { colors, radii, spacing } from "../theme/tokens";

export default StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingBottom: spacing.xl,
    },

    shell: {
        width: "100%",
        maxWidth: 920,
        alignSelf: "center",
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
    },

    /* Welcome */

    welcome: {
        marginBottom: spacing.xl,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.2,
        marginBottom: spacing.xs,
    },

    title: {
        color: colors.textPrimary,
        fontSize: 30,
        fontWeight: "600",
        marginBottom: spacing.sm,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        maxWidth: 680,
    },

    /* Screening status */

    screeningCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },

    screeningTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: spacing.md,
    },

    screeningHeading: {
        flex: 1,
    },

    cardEyebrow: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.1,
        marginBottom: spacing.xs,
    },

    screeningTitle: {
        color: colors.textPrimary,
        fontSize: 22,
        fontWeight: "600",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.pill,
        paddingHorizontal: spacing.sm,
        paddingVertical: 5,
        marginTop: 1,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.textSecondary,
        marginRight: 6,
    },

    statusText: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.8,
    },

    screeningCopy: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginTop: spacing.md,
        maxWidth: 760,
    },

    screeningFooter: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
    },

    footerDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
        marginRight: spacing.sm,
    },

    footerText: {
        color: colors.textSecondary,
        fontSize: 11,
    },

    /* Sections */

    section: {
        marginBottom: spacing.xl,
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: "600",
        marginBottom: spacing.md,
    },

    /* Screening process */

    processCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
    },

    processStep: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    stepNumber: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceMuted,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.md,
    },

    stepNumberText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    stepContent: {
        flex: 1,
        paddingTop: 2,
    },

    stepTitle: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 3,
    },

    stepText: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 17,
        maxWidth: 700,
    },

    stepConnector: {
        height: 18,
        width: 1,
        backgroundColor: colors.border,
        marginLeft: 17,
        marginVertical: 4,
    },

    /* About */

    aboutCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
    },

    aboutIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceMuted,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.md,
    },

    aboutIconText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    aboutContent: {
        flex: 1,
    },

    aboutTitle: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 4,
    },

    aboutText: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 18,
        maxWidth: 740,
    },

    /* Disclaimer */

    disclaimer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        marginTop: spacing.xs,
    },

    disclaimerIndicator: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.accent,
        marginTop: 5,
        marginRight: spacing.sm,
    },

    disclaimerText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 16,
    },
});
