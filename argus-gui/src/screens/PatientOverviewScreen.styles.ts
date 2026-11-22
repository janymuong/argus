
import { StyleSheet } from "react-native";
import { colors, spacing, radii } from "../theme/tokens";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.xl,
        paddingBottom: spacing.xl,
    },
    shell: {
        width: "100%",
        maxWidth: 1100,
        alignSelf: "center",
    },

    // Welcome
    welcome: {
        marginBottom: spacing.xl,
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.2,
    },
    title: {
        color: colors.textPrimary,
        fontSize: 28,
        fontWeight: "700",
        marginTop: spacing.xs,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginTop: spacing.sm,
        maxWidth: 720,
    },

    // Latest screening
    screeningCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    cardEyebrow: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1,
    },
    screeningTitle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: "700",
        marginTop: spacing.xs,
    },
    confidenceText: {
        color: colors.success,
        fontSize: 14,
        fontWeight: "700",
        marginTop: spacing.sm,
    },
    screeningCopy: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginTop: spacing.md,
    },
    screeningFooter: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    footerDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 12,
        flex: 1,
    },
    reviewPanel: {
        marginTop: spacing.lg,
        padding: spacing.md,
        borderRadius: radii.md,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
    },
    reviewStatus: {
        fontSize: 13,
        fontWeight: "700",
        marginTop: spacing.sm,
    },
    reviewStatusDone: {
        color: colors.success,
    },
    reviewStatusPending: {
        color: colors.accent,
    },
    assessmentText: {
        color: colors.textPrimary,
        fontSize: 13,
        lineHeight: 20,
        marginTop: spacing.md,
    },
    reviewDetail: {
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
        marginTop: spacing.md,
    },

    // Sections
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 20,
        fontWeight: "700",
        marginTop: spacing.xs,
        marginBottom: spacing.md,
    },

    // Screening process
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
        gap: spacing.md,
    },
    stepNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    stepNumberText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "800",
    },
    stepContent: {
        flex: 1,
        paddingTop: 2,
    },
    stepTitle: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: "700",
    },
    stepText: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 17,
        marginTop: spacing.xs,
    },
    stepConnector: {
        width: 1,
        height: 18,
        backgroundColor: colors.border,
        marginLeft: 18,
        marginVertical: spacing.xs,
    },

    // About Argus
    aboutCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
    },
    aboutIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    aboutIconText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "800",
    },
    aboutContent: {
        flex: 1,
    },
    aboutTitle: {
        color: colors.textPrimary,
        fontSize: 13,
        fontWeight: "700",
    },
    aboutText: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 17,
        marginTop: spacing.xs,
    },

    // Disclaimer
    disclaimer: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.sm,
        padding: spacing.md,
        backgroundColor: colors.surfaceMuted,
        borderRadius: radii.md,
        marginBottom: spacing.lg,
    },
    disclaimerIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.accent,
        marginTop: 5,
    },
    disclaimerText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 16,
    },
    loadingState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.xl,
        gap: spacing.md,
    },
});


export default styles;
