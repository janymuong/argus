import { StyleSheet } from "react-native";

import {
    colors,
    spacing,
    radii,
} from "../theme/tokens";

export const patientOverviewStyles = StyleSheet.create({
    page: {
        flexGrow: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
    },

    shell: {
        width: "100%",
        maxWidth: 1100,
        alignSelf: "center",
        gap: spacing.lg,
        paddingBottom: spacing.xl,
    },

    /*
     * ---------------------------------------------------------
     * WELCOME
     * ---------------------------------------------------------
     */

    welcomeSection: {
        paddingVertical: spacing.sm,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 1,
        marginBottom: spacing.xs,
    },

    welcomeTitle: {
        color: colors.textPrimary,
        fontSize: 30,
        fontWeight: "700",
    },

    welcomeCopy: {
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 19,
        maxWidth: 700,
        marginTop: spacing.sm,
    },

    /*
     * ---------------------------------------------------------
     * SCREENING STATUS
     * ---------------------------------------------------------
     */

    statusCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
    },

    statusHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.lg,
    },

    cardEyebrow: {
        color: colors.textSecondary,
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 0.9,
        marginBottom: spacing.xs,
    },

    statusTitle: {
        color: colors.textPrimary,
        fontSize: 21,
        fontWeight: "700",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radii.pill,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.textSecondary,
        opacity: 0.65,
    },

    statusBadgeText: {
        color: colors.textSecondary,
        fontSize: 7,
        fontWeight: "800",
        letterSpacing: 0.7,
    },

    statusCopy: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 18,
        maxWidth: 760,
        marginTop: spacing.md,
    },

    statusFooter: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },

    statusFooterIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
    },

    statusFooterText: {
        color: colors.textSecondary,
        fontSize: 9,
    },

    /*
     * ---------------------------------------------------------
     * GENERAL SECTIONS
     * ---------------------------------------------------------
     */

    section: {
        gap: spacing.sm,
    },

    sectionEyebrow: {
        color: colors.primary,
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 0.9,
    },

    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 19,
        fontWeight: "700",
    },

    sectionCopy: {
        color: colors.textSecondary,
        fontSize: 11,
        lineHeight: 18,
        maxWidth: 760,
    },

    /*
     * ---------------------------------------------------------
     * ARGUS INFORMATION
     * ---------------------------------------------------------
     */

    infoCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        padding: spacing.lg,
        marginTop: spacing.xs,
    },

    infoIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primaryDark,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },

    infoIconText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "800",
    },

    infoContent: {
        flex: 1,
        gap: spacing.xs,
    },

    infoTitle: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: "700",
    },

    infoText: {
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 16,
    },

    /*
     * ---------------------------------------------------------
     * SCREENING JOURNEY
     * ---------------------------------------------------------
     */

    stepsCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginTop: spacing.xs,
    },

    step: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
    },

    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.primaryDark,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },

    stepNumberText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
    },

    stepContent: {
        flex: 1,
        gap: 3,
    },

    stepTitle: {
        color: colors.textPrimary,
        fontSize: 11,
        fontWeight: "700",
    },

    stepText: {
        color: colors.textSecondary,
        fontSize: 9,
        lineHeight: 15,
        maxWidth: 760,
    },

    stepLine: {
        width: 1,
        height: 22,
        backgroundColor: colors.border,
        marginLeft: 14.5,
        marginVertical: 3,
    },

    /*
     * ---------------------------------------------------------
     * IMPORTANT INFORMATION
     * ---------------------------------------------------------
     */

    importantCard: {
        backgroundColor: colors.primaryDark,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        padding: spacing.lg,
    },

    importantHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    importantIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.accent,
    },

    importantTitle: {
        color: colors.textPrimary,
        fontSize: 11,
        fontWeight: "700",
    },

    importantText: {
        color: colors.textSecondary,
        fontSize: 9,
        lineHeight: 15,
        marginTop: spacing.sm,
    },
});