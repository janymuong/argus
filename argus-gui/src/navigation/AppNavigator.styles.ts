
import { StyleSheet } from "react-native";
import { colors, radii, spacing } from "../theme/tokens";

const styles = StyleSheet.create({
    appShell: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.background,
    },
    sidebar: {
        width: 232,
        height: "100%",
        backgroundColor: colors.surface,
        borderRightWidth: 1,
        borderRightColor: colors.border,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },
    brandBlock: {
        minHeight: 58,
        justifyContent: "center",
        paddingHorizontal: spacing.sm,
    },
    brandDescriptor: {
        marginTop: spacing.sm,
        paddingLeft: 2,
        gap: 2,
    },
    brandDescriptorTitle: {
        color: colors.textSecondary,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 1.1,
    },
    brandDescriptorSubtitle: {
        color: colors.textSecondary,
        fontSize: 9,
        opacity: 0.65,
    },
    sidebarDivider: {
        width: "100%",
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
    navigationSection: {
        gap: spacing.xs,
        marginBottom: spacing.lg,
    },
    navigationLabel: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.1,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.xs,
        opacity: 0.7,
    },
    sidebarItem: {
        width: "100%",
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: radii.md,
        paddingHorizontal: spacing.sm,
        gap: spacing.sm,
    },
    sidebarItemActive: {
        backgroundColor: colors.primaryDark,
        borderWidth: 1,
        borderColor: colors.border,
    },
    sidebarItemPressed: {
        backgroundColor: colors.surfaceMuted,
    },
    sidebarItemDisabled: {
        opacity: 0.42,
    },
    sidebarIcon: {
        width: 30,
        height: 30,
        borderRadius: radii.sm,
        alignItems: "center",
        justifyContent: "center",
    },
    sidebarIconActive: {
        backgroundColor: colors.surfaceMuted,
    },
    sidebarIconText: {
        color: colors.textSecondary,
        fontSize: 17,
        lineHeight: 20,
    },
    sidebarIconTextActive: {
        color: colors.primary,
    },
    sidebarIconTextDisabled: {
        color: colors.textSecondary,
    },
    sidebarItemText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "600",
    },
    sidebarItemTextActive: {
        color: colors.textPrimary,
        fontWeight: "700",
    },
    sidebarItemTextDisabled: {
        color: colors.textSecondary,
    },
    comingSoon: {
        color: colors.textSecondary,
        fontSize: 7,
        fontWeight: "700",
        letterSpacing: 0.7,
    },
    sidebarSpacer: {
        flex: 1,
    },
    systemCard: {
        width: "100%",
        backgroundColor: colors.primaryDark,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.sm,
    },
    patientReadyCard: {
        width: "100%",
        backgroundColor: colors.primaryDark,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.md,
        gap: spacing.sm,
    },
    systemHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    systemStatusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.success,
    },
    systemStatusText: {
        color: colors.success,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.8,
    },
    systemDescription: {
        color: colors.textSecondary,
        fontSize: 10,
        lineHeight: 15,
    },
    signOutButton: {
        width: "100%",
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.sm,
        borderRadius: radii.md,
        gap: spacing.sm,
    },
    signOutButtonPressed: {
        backgroundColor: colors.surfaceMuted,
    },
    signOutIcon: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    signOutIconText: {
        color: colors.accent,
        fontSize: 17,
    },
    signOutText: {
        color: colors.accent,
        fontSize: 12,
        fontWeight: "700",
    },
    mainArea: {
        flex: 1,
        minWidth: 0,
        backgroundColor: colors.background,
    },
    topBar: {
        width: "100%",
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    topBarLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    topBarSection: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1,
    },
    topBarSeparator: {
        width: 1,
        height: 16,
        backgroundColor: colors.border,
    },
    topBarPage: {
        color: colors.textPrimary,
        fontSize: 12,
        fontWeight: "600",
    },
    topBarRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    environmentBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radii.pill,
        backgroundColor: colors.successBg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    environmentDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.success,
    },
    environmentText: {
        color: colors.success,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.8,
    },
    topBarDivider: {
        width: 1,
        height: 28,
        backgroundColor: colors.border,
    },
    userIdentity: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "800",
    },
    userDetails: {
        minWidth: 70,
        maxWidth: 150,
        gap: 2,
    },
    username: {
        color: colors.textPrimary,
        fontSize: 11,
        fontWeight: "700",
    },
    roleText: {
        color: colors.textSecondary,
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },
    contentArea: {
        flex: 1,
        minHeight: 0,
    },
});

export default styles;
