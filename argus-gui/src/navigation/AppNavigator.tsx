import React, { useState } from "react";

import {
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthContext";

import ScreeningScreen from "../screens/ScreeningScreen";
import LoginScreen from "../screens/LoginScreen";
import OverviewScreen from "../screens/OverviewScreen";
import RegisterScreen from "../screens/RegisterScreen";

import Logo from "../components/Logo";

import {
  colors,
  radii,
  spacing,
} from "../theme/tokens";

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accent,
  },
};

/*
 * ---------------------------------------------------------
 * ARGUS BRAND
 * ---------------------------------------------------------
 */

function BrandBlock() {
  return (
    <View style={styles.brandBlock}>
      <Logo />

      <View style={styles.brandDescriptor}>
        <Text style={styles.brandDescriptorTitle}>
          CLINICAL SCREENING
        </Text>

        <Text style={styles.brandDescriptorSubtitle}>
          AI decision support
        </Text>
      </View>
    </View>
  );
}

/*
 * ---------------------------------------------------------
 * SIDEBAR ITEM
 * ---------------------------------------------------------
 */

function SidebarItem({
  label,
  icon,
  active = false,
  disabled = false,
  onPress,
}: {
  label: string;
  icon: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.sidebarItem,
        active && styles.sidebarItemActive,
        disabled && styles.sidebarItemDisabled,
        pressed &&
        !disabled &&
        styles.sidebarItemPressed,
      ]}
    >
      <View
        style={[
          styles.sidebarIcon,
          active && styles.sidebarIconActive,
        ]}
      >
        <Text
          style={[
            styles.sidebarIconText,
            active && styles.sidebarIconTextActive,
            disabled && styles.sidebarIconTextDisabled,
          ]}
        >
          {icon}
        </Text>
      </View>

      <Text
        style={[
          styles.sidebarItemText,
          active && styles.sidebarItemTextActive,
          disabled && styles.sidebarItemTextDisabled,
        ]}
      >
        {label}
      </Text>

      {disabled && (
        <Text style={styles.comingSoon}>
          SOON
        </Text>
      )}
    </Pressable>
  );
}

/*
 * ---------------------------------------------------------
 * SIDEBAR
 * ---------------------------------------------------------
 */

function Sidebar({
  activeSection,
  onHomePress,
  onScreeningPress,
  onSignOut,
}: {
  activeSection: "Home" | "Screening";
  onHomePress: () => void;
  onScreeningPress: () => void;
  onSignOut: () => void;
}) {
  return (
    <View style={styles.sidebar}>
      <BrandBlock />

      <View style={styles.sidebarDivider} />

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          WORKSPACE
        </Text>

        <SidebarItem
          label="Home"
          icon="⌂"
          active={activeSection === "Home"}
          onPress={onHomePress}
        />

        <SidebarItem
          label="Screening"
          icon="◎"
          active={activeSection === "Screening"}
          onPress={onScreeningPress}
        />
      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          CLINICAL
        </Text>

        <SidebarItem
          label="History"
          icon="◷"
          disabled
        />

        <SidebarItem
          label="Patients"
          icon="♙"
          disabled
        />
      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          SYSTEM
        </Text>

        <SidebarItem
          label="Settings"
          icon="⚙"
          disabled
        />
      </View>

      <View style={styles.sidebarSpacer} />

      <View style={styles.systemCard}>
        <View style={styles.systemHeader}>
          <View style={styles.systemStatusDot} />

          <Text style={styles.systemStatusText}>
            SYSTEM READY
          </Text>
        </View>

        <Text style={styles.systemDescription}>
          Argus AI screening services are available for
          clinician workflows.
        </Text>
      </View>

      <View style={styles.sidebarDivider} />

      <Pressable
        onPress={onSignOut}
        style={({ pressed }) => [
          styles.signOutButton,
          pressed && styles.signOutButtonPressed,
        ]}
      >
        <View style={styles.signOutIcon}>
          <Text style={styles.signOutIconText}>
            ↪
          </Text>
        </View>

        <Text style={styles.signOutText}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}

/*
 * ---------------------------------------------------------
 * TOP BAR
 * ---------------------------------------------------------
 */

function TopBar({
  username,
  role,
  activeSection,
}: {
  username: string;
  role: string;
  activeSection: "Home" | "Screening";
}) {
  const initial =
    username?.charAt(0).toUpperCase() || "U";

  const pageTitle =
    activeSection === "Screening"
      ? "Retinal screening"
      : "Overview";

  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        <Text style={styles.topBarSection}>
          CLINICAL WORKSPACE
        </Text>

        <View style={styles.topBarSeparator} />

        <Text style={styles.topBarPage}>
          {pageTitle}
        </Text>
      </View>

      <View style={styles.topBarRight}>
        <View style={styles.environmentBadge}>
          <View style={styles.environmentDot} />

          <Text style={styles.environmentText}>
            CLINICAL MODE
          </Text>
        </View>

        <View style={styles.topBarDivider} />

        <View style={styles.userIdentity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initial}
            </Text>
          </View>

          <View style={styles.userDetails}>
            <Text
              style={styles.username}
              numberOfLines={1}
            >
              {username}
            </Text>

            <Text style={styles.roleText}>
              {role}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/*
 * ---------------------------------------------------------
 * AUTHENTICATED WORKSPACE
 * ---------------------------------------------------------
 */

function ClinicianShell({
  user,
  logout,
}: {
  user: any;
  logout: () => Promise<void>;
}) {
  const [activeSection, setActiveSection] =
    useState<"Home" | "Screening">("Home");

  const goHome = () => {
    setActiveSection("Home");
  };

  const goScreening = () => {
    if (user.role === "CLINICIAN") {
      setActiveSection("Screening");
    }
  };

  return (
    <View style={styles.appShell}>
      <Sidebar
        activeSection={activeSection}
        onHomePress={goHome}
        onScreeningPress={goScreening}
        onSignOut={() => void logout()}
      />

      <View style={styles.mainArea}>
        <TopBar
          username={user.username}
          role={user.role}
          activeSection={activeSection}
        />

        <View style={styles.contentArea}>
          {activeSection === "Screening" &&
            user.role === "CLINICIAN" ? (
            <ScreeningScreen />
          ) : (
            <OverviewScreen
              onOpenScreening={goScreening}
            />
          )}
        </View>
      </View>
    </View>
  );
}

/*
 * ---------------------------------------------------------
 * MAIN NAVIGATOR
 * ---------------------------------------------------------
 */

export default function AppNavigator() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? (
        <ClinicianShell
          user={user}
          logout={logout}
        />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,

            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

/*
 * ---------------------------------------------------------
 * STYLES
 * ---------------------------------------------------------
 */

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
  },

  /*
   * SIDEBAR
   */

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

  /*
   * MAIN AREA
   */

  mainArea: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.background,
  },

  /*
   * TOP BAR
   */

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

  /*
   * CONTENT
   */

  contentArea: {
    flex: 1,
    minHeight: 0,
  },
});