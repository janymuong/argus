import React, { useState } from "react";

import {
  Pressable,
  Text,
  View,
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
import ScreeningHistoryScreen from "../screens/ScreeningHistoryScreen";
import LoginScreen from "../screens/LoginScreen";
import OverviewScreen from "../screens/OverviewScreen";
import PatientOverviewScreen from "../screens/PatientOverviewScreen";
import RegisterScreen from "../screens/RegisterScreen";

import Logo from "../components/Logo";

import { colors } from "../theme/tokens";
import styles from "./AppNavigator.styles";

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
 * BRAND
 * ---------------------------------------------------------
 */

function BrandBlock({
  patient = false,
}: {
  patient?: boolean;
}) {
  return (
    <View style={styles.brandBlock}>
      <Logo />

      <View style={styles.brandDescriptor}>
        <Text style={styles.brandDescriptorTitle}>
          {patient ? "PATIENT PORTAL" : "CLINICAL SCREENING"}
        </Text>

        <Text style={styles.brandDescriptorSubtitle}>
          {patient
            ? "Your screening journey"
            : "AI decision support"}
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
 * CLINICIAN SIDEBAR
 * ---------------------------------------------------------
 */

function ClinicianSidebar({
  activeSection,
  onHomePress,
  onScreeningPress,
  onHistoryPress,
  onSignOut,
}: {
  activeSection: "Home" | "Screening" | "History";
  onHomePress: () => void;
  onScreeningPress: () => void;
  onHistoryPress: () => void;
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

        <SidebarItem
          label="History"
          icon="◷"
          active={activeSection === "History"}
          onPress={onHistoryPress}
        />
      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          CLINICAL
        </Text>

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
 * PATIENT SIDEBAR
 * ---------------------------------------------------------
 */


function PatientSidebar({
  activeSection,
  onHomePress,
  onHistoryPress,
  onSignOut,
}: {
  activeSection: "Home" | "History";
  onHomePress: () => void;
  onHistoryPress: () => void;
  onSignOut: () => void;
}) {

  return (
    <View style={styles.sidebar}>
      <BrandBlock patient />

      <View style={styles.sidebarDivider} />

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          MY PORTAL
        </Text>


        <SidebarItem
          label="Overview"
          icon="⌂"
          active={activeSection === "Home"}
          onPress={onHomePress}
        />



        <SidebarItem
          label="Screening history"
          icon="◷"
          active={activeSection === "History"}
          onPress={onHistoryPress}
        />

      </View>

      <View style={styles.navigationSection}>
        <Text style={styles.navigationLabel}>
          INFORMATION
        </Text>

        <SidebarItem
          label="About Argus"
          icon="◎"
          disabled
        />

        <SidebarItem
          label="Help"
          icon="?"
          disabled
        />
      </View>

      <View style={styles.sidebarSpacer} />

      <View style={styles.patientReadyCard}>
        <View style={styles.systemHeader}>
          <View style={styles.systemStatusDot} />

          <Text style={styles.systemStatusText}>
            PORTAL READY
          </Text>
        </View>

        <Text style={styles.systemDescription}>
          Your Argus patient portal is available.
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
  patient = false,
  activeSection,
}: {
  username: string;
  role: string;
  patient?: boolean;
  activeSection?: "Home" | "Screening" | "History";

}) {
  const initial =
    username?.charAt(0).toUpperCase() || "U";


  const pageTitle = patient
    ? activeSection === "History"
      ? "Screening history"
      : "Overview"
    : activeSection === "Screening"
      ? "Retinal screening"
      : activeSection === "History"
        ? "Screening history"
        : "Overview";


  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        <Text style={styles.topBarSection}>
          {patient
            ? "PATIENT PORTAL"
            : "CLINICAL WORKSPACE"}
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
            {patient ? "PATIENT MODE" : "CLINICAL MODE"}
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
 * CLINICIAN SHELL
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
    useState<"Home" | "Screening" | "History">("Home");

  const goHome = () => {
    setActiveSection("Home");
  };

  const goScreening = () => {
    if (user.role === "CLINICIAN") {
      setActiveSection("Screening");
    }
  };

  const goHistory = () => {
    setActiveSection("History");
  };

  return (
    <View style={styles.appShell}>
      <ClinicianSidebar
        activeSection={activeSection}
        onHomePress={goHome}
        onScreeningPress={goScreening}
        onHistoryPress={goHistory}
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
          ) : activeSection === "History" ? (
            <ScreeningHistoryScreen />
          ) : (
            <OverviewScreen onOpenScreening={goScreening} onOpenHistory={goHistory} />
          )}
        </View>
      </View>
    </View>
  );
}

/*
 * ---------------------------------------------------------
 * PATIENT SHELL
 * ---------------------------------------------------------
 */


function PatientShell({
  user,
  logout,
}: {
  user: any;
  logout: () => Promise<void>;
}) {
  const [activeSection, setActiveSection] =
    useState<"Home" | "History">("Home");

  const goHome = () => {
    setActiveSection("Home");
  };

  const goHistory = () => {
    setActiveSection("History");
  };

  return (
    <View style={styles.appShell}>
      <PatientSidebar
        activeSection={activeSection}
        onHomePress={goHome}
        onHistoryPress={goHistory}
        onSignOut={() => void logout()}
      />

      <View style={styles.mainArea}>
        <TopBar
          username={user.username}
          role={user.role}
          patient
          activeSection={activeSection}
        />

        <View style={styles.contentArea}>
          {activeSection === "History" ? (
            <ScreeningHistoryScreen />
          ) : (
            <PatientOverviewScreen />
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
        user.role === "PATIENT" ? (
          <PatientShell
            user={user}
            logout={logout}
          />
        ) : (
          <ClinicianShell
            user={user}
            logout={logout}
          />
        )
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
