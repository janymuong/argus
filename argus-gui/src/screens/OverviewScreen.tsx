import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import AppButton from "../components/AppButton";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { overviewStyles as styles } from "./OverviewScreen.styles";

type OverviewScreenProps = {
  onOpenScreening?: () => void;
  onOpenHistory?: () => void;
};

function ScreeningIllustration() {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64">
      <Circle cx="32" cy="32" r="27" fill="#0B252B" stroke="#2A9DA6" strokeWidth="1.5" />
      <Circle cx="32" cy="32" r="17" fill="none" stroke="#2A9DA6" strokeWidth="1.5" opacity="0.8" />
      <Circle cx="32" cy="32" r="8" fill="#2A9DA6" opacity="0.25" />
      <Circle cx="32" cy="32" r="3.5" fill="#E8A23C" />
      <Path d="M32 8 V17 M32 47 V56 M8 32 H17 M47 32 H56" stroke="#8FA7AC" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

function HistoryIllustration() {
  return (
    <Svg width={58} height={58} viewBox="0 0 58 58">
      <Rect x="10" y="9" width="38" height="42" rx="8" fill="#12272D" stroke="#2A9DA6" strokeWidth="1.4" />
      <Path d="M19 21 H39 M19 29 H39 M19 37 H33" stroke="#8FA7AC" strokeWidth="2" strokeLinecap="round" />
      <Circle cx="42" cy="42" r="9" fill="#0B252B" stroke="#E8A23C" strokeWidth="1.5" />
      <Path d="M42 37 V42 L46 44" stroke="#E8A23C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PatientIllustration() {
  return (
    <Svg width={58} height={58} viewBox="0 0 58 58">
      <Circle cx="29" cy="19" r="9" fill="#12272D" stroke="#8FA7AC" strokeWidth="1.5" />
      <Path d="M12 48 C13 37 19 31 29 31 C39 31 45 37 46 48" fill="#12272D" stroke="#8FA7AC" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M42 13 V23 M37 18 H47" stroke="#2A9DA6" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export default function OverviewScreen({
  onOpenScreening,
  onOpenHistory,
}: OverviewScreenProps) {
  const { user } = useAuth();

  if (user?.role !== "CLINICIAN") {
    return (
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.shell}>
          <View style={styles.patientCard}>
            <Logo width={150} height={48} />
            <Text style={styles.patientEyebrow}>ARGUS PATIENT PORTAL</Text>
            <Text style={styles.patientTitle}>Your retinal screening starts with your clinician</Text>
            <Text style={styles.patientCopy}>
              Argus supports clinicians during retinal screening by providing AI-assisted analysis of retinal fundus images.
            </Text>
            <View style={styles.patientInfoCard}>
              <Text style={styles.patientInfoTitle}>What happens next?</Text>
              <Text style={styles.patientInfoItem}>• Your clinician captures or selects a retinal image.</Text>
              <Text style={styles.patientInfoItem}>• Argus analyzes the image for diabetic retinopathy severity.</Text>
              <Text style={styles.patientInfoItem}>• Your clinician reviews the output and discusses the result with you.</Text>
            </View>
            <View style={styles.patientStatus}>
              <View style={styles.patientStatusDot} />
              <Text style={styles.patientStatusText}>Argus is ready when your clinician is ready.</Text>
            </View>
            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>
                Argus predictions are decision-support outputs and are not a substitute for professional clinical judgment.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.shell}>
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeCopy}>
            <Text style={styles.eyebrow}>CLINICAL WORKSPACE</Text>
            <Text style={styles.title}>Welcome back, {user.username}</Text>
            <Text style={styles.subtitle}>Your retinal screening workspace</Text>
            <Text style={styles.description}>
              Start a new assessment or review previous screening records from one place.
            </Text>
          </View>
          <View style={styles.welcomeArtwork}>
            <Logo width={136} height={42} />
            <ScreeningIllustration />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>WORKSPACE</Text>
            <Text style={styles.sectionTitle}>Clinical tools</Text>
          </View>
          <Text style={styles.sectionHint}>Choose a workflow to continue</Text>
        </View>

        <View style={styles.toolGrid}>
          <Pressable
            onPress={onOpenScreening}
            style={({ pressed }) => [styles.primaryToolCard, pressed && styles.cardPressed]}
          >
            <View style={styles.cardTopRow}>
              <ScreeningIllustration />
              <Text style={styles.availableBadge}>AVAILABLE</Text>
            </View>
            <Text style={styles.toolEyebrow}>AI-ASSISTED SCREENING</Text>
            <Text style={styles.toolTitle}>Retinal screening</Text>
            <Text style={styles.toolDescription}>
              Upload or capture a retinal fundus image and run Argus AI-assisted screening for diabetic retinopathy.
            </Text>
            <View style={styles.toolButton}>
              <AppButton title="Open screening workspace" onPress={onOpenScreening ?? (() => {})} />
            </View>
          </Pressable>

          <Pressable
            onPress={onOpenHistory}
            style={({ pressed }) => [styles.secondaryToolCard, pressed && styles.cardPressed]}
          >
            <View style={styles.cardTopRow}>
              <HistoryIllustration />
              <Text style={styles.availableBadge}>AVAILABLE</Text>
            </View>
            <Text style={styles.toolEyebrow}>CLINICAL RECORDS</Text>
            <Text style={styles.toolTitle}>Screening history</Text>
            <Text style={styles.toolDescription}>
              Review previous screening sessions, AI outputs, and clinical review information.
            </Text>
            <Text style={styles.cardLink}>View screening history  →</Text>
          </Pressable>

          <View style={[styles.secondaryToolCard, styles.disabledCard]}>
            <View style={styles.cardTopRow}>
              <PatientIllustration />
              <Text style={styles.comingSoonBadge}>IN DEVELOPMENT</Text>
            </View>
            <Text style={styles.toolEyebrow}>PATIENT MANAGEMENT</Text>
            <Text style={styles.toolTitle}>Patients</Text>
            <Text style={styles.toolDescription}>
              Patient directory and clinical workflow management will be available here.
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIndicator}><View style={styles.statusDot} /></View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Argus screening workspace is ready</Text>
            <Text style={styles.statusText}>The screening and clinical history workflows are available.</Text>
          </View>
          <View style={styles.statusBadge}><Text style={styles.statusBadgeText}>SYSTEM READY</Text></View>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            Argus provides decision-support information only. Results should be reviewed by a qualified clinician and should not be used as a standalone clinical diagnosis.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
