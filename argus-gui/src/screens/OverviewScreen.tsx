import React from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";

import AppButton from "../components/AppButton";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { overviewStyles as styles } from "./OverviewScreen.styles";

type OverviewScreenProps = {
    onOpenScreening?: () => void;
};
export default function OverviewScreen({
    onOpenScreening,
}: OverviewScreenProps) {
    const { user } = useAuth();

    /*
     * PATIENT OVERVIEW
     */
    if (user?.role !== "CLINICIAN") {
        return (
            <ScrollView
                contentContainerStyle={styles.page}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.shell}>
                    <View style={styles.patientCard}>
                        <View style={styles.patientLogo}>
                            <View style={styles.patientLogoCircle}>
                                <Text style={styles.patientLogoText}>
                                    A
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.patientEyebrow}>
                            ARGUS ASSISTANT
                        </Text>

                        <Text style={styles.patientTitle}>
                            Your retinal screening starts with your clinician
                        </Text>

                        <Text style={styles.patientCopy}>
                            Argus supports clinicians during retinal screening by
                            providing AI-assisted analysis of retinal fundus images.
                        </Text>

                        <View style={styles.patientInfoCard}>
                            <Text style={styles.patientInfoTitle}>
                                What happens next?
                            </Text>

                            <Text style={styles.patientInfoItem}>
                                • Your clinician captures or selects a retinal image.
                            </Text>

                            <Text style={styles.patientInfoItem}>
                                • Argus analyzes the image for diabetic retinopathy
                                severity.
                            </Text>

                            <Text style={styles.patientInfoItem}>
                                • Your clinician reviews the output and discusses the
                                result with you.
                            </Text>
                        </View>

                        <View style={styles.patientStatus}>
                            <View style={styles.patientStatusDot} />

                            <Text style={styles.patientStatusText}>
                                Argus is ready when your clinician is ready.
                            </Text>
                        </View>

                        <View style={styles.disclaimerBox}>
                            <Text style={styles.disclaimerText}>
                                Argus predictions are decision-support outputs and
                                are not a substitute for professional clinical
                                judgment.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }

    /*
     * CLINICIAN OVERVIEW
     */
    return (
        <ScrollView
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.shell}>
                <View style={styles.welcomeCard}>
                    <View style={styles.welcomeTop}>
                        <View>
                            <Text style={styles.eyebrow}>
                                CLINICAL WORKSPACE
                            </Text>

                            <Text style={styles.title}>
                                Welcome back, {user.username}
                            </Text>

                            <Text style={styles.subtitle}>
                                Argus clinical screening workspace
                            </Text>
                        </View>

                        <View style={styles.clinicalBadge}>
                            <View style={styles.clinicalBadgeDot} />

                            <Text style={styles.clinicalBadgeText}>
                                CLINICAL MODE
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.description}>
                        Review screening activity, start a new retinal assessment,
                        and access clinical workflows from your Argus workspace.
                    </Text>
                </View>

                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionEyebrow}>
                            WORKSPACE
                        </Text>

                        <Text style={styles.sectionTitle}>
                            Clinical tools
                        </Text>
                    </View>
                </View>

                <View style={styles.toolGrid}>
                    <View style={styles.primaryToolCard}>
                        <View style={styles.toolIcon}>
                            <Text style={styles.toolIconText}>
                                A
                            </Text>
                        </View>

                        <Text style={styles.toolEyebrow}>
                            AI-ASSISTED SCREENING
                        </Text>

                        <Text style={styles.toolTitle}>
                            Retinal screening
                        </Text>

                        <Text style={styles.toolDescription}>
                            Upload or capture a retinal fundus image and run
                            Argus AI-assisted screening for diabetic retinopathy.
                        </Text>

                        <View style={styles.toolButton}>
                            <AppButton
                                title="Open screening workspace"
                                onPress={() => onOpenScreening?.()}
                            />
                        </View>
                    </View>

                    <View style={styles.secondaryToolCard}>
                        <View style={styles.toolIconMuted}>
                            <Text style={styles.toolIconMutedText}>
                                ◷
                            </Text>
                        </View>

                        <Text style={styles.toolEyebrow}>
                            CLINICAL RECORDS
                        </Text>

                        <Text style={styles.toolTitle}>
                            Screening history
                        </Text>

                        <Text style={styles.toolDescription}>
                            Review previous screening sessions and AI outputs.
                        </Text>

                        <View style={styles.comingSoonBadge}>
                            <Text style={styles.comingSoonText}>
                                COMING SOON
                            </Text>
                        </View>
                    </View>

                    <View style={styles.secondaryToolCard}>
                        <View style={styles.toolIconMuted}>
                            <Text style={styles.toolIconMutedText}>
                                ◌
                            </Text>
                        </View>

                        <Text style={styles.toolEyebrow}>
                            PATIENT MANAGEMENT
                        </Text>

                        <Text style={styles.toolTitle}>
                            Patients
                        </Text>

                        <Text style={styles.toolDescription}>
                            Manage patient screening workflows and clinical records.
                        </Text>

                        <View style={styles.comingSoonBadge}>
                            <Text style={styles.comingSoonText}>
                                COMING SOON
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statusCard}>
                    <View style={styles.statusIndicator}>
                        <View style={styles.statusDot} />
                    </View>

                    <View style={styles.statusContent}>
                        <Text style={styles.statusTitle}>
                            Argus AI screening services are available
                        </Text>

                        <Text style={styles.statusText}>
                            The clinical screening workflow is ready for retinal
                            image analysis.
                        </Text>
                    </View>

                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>
                            SYSTEM READY
                        </Text>
                    </View>
                </View>

                <View style={styles.disclaimerBox}>
                    <Text style={styles.disclaimerText}>
                        Argus provides decision-support information only.
                        Results should be reviewed by a qualified clinician and
                        should not be used as a standalone clinical diagnosis.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}