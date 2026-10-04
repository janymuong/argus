import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import styles from "./PatientOverviewScreen.styles";

export default function PatientOverviewScreen() {
    const { user } = useAuth();

    const username = user?.username || "Patient";

    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.shell}>
                {/* Welcome */}
                <View style={styles.welcome}>
                    <Text style={styles.eyebrow}>PATIENT PORTAL</Text>

                    <Text style={styles.title}>Welcome, {username}</Text>

                    <Text style={styles.subtitle}>
                        Your retinal screening information will appear here when your
                        clinical team completes a screening.
                    </Text>
                </View>

                {/* Screening status */}
                <View style={styles.screeningCard}>
                    <View style={styles.screeningTop}>
                        <View style={styles.screeningHeading}>
                            <Text style={styles.cardEyebrow}>YOUR SCREENING</Text>
                            <Text style={styles.screeningTitle}>No screening yet</Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>NOT STARTED</Text>
                        </View>
                    </View>

                    <Text style={styles.screeningCopy}>
                        Your clinician will complete your retinal screening during your
                        clinical visit. Once a result is available, it can be shared with
                        you here.
                    </Text>

                    <View style={styles.screeningFooter}>
                        <View style={styles.footerDot} />
                        <Text style={styles.footerText}>
                            Your clinical team will guide you through the next step.
                        </Text>
                    </View>
                </View>

                {/* What happens */}
                <View style={styles.section}>
                    <Text style={styles.eyebrow}>YOUR SCREENING</Text>
                    <Text style={styles.sectionTitle}>
                        What happens during screening
                    </Text>

                    <View style={styles.processCard}>
                        <View style={styles.processStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>01</Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Image captured</Text>
                                <Text style={styles.stepText}>
                                    Your clinician captures a retinal image during your visit.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepConnector} />

                        <View style={styles.processStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>02</Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Argus analyzes</Text>
                                <Text style={styles.stepText}>
                                    Argus analyzes the image and provides decision-support
                                    information to your clinician.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepConnector} />

                        <View style={styles.processStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>03</Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>Clinician reviews</Text>
                                <Text style={styles.stepText}>
                                    Your clinician considers the result alongside your
                                    examination and other clinical information.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* About Argus */}
                <View style={styles.section}>
                    <Text style={styles.eyebrow}>ABOUT ARGUS</Text>
                    <Text style={styles.sectionTitle}>Supporting your care team</Text>

                    <View style={styles.aboutCard}>
                        <View style={styles.aboutIcon}>
                            <Text style={styles.aboutIconText}>A</Text>
                        </View>

                        <View style={styles.aboutContent}>
                            <Text style={styles.aboutTitle}>Clinical decision support</Text>

                            <Text style={styles.aboutText}>
                                Argus helps clinicians analyze retinal images and provides
                                information to support their assessment. Your clinician remains
                                responsible for interpreting the result and discussing it with
                                you.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Small disclaimer */}
                <View style={styles.disclaimer}>
                    <View style={styles.disclaimerIndicator} />

                    <Text style={styles.disclaimerText}>
                        Argus provides decision-support information only. It is not a
                        standalone diagnosis and does not replace professional clinical
                        judgment.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
