import React from "react";

import {
    ScrollView,
    Text,
    View,
} from "react-native";

import { patientOverviewStyles as styles } from "./PatientOverviewScreen.styles";

import { useAuth } from "../context/AuthContext";

export default function PatientOverviewScreen() {
    const { user } = useAuth();

    const username = user?.username || "Patient";

    return (
        <ScrollView
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.shell}>

                {/* Welcome */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.eyebrow}>
                        PATIENT PORTAL
                    </Text>

                    <Text style={styles.welcomeTitle}>
                        Welcome, {username}
                    </Text>

                    <Text style={styles.welcomeCopy}>
                        Your Argus patient portal gives you a simple view of
                        your retinal screening journey and the information
                        shared with you by your clinical team.
                    </Text>
                </View>

                {/* Screening status */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <View>
                            <Text style={styles.cardEyebrow}>
                                YOUR SCREENING
                            </Text>

                            <Text style={styles.statusTitle}>
                                No screening yet
                            </Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />

                            <Text style={styles.statusBadgeText}>
                                NOT STARTED
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.statusCopy}>
                        Your retinal screening is performed with your
                        clinician. Once a screening has been completed and
                        shared with you, relevant information can appear
                        here.
                    </Text>

                    <View style={styles.statusFooter}>
                        <View style={styles.statusFooterIndicator} />

                        <Text style={styles.statusFooterText}>
                            Your clinician will guide you through the next step.
                        </Text>
                    </View>
                </View>

                {/* What Argus does */}
                <View style={styles.section}>
                    <Text style={styles.sectionEyebrow}>
                        ABOUT ARGUS
                    </Text>

                    <Text style={styles.sectionTitle}>
                        What Argus does
                    </Text>

                    <Text style={styles.sectionCopy}>
                        Argus is designed to help clinicians analyze retinal
                        images and provide decision-support information during
                        diabetic retinopathy screening.
                    </Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Text style={styles.infoIconText}>
                                A
                            </Text>
                        </View>

                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>
                                Clinical decision support
                            </Text>

                            <Text style={styles.infoText}>
                                Argus supports your clinical team. It does not
                                replace a clinician's examination, judgment, or
                                discussion with you.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* What to expect */}
                <View style={styles.section}>
                    <Text style={styles.sectionEyebrow}>
                        YOUR SCREENING JOURNEY
                    </Text>

                    <Text style={styles.sectionTitle}>
                        What to expect
                    </Text>

                    <View style={styles.stepsCard}>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>
                                    1
                                </Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>
                                    Your clinician captures an image
                                </Text>

                                <Text style={styles.stepText}>
                                    A retinal fundus image is selected or captured
                                    during your clinical visit.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepLine} />

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>
                                    2
                                </Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>
                                    Argus analyzes the image
                                </Text>

                                <Text style={styles.stepText}>
                                    Argus produces a screening output to support
                                    your clinician's review.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepLine} />

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>
                                    3
                                </Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>
                                    Your clinician reviews the result
                                </Text>

                                <Text style={styles.stepText}>
                                    Your clinician considers the screening output
                                    together with your examination and other
                                    relevant clinical information.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.stepLine} />

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>
                                    4
                                </Text>
                            </View>

                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>
                                    Your care team discusses the result
                                </Text>

                                <Text style={styles.stepText}>
                                    Your clinician remains responsible for explaining
                                    what the result means for your care.
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>

                {/* Important information */}
                <View style={styles.importantCard}>
                    <View style={styles.importantHeader}>
                        <View style={styles.importantIndicator} />

                        <Text style={styles.importantTitle}>
                            Important information
                        </Text>
                    </View>

                    <Text style={styles.importantText}>
                        Argus provides decision-support information only. It
                        is not a standalone diagnosis and should not replace
                        professional clinical judgment.
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
}