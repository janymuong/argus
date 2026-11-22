
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import {
    fetchScreeningHistory,
    ScreeningHistoryRecord,
} from "../graphql/history";

import styles from "./PatientOverviewScreen.styles";

export default function PatientOverviewScreen() {
    const { user, accessToken } = useAuth();

    const [records, setRecords] = useState<ScreeningHistoryRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const username = user?.username || "Patient";

    useEffect(() => {
        let mounted = true;

        async function loadHistory() {
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const result = await fetchScreeningHistory(accessToken);

                if (mounted) {
                    setRecords(result);
                }
            } catch (err: any) {
                if (mounted) {
                    setError(err?.message || "Unable to load screening history.");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        void loadHistory();

        return () => {
            mounted = false;
        };
    }, [accessToken]);

    const latest = records.length > 0 ? records[0] : null;

    const formatDate = (value?: string | null) => {
        if (!value) return "—";

        const date = new Date(value);

        return Number.isNaN(date.getTime())
            ? value
            : date.toLocaleString();
    };

    const percent = (value: number) =>
        `${(value * 100).toFixed(1)}%`;

    const screeningSteps = [
        {
            number: "01",
            title: "Image captured",
            text: "Your clinician captures a retinal image during your visit.",
        },
        {
            number: "02",
            title: "Argus analyzes",
            text: "Argus analyzes the image and provides decision-support information to your clinician.",
        },
        {
            number: "03",
            title: "Clinician reviews",
            text: "Your clinician considers the result alongside your examination and other clinical information.",
        },
    ];

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
                        View your retinal screening results and clinical review
                        information shared by your care team.
                    </Text>
                </View>

                {/* Latest screening */}
                <View style={styles.screeningCard}>
                    <Text style={styles.cardEyebrow}>YOUR SCREENING</Text>

                    {loading ? (
                        <View style={styles.loadingState}>
                            <ActivityIndicator />
                            <Text style={styles.screeningCopy}>
                                Loading your screening information...
                            </Text>
                        </View>
                    ) : error ? (
                        <>
                            <Text style={styles.screeningTitle}>
                                Unable to load screening
                            </Text>
                            <Text style={styles.screeningCopy}>{error}</Text>
                        </>
                    ) : !latest ? (
                        <>
                            <Text style={styles.screeningTitle}>
                                No screening yet
                            </Text>

                            <Text style={styles.screeningCopy}>
                                Your clinician will complete your retinal screening
                                during your clinical visit. Once a result is
                                available, it will appear here.
                            </Text>

                            <View style={styles.screeningFooter}>
                                <View style={styles.footerDot} />
                                <Text style={styles.footerText}>
                                    Your clinical team will guide you through the next step.
                                </Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.screeningTitle}>
                                {latest.predictedClass}
                            </Text>

                            <Text style={styles.confidenceText}>
                                Model confidence: {percent(latest.confidence)}
                            </Text>

                            <Text style={styles.screeningCopy}>
                                Screening date: {formatDate(latest.createdAt)}
                            </Text>

                            <View style={styles.reviewPanel}>
                                <Text style={styles.cardEyebrow}>CLINICAL REVIEW</Text>

                                <Text
                                    style={[
                                        styles.reviewStatus,
                                        latest.isReviewed
                                            ? styles.reviewStatusDone
                                            : styles.reviewStatusPending,
                                    ]}
                                >
                                    {latest.isReviewed
                                        ? "Reviewed by your clinician"
                                        : "Awaiting clinician review"}
                                </Text>

                                {latest.isReviewed ? (
                                    <Text style={styles.assessmentText}>
                                        {latest.clinicalAssessment ||
                                            "Your clinician has completed the review."}
                                    </Text>
                                ) : (
                                    <Text style={styles.reviewDetail}>
                                        Your clinician's assessment will appear
                                        here once the review is complete.
                                    </Text>
                                )}

                                {latest.isReviewed && (
                                    <>
                                        <Text style={styles.reviewDetail}>
                                            Follow-up:{" "}
                                            {latest.followUpRequired
                                                ? "Recommended"
                                                : "Not indicated"}
                                        </Text>

                                        {latest.reviewedAt && (
                                            <Text style={styles.reviewDetail}>
                                                Review date: {formatDate(latest.reviewedAt)}
                                            </Text>
                                        )}
                                    </>
                                )}
                            </View>
                        </>
                    )}
                </View>

                {/* Screening process */}
                <View style={styles.section}>
                    <Text style={styles.eyebrow}>YOUR SCREENING</Text>

                    <Text style={styles.sectionTitle}>
                        What happens during screening
                    </Text>

                    <View style={styles.processCard}>
                        {screeningSteps.map((step, index) => (
                            <View key={step.number}>
                                <View style={styles.processStep}>
                                    <View style={styles.stepNumber}>
                                        <Text style={styles.stepNumberText}>
                                            {step.number}
                                        </Text>
                                    </View>

                                    <View style={styles.stepContent}>
                                        <Text style={styles.stepTitle}>
                                            {step.title}
                                        </Text>

                                        <Text style={styles.stepText}>
                                            {step.text}
                                        </Text>
                                    </View>
                                </View>

                                {index < screeningSteps.length - 1 && (
                                    <View style={styles.stepConnector} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* About Argus */}
                <View style={styles.section}>
                    <Text style={styles.eyebrow}>ABOUT ARGUS</Text>

                    <Text style={styles.sectionTitle}>
                        Supporting your care team
                    </Text>

                    <View style={styles.aboutCard}>
                        <View style={styles.aboutIcon}>
                            <Text style={styles.aboutIconText}>A</Text>
                        </View>

                        <View style={styles.aboutContent}>
                            <Text style={styles.aboutTitle}>
                                Clinical decision support
                            </Text>

                            <Text style={styles.aboutText}>
                                Argus helps clinicians analyze retinal images and
                                provides information to support their assessment.
                                Your clinician remains responsible for interpreting
                                the result and discussing it with you.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Disclaimer */}
                <View style={styles.disclaimer}>
                    <View style={styles.disclaimerIndicator} />

                    <Text style={styles.disclaimerText}>
                        Argus provides decision-support information only. It is
                        not a standalone diagnosis and does not replace
                        professional clinical judgment.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
