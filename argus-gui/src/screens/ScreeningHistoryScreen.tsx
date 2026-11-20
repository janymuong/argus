import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import {
    fetchScreeningHistory,
    ScreeningHistoryRecord,
    submitClinicalReview,
} from "../graphql/history";
import { colors } from "../theme/tokens";
import { styles } from "./ScreeningHistoryScreen.styles";

function formatDate(value: string | null) {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "Date unavailable"
        : date.toLocaleString();
}

function percentage(value: number) {
    return `${(value * 100).toFixed(1)}%`;
}

export default function ScreeningHistoryScreen() {
    const { user, accessToken } = useAuth();

    const [records, setRecords] = useState<ScreeningHistoryRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
    const [assessment, setAssessment] = useState("");
    const [followUpRequired, setFollowUpRequired] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [reviewMessage, setReviewMessage] = useState("");

    const isPatient = user?.role === "PATIENT";
    const isClinician = user?.role === "CLINICIAN";

    const loadHistory = useCallback(async () => {
        if (!accessToken) {
            setError("Please sign in again to view screening history.");
            setLoading(false);
            return;
        }

        try {
            setError("");
            const data = await fetchScreeningHistory(accessToken);
            setRecords(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load screening history."
            );
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        void loadHistory();
    }, [loadHistory]);

    const refreshHistory = () => {
        setLoading(true);
        void loadHistory();
    };

    const toggleRecord = (record: ScreeningHistoryRecord) => {
        const opening = expandedRecord !== record.id;

        setExpandedRecord(opening ? record.id : null);
        setAssessment("");
        setFollowUpRequired(false);
        setReviewMessage("");
    };

    const handleReview = async (recordId: string) => {
        if (!accessToken) return;

        if (!assessment.trim()) {
            setReviewMessage("Please enter your clinical assessment.");
            return;
        }

        try {
            setSubmitting(true);
            setReviewMessage("");

            const result = await submitClinicalReview(
                accessToken,
                recordId,
                assessment,
                followUpRequired,
            );

            if (!result.success) {
                setReviewMessage(result.message);
                return;
            }

            setReviewMessage(result.message);
            setAssessment("");
            setFollowUpRequired(false);

            await loadHistory();
        } catch (err) {
            setReviewMessage(
                err instanceof Error
                    ? err.message
                    : "Unable to submit clinical review."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.eyebrow}>
                        {isPatient ? "MY HEALTH RECORDS" : "CLINICAL WORKSPACE"}
                    </Text>

                    <Text style={styles.title}>
                        Screening history
                    </Text>

                    <Text style={styles.subtitle}>
                        {isPatient
                            ? "Review your previous retinal screening results."
                            : "Review retinal screenings performed by you."}
                    </Text>
                </View>

                <Pressable
                    onPress={refreshHistory}
                    style={({ pressed }) => [
                        styles.refreshButton,
                        pressed && styles.refreshButtonPressed,
                    ]}
                >
                    <Text style={styles.refreshText}>↻ Refresh</Text>
                </Pressable>
            </View>

            {loading ? (
                <View style={styles.stateCard}>
                    <ActivityIndicator color={colors.primary} />
                    <Text style={styles.stateText}>
                        Loading screening records...
                    </Text>
                </View>
            ) : error ? (
                <View style={styles.stateCard}>
                    <Text style={styles.errorTitle}>
                        Unable to load history
                    </Text>
                    <Text style={styles.stateText}>{error}</Text>
                    <Pressable onPress={refreshHistory}>
                        <Text style={styles.retryText}>Try again</Text>
                    </Pressable>
                </View>
            ) : records.length === 0 ? (
                <View style={styles.stateCard}>
                    <Text style={styles.emptyIcon}>◷</Text>
                    <Text style={styles.emptyTitle}>
                        No screening records yet
                    </Text>
                    <Text style={styles.stateText}>
                        {isPatient
                            ? "Your screening results will appear here after a clinician screens you."
                            : "Screenings you perform will appear here."}
                    </Text>
                </View>
            ) : (
                <>
                    <View style={styles.summary}>
                        <View>
                            <Text style={styles.summaryValue}>
                                {records.length}
                            </Text>
                            <Text style={styles.summaryLabel}>
                                TOTAL SCREENINGS
                            </Text>
                        </View>
                        <Text style={styles.summaryHint}>
                            Most recent first
                        </Text>
                    </View>

                    {records.map((record) => {
                        const expanded = expandedRecord === record.id;

                        return (
                            <View key={record.id} style={styles.recordCard}>
                                <View style={styles.recordTop}>
                                    <View style={styles.recordIdentity}>
                                        <Text style={styles.recordLabel}>
                                            SCREENING #{record.id}
                                        </Text>
                                        <Text style={styles.recordDate}>
                                            {formatDate(record.createdAt)}
                                        </Text>
                                    </View>

                                    <View style={styles.confidenceBadge}>
                                        <Text style={styles.confidenceText}>
                                            {percentage(record.confidence)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.resultSection}>
                                    <Text style={styles.resultLabel}>
                                        PREDICTED CLASS
                                    </Text>
                                    <Text style={styles.resultValue}>
                                        {record.predictedClass}
                                    </Text>
                                </View>

                                <View style={styles.participants}>
                                    <View style={styles.participant}>
                                        <Text style={styles.participantLabel}>
                                            {isPatient ? "CLINICIAN" : "PATIENT"}
                                        </Text>
                                        <Text style={styles.participantValue}>
                                            {isPatient
                                                ? record.clinicianUsername
                                                : record.patientUsername}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.reviewStatus}>
                                    <Text style={styles.reviewStatusLabel}>
                                        CLINICAL REVIEW
                                    </Text>
                                    <Text
                                        style={[
                                            styles.reviewStatusValue,
                                            record.isReviewed
                                                ? styles.reviewedText
                                                : styles.pendingText,
                                        ]}
                                    >
                                        {record.isReviewed
                                            ? "Reviewed"
                                            : "Awaiting clinician review"}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => toggleRecord(record)}
                                    style={styles.detailsButton}
                                >
                                    <Text style={styles.detailsButtonText}>
                                        {expanded ? "Hide details" : "View details"}
                                    </Text>
                                    <Text style={styles.detailsArrow}>
                                        {expanded ? "−" : "+"}
                                    </Text>
                                </Pressable>

                                {expanded && (
                                    <>
                                        <View style={styles.probabilities}>
                                            <Text style={styles.resultLabel}>
                                                MODEL PROBABILITIES
                                            </Text>

                                            {record.allProbabilities.map((item) => (
                                                <View
                                                    key={item.label}
                                                    style={styles.probabilityRow}
                                                >
                                                    <Text style={styles.probabilityLabel}>
                                                        {item.label}
                                                    </Text>
                                                    <Text style={styles.probabilityValue}>
                                                        {percentage(item.probability)}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>

                                        {record.isReviewed ? (
                                            <View style={styles.reviewPanel}>
                                                <Text style={styles.reviewPanelTitle}>
                                                    CLINICAL ASSESSMENT
                                                </Text>
                                                <Text style={styles.assessmentText}>
                                                    {record.clinicalAssessment}
                                                </Text>

                                                <Text style={styles.reviewMeta}>
                                                    Reviewed by {record.reviewedByUsername || record.clinicianUsername}
                                                </Text>
                                                <Text style={styles.reviewMeta}>
                                                    {formatDate(record.reviewedAt)}
                                                </Text>

                                                <Text style={styles.followUpText}>
                                                    Follow-up: {record.followUpRequired ? "Required" : "Not indicated"}
                                                </Text>
                                            </View>
                                        ) : isClinician ? (
                                            <View style={styles.reviewPanel}>
                                                <Text style={styles.reviewPanelTitle}>
                                                    CLINICAL REVIEW
                                                </Text>

                                                <Text style={styles.inputLabel}>
                                                    Clinical assessment
                                                </Text>

                                                <TextInput
                                                    value={assessment}
                                                    onChangeText={setAssessment}
                                                    placeholder="Enter your clinical assessment..."
                                                    placeholderTextColor={colors.textSecondary}
                                                    multiline
                                                    textAlignVertical="top"
                                                    style={styles.assessmentInput}
                                                />

                                                <Pressable
                                                    onPress={() =>
                                                        setFollowUpRequired(!followUpRequired)
                                                    }
                                                    style={styles.followUpToggle}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkbox,
                                                            followUpRequired && styles.checkboxSelected,
                                                        ]}
                                                    >
                                                        {followUpRequired && (
                                                            <Text style={styles.checkboxTick}>✓</Text>
                                                        )}
                                                    </View>
                                                    <Text style={styles.followUpLabel}>
                                                        Follow-up required
                                                    </Text>
                                                </Pressable>

                                                {!!reviewMessage && (
                                                    <Text style={styles.reviewMessage}>
                                                        {reviewMessage}
                                                    </Text>
                                                )}

                                                <Pressable
                                                    onPress={() => void handleReview(record.id)}
                                                    disabled={submitting}
                                                    style={[
                                                        styles.submitReviewButton,
                                                        submitting && styles.disabledButton,
                                                    ]}
                                                >
                                                    <Text style={styles.submitReviewText}>
                                                        {submitting
                                                            ? "Saving review..."
                                                            : "Submit clinical review"}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        ) : (
                                            <View style={styles.reviewPanel}>
                                                <Text style={styles.reviewMeta}>
                                                    The clinician's review has not yet been completed.
                                                </Text>
                                            </View>
                                        )}
                                    </>
                                )}
                            </View>
                        );
                    })}
                </>
            )}

            <Text style={styles.disclaimer}>
                Argus predictions are clinical decision-support information
                and should be interpreted by a qualified clinician.
            </Text>
        </ScrollView>
    );
}
