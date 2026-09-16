import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Easing,
  Pressable,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppButton from "../components/AppButton";
import { screeningStyles as styles } from "./ScreeningScreen.styles";
import { useAuth } from "../context/AuthContext";

import {
  runPrediction,
  PredictResponse,
  PredictionResult,
  PredictionError,
} from "../graphql/predict";

type EyeSelection = "Left" | "Right" | "Both";

export default function ScreeningScreen() {
  const { user, accessToken } = useAuth();
  const { width } = useWindowDimensions();

  const isCompact = width < 900;

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState<EyeSelection>("Right");

  const sessionId = useMemo(() => {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    return `ARG-${suffix}`;
  }, []);

  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      pulse.stopAnimation();
      rotate.stopAnimation();

      pulse.setValue(0);
      rotate.setValue(0);

      return;
    }

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const rotateLoop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    pulseLoop.start();
    rotateLoop.start();

    return () => {
      pulseLoop.stop();
      rotateLoop.stop();
    };
  }, [loading, pulse, rotate]);

  const pickFromGallery = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access photos is required.");
      return;
    }

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!picked.canceled && picked.assets.length > 0) {
      setImageUri(picked.assets[0].uri);
      setResult(null);
    }
  };

  const captureFromCamera = async () => {
    if (Platform.OS === "web") {
      alert("Camera capture is not available in the browser yet.");
      return;
    }

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission is required.");
      return;
    }

    const captured = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!captured.canceled && captured.assets.length > 0) {
      setImageUri(captured.assets[0].uri);
      setResult(null);
    }
  };

  const reset = () => {
    setImageUri(null);
    setResult(null);
  };

  const analyze = async () => {
    if (!imageUri) return;

    setLoading(true);
    setResult(null);

    try {
      if (!accessToken) {
        setResult({
          __typename: "PredictionError",
          message: "Your session has expired. Please sign in again.",
        });
        return;
      }

      const response = await runPrediction(
        imageUri,
        accessToken
      );

      setResult(response);
    } catch (err: any) {
      setResult({
        __typename: "PredictionError",
        message: err?.message ?? "Request failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * PATIENT VIEW
   * ---------------------------------------------------------
   */

  if (user?.role !== "CLINICIAN") {
    const orbScale = pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.12],
    });

    const orbOpacity = pulse.interpolate({
      inputRange: [0, 1],
      outputRange: [0.65, 1],
    });

    return (
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.shell}>
          <View style={styles.patientCard}>
            <View style={styles.patientOrbArea}>
              <Animated.View
                style={[
                  styles.patientOrbGlow,
                  {
                    transform: [{ scale: orbScale }],
                    opacity: orbOpacity,
                  },
                ]}
              />

              <View style={styles.patientOrb}>
                <Text style={styles.patientOrbText}>A</Text>
              </View>
            </View>

            <Text style={styles.patientEyebrow}>
              ARGUS ASSISTANT
            </Text>

            <Text style={styles.patientTitle}>
              Your retinal screening starts with your clinician
            </Text>

            <Text style={styles.patientCopy}>
              Argus helps clinicians analyze retinal images and provides
              decision-support information that can support a professional
              eye examination.
            </Text>

            <View style={styles.patientInfoCard}>
              <Text style={styles.patientInfoTitle}>
                What happens next?
              </Text>

              <Text style={styles.patientInfoItem}>
                • Your clinician captures or selects a retinal image.
              </Text>

              <Text style={styles.patientInfoItem}>
                • Argus analyzes the image for diabetic retinopathy severity.
              </Text>

              <Text style={styles.patientInfoItem}>
                • Your clinician reviews the result and discusses it with you.
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
                Argus predictions are decision-support outputs and are not a
                substitute for professional clinical judgment.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  /*
   * ---------------------------------------------------------
   * CLINICIAN SCREENING VIEW
   * ---------------------------------------------------------
   */

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.shell}>
        {/* Clinical header */}
        <View style={styles.heroCard}>
          <View style={styles.heroStatusRow}>
            <View style={styles.heroHeading}>
              <Text style={styles.heroEyebrow}>
                RETINAL SCREENING
              </Text>

              <Text style={styles.heroTitle}>
                Retinal image assessment
              </Text>

              <Text style={styles.heroCopy}>
                Upload a fundus image to assess diabetic retinopathy
                severity using Argus decision-support analysis.
              </Text>
            </View>

            <View style={styles.readyBadge}>
              <View style={styles.readyDot} />

              <Text style={styles.readyText}>
                READY
              </Text>
            </View>
          </View>
        </View>

        {/* Screening workspace */}
        <View style={styles.workspaceCard}>
          <View style={styles.workspaceHeader}>
            <View style={styles.workspaceHeaderMain}>
              <Text style={styles.workspaceEyebrow}>
                SCREENING WORKSPACE
              </Text>

              <Text style={styles.sectionTitle}>
                Retinal image
              </Text>

              <Text style={styles.sectionDescription}>
                Select a retinal fundus image, review it, and submit it
                for screening.
              </Text>
            </View>

            <View style={styles.imageReadyBadge}>
              <View style={styles.imageReadyDot} />

              <Text style={styles.imageReadyText}>
                {imageUri ? "IMAGE READY" : "AWAITING IMAGE"}
              </Text>
            </View>
          </View>

          {/* Case information */}
          <View
            style={[
              styles.caseStrip,
              isCompact && styles.caseStripCompact,
            ]}
          >
            <View style={styles.caseItem}>
              <Text style={styles.caseLabel}>
                SESSION
              </Text>

              <Text style={styles.caseValue}>
                {sessionId}
              </Text>
            </View>

            <View style={styles.caseDivider} />

            <View style={styles.caseItem}>
              <Text style={styles.caseLabel}>
                STATUS
              </Text>

              <View style={styles.caseStatusRow}>
                <View
                  style={[
                    styles.caseStatusDot,
                    loading && styles.caseStatusDotBusy,
                  ]}
                />

                <Text style={styles.caseValue}>
                  {loading ? "Analyzing" : "Ready"}
                </Text>
              </View>
            </View>

            <View style={styles.caseDivider} />

            <View style={styles.caseItem}>
              <Text style={styles.caseLabel}>
                EYE
              </Text>

              <View style={styles.eyeSelector}>
                {(["Left", "Right", "Both"] as EyeSelection[]).map(
                  (option) => (
                    <Pressable
                      key={option}
                      onPress={() => setEye(option)}
                      style={({ pressed }) => [
                        styles.eyeOption,
                        eye === option && styles.eyeOptionActive,
                        pressed && styles.eyeOptionPressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.eyeOptionText,
                          eye === option &&
                          styles.eyeOptionTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>
            </View>
          </View>

          {/* Main workspace */}
          <View
            style={[
              styles.workspaceGrid,
              isCompact && styles.workspaceGridCompact,
            ]}
          >
            {/* Image column */}
            <View style={styles.imageColumn}>
              <View style={styles.imagePanelHeader}>
                <View>
                  <Text style={styles.imagePanelTitle}>
                    RETINAL IMAGE
                  </Text>

                  <Text style={styles.imagePanelMeta}>
                    {eye.toUpperCase()} EYE
                  </Text>
                </View>

                <View style={styles.imageMetaBadge}>
                  <Text style={styles.imageMetaBadgeText}>
                    {imageUri ? "SELECTED" : "EMPTY"}
                  </Text>
                </View>
              </View>

              <View style={styles.workspaceFrame}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.preview}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.emptyPreview}>
                    <View style={styles.emptyIcon}>
                      <Text style={styles.emptyIconText}>
                        +
                      </Text>
                    </View>

                    <Text style={styles.emptyPreviewTitle}>
                      No retinal image selected
                    </Text>

                    <Text style={styles.emptyPreviewCopy}>
                      Select a fundus image from the gallery
                      {Platform.OS !== "web"
                        ? " or capture one with the camera"
                        : ""}
                      .
                    </Text>

                    <Text style={styles.emptyPreviewHint}>
                      REVIEW THE IMAGE BEFORE SCREENING
                    </Text>
                  </View>
                )}
              </View>

              {/* Image actions */}
              {!imageUri ? (
                <View style={styles.actionStack}>
                  <AppButton
                    title="Select retinal image"
                    onPress={pickFromGallery}
                  />

                  {Platform.OS !== "web" && (
                    <AppButton
                      title="Capture with camera"
                      variant="secondary"
                      onPress={captureFromCamera}
                    />
                  )}
                </View>
              ) : (
                <View style={styles.actionStack}>
                  <AppButton
                    title="Run retinal screening"
                    onPress={analyze}
                    disabled={loading}
                  />

                  <AppButton
                    title="Choose a different image"
                    variant="ghost"
                    onPress={reset}
                    disabled={loading}
                  />
                </View>
              )}

              {loading && (
                <View style={styles.processingBar}>
                  <View style={styles.processingIndicator} />

                  <Text style={styles.processingText}>
                    Argus is processing the retinal image...
                  </Text>
                </View>
              )}

              <View style={styles.imageNote}>
                <View style={styles.imageNoteIndicator} />

                <Text style={styles.imageNoteText}>
                  Use a clear retinal fundus image with the relevant
                  anatomical structures visible for review.
                </Text>
              </View>
            </View>

            {/* Clinical context */}
            <View style={styles.clinicalPanel}>
              <Text style={styles.clinicalPanelEyebrow}>
                SCREENING CONTEXT
              </Text>

              <Text style={styles.clinicalPanelTitle}>
                Clinical context
              </Text>

              <View style={styles.infoList}>
                <View style={styles.infoItem}>
                  <View style={styles.infoMarker} />

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      EXAMINATION
                    </Text>

                    <Text style={styles.infoValue}>
                      Retinal fundus screening
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <View style={styles.infoMarker} />

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      EYE
                    </Text>

                    <Text style={styles.infoValue}>
                      {eye} eye
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <View
                    style={[
                      styles.infoMarker,
                      styles.infoMarkerSuccess,
                    ]}
                  />

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      ASSESSMENT
                    </Text>

                    <Text style={styles.infoValue}>
                      Diabetic retinopathy severity
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <View style={styles.infoMarker} />

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      IMAGE STATUS
                    </Text>

                    <Text style={styles.infoValue}>
                      {imageUri
                        ? "Image selected and ready for review"
                        : "Waiting for retinal image"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.panelDivider} />

              <View style={styles.workflowNote}>
                <Text style={styles.workflowNoteTitle}>
                  Workflow
                </Text>

                <Text style={styles.workflowNoteText}>
                  Select the appropriate eye, review the image, then run
                  screening. The output is intended to support clinician
                  review.
                </Text>
              </View>
            </View>
          </View>

          {/* AI analysis state */}
          {loading && (
            <View style={styles.analysisState}>
              <View style={styles.analysisOrbArea}>
                <Animated.View
                  style={[
                    styles.analysisOrbGlow,
                    {
                      transform: [
                        {
                          scale: pulse.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.15],
                          }),
                        },
                      ],
                      opacity: pulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.45, 0.9],
                      }),
                    },
                  ]}
                />

                <Animated.View
                  style={[
                    styles.analysisOrb,
                    {
                      transform: [
                        {
                          rotate: rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "360deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Text style={styles.analysisOrbText}>
                    A
                  </Text>
                </Animated.View>
              </View>

              <View style={styles.analysisTextBlock}>
                <Text style={styles.analysisEyebrow}>
                  ARGUS IS ANALYZING
                </Text>

                <Text style={styles.analysisTitle}>
                  Reviewing retinal image
                </Text>

                <Text style={styles.analysisStep}>
                  Argus is processing the image and preparing a
                  diabetic retinopathy screening assessment.
                </Text>
              </View>

              <View style={styles.analysisStages}>
                <View style={styles.analysisStage}>
                  <View style={styles.analysisStageDotActive} />

                  <Text style={styles.analysisStageTextActive}>
                    Image processing
                  </Text>
                </View>

                <View style={styles.analysisStageLine} />

                <View style={styles.analysisStage}>
                  <View style={styles.analysisStageDot} />

                  <Text style={styles.analysisStageText}>
                    Feature analysis
                  </Text>
                </View>

                <View style={styles.analysisStageLine} />

                <View style={styles.analysisStage}>
                  <View style={styles.analysisStageDot} />

                  <Text style={styles.analysisStageText}>
                    Result
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Screening result */}
          {result && result.__typename === "PredictionResult" && (
            <View style={styles.resultBox}>
              <View style={styles.resultTopRow}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultEyebrow}>
                    SCREENING RESULT
                  </Text>

                  <Text style={styles.resultLabel}>
                    {(result as PredictionResult).predictedClass}
                  </Text>
                </View>

                <View style={styles.resultStatusBadge}>
                  <View style={styles.resultStatusDot} />

                  <Text style={styles.resultStatusText}>
                    ANALYSIS COMPLETE
                  </Text>
                </View>
              </View>

              <View style={styles.resultSummaryRow}>
                <View style={styles.resultSummaryCard}>
                  <Text style={styles.resultSummaryLabel}>
                    SESSION
                  </Text>

                  <Text style={styles.resultSummaryValue}>
                    {sessionId}
                  </Text>
                </View>

                <View style={styles.resultSummaryCard}>
                  <Text style={styles.resultSummaryLabel}>
                    EYE
                  </Text>

                  <Text style={styles.resultSummaryValue}>
                    {eye}
                  </Text>
                </View>

                <View style={styles.resultSummaryCard}>
                  <Text style={styles.resultSummaryLabel}>
                    ASSESSMENT
                  </Text>

                  <Text style={styles.resultSummaryValue}>
                    Retinal screening
                  </Text>
                </View>
              </View>

              <View style={styles.resultConfidencePanel}>
                <View style={styles.confidenceHeader}>
                  <View>
                    <Text style={styles.resultConfidenceLabel}>
                      MODEL CONFIDENCE
                    </Text>

                    <Text style={styles.resultConfidenceSubtext}>
                      Confidence associated with the predicted screening
                      class.
                    </Text>
                  </View>

                  <Text style={styles.resultConfidence}>
                    {(
                      (result as PredictionResult).confidence * 100
                    ).toFixed(1)}
                    %
                  </Text>
                </View>

                <View style={styles.resultConfidenceTrack}>
                  <View
                    style={[
                      styles.resultConfidenceFill,
                      {
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            (result as PredictionResult).confidence * 100
                          )
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.resultDivider} />

              <View style={styles.distributionHeader}>
                <Text style={styles.breakdownTitle}>
                  Probability distribution
                </Text>

                <Text style={styles.distributionDescription}>
                  Distribution of model probabilities across the available
                  screening classes.
                </Text>
              </View>

              <View style={styles.distributionList}>
                {(result as PredictionResult).allProbabilities.map(
                  (p) => {
                    const probability = p.probability * 100;

                    const isPredicted =
                      p.label ===
                      (result as PredictionResult).predictedClass;

                    return (
                      <View
                        key={p.label}
                        style={[
                          styles.resultRow,
                          isPredicted && styles.resultRowActive,
                        ]}
                      >
                        <View style={styles.resultRowHeader}>
                          <View style={styles.resultNameContainer}>
                            {isPredicted && (
                              <View style={styles.predictedMarker} />
                            )}

                            <Text
                              style={[
                                styles.resultName,
                                isPredicted &&
                                styles.resultNameActive,
                              ]}
                            >
                              {p.label}
                            </Text>
                          </View>

                          <Text
                            style={[
                              styles.resultScore,
                              isPredicted &&
                              styles.resultScoreActive,
                            ]}
                          >
                            {probability.toFixed(1)}%
                          </Text>
                        </View>

                        <View style={styles.resultBarTrack}>
                          <View
                            style={[
                              styles.resultBarFill,
                              isPredicted &&
                              styles.resultBarFillActive,
                              {
                                width: `${Math.max(
                                  0,
                                  Math.min(100, probability)
                                )}%`,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    );
                  }
                )}
              </View>

              <View style={styles.interpretationBox}>
                <View style={styles.interpretationHeader}>
                  <View style={styles.interpretationIcon}>
                    <Text style={styles.interpretationIconText}>
                      A
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.interpretationTitle}>
                      Clinical review
                    </Text>

                    <Text style={styles.interpretationEyebrow}>
                      DECISION SUPPORT
                    </Text>
                  </View>
                </View>

                <Text style={styles.interpretationText}>
                  Review the retinal image together with the screening
                  output and relevant clinical information before making
                  any clinical decision.
                </Text>
              </View>

              <View style={styles.resultActions}>
                <View style={styles.resultActionPrimary}>
                  <AppButton
                    title="Screen another image"
                    onPress={reset}
                  />
                </View>

                <View style={styles.resultActionSecondary}>
                  <AppButton
                    title="Keep this result"
                    variant="secondary"
                    onPress={() => { }}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Error */}
          {result && result.__typename === "PredictionError" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>
                Screening could not be completed
              </Text>

              <Text style={styles.errorText}>
                {(result as PredictionError).message}
              </Text>

              <View style={styles.errorAction}>
                <AppButton
                  title="Try again"
                  onPress={analyze}
                  disabled={!imageUri || loading}
                />
              </View>
            </View>
          )}

          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              Argus provides decision-support information only. Results
              should be reviewed by a qualified clinician and should not be
              used as a standalone clinical diagnosis.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}