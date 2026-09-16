import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { homeStyles as styles } from "./HomeScreen.styles";
import { useAuth } from "../context/AuthContext";
import {
  runPrediction,
  PredictResponse,
  PredictionResult,
  PredictionError,
} from "../graphql/predict";

export default function HomeScreen() {
  const { user, accessToken } = useAuth();

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [pulse]);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

    const permission = await ImagePicker.requestCameraPermissionsAsync();
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
    try {
      if (!accessToken) {
        setResult({ __typename: "PredictionError", message: "Your session has expired. Please sign in again." });
        return;
      }
      const response = await runPrediction(imageUri, accessToken);
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

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.shell}>
        <View style={styles.heroCard}>
          <View style={styles.logoRow}>
            <Logo />
          </View>
          {/* <Text style={styles.heroEyebrow}>Argus MCP:</Text>  */}
          <Text style={styles.heroTitle}>
            Retinal Screening:
          </Text>
          <Text style={styles.heroCopy}>
            Pick a fundus image, and argus predicts a DR severity grade for you.
          </Text>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Backend</Text>
              <Text style={styles.statValue}>GraphQL upload</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Protocol</Text>
              <Text style={styles.statValue}>MCP tool bridge</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Frontend</Text>
              <Text style={styles.statValue}>Expo mobile and web-ready</Text>
            </View>
          </View>
        </View>

        <View style={styles.workspaceCard}>
          <Text style={styles.sectionTitle}>Screening workspace</Text>

          <View style={styles.workspaceFrame}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.preview} />
            ) : (
              <View style={styles.emptyPreview}>
                <Text style={styles.emptyPreviewTitle}>No image selected</Text>
                <Text style={styles.emptyPreviewCopy}>
                  Pick a fundus photo to run Argus screening.
                </Text>
              </View>
            )}
          </View>

          {!imageUri ? (
            <View style={styles.actionStack}>
              <AppButton title="Choose from gallery" onPress={pickFromGallery} />
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
              <AppButton title="Run screening" onPress={analyze} disabled={loading} />
              <AppButton
                title="Choose a different image"
                variant="ghost"
                onPress={reset}
              />
            </View>
          )}

          {loading && <ActivityIndicator style={styles.loading} />}

          {result && result.__typename === "PredictionResult" && (
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>
                {(result as PredictionResult).predictedClass}
              </Text>
              <Text style={styles.resultConfidence}>
                Confidence {((result as PredictionResult).confidence * 100).toFixed(1)}%
              </Text>
              <Text style={styles.breakdownTitle}>Full breakdown</Text>
              {(result as PredictionResult).allProbabilities.map((p) => (
                <View key={p.label} style={styles.resultRow}>
                  <Text style={styles.resultName}>{p.label}</Text>
                  <Text style={styles.resultScore}>
                    {(p.probability * 100).toFixed(1)}%
                  </Text>
                </View>
              ))}
            </View>
          )}

          {result && result.__typename === "PredictionError" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {(result as PredictionError).message}
              </Text>
            </View>
          )}

          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              Argus is not a certified medical device. DO NOT use it to make real clinical decisions.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
