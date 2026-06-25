import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  runPrediction,
  PredictResponse,
  PredictionResult,
  PredictionError,
} from "../graphql/predict";

export default function HomeScreen() {
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
      const response = await runPrediction(imageUri);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Argus</Text>
      <Text style={styles.subtitle}>
        Diabetic retinopathy screening — educational demo, not a diagnosis.
      </Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      {/* Before an image is picked: show source choices.
          After an image is picked: show Analyze + a way back. */}
      {!imageUri ? (
        <>
          <View style={styles.buttonRow}>
            <Button title="Pick from Gallery" onPress={pickFromGallery} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Capture with Camera" onPress={captureFromCamera} />
          </View>
        </>
      ) : (
        <>
          <View style={styles.buttonRow}>
            <Button title="Analyze" onPress={analyze} disabled={loading} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Choose a Different Image" onPress={reset} />
          </View>
        </>
      )}

      {loading && <ActivityIndicator style={styles.spacer} />}

      {result && result.__typename === "PredictionResult" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>
            Predicted: {(result as PredictionResult).predictedClass}
          </Text>
          <Text>
            Confidence:{" "}
            {((result as PredictionResult).confidence * 100).toFixed(1)}%
          </Text>
          <Text style={styles.breakdownTitle}>Full breakdown:</Text>
          {(result as PredictionResult).allProbabilities.map((p) => (
            <Text key={p.label}>
              {p.label}: {(p.probability * 100).toFixed(1)}%
            </Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 64,
    gap: 12,
  },
  title: { fontSize: 32, fontWeight: "700" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 12 },
  preview: { width: 260, height: 260, borderRadius: 12, marginVertical: 12 },
  buttonRow: { marginVertical: 6 },
  spacer: { marginVertical: 16 },
  resultBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f4f8",
    width: "100%",
  },
  resultLabel: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  breakdownTitle: { marginTop: 10, fontWeight: "600" },
  errorBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fdecea",
    width: "100%",
  },
  errorText: { color: "#a33" },
});
