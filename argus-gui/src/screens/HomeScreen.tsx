import React, { useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { homeStyles as styles } from "./HomeScreen.styles";
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
      <View style={styles.logoRow}>
        <Logo />
      </View>
      <Text style={styles.subtitle}>
        Diabetic retinopathy screening
      </Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      {!imageUri ? (
        <>
          <View style={styles.buttonRow}>
            <AppButton title="Pick from gallery" onPress={pickFromGallery} />
          </View>
          <View style={styles.buttonRow}>
            <AppButton
              title="Capture with camera"
              variant="secondary"
              onPress={captureFromCamera}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.buttonRow}>
            <AppButton title="Analyze" onPress={analyze} disabled={loading} />
          </View>
          <View style={styles.buttonRow}>
            <AppButton
              title="Choose a different image"
              variant="ghost"
              onPress={reset}
            />
          </View>
        </>
      )}

      {loading && <ActivityIndicator style={styles.spacer} />}

      {result && result.__typename === "PredictionResult" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>
            {(result as PredictionResult).predictedClass}
          </Text>
          <Text>
            Confidence:{" "}
            {((result as PredictionResult).confidence * 100).toFixed(1)}%
          </Text>
          <Text style={styles.breakdownTitle}>Full breakdown</Text>
          {(result as PredictionResult).allProbabilities.map((p) => (
            <View key={p.label} style={styles.resultRow}>
              <Text>{p.label}</Text>
              <Text>{(p.probability * 100).toFixed(1)}%</Text>
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
          Argus is a personal learning project, not a certified medical
          device. DO NOT use it to make real clinical decisions.
        </Text>
      </View>
    </ScrollView>
  );
}
