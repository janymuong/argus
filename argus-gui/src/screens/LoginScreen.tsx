import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/tokens";
import { loginStyles as styles } from "./LoginScreen.styles";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    if (!username.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }
    setBusy(true);
    try {
      const result = await login(username.trim(), password);
      if (!result.success) setError(result.message);
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.brand}>
            <Logo width={172} height={50} />
            <Text style={styles.brandCaption}>CLINICAL SCREENING PLATFORM</Text>
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue to your Argus workspace.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>USERNAME</Text>
              <TextInput
                value={username}
                onChangeText={(value) => { setUsername(value); if (error) setError(null); }}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                textContentType="username"
                returnKeyType="next"
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor={colors.textSecondary}
                editable={!busy}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={(value) => { setPassword(value); if (error) setError(null); }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="done"
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                editable={!busy}
                onSubmitEditing={submit}
              />
            </View>

            {error && <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View>}

            <AppButton title={busy ? "Signing in…" : "Sign in"} onPress={submit} disabled={busy} />
          </View>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>New to Argus?</Text>
            <Pressable onPress={() => navigation.navigate("Register")} hitSlop={8}>
              <Text style={styles.registerLink}>Create a patient account</Text>
            </Pressable>
          </View>

          <Text style={styles.disclaimer}>
            Argus is a clinical decision-support system. AI-generated outputs must be reviewed by a qualified clinician.
          </Text>
        </View>
        <Text style={styles.footer}>SECURE CLINICAL ACCESS</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
