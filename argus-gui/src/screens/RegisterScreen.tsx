import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { authStyles as styles } from "./AuthScreens.styles";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);

    if (!username.trim() || !password) {
      return setError("Username and password are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setBusy(true);

    try {
      const result = await register(
        username.trim(),
        password,
        email.trim()
      );

      if (!result.success) {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err?.message ?? "Unable to create the account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <View style={styles.logoRow}>
          <Logo />
        </View>

        <Text style={styles.title}>Create your Argus account</Text>

        <Text style={styles.subtitle}>
          Create a patient account to access Argus.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Username"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="you@example.com"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Repeat password"
          />
        </View>

        {error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <AppButton
          title={busy ? "Creating account…" : "Create account"}
          onPress={submit}
          disabled={busy}
        />

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footer}>
            Already have an account?{" "}
            <Text style={styles.link}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}