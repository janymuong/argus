import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { authStyles as styles } from "./AuthScreens.styles";

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
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <View style={styles.logoRow}><Logo /></View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to access your Argus workspace.</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput value={username} onChangeText={setUsername} autoCapitalize="none" style={styles.input} placeholder="Username" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholder="Password" />
        </View>

        {error && <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View>}

        <AppButton title={busy ? "Signing in…" : "Sign in"} onPress={submit} disabled={busy} />
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.footer}>New to Argus? <Text style={styles.link}>Create an account</Text></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
