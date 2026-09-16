import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

import Logo from "../components/Logo";
import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";
import { colors, radii, spacing } from "../theme/tokens";

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
      setError("Username and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
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
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.shell}>
        {/* TOP BRAND */}
        <View style={styles.topBar}>
          <Logo />

          <View style={styles.secureStatus}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              SECURE REGISTRATION
            </Text>
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              PATIENT ACCESS
            </Text>

            <Text style={styles.title}>
              Create your Argus account
            </Text>

            <Text style={styles.subtitle}>
              Create a patient account to access the Argus screening
              experience.
            </Text>
          </View>

          {/* ACCOUNT TYPE */}
          <View style={styles.accountType}>
            <View style={styles.accountTypeIcon}>
              <Text style={styles.accountTypeIconText}>
                P
              </Text>
            </View>

            <View style={styles.accountTypeText}>
              <Text style={styles.accountTypeTitle}>
                Patient account
              </Text>

              <Text style={styles.accountTypeDescription}>
                Patient accounts are intended for accessing information
                associated with your clinical screening workflow.
              </Text>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.formRow}>
              <View style={styles.field}>
                <Text style={styles.label}>
                  USERNAME
                </Text>

                <TextInput
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    if (error) setError(null);
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  placeholder="Choose a username"
                  placeholderTextColor={colors.textSecondary}
                  editable={!busy}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>
                  EMAIL
                </Text>

                <TextInput
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (error) setError(null);
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.textSecondary}
                  editable={!busy}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.field}>
                <Text style={styles.label}>
                  PASSWORD
                </Text>

                <TextInput
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    if (error) setError(null);
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor={colors.textSecondary}
                  editable={!busy}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>
                  CONFIRM PASSWORD
                </Text>

                <TextInput
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    if (error) setError(null);
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  placeholder="Repeat your password"
                  placeholderTextColor={colors.textSecondary}
                  editable={!busy}
                  onSubmitEditing={submit}
                />
              </View>
            </View>

            {error && (
              <View style={styles.error}>
                <View style={styles.errorIndicator} />

                <View style={styles.errorContent}>
                  <Text style={styles.errorTitle}>
                    Account creation unsuccessful
                  </Text>

                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <AppButton
                title={busy ? "Creating account…" : "Create account"}
                onPress={submit}
                disabled={busy}
              />
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footerArea}>
            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={({ pressed }) => [
                styles.loginAction,
                pressed && styles.loginActionPressed,
              ]}
            >
              <Text style={styles.footerText}>
                Already have an account?
              </Text>

              <Text style={styles.link}>
                Sign in
              </Text>
            </Pressable>

            <Text style={styles.disclaimer}>
              Argus provides clinical decision-support information.
              Screening outputs should be reviewed by a qualified
              clinician and are not a standalone diagnosis.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    minHeight: "100%",
    backgroundColor: colors.background,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 32,
  },

  shell: {
    width: "100%",
    maxWidth: 980,
  },

  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  secureStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },

  statusText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },

  header: {
    maxWidth: 700,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },

  eyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginBottom: spacing.xs,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    maxWidth: 650,
  },

  accountType: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
  },

  accountTypeIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  accountTypeIconText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  accountTypeText: {
    flex: 1,
    gap: 3,
  },

  accountTypeTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },

  accountTypeDescription: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    maxWidth: 720,
  },

  form: {
    gap: spacing.md,
  },

  formRow: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.md,
  },

  field: {
    flex: 1,
    gap: spacing.xs,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.9,
  },

  input: {
    width: "100%",
    height: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    color: colors.textPrimary,
    fontSize: 14,
    outlineStyle: "none" as any,
  },

  error: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radii.md,
    overflow: "hidden",
  },

  errorIndicator: {
    width: 4,
    backgroundColor: colors.error,
  },

  errorContent: {
    flex: 1,
    padding: spacing.md,
    gap: 3,
  },

  errorTitle: {
    color: colors.error,
    fontSize: 12,
    fontWeight: "700",
  },

  errorText: {
    color: colors.error,
    fontSize: 12,
    lineHeight: 18,
  },

  buttonContainer: {
    marginTop: spacing.xs,
    maxWidth: 360,
  },

  footerArea: {
    marginTop: spacing.xl,
    alignItems: "center",
    gap: spacing.lg,
  },

  loginAction: {
    minHeight: 44,
    minWidth: 240,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },

  loginActionPressed: {
    backgroundColor: colors.primaryDark,
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  disclaimer: {
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    maxWidth: 650,
    opacity: 0.75,
  },
});