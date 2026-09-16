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

      if (!result.success) {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign in.");
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
      <View style={styles.backgroundGlow} />

      <View style={styles.shell}>
        {/* BRAND PANEL */}
        <View style={styles.brandPanel}>
          <View style={styles.brandHeader}>
            <Logo />
          </View>

          <View style={styles.brandContent}>
            <Text style={styles.eyebrow}>
              CLINICAL SCREENING PLATFORM
            </Text>

            <Text style={styles.brandTitle}>
              AI-assisted retinal screening for clinical teams.
            </Text>

            <Text style={styles.brandCopy}>
              Argus provides decision-support information from retinal
              fundus photography to support professional clinical review.
            </Text>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>A</Text>
                </View>

                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>
                    Argus AI analysis
                  </Text>

                  <Text style={styles.featureDescription}>
                    Analyze retinal images through the clinician
                    screening workflow.
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>✓</Text>
                </View>

                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>
                    Clinical decision support
                  </Text>

                  <Text style={styles.featureDescription}>
                    Review model outputs alongside the retinal image
                    and clinical context.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.brandFooter}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              ARGUS SYSTEM READY
            </Text>
          </View>
        </View>

        {/* LOGIN PANEL */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardEyebrow}>
              SECURE ACCESS
            </Text>

            <Text style={styles.title}>
              Welcome back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to access your Argus clinical workspace.
            </Text>
          </View>

          <View style={styles.form}>
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
                placeholder="Enter your username"
                placeholderTextColor={colors.textSecondary}
                editable={!busy}
              />
            </View>

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
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                editable={!busy}
                onSubmitEditing={submit}
              />
            </View>

            {error && (
              <View style={styles.error}>
                <View style={styles.errorIndicator} />

                <View style={styles.errorContent}>
                  <Text style={styles.errorTitle}>
                    Sign-in unsuccessful
                  </Text>

                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <AppButton
                title={busy ? "Signing in…" : "Sign in"}
                onPress={submit}
                disabled={busy}
              />
            </View>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>
              OR
            </Text>

            <View style={styles.dividerLine} />
          </View>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={({ pressed }) => [
              styles.secondaryAction,
              pressed && styles.secondaryActionPressed,
            ]}
          >
            <Text style={styles.footer}>
              New to Argus?
            </Text>

            <Text style={styles.link}>
              Create a patient account
            </Text>
          </Pressable>

          <Text style={styles.disclaimer}>
            Argus is a clinical decision-support system. AI-generated
            outputs should be reviewed by a qualified clinician and are
            not a standalone diagnosis.
          </Text>
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
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
  },

  backgroundGlow: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: colors.primaryDark,
    opacity: 0.45,
    top: -180,
    left: -180,
  },

  shell: {
    width: "100%",
    maxWidth: 1080,
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.lg,
  },

  brandPanel: {
    flex: 1.1,
    minHeight: 620,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.xl,
    justifyContent: "space-between",
  },

  brandHeader: {
    alignItems: "flex-start",
  },

  brandContent: {
    maxWidth: 520,
    gap: spacing.md,
  },

  eyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  brandTitle: {
    color: colors.textOnPrimary,
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "700",
    maxWidth: 500,
  },

  brandCopy: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 500,
  },

  featureList: {
    marginTop: spacing.md,
    gap: spacing.lg,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },

  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: "rgba(42,157,166,0.14)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  featureIconText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  featureText: {
    flex: 1,
    gap: 3,
  },

  featureTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },

  featureDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 400,
  },

  brandFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },

  statusText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  card: {
    flex: 0.9,
    minHeight: 620,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.xl,
    justifyContent: "center",
  },

  cardHeader: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },

  cardEyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.3,
    marginBottom: spacing.xs,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 400,
  },

  form: {
    gap: spacing.md,
  },

  field: {
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
  },

  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  secondaryAction: {
    width: "100%",
    minHeight: 46,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  secondaryActionPressed: {
    backgroundColor: colors.primaryDark,
  },

  footer: {
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
    marginTop: spacing.lg,
    opacity: 0.75,
  },
});