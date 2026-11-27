import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { fetchPatients, PatientOption } from "../graphql/predict";
import { fetchPatientProfile, PatientProfile } from "../graphql/patients";
import { ScreeningHistoryRecord } from "../graphql/history";
import { colors, radii, spacing } from "../theme/tokens";
import { styles } from "./PatientsScreen.styles";


function initials(username: string) {
  return username.split(/[._-]/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("") || "P";
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
function pct(value: number) { return `${(value * 100).toFixed(1)}%`; }
function resultLabel(value: string) { return value.replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }

function ScreeningRow({ record }: { record: ScreeningHistoryRecord }) {
  const attention = record.followUpRequired;
  return (
    <View style={styles.screeningRow}>
      <View style={styles.rowDate}><Text style={styles.dateText}>{formatDate(record.createdAt)}</Text></View>
      <View style={styles.rowResult}>
        <Text style={styles.resultText}>{resultLabel(record.predictedClass)}</Text>
        <Text style={styles.confidenceText}>{pct(record.confidence)} confidence</Text>
      </View>
      <View style={[styles.followUpBadge, attention ? styles.followUpNeeded : styles.followUpNone]}>
        <Text style={[styles.followUpText, attention ? styles.followUpTextNeeded : styles.followUpTextNone]}>{attention ? "Follow-up" : "No follow-up"}</Text>
      </View>
      <View style={styles.reviewIndicator}><Text style={styles.reviewText}>{record.isReviewed ? "Reviewed" : "Pending review"}</Text></View>
    </View>
  );
}


export default function PatientsScreen() {
  const { accessToken } = useAuth();
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PatientOption | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");

  const loadPatients = useCallback(async () => {
    if (!accessToken) { setError("Please sign in again to access patients."); setLoading(false); return; }
    try {
      setError("");
      const data = await fetchPatients(accessToken, search);
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load patients.");
    } finally { setLoading(false); }
  }, [accessToken, search]);

  useEffect(() => { setLoading(true); const timer = setTimeout(() => void loadPatients(), search.trim() ? 250 : 0); return () => clearTimeout(timer); }, [loadPatients]);

  const openPatient = async (patient: PatientOption) => {
    setSelected(patient); setProfile(null); setProfileError("");
    if (!accessToken) return;
    setProfileLoading(true);
    try { const result = await fetchPatientProfile(accessToken, patient.id); setProfile(result); }
    catch (err) { setProfileError(err instanceof Error ? err.message : "Unable to load patient profile."); }
    finally { setProfileLoading(false); }
  };

  const records = profile?.screeningRecords ?? [];
  const followUps = useMemo(() => records.filter(r => r.followUpRequired).length, [records]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>CLINICAL WORKSPACE</Text>
          <Text style={styles.title}>Patients</Text>
          <Text style={styles.subtitle}>Browse patient accounts and review your screening history for each patient.</Text>
        </View>
        <Pressable onPress={() => { setLoading(true); void loadPatients(); }} style={({ pressed }) => [styles.refreshButton, pressed && styles.refreshPressed]}>
          <Text style={styles.refreshLabel}>↻ Refresh</Text>
        </Pressable>
      </View>


      <View style={styles.workspace}>
        <View style={styles.directoryPanel}>
          <View style={styles.directoryHeader}>
            <Text style={styles.directoryTitle}>Patient directory</Text>
            <Text style={styles.directoryCount}>{patients.length}{search.trim() ? " results" : " patients"}</Text>
          </View>
          <View style={styles.searchBox}>
            <Text style={styles.searchGlyph}>⌕</Text>
            <TextInput value={search} onChangeText={setSearch} placeholder="Search name or email" placeholderTextColor={colors.textSecondary} style={styles.searchInput} autoCapitalize="none" autoCorrect={false} />
            {search.length > 0 && <Pressable onPress={() => setSearch("")} hitSlop={8}><Text style={styles.clearSearch}>×</Text></Pressable>}
          </View>
          {loading ? (
            <View style={styles.directoryState}><ActivityIndicator color={colors.primary} /><Text style={styles.stateText}>Loading patient directory…</Text></View>
          ) : error ? (
            <View style={styles.directoryState}><Text style={styles.errorTitle}>Directory unavailable</Text><Text style={styles.stateText}>{error}</Text><Pressable onPress={() => { setLoading(true); void loadPatients(); }}><Text style={styles.retryText}>Try again</Text></Pressable></View>
          ) : patients.length === 0 ? (
            <View style={styles.directoryState}><Text style={styles.emptyGlyph}>♙</Text><Text style={styles.emptyTitle}>{search.trim() ? "No matching patients" : "No patient accounts"}</Text><Text style={styles.stateText}>{search.trim() ? "Try a different username or email." : "Active patient accounts will appear here."}</Text></View>
          ) : (
            <View style={styles.patientList}>
              {patients.map(patient => {
                const active = selected?.id === patient.id;
                return <Pressable key={patient.id} onPress={() => void openPatient(patient)} style={({ pressed }) => [styles.patientItem, active && styles.patientItemActive, pressed && styles.patientItemPressed]}>
                  <View style={[styles.patientAvatar, active && styles.patientAvatarActive]}><Text style={styles.avatarText}>{initials(patient.username)}</Text></View>
                  <View style={styles.patientItemCopy}><Text style={[styles.patientName, active && styles.patientNameActive]} numberOfLines={1}>{patient.username}</Text><Text style={styles.patientEmail} numberOfLines={1}>{patient.email || "No email listed"}</Text></View>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>;
              })}
            </View>
          )}
        </View>

        <View style={styles.profilePanel}>
          {!selected ? (
            <View style={styles.profileEmpty}>
              <View style={styles.emptyIconCircle}><Text style={styles.emptyIcon}>♙</Text></View>
              <Text style={styles.emptyTitle}>Select a patient</Text>
              <Text style={styles.stateText}>Choose a patient from the directory to see their profile and screenings performed by you.</Text>
            </View>
          ) : profileLoading ? (
            <View style={styles.profileEmpty}><ActivityIndicator color={colors.primary} /><Text style={styles.stateText}>Loading patient profile…</Text></View>
          ) : profileError ? (
            <View style={styles.profileEmpty}><Text style={styles.errorTitle}>Profile unavailable</Text><Text style={styles.stateText}>{profileError}</Text><Pressable onPress={() => void openPatient(selected)}><Text style={styles.retryText}>Retry</Text></Pressable></View>
          ) : !profile ? (
            <View style={styles.profileEmpty}><Text style={styles.emptyTitle}>Patient not found</Text><Text style={styles.stateText}>This patient profile may no longer be available.</Text></View>
          ) : (
            <View style={styles.profileContent}>
              <View style={styles.profileTop}>
                <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>{initials(profile.username)}</Text></View>
                <View style={styles.profileIdentity}><Text style={styles.profileEyebrow}>PATIENT PROFILE</Text><Text style={styles.profileName}>{profile.username}</Text><Text style={styles.profileEmail}>{profile.email || "No email listed"}</Text></View>
              </View>
              <View style={styles.metricsRow}>
                <View style={styles.metricCard}><Text style={styles.metricValue}>{records.length}</Text><Text style={styles.metricLabel}>YOUR SCREENINGS</Text></View>
                <View style={styles.metricCard}><Text style={[styles.metricValue, followUps > 0 && styles.metricValueAlert]}>{followUps}</Text><Text style={styles.metricLabel}>FOLLOW-UP FLAGS</Text></View>
              </View>
              <View style={styles.screeningSection}>
                <View style={styles.screeningHeader}><Text style={styles.sectionTitle}>Screening history</Text><Text style={styles.sectionMeta}>Clinician-specific</Text></View>
                {records.length === 0 ? (
                  <View style={styles.noRecords}><Text style={styles.noRecordsTitle}>No screenings yet</Text><Text style={styles.stateText}>Screenings you perform for this patient will be listed here.</Text></View>
                ) : (
                  <View>
                    <View style={styles.screeningTableHeader}><Text style={styles.tableHeaderDate}>DATE</Text><Text style={styles.tableHeaderResult}>RESULT</Text><Text style={styles.tableHeaderFollow}>STATUS</Text><Text style={styles.tableHeaderReview}>REVIEW</Text></View>
                    {records.map(record => <ScreeningRow key={record.id} record={record} />)}
                  </View>
                )}
              </View>
              <View style={styles.scopeNote}><Text style={styles.scopeNoteText}>Showing screening records performed by your clinician account only.</Text></View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
