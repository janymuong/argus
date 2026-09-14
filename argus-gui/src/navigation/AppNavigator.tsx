import React from "react";
import { Pressable, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { colors, radii, spacing } from "../theme/tokens";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.textPrimary,
            headerShadowVisible: false,
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>{user.username}</Text>
                <View style={{ backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 4, borderWidth: 1, borderColor: colors.border }}>
                  <Text style={{ color: colors.primary, fontSize: 10, fontWeight: "800" }}>{user.role}</Text>
                </View>
              </View>
            ),
            headerRight: () => (
              <Pressable onPress={() => void logout()} style={{ paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: radii.md }}>
                <Text style={{ color: colors.accent, fontWeight: "700" }}>Sign out</Text>
              </Pressable>
            ),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Argus" }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
