import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  fetchMe,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  AuthPayload,
  User,
} from "../graphql/auth";

const ACCESS_TOKEN_KEY = "argus.accessToken";
const REFRESH_TOKEN_KEY = "argus.refreshToken";
const USER_KEY = "argus.user";

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthPayload>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<AuthPayload>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const storage = {
  get: async (key: string) =>
    Platform.OS === "web"
      ? window.localStorage.getItem(key)
      : SecureStore.getItemAsync(key),

  set: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  remove: async (key: string) => {
    if (Platform.OS === "web") {
      window.localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

async function saveSession(payload: AuthPayload) {
  if (!payload.user || !payload.accessToken || !payload.refreshToken) {
    throw new Error(payload.message || "Authentication failed.");
  }

  await storage.set(ACCESS_TOKEN_KEY, payload.accessToken);
  await storage.set(REFRESH_TOKEN_KEY, payload.refreshToken);
  await storage.set(USER_KEY, JSON.stringify(payload.user));
}

async function clearSession() {
  await Promise.all([
    storage.remove(ACCESS_TOKEN_KEY),
    storage.remove(REFRESH_TOKEN_KEY),
    storage.remove(USER_KEY),
  ]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const storedAccessToken = await storage.get(ACCESS_TOKEN_KEY);

        if (!storedAccessToken) return;

        const me = await fetchMe(storedAccessToken);

        if (mounted && me) {
          setAccessToken(storedAccessToken);
          setUser(me);
          await storage.set(USER_KEY, JSON.stringify(me));
        } else if (!me) {
          await clearSession();
        }
      } catch {
        await clearSession();

        if (mounted) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (username: string, password: string) => {
    const payload = await loginRequest(username, password);

    if (payload.success) {
      await saveSession(payload);
      setAccessToken(payload.accessToken);
      setUser(payload.user);
    }

    return payload;
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    const payload = await registerRequest(
      username,
      password,
      email,
    );

    if (payload.success) {
      await saveSession(payload);
      setAccessToken(payload.accessToken);
      setUser(payload.user);
    }

    return payload;
  };

  const logout = async () => {
    const refreshToken = await storage.get(REFRESH_TOKEN_KEY);

    try {
      if (refreshToken) {
        await logoutRequest(refreshToken);
      }
    } finally {
      await clearSession();
      setAccessToken(null);
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      login,
      register,
      logout,
    }),
    [user, accessToken, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}