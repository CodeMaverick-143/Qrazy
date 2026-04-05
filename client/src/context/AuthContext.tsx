import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { DbUser } from "../types";
import { useContext } from "react";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  dbUser: DbUser | null;
  signOut: () => Promise<void>;
  loading: boolean;
  connectionError: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  const syncWithBackend = async (currentSession: Session) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentSession.access_token}`,
        },
        body: JSON.stringify({ token: currentSession.access_token }),
      });

      if (response.ok) {
        const data = await response.json();
        setDbUser(data.user);
      }
    } catch (error) {
      console.error("Error syncing with backend:", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session) await syncWithBackend(session);
        setConnectionError(false);
      } catch (error: any) {
        if (error?.message?.includes("Failed to fetch") || error?.name === "TypeError") {
          setConnectionError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        setSession(session);
        setUser(session?.user ?? null);
        if (session) {
          await syncWithBackend(session);
        } else {
          setDbUser(null);
        }
        setConnectionError(false);
      } catch (error: any) {
        if (error?.message?.includes("Failed to fetch") || error?.name === "TypeError") {
          setConnectionError(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, dbUser, loading, connectionError, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
