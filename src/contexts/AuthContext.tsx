import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean; // ✅ added
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

useEffect(() => {
  // 1. Get the current user on page load
  supabase.auth.getUser().then(({ data }) => setUser(data.user));

  // 2. Listen for auth state changes (login/logout)
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);


  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
  };




  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
  <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
    {children}
  </AuthContext.Provider>

  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
