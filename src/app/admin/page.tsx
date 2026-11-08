"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminLogin from "@/components/admin/admin-login";
import AdminDashboard from "@/components/admin/admin-dashboard";

interface UserProfile {
  id: string;
  email?: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 size={36} className="animate-spin text-red-500" />
        <p className="text-sm font-mono tracking-wider uppercase text-zinc-500">
          Checking admin session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={(u) => setUser(u)} />;
  }

  return <AdminDashboard user={user} onLogout={() => setUser(null)} />;
}
