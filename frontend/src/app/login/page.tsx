"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";
import { Zap, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { toast.error("Fill in all fields"); return; }
    setLoading(true);
    try {
      await authService.login(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, var(--bg-900) 70%)" }}>

      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid-size opacity-100 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 page-enter">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl btn-glow flex items-center justify-center mx-auto mb-4">
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-medium">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="you@example.com"
                className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1.5 block font-medium">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleLogin} disabled={loading}
            className="btn-glow w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          No account?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
