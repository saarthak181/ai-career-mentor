"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";
import { Zap, User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) { toast.error("Fill in all fields"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await authService.register(name, email, password);
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, var(--bg-900) 70%)" }}>
      <div className="fixed inset-0 bg-grid-pattern bg-grid-size opacity-100 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10 page-enter">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl btn-glow flex items-center justify-center mx-auto mb-4">
            <Zap size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            Get started
          </h1>
          <p className="text-slate-500 text-sm">Create your free account</p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          {[
            { label: "Full name",  icon: User,  type: "text",     val: name,     set: setName,     ph: "Your name" },
            { label: "Email",      icon: Mail,  type: "email",    val: email,    set: setEmail,    ph: "you@example.com" },
            { label: "Password",   icon: Lock,  type: "password", val: password, set: setPassword, ph: "Min 6 characters" },
          ].map(({ label, icon: Icon, type, val, set, ph }) => (
            <div key={label}>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">{label}</label>
              <div className="relative">
                <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type={type} value={val}
                  onChange={(e) => set(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  placeholder={ph}
                  className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>
          ))}

          <button onClick={handleRegister} disabled={loading}
            className="btn-glow w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <><span>Create Account</span><ArrowRight size={16} /></>}
          </button>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
