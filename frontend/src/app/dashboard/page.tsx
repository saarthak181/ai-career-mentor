"use client";
import { useEffect, useState } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import ScoreRing from "@/components/ScoreRing";
import { resumeService } from "@/services/resumeService";
import { authService } from "@/services/authService";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Briefcase, FileText, Map, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/career-match", icon: Briefcase,     label: "Career Match",     desc: "Find roles that fit your skills"  },
  { href: "/resume",       icon: FileText,       label: "Resume Analyzer",  desc: "Upload & score your resume"       },
  { href: "/roadmap",      icon: Map,            label: "Learning Roadmap", desc: "Your skill-building plan"         },
  { href: "/mentor",       icon: MessageSquare,  label: "AI Mentor",        desc: "Ask anything, anytime"            },
];

export default function DashboardPage() {
  const user = authService.getUser();
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resumeService.getLatest().then((d) => { setResumeData(d); setLoading(false); });
  }, []);

  const skills = resumeData?.skills ?? [];
  const radarData = skills.slice(0, 6).map((s: string) => ({
    skill: s.length > 10 ? s.slice(0, 10) : s,
    value: Math.floor(50 + Math.random() * 50),
  }));

  return (
    <ProtectedLayout>
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-500 text-sm mb-1">Good to see you,</p>
        <h1 className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Syne', sans-serif" }}>
          {user?.name ?? "Student"} 👋
        </h1>
      </div>

      {/* Score cards */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-indigo-400" />
          <h2 className="font-semibold text-slate-200">Resume Analysis</h2>
          {!resumeData && !loading && (
            <Link href="/resume" className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Upload resume <ArrowRight size={12} />
            </Link>
          )}
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-24 text-slate-500 text-sm">Loading...</div>
        ) : !resumeData ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm mb-3">No resume uploaded yet</p>
            <Link href="/resume" className="btn-glow inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium">
              Upload your resume <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 items-start">
            <div className="flex gap-8">
              <ScoreRing score={resumeData.resume_score ?? 0} label="Resume Score" color="#6366f1" />
              <ScoreRing score={resumeData.ats_score ?? 0} label="ATS Score" color="#10b981" />
            </div>
            {radarData.length > 0 && (
              <div className="flex-1 min-w-[220px] h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(99,102,241,0.15)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Radar dataKey="value" stroke="#6366f1" fill="rgba(99,102,241,0.2)" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="glass rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-slate-200 mb-3 text-sm">Detected Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: string) => (
              <span key={s} className="skill-pill px-3 py-1 rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 stagger">
        {quickLinks.map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href} className="glass glass-hover rounded-2xl p-5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-3 group-hover:bg-indigo-500/25 transition-colors">
              <Icon size={18} className="text-indigo-400" />
            </div>
            <h3 className="font-semibold text-slate-200 text-sm mb-0.5">{label}</h3>
            <p className="text-slate-500 text-xs">{desc}</p>
          </Link>
        ))}
      </div>
    </ProtectedLayout>
  );
}
