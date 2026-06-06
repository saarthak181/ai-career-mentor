"use client";
import { useState } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import SkillInput from "@/components/SkillInput";
import { careerService } from "@/services/careerService";
import toast from "react-hot-toast";
import { Briefcase, Loader2, TrendingUp, AlertCircle } from "lucide-react";

interface CareerMatch {
  role: string;
  match_percentage: number;
  matched_skills: string[];
  missing_skills: string[];
}

export default function CareerMatchPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [results, setResults] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (skills.length < 2) { toast.error("Add at least 2 skills"); return; }
    setLoading(true);
    try {
      const data = await careerService.matchCareers(skills);
      setResults(data);
    } catch {
      toast.error("Failed to match careers");
    } finally {
      setLoading(false);
    }
  };

  const getColor = (pct: number) =>
    pct >= 60 ? "#10b981" : pct >= 35 ? "#f59e0b" : "#ef4444";

  return (
    <ProtectedLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
          Career Match
        </h1>
        <p className="text-slate-500 text-sm">Enter your skills to discover the best-fit roles for you.</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Briefcase size={16} className="text-indigo-400" /> Your Skills
        </h2>
        <SkillInput skills={skills} onChange={setSkills} placeholder="e.g. python, react, sql..." />
        <button
          onClick={handleMatch} disabled={loading}
          className="btn-glow mt-4 px-6 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
          {loading ? "Matching..." : "Find My Careers"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-3 stagger">
          {results.map((match, i) => (
            <div key={i} className="glass glass-hover rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-100">{match.role}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {match.matched_skills.length} of {match.matched_skills.length + match.missing_skills.length} skills matched
                  </p>
                </div>
                <span className="text-lg font-bold font-mono" style={{ color: getColor(match.match_percentage) }}>
                  {match.match_percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-white/5 rounded-full mb-3 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${match.match_percentage}%`, background: getColor(match.match_percentage), boxShadow: `0 0 8px ${getColor(match.match_percentage)}` }} />
              </div>

              {match.missing_skills.length > 0 && (
                <div className="flex items-start gap-2 mt-2">
                  <AlertCircle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-500">Missing: </span>
                    <span className="text-xs text-amber-400">{match.missing_skills.join(", ")}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ProtectedLayout>
  );
}
