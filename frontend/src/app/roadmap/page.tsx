"use client";
import { useState } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import SkillInput from "@/components/SkillInput";
import { recommendationService } from "@/services/recommendationService";
import toast from "react-hot-toast";
import { Map, Loader2, BookOpen, Code2, Award, CheckCircle2 } from "lucide-react";

interface PlanResult {
  target_role: string;
  missing_skills: string[];
  roadmap: { week: number; focus_skill: string; goal: string }[];
  courses: { skill: string; course: string; provider: string }[];
  projects: { skill: string; project: string; difficulty: string }[];
  certifications: { skill: string; certification: string }[];
}

const ROLES = [
  "Data Scientist","Machine Learning Engineer","Full Stack Developer",
  "Backend Developer","DevOps Engineer","Data Analyst","Frontend Developer",
  "Cloud Engineer","AI Engineer",
];

const diffColor: Record<string, string> = {
  Beginner: "#10b981", Intermediate: "#f59e0b", Advanced: "#ef4444",
};

export default function RoadmapPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [role, setRole] = useState("");
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!role) { toast.error("Select a target role"); return; }
    if (skills.length < 2) { toast.error("Add at least 2 skills"); return; }
    setLoading(true);
    try {
      const data = await recommendationService.getCareerPlan(skills, role);
      setPlan(data);
    } catch {
      toast.error("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Learning Roadmap</h1>
        <p className="text-slate-500 text-sm">Get a personalised plan: courses, projects, and certifications.</p>
      </div>

      <div className="glass rounded-2xl p-6 mb-6 space-y-4">
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Target Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="input-dark w-full px-4 py-2.5 rounded-xl text-sm">
            <option value="">Choose a role...</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Your Current Skills</label>
          <SkillInput skills={skills} onChange={setSkills} />
        </div>
        <button onClick={handleGenerate} disabled={loading}
          className="btn-glow px-6 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Map size={16} />}
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {plan && (
        <div className="space-y-5 page-enter">
          {/* Weekly roadmap */}
          {plan.roadmap.length > 0 ? (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-400" /> Week-by-Week Plan
              </h2>
              <div className="space-y-2">
                {plan.roadmap.map((w) => (
                  <div key={w.week} className="flex items-start gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/15 px-2 py-1 rounded-lg shrink-0">
                      Wk {w.week}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{w.focus_skill}</p>
                      <p className="text-xs text-slate-500">{w.goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-5 text-center text-slate-400 text-sm">
              🎉 You already have all skills for {plan.target_role}!
            </div>
          )}

          {/* Courses */}
          {plan.courses.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-sky-400" /> Recommended Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.courses.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                    <p className="text-sm font-medium text-slate-200">{c.course}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.provider} · <span className="text-sky-400">{c.skill}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {plan.projects.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Code2 size={16} className="text-purple-400" /> Project Ideas
              </h2>
              <div className="space-y-2">
                {plan.projects.map((p, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{p.project}</p>
                      <p className="text-xs text-slate-500 mt-0.5 text-purple-400">{p.skill}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full ml-4 shrink-0"
                      style={{ color: diffColor[p.difficulty] || "#94a3b8", background: `${diffColor[p.difficulty]}15` }}>
                      {p.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {plan.certifications.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h2 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Award size={16} className="text-amber-400" /> Certifications to Earn
              </h2>
              <div className="flex flex-wrap gap-2">
                {plan.certifications.map((c, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full border border-amber-500/20 text-amber-300 bg-amber-500/10">
                    {c.certification}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ProtectedLayout>
  );
}
