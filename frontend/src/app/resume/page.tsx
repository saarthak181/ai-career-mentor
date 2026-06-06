"use client";
import { useState, useRef } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import ScoreRing from "@/components/ScoreRing";
import { resumeService } from "@/services/resumeService";
import toast from "react-hot-toast";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";

interface ResumeResult {
  resume_score: number;
  ats_score: number;
  skills: string[];
  word_count: number;
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.name.endsWith(".pdf")) { toast.error("Only PDF files are supported"); return; }
    setFile(f);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) { toast.error("Choose a PDF first"); return; }
    setLoading(true);
    try {
      const data = await resumeService.upload(file);
      setResult(data);
      toast.success("Resume analysed!");
    } catch {
      toast.error("Upload failed — ensure the backend is running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Resume Analyser</h1>
        <p className="text-slate-500 text-sm">Upload your PDF resume to get your score and skill breakdown.</p>
      </div>

      {/* Drop zone */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            dragging ? "border-indigo-400 bg-indigo-500/10" : "border-white/10 hover:border-indigo-500/40 hover:bg-white/3"
          }`}>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <Upload size={32} className={`mx-auto mb-3 ${dragging ? "text-indigo-400" : "text-slate-600"}`} />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-indigo-300">
              <FileText size={16} />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          ) : (
            <>
              <p className="text-slate-400 text-sm mb-1">Drop your PDF here or click to browse</p>
              <p className="text-slate-600 text-xs">PDF files only</p>
            </>
          )}
        </div>
        <button onClick={handleUpload} disabled={loading || !file}
          className="btn-glow mt-4 px-6 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {loading ? "Analysing..." : "Analyse Resume"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 page-enter">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={18} className="text-emerald-400" />
              <h2 className="font-semibold text-slate-200">Analysis Complete</h2>
            </div>
            <div className="flex gap-10 flex-wrap">
              <ScoreRing score={result.resume_score} label="Resume Score" color="#6366f1" />
              <ScoreRing score={result.ats_score} label="ATS Score" color="#10b981" />
              <div className="flex flex-col justify-center">
                <p className="text-3xl font-bold text-slate-200 font-mono">{result.word_count}</p>
                <p className="text-xs text-slate-500 mt-0.5">words detected</p>
                <p className="text-3xl font-bold text-slate-200 font-mono mt-4">{result.skills.length}</p>
                <p className="text-xs text-slate-500 mt-0.5">skills found</p>
              </div>
            </div>
          </div>

          {result.skills.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Detected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s) => (
                  <span key={s} className="skill-pill px-3 py-1 rounded-full text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ProtectedLayout>
  );
}
