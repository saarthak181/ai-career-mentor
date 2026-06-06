"use client";
import { useState, useEffect, useRef } from "react";
import ProtectedLayout from "@/components/ProtectedLayout";
import { mentorService } from "@/services/mentorService";
import toast from "react-hot-toast";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";

interface Message { role: "user" | "bot"; content: string; }

const SUGGESTIONS = [
  "How do I become a data scientist?",
  "What's the best way to learn Python?",
  "How should I prepare for ML interviews?",
  "How do I improve my resume?",
];

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm your AI Career Mentor 🚀 Ask me anything about skills, learning paths, interview prep, or your career goals." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (question?: string) => {
    const q = (question || input).trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);
    try {
      const data = await mentorService.chat(q);
      setMessages((m) => [...m, { role: "bot", content: data.answer }]);
    } catch {
      toast.error("Failed to get a response");
      setMessages((m) => [...m, { role: "bot", content: "Sorry, I couldn't process that. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-100 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>AI Mentor</h1>
        <p className="text-slate-500 text-sm">Ask anything about your career, skills, or learning path.</p>
      </div>

      {/* Chat window */}
      <div className="glass rounded-2xl flex flex-col" style={{ height: "calc(100vh - 220px)", minHeight: 400 }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === "bot" ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-slate-700/50 border border-white/10"
              }`}>
                {msg.role === "bot" ? <Bot size={15} className="text-indigo-400" /> : <User size={15} className="text-slate-400" />}
              </div>
              <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-500/20 border border-indigo-500/25 text-slate-200"
                  : "bg-white/5 border border-white/8 text-slate-300"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Bot size={15} className="text-indigo-400" />
              </div>
              <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl">
                <Loader2 size={14} className="animate-spin text-slate-500" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/15 transition-all">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MessageSquare size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask a career question..."
                className="input-dark w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <button onClick={() => send()} disabled={loading || !input.trim()}
              className="btn-glow px-4 py-2.5 rounded-xl text-white flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium">
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
