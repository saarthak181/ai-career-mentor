"use client";
import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface SkillInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export default function SkillInput({ skills, onChange, placeholder = "Add a skill..." }: SkillInputProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const val = input.trim().toLowerCase();
    if (val && !skills.includes(val)) {
      onChange([...skills, val]);
    }
    setInput("");
  };

  const remove = (skill: string) => onChange(skills.filter((s) => s !== skill));

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !input && skills.length) {
      onChange(skills.slice(0, -1));
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={placeholder}
          className="input-dark flex-1 px-4 py-2.5 rounded-xl text-sm"
        />
        <button onClick={add}
          className="btn-glow px-4 py-2.5 rounded-xl text-white text-sm font-medium flex items-center gap-1">
          <Plus size={16} /> Add
        </button>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill}
              className="skill-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium">
              {skill}
              <button onClick={() => remove(skill)} className="hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
