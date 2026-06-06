"use client";

interface ScoreRingProps {
  score: number;
  size?: number;
  label: string;
  color?: string;
}

export default function ScoreRing({
  score,
  size = 120,
  label,
  color = "#6366f1",
}: ScoreRingProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth={8}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={8}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono" style={{ color }}>
            {score}
          </span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}
