"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, FileText, Map, MessageSquare, LogOut, Zap,
} from "lucide-react";
import { authService } from "@/services/authService";

const navItems = [
  { href: "/dashboard",    icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/career-match", icon: Briefcase,        label: "Career Match" },
  { href: "/resume",       icon: FileText,         label: "Resume"       },
  { href: "/roadmap",      icon: Map,              label: "Roadmap"      },
  { href: "/mentor",       icon: MessageSquare,    label: "AI Mentor"    },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-50"
      style={{ background: "rgba(11,11,18,0.97)", borderRight: "1px solid rgba(99,102,241,0.1)" }}>

      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg btn-glow flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-display font-700 text-lg gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
          CareerAI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}>
              <Icon size={18} className={active ? "text-indigo-400" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button onClick={() => authService.logout()}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
