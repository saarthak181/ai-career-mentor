"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import Sidebar from "./Sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!authService.isLoggedIn()) router.push("/login");
  }, [router]);

  // Don't render anything until client-side mount
  // This prevents hydration mismatch from localStorage
  if (!mounted) return null;
  if (!authService.isLoggedIn()) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 ml-60 min-h-screen page-enter"
        style={{
          background: "radial-gradient(ellipse at 20% 0%, rgba(99,102,241,0.08) 0%, transparent 60%), var(--bg-900)",
        }}>
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}