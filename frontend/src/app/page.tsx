"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(authService.isLoggedIn() ? "/dashboard" : "/login");
  }, [router]);
  return null;
}
