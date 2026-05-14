"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.6s, fully remove after 2.1s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600);
    const removeTimer = setTimeout(() => setVisible(false), 2100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1e]"
      style={{
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="StruxAI"
          width={160}
          height={48}
          priority
          className="h-10 w-auto brightness-0 invert"
        />
      </div>

      {/* Spinner ring */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#1e5edc]"
          style={{ animation: "spin 0.9s linear infinite" }}
        />
      </div>

      {/* Tagline */}
      <p className="mt-6 text-xs font-mono tracking-[0.2em] text-white/30 uppercase">
        AI-Powered Bridge Inspection
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
