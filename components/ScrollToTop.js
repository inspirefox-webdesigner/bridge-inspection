"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 400;
      if (shouldShow !== visible) setVisible(shouldShow);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  // Animate in/out when visibility changes
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (visible) {
      gsap.fromTo(btn,
        { autoAlpha: 0, y: 16, scale: 0.8 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(btn, { autoAlpha: 0, y: 16, scale: 0.8, duration: 0.3, ease: "power2.in" });
    }
  }, [visible]);

  const handleClick = () => {
    // Arrow shoots up animation
    gsap.fromTo(arrowRef.current,
      { y: 0 },
      { y: -6, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
    );
    // Fire reset event BEFORE scrolling so Hero can reset synchronously
    window.dispatchEvent(new CustomEvent("hero:reset"));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleEnter = () => {
    gsap.to(btnRef.current, { scale: 1.1, duration: 0.2, ease: "power2.out" });
    gsap.to(arrowRef.current, { y: -3, duration: 0.2, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(arrowRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-0.5"
      style={{
        visibility: "hidden",
        background: "linear-gradient(135deg, #1e5edc 0%, #3b82f6 100%)",
        boxShadow: "0 8px 32px rgba(30,94,220,0.35), 0 2px 8px rgba(30,94,220,0.2)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {/* Arrow icon */}
      <div ref={arrowRef} className="flex flex-col items-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
      {/* Subtle label */}

    </button>
  );
}
