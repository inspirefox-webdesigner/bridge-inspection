"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} stroke="currentColor" className="w-5 h-5">
        <rect x="2" y="5" width="20" height="15" rx="2" />
        <circle cx="12" cy="12.5" r="3" />
        <path d="M8 5l1.5-2h5L16 5" />
      </svg>
    ),
    title: "Upload Field Images or Revit BIM",
    desc: "Drag-and-drop photos from inspection cameras or smartphones. Or upload your bridge's Revit model. StruxAI accepts JPEG, TIFF, RAW, IFC, RVT, and NWD.",
    tags: ["JPEG", "TIFF", "RAW", "RVT", "IFC", "NWD"],
    stats: [
      { label: "Max images / batch", value: "10,000", prefix: "" },
      { label: "Upload parse time", value: "2s", prefix: "<" },
    ],
    progress: 65,
    progressLabel: "65% capacity used",
    accent: "#3b82f6",
    accentBg: "#eff6ff",
    accentBorder: "#bfdbfe",
    ropeHeight: 90,
    swingFrom: -20,
    cardStyle: { left: "3%", top: "10%" },
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} stroke="currentColor" className="w-5 h-5">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
    title: "AI Detects, Classifies & Links to SNBI",
    desc: "StruxVision trained on 2.4M+ FHWA-annotated images detects cracks at 0.1mm resolution, corrosion, spalling, and joint failure. Every finding is automatically linked to its SNBI element.",
    tags: ["#215", "#299", "#301", "#382", "+40 more"],
    stats: [
      { label: "Training images", value: "2.4M+", prefix: "" },
      { label: "Inference latency", value: "340ms", prefix: "" },
    ],
    progress: 82,
    progressLabel: "82% accuracy score",
    accent: "#6366f1",
    accentBg: "#eef2ff",
    accentBorder: "#c7d2fe",
    ropeHeight: 160,
    swingFrom: 22,
    cardStyle: { left: "50%", top: "40%", transform: "translateX(-50%)" },
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} stroke="currentColor" className="w-5 h-5">
        <path d="M9 12h6M9 16h6M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
        <rect x="9" y="2" width="6" height="4" rx="1" />
      </svg>
    ),
    title: "SNBI Report Auto-Generated",
    desc: "A complete SNBI/NBI-compliant report is generated: element inventory, condition ratings with quantities, GPS-mapped findings, risk score, and predictive deterioration forecast. Push to AASHTOWare.",
    tags: ["PDF", "AASHTOWare", "BMS Push", "REST API", "SFTP"],
    stats: [
      { label: "Report generation", value: "8 min", prefix: "<" },
      { label: "NBI compliance", value: "100%", prefix: "" },
    ],
    progress: 100,
    progressLabel: "100% NBI compliant",
    accent: "#0ea5e9",
    accentBg: "#f0f9ff",
    accentBorder: "#bae6fd",
    ropeHeight: 90,
    swingFrom: -18,
    cardStyle: { right: "3%", top: "10%" },
  },
];

function MobileStepCard({ step, index }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay based on index so each card feels sequential
          setTimeout(() => {
            setVisible(true);
            // Animate progress bar after card appears
            if (barRef.current) {
              barRef.current.style.transition = "width 1.2s ease 0.4s";
              barRef.current.style.width = `${step.progress}%`;
            }
          }, index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, step.progress]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl bg-white border shadow-lg overflow-hidden"
      style={{
        borderColor: step.accentBorder,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <div style={{ height: "3px", background: step.accent }} />
      <div className="p-5">
        {/* Step header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}`, color: step.accent }}
          >
            {step.icon}
          </div>
          <div>
            <p className="text-[9px] font-mono tracking-widest uppercase mb-0.5" style={{ color: step.accent }}>
              Step {step.num}
            </p>
            <h3 className="text-sm font-bold text-gray-900 leading-snug">{step.title}</h3>
          </div>
        </div>

        <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{step.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {step.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}`, color: step.accent }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {step.stats.map((s, j) => (
            <div key={j} className="rounded-xl px-3 py-2" style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}` }}>
              <p className="text-base font-black font-mono" style={{ color: step.accent }}>
                <span className="text-xs font-bold opacity-70">{s.prefix}</span>{s.value}
              </p>
              <p className="text-[9px] font-mono uppercase tracking-wide" style={{ color: step.accent, opacity: 0.7 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full"
            style={{ background: step.accent, width: "0%" }}
          />
        </div>
        <p className="text-[9px] font-mono mt-1 text-right" style={{ color: step.accent, opacity: 0.7 }}>
          {step.progressLabel}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const outerRef    = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef    = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const ropeRefs    = useRef([]);
  const cardRefs    = useRef([]);
  const progRefs    = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      video.playbackRate = 0;
    }

    // scroll-speed video playback
    let targetRate = 0;
    let currentRate = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let stopTimer = null;
    let rafId;
    const MAX_RATE = 1.5;
    const MIN_RATE = 0.1;

    const tick = () => {
      currentRate += (targetRate - currentRate) * 0.08;
      if (video) {
        if (currentRate < MIN_RATE) {
          currentRate = 0;
          if (!video.paused) video.pause();
        } else {
          if (video.paused) video.play().catch(() => {});
          video.playbackRate = Math.max(0.1, Math.min(16, currentRate));
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = now - lastScrollTime || 16;
      targetRate = Math.min((dy / dt) * 4, MAX_RATE);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => { targetRate = 0; }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const outer = outerRef.current;
    const base = { trigger: outer, start: "top top", end: "bottom bottom", scrub: 1 };

    // Phase 1: heading — show immediately when section enters viewport
    gsap.set([labelRef.current, headingRef.current, subRef.current], { autoAlpha: 0, y: 35 });
    ScrollTrigger.create({
      trigger: outer,
      start: "top 90%",
      onEnter() {
        gsap.to([labelRef.current, headingRef.current, subRef.current], {
          autoAlpha: 1, y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });
    // fade OUT when scrolled past
    gsap.fromTo(
      [labelRef.current, headingRef.current, subRef.current],
      { autoAlpha: 1, y: 0 },
      {
        autoAlpha: 0, y: -35,
        ease: "power2.in",
        scrollTrigger: { ...base, start: "8% top", end: "16% top" },
      }
    );

    // Phase 2: video fades in right after heading fades out
    gsap.set(videoWrapRef.current, { autoAlpha: 0, scale: 0.94 });
    gsap.to(videoWrapRef.current, {
      autoAlpha: 1, scale: 1,
      scrollTrigger: { ...base, start: "14% top", end: "22% top" },
    });

    // Phase 3: cards drop with rope
    const cardStarts = [22, 40, 58];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rope = ropeRefs.current[i];

      gsap.set(rope, { scaleY: 0, transformOrigin: "top center", autoAlpha: 0 });
      gsap.set(card, { autoAlpha: 0, y: -80, rotateZ: STEPS[i].swingFrom, transformOrigin: "top center" });

      const st = `${cardStarts[i]}% top`;
      const en = `${cardStarts[i] + 10}% top`;

      gsap.to(rope, { scaleY: 1, autoAlpha: 1, scrollTrigger: { ...base, start: st, end: en } });
      gsap.to(card, { autoAlpha: 1, y: 0,      scrollTrigger: { ...base, start: st, end: en } });

      ScrollTrigger.create({
        trigger: outer,
        start: st,
        onEnter() {
          gsap.fromTo(card,
            { rotateZ: STEPS[i].swingFrom },
            { rotateZ: 0, duration: 1.8, ease: "elastic.out(1, 0.38)", transformOrigin: "top center" }
          );
          gsap.to(card, {
            y: "+=5", rotateZ: "+=1.2", duration: 2.8,
            ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
            transformOrigin: "top center",
          });
        },
        onEnterBack() {
          gsap.fromTo(card,
            { rotateZ: -STEPS[i].swingFrom },
            { rotateZ: 0, duration: 1.8, ease: "elastic.out(1, 0.38)", transformOrigin: "top center" }
          );
        },
      });

      ScrollTrigger.create({
        trigger: outer,
        start: st,
        once: true,
        onEnter() {
          const bar = progRefs.current[i];
          if (bar) {
            gsap.fromTo(bar,
              { scaleX: 0 },
              { scaleX: STEPS[i].progress / 100, duration: 1.4, delay: 0.7, ease: "power2.out" }
            );
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      cancelAnimationFrame(rafId);
      clearTimeout(stopTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div id="how-it-works" ref={outerRef} style={{ height: "600vh" }}>
      <div
        style={{ position: "sticky", top: 0 }}
        className="relative w-full h-screen overflow-hidden bg-[#f8fafc]"
      >
        {/* dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
          }}
        />

        {/* Phase 1 — Heading */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 px-6 pointer-events-none">
          <p ref={labelRef} className="text-[11px] font-bold tracking-[0.22em] text-blue-500 uppercase font-mono mb-5">
            // How It Works
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-black text-gray-900 leading-tight text-center mb-5 max-w-3xl">
            From raw image to{" "}
            <span className="italic text-blue-600">SNBI-linked report.</span>
          </h2>
          <p ref={subRef} className="text-lg md:text-2xl font-semibold text-gray-400 tracking-tight">
            Under 10 minutes.
          </p>
        </div>

        {/* Phase 2 — Video */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 z-10"
          style={{ perspective: "900px" }}
        >
          <video
            ref={videoRef}
            src="./b1-video.mp4"
            className="absolute w-full h-full object-cover"
            style={{
              top: "48px",
              transformStyle: "preserve-3d",
              transform: "rotateX(4deg) scale(1.06)",
              transformOrigin: "center bottom",
            }}
            muted
            playsInline
            preload="auto"
            loop
          />
        </div>

        {/* Phase 3 — Hanging cards: desktop absolute, hidden on mobile */}
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="absolute z-30 hidden md:flex flex-col items-center pointer-events-none"
            style={{ ...step.cardStyle, width: "clamp(200px, 26vw, 300px)" }}
          >
            {/* Rope */}
            <div
              ref={(el) => (ropeRefs.current[i] = el)}
              style={{
                width: "2px",
                height: `${step.ropeHeight}px`,
                background: `linear-gradient(to bottom, ${step.accent}44, ${step.accent})`,
                borderRadius: "2px",
                flexShrink: 0,
              }}
            />

            {/* Card */}
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              className="pointer-events-auto w-full rounded-2xl bg-white border shadow-2xl overflow-hidden"
              style={{
                borderColor: step.accentBorder,
                boxShadow: `0 12px 48px 0 ${step.accent}28, 0 2px 8px 0 rgba(0,0,0,0.08)`,
              }}
            >
              <div style={{ height: "3px", background: step.accent }} />

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}`, color: step.accent }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono tracking-widest uppercase mb-0.5" style={{ color: step.accent }}>
                      Step {step.num}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{step.title}</h3>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{step.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {step.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md"
                      style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}`, color: step.accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {step.stats.map((s, j) => (
                    <div
                      key={j}
                      className="rounded-xl px-3 py-2"
                      style={{ background: step.accentBg, border: `1px solid ${step.accentBorder}` }}
                    >
                      <p className="text-base font-black font-mono" style={{ color: step.accent }}>
                        <span className="text-xs font-bold opacity-70">{s.prefix}</span>
                        {s.value}
                      </p>
                      <p className="text-[9px] font-mono uppercase tracking-wide" style={{ color: step.accent, opacity: 0.7 }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    ref={(el) => (progRefs.current[i] = el)}
                    className="h-full rounded-full origin-left"
                    style={{ background: step.accent, transform: "scaleX(0)" }}
                  />
                </div>
                <p className="text-[9px] font-mono mt-1 text-right" style={{ color: step.accent, opacity: 0.7 }}>
                  {step.progressLabel}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Steps — one-by-one scroll reveal */}
      <div className="md:hidden bg-[#f8fafc] px-6 py-16 flex flex-col gap-8">
        <p className="text-[11px] font-bold tracking-[0.22em] text-blue-500 uppercase font-mono text-center">
          // How It Works
        </p>
        {STEPS.map((step, i) => (
          <MobileStepCard key={step.num} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}
