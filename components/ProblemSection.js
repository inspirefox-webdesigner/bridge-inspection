"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  {
    id: "days",
    step: "01",
    tag: "Time Cost",
    title: "Weeks-Long Inspection Cycles",
    desc: "A standard bridge inspection — field work, documentation, and NBI report — takes 3–7 days plus weeks of report writing. Undetected defects propagate silently.",
    stat: "7 Days",
    statLabel: "avg. per inspection cycle",
    accent: "#d97706",
    accentBg: "#fffbeb",
    videoSrc: "/bridge-video3.mp4",
    showMoney: false,
  },
  {
    id: "pct",
    step: "02",
    tag: "Human Error",
    title: "Inconsistent Condition Ratings",
    desc: "The same bridge evaluated by two qualified inspectors produces different SNBI element condition ratings over 30% of the time. Subjectivity is a systemic problem.",
    stat: ">30%",
    statLabel: "inter-inspector variance",
    accent: "#ea580c",
    accentBg: "#fff7ed",
    videoSrc: "/bridge-video1.mp4",
    showMoney: false,
  },
  {
    id: "cost",
    step: "03",
    tag: "Budget Waste",
    title: "Enormous Hidden Costs",
    desc: "FHWA spends $5.2B+ annually on bridge inspection. A significant portion goes toward manual documentation that doesn't improve maintenance outcomes.",
    stat: "$5.2B+",
    statLabel: "annual federal spend",
    accent: "#dc2626",
    accentBg: "#fef2f2",
    videoSrc: "/bridge-video2.mp4",
    showMoney: true,
  },
];

export default function ProblemSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Header animation: each direct child fades in ──
    if (headerRef.current) {
      const kids = Array.from(headerRef.current.children);
      gsap.fromTo(
        kids,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // ── Initial card states: all dimmed except first ──
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, { opacity: i === 0 ? 1 : 0.25, x: i === 0 ? 0 : -16 });
    });

    // ── Initial video states ──
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      gsap.set(v, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.05 });
      if (i === 0) v.play().catch(() => {});
    });

    function activateCard(index) {
      setActiveCard(index);

      // Animate cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          opacity: i === index ? 1 : 0.25,
          x: i === index ? 0 : -16,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      // Crossfade videos
      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (i === index) {
          gsap.to(v, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
          v.play().catch(() => {});
        } else {
          gsap.to(v, { opacity: 0, scale: 1.05, duration: 0.6, ease: "power2.in" });
          setTimeout(() => { if (parseFloat(v.style.opacity) < 0.1) v.pause(); }, 650);
        }
      });
    }

    const triggers = [];
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: "top center+=80",
          end: "bottom center+=80",
          onEnter: () => activateCard(index),
          onEnterBack: () => activateCard(index),
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#f8fafc] w-full pb-4 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40 mix-blend-multiply" />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-4 block">
            // The Problem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight text-[#0f172a] max-w-4xl">
            Manual bridge inspection is a{" "}
            <span className="italic relative inline-block text-red-600">
              structural liability.
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-600/20 rounded-full" />
            </span>
          </h2>
          <p className="mt-6 text-slate-500 text-lg max-w-2xl leading-relaxed">
            Over 620,000 bridges. Most inspected by hand, documented on paper,
            with condition ratings that vary by inspector — not by bridge.
          </p>
        </div>
      </div>

      {/* ── Main: Left scroll + Right sticky ── */}
      {/* min-h ensures the sticky panel has enough room to stick */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row relative z-10 items-start">

        {/* Left: Scrollable cards */}
        <div className="w-full md:w-5/12 relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-[27px] top-0 bottom-0 w-[2px] bg-slate-200" />

          <div className="md:py-[4vh]">
            {CARDS.map((card, i) => {
              const isActive = activeCard === i;
              return (
                <div
                  key={card.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="md:min-h-[70vh] flex flex-col justify-center relative md:pl-20 pr-0 md:pr-10 mb-20 md:mb-0"
                >
                  {/* Timeline dot with heartbeat ripple */}
                  <div
                    className="hidden md:block absolute left-[19px] top-1/2 -translate-y-1/2 z-10"
                    style={{ width: 18, height: 18 }}
                  >
                    {/* Ripple rings — only when active */}
                    {isActive && (
                      <>
                        <span
                          className="dot-ring"
                          style={{ border: `2px solid ${card.accent}` }}
                        />
                        <span
                          className="dot-ring dot-ring-2"
                          style={{ border: `2px solid ${card.accent}` }}
                        />
                      </>
                    )}
                    {/* Dot */}
                    <div
                      className="w-full h-full rounded-full transition-all duration-500"
                      style={
                        isActive
                          ? { backgroundColor: card.accent, border: `4px solid #f8fafc`, boxShadow: `0 0 16px ${card.accent}` }
                          : { backgroundColor: "#f8fafc", border: "2px solid #cbd5e1" }
                      }
                    />
                  </div>

                  {/* Mobile video */}
                  <div className="md:hidden w-full aspect-video rounded-2xl overflow-hidden mb-8 relative border border-slate-200 shadow-lg">
                    <video src={card.videoSrc} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline autoPlay />
                    <div className="absolute top-4 right-4 bg-red-50/90 border border-red-200 backdrop-blur-sm text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> DEGRADING
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-500"
                        style={{
                          backgroundColor: isActive ? card.accentBg : "#ffffff",
                          color: isActive ? card.accent : "#94a3b8",
                          borderColor: isActive ? `${card.accent}30` : "#e2e8f0",
                        }}
                      >
                        {card.step} &mdash; {card.tag}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-5 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">{card.desc}</p>

                    <div className="flex items-end justify-between">
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-5xl md:text-6xl font-black tabular-nums tracking-tight transition-colors duration-500"
                          style={{ color: isActive ? card.accent : "#94a3b8" }}
                        >
                          {card.stat}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                          {card.statLabel}
                        </span>
                      </div>
                      {card.showMoney && (
                        <span
                          className="text-[11px] font-bold px-3 py-1.5 rounded-xl border mb-1"
                          style={{ background: "rgba(220,38,38,0.07)", borderColor: "rgba(220,38,38,0.25)", color: "#dc2626" }}
                        >
                          💸 $5.2B+ wasted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sticky video panel */}
        <div className="hidden md:block w-7/12 pl-10 self-start sticky top-[10vh]">
          <div className="py-10">
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[8px] border-white bg-slate-100 group">

              {/* Videos */}
              {CARDS.map((card, i) => (
                <video
                  key={card.id}
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={card.videoSrc}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ))}

              {/* DEGRADING badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-red-50/90 border border-red-200 backdrop-blur-md text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> DEGRADING
                </div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/50 to-transparent z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest font-mono">Analysis Feed</span>
                  <span className="text-white/50 text-[10px] font-bold font-mono">{activeCard + 1} / {CARDS.length}</span>
                </div>
                <p className="text-white text-lg font-medium leading-snug">{CARDS[activeCard]?.title}</p>
                <div className="flex gap-2 mt-5">
                  {CARDS.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{ width: activeCard === i ? 32 : 8, backgroundColor: activeCard === i ? "#fff" : "rgba(255,255,255,0.3)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Reticle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full z-10 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-l-2 border-white/40 z-10 pointer-events-none mix-blend-overlay" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
