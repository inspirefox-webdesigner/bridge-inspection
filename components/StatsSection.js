"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  {
    value: 92,
    suffix: "%",
    label: "Faster Inspection Cycles",
    sub: "7 days → under 4 hours",
    color: "#1e40af",
  },
  {
    value: 96.4,
    suffix: "%",
    label: "Defect Detection Accuracy",
    sub: "Validated vs. FHWA benchmarks",
    color: "#1e40af",
    decimals: 1,
  },
  {
    value: 4,
    suffix: "×",
    label: "Inspection Throughput",
    sub: "More teams, more bridges",
    color: "#1e40af",
  },
  {
    value: 68,
    suffix: "%",
    label: "Documentation Cost Reduction",
    sub: "vs. manual NBI reporting",
    color: "#1e40af",
  },
];

function animateCounter(el, target, decimals = 0, duration = 1600) {
  if (!el) return;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = ease * target;
    el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function StatsSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const labelRef    = useRef(null);
  const cardRefs    = useRef([]);
  const numRefs     = useRef([]);
  const barRefs     = useRef([]);
  const rafRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // heading
    gsap.fromTo(
      [labelRef.current, headingRef.current],
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      }
    );

    // cards stagger in
    gsap.fromTo(
      cardRefs.current,
      { autoAlpha: 0, y: 40, scale: 0.96 },
      {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 0.65, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      }
    );

    function runCounters() {
      STATS.forEach((s, i) => {
        // cancel any running animation for this stat
        if (rafRefs.current[i]) cancelAnimationFrame(rafRefs.current[i]);
        // reset to 0
        if (numRefs.current[i]) numRefs.current[i].textContent = "0";
        const bar = barRefs.current[i];
        if (bar) gsap.set(bar, { scaleX: 0 });

        setTimeout(() => {
          animateCounter(numRefs.current[i], s.value, s.decimals ?? 0);
          if (bar) {
            gsap.fromTo(bar,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.4, ease: "power2.out", transformOrigin: "left center" }
            );
          }
        }, i * 120);
      });
    }

    // counters + bars replay every time section enters viewport
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 72%",
      end: "bottom top",
      onEnter:     () => runCounters(),
      onEnterBack: () => runCounters(),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 bg-[#f8fafc] overflow-hidden"
    >
      {/* dot grid — matches other sections */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p
            ref={labelRef}
            className="text-[11px] font-bold tracking-[0.22em] text-blue-500 uppercase font-mono mb-4"
          >
            // Measurable Impact
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight font-serif"
          >
            Real numbers from real deployments.
          </h2>
        </div>

        {/* Stats card strip */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative flex flex-col justify-between px-8 py-10 group hover:bg-blue-50/40 transition-colors duration-300"
              >
                {/* top accent line — animates in */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-slate-100 overflow-hidden rounded-full">
                  <div
                    ref={(el) => (barRefs.current[i] = el)}
                    className="h-full bg-blue-600 rounded-full origin-left"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>

                {/* number */}
                <div className="mt-4 mb-4">
                  <p className="text-5xl md:text-6xl font-black tracking-tight leading-none" style={{ color: stat.color }}>
                    <span ref={(el) => (numRefs.current[i] = el)}>0</span>
                    <span className="text-3xl md:text-4xl font-bold ml-0.5">{stat.suffix}</span>
                  </p>
                </div>

                {/* label */}
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-snug mb-1">{stat.label}</p>
                  <p className="text-[11px] font-mono text-slate-400 tracking-wide">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[11px] font-mono text-slate-400 tracking-widest mt-8 uppercase">
          Based on deployments across 340+ bridges · FHWA-validated methodology
        </p>

      </div>
    </section>
  );
}
