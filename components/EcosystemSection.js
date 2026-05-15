"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROLES = [
  {
    id: 1,
    title: "DOT / STATE AGENCIES",
    headline: "Meet FHWA mandates. On schedule.",
    desc: "Automate your biennial SNBI inspection cycle without expanding headcount. SNBI-linked reports, prioritized maintenance queues, and predictive capital forecasts from one platform.",
    accent: "#3b82f6",
    accentBg: "#eff6ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    xPos: "15%",
  },
  {
    id: 2,
    title: "CIVIL ENGINEERING FIRMS",
    headline: "Deliver SNBI reports at scale.",
    desc: "Transform field photos into SNBI-compliant, element-linked deliverables in minutes – letting your licensed engineers focus on engineering judgment, not documentation.",
    accent: "#6366f1",
    accentBg: "#eef2ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    xPos: "38%",
  },
  {
    id: 3,
    title: "INFRASTRUCTURE CONTRACTORS",
    headline: "Document conditions. Defensibly.",
    desc: "Pre-construction condition surveys protect you from change-order disputes. StruxAI creates a timestamped, SNBI-documented record of every existing defect before construction starts.",
    accent: "#f97316",
    accentBg: "#fff7ed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    xPos: "61%",
  },
  {
    id: 4,
    title: "BRIDGE OWNER AGENCIES",
    headline: "Asset management grounded in data.",
    desc: "Municipalities managing aging infrastructure use StruxAI to build complete condition histories, forecast capital needs, and prioritize maintenance based on SNBI-linked AI analysis.",
    accent: "#10b981",
    accentBg: "#ecfdf5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    xPos: "84%",
  },
];

export default function EcosystemSection() {
  const outerRef    = useRef(null);
  const headingRef  = useRef(null);
  const bridgeRef   = useRef(null);
  const cardsRef    = useRef([]);
  const linesRef    = useRef([]);

  const [activeIndex, setActiveIndex]   = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Initial hidden states ──
    gsap.set(headingRef.current, { autoAlpha: 0, y: 40 });
    gsap.set(bridgeRef.current,  { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)" });
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, { autoAlpha: 0, y: 60 });
      if (linesRef.current[i]) gsap.set(linesRef.current[i], { scaleY: 0, transformOrigin: "bottom center", autoAlpha: 0 });
    });

    // ── Scrub-only timeline — CSS sticky handles positioning, GSAP handles animation ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if      (p < 0.1)  setActiveIndex(-1);
          else if (p < 0.3)  setActiveIndex(0);
          else if (p < 0.55) setActiveIndex(1);
          else if (p < 0.8)  setActiveIndex(2);
          else               setActiveIndex(3);
        },
      },
    });

    // Heading in
    tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 1 });

    // Bridge reveal
    tl.to(bridgeRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power1.inOut",
    }, "-=0.5");

    // Cards one-by-one
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.to(card, { autoAlpha: 1, y: 0, duration: 1, ease: "back.out(1.2)" }, `-=${i === 0 ? 0 : 0.8}`);
      if (linesRef.current[i]) {
        tl.to(linesRef.current[i], { scaleY: 1, autoAlpha: 1, duration: 0.8 }, "-=0.8");
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const displayIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex;

  // ── Responsive card layout ──
  // Desktop (lg+): absolute positioned with xPos
  // Tablet (md): 2×2 grid
  // Mobile (sm): single column stack
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div ref={outerRef} style={{ height: "450vh" }}>
      <div
        className="relative w-full h-screen bg-[#F5F7FB] overflow-hidden flex flex-col items-center font-sans"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Ambient video bg */}
        <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply pointer-events-none">
          <video src="./b3-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col px-4 md:px-6 max-w-7xl mx-auto">

          {/* Heading */}
          <div ref={headingRef} className="text-center pt-10 md:pt-16 shrink-0">
            <p className="text-[11px] font-bold tracking-[0.22em] text-slate-400 uppercase mb-3 md:mb-4">
              // Who It&apos;s For
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Every role in the inspection chain.
            </h2>
          </div>

          {/* Cards area */}
          <div className="relative flex-1 w-full mt-4 md:mt-6">

            {/* ── Desktop (lg+): absolute positioned ── */}
            <div className="hidden lg:block relative w-full h-full max-w-[1200px] mx-auto">
              {ROLES.map((role, i) => {
                const isActive = displayIndex === i;
                const topPos = i % 2 === 0 ? "0%" : "8%";
                return (
                  <div key={role.id}>
                    {/* Card */}
                    <div
                      ref={(el) => (cardsRef.current[i] = el)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                      className="absolute w-[250px] h-[300px] bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border cursor-pointer transition-all duration-500 ease-out z-20 flex flex-col"
                      style={{
                        left: role.xPos,
                        transform: `translateX(-50%) ${isActive ? "translateY(-12px)" : "translateY(0)"}`,
                        top: topPos,
                        boxShadow: isActive ? `0 24px 48px -12px ${role.accent}40` : "0 10px 30px -10px rgba(0,0,0,0.08)",
                        borderColor: isActive ? role.accent : "#ffffff",
                      }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl transition-colors duration-500"
                        style={{ backgroundColor: isActive ? role.accent : "#e2e8f0" }} />
                      <div className="flex items-center gap-3 mb-4 mt-1">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500"
                          style={{ backgroundColor: isActive ? role.accentBg : "#f1f5f9", color: isActive ? role.accent : "#94a3b8" }}>
                          {role.icon}
                        </div>
                        <h3 className="text-[9px] font-bold tracking-widest text-slate-500 uppercase leading-snug">{role.title}</h3>
                      </div>
                      <h4 className="text-[15px] font-black text-slate-900 leading-snug mb-2">{role.headline}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-auto">{role.desc}</p>
                      <span className="text-[12px] font-bold flex items-center gap-1 mt-3 transition-colors"
                        style={{ color: isActive ? role.accent : "#94a3b8" }}>
                        Learn how <span className={`transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}>→</span>
                      </span>
                    </div>

                    {/* Connector line */}
                    <div
                      ref={(el) => (linesRef.current[i] = el)}
                      className="absolute w-px z-10 transition-all duration-500"
                      style={{
                        left: role.xPos,
                        top: `calc(${topPos} + 270px)`,
                        bottom: "300px",
                        backgroundColor: isActive ? role.accent : "#cbd5e1",
                        boxShadow: isActive ? `0 0 12px ${role.accent}` : "none",
                        opacity: isActive ? 1 : 0.4,
                      }}
                    />
                  </div>
                );
              })}

              {/* Bridge */}
              <div ref={bridgeRef} className="absolute bottom-8 left-0 w-full h-[260px] z-0">
                <BridgeSVG activeIndex={displayIndex} />
              </div>
            </div>

            {/* ── Tablet (md–lg): 2×2 grid ── */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 w-full h-full content-start pb-4">
              {ROLES.map((role, i) => {
                const isActive = displayIndex === i;
                return (
                  <div
                    key={role.id}
                    ref={(el) => { if (!cardsRef.current[i]) cardsRef.current[i] = el; }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    className="bg-white/90 rounded-2xl p-4 shadow-lg border cursor-pointer transition-all duration-500 flex flex-col"
                    style={{
                      borderColor: isActive ? role.accent : "#e2e8f0",
                      boxShadow: isActive ? `0 12px 32px -8px ${role.accent}40` : "0 4px 16px rgba(0,0,0,0.06)",
                      transform: isActive ? "translateY(-6px)" : "translateY(0)",
                    }}
                  >
                    <div className="h-1 w-full rounded-full mb-3 transition-colors duration-500"
                      style={{ backgroundColor: isActive ? role.accent : "#e2e8f0" }} />
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500"
                        style={{ backgroundColor: isActive ? role.accentBg : "#f1f5f9", color: isActive ? role.accent : "#94a3b8" }}>
                        {role.icon}
                      </div>
                      <h3 className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">{role.title}</h3>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug mb-2">{role.headline}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-auto">{role.desc}</p>
                    <span className="text-[11px] font-bold mt-3 transition-colors duration-500"
                      style={{ color: isActive ? role.accent : "#94a3b8" }}>
                      Learn how →
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile (< md): single column stack ── */}
            <div className="md:hidden flex flex-col gap-3 w-full pb-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 160px)" }}>
              {ROLES.map((role, i) => {
                const isActive = displayIndex === i;
                return (
                  <div
                    key={role.id}
                    ref={(el) => { if (!cardsRef.current[i]) cardsRef.current[i] = el; }}
                    className="bg-white rounded-2xl p-4 shadow-md border transition-all duration-500 flex items-start gap-3"
                    style={{
                      borderColor: isActive ? role.accent : "#e2e8f0",
                      boxShadow: isActive ? `0 8px 24px -6px ${role.accent}35` : "0 2px 8px rgba(0,0,0,0.05)",
                      borderLeftWidth: "3px",
                      borderLeftColor: isActive ? role.accent : "#e2e8f0",
                    }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-500"
                      style={{ backgroundColor: isActive ? role.accentBg : "#f1f5f9", color: isActive ? role.accent : "#94a3b8" }}>
                      {role.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">{role.title}</p>
                      <h4 className="text-sm font-black text-slate-900 leading-snug mb-1">{role.headline}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{role.desc}</p>
                      <span className="text-[11px] font-bold mt-2 block transition-colors duration-500"
                        style={{ color: isActive ? role.accent : "#94a3b8" }}>
                        Learn how →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const BridgeSVG = ({ activeIndex, isMobile = false }) => {
  const towers = [15, 38, 61, 84];
  return (
    <svg viewBox="0 0 1200 300" className="w-full h-full"
      preserveAspectRatio={isMobile ? "xMidYMax meet" : "none"}>
      <path d="M0 250 L1200 250 L1200 265 L0 265 Z" fill="#e2e8f0" />
      <path d="M0 250 L1200 250" stroke="#cbd5e1" strokeWidth="3" />
      <path d="M0 265 L1200 265" stroke="#94a3b8" strokeWidth="1" />
      <path d="M0 265 L1200 265 L1200 280 L0 280 Z" fill="#f1f5f9" />
      {towers.map((x, i) => {
        const cx = (x / 100) * 1200;
        const isActive = activeIndex === i;
        const color = isActive ? ROLES[i].accent : "#94a3b8";
        const towerColor = isActive ? color : "#cbd5e1";
        const strokeW = isActive ? "2.5" : "1";
        return (
          <g key={i}>
            <path d={`M${cx} 50 L${cx - 120} 250`} stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx} 80 L${cx - 80} 250`}  stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx} 110 L${cx - 40} 250`} stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx} 110 L${cx + 40} 250`} stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx} 80 L${cx + 80} 250`}  stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx} 50 L${cx + 120} 250`} stroke={color} strokeWidth={strokeW} opacity={isActive ? 0.7 : 0.2} />
            <path d={`M${cx - 14} 265 L${cx - 5} 30 L${cx + 5} 30 L${cx + 14} 265 Z`} fill={towerColor} />
            <path d={`M${cx} 30 L${cx + 5} 30 L${cx + 14} 265 L${cx} 265 Z`} fill="#000000" opacity="0.05" />
            {isActive ? (
              <>
                <circle cx={cx} cy={30} r="12" fill={color} style={{ filter: "blur(6px)", opacity: 0.6 }} />
                <circle cx={cx} cy={30} r="4" fill="#ffffff" />
              </>
            ) : (
              <circle cx={cx} cy={30} r="4" fill="#f8fafc" />
            )}
          </g>
        );
      })}
    </svg>
  );
};
