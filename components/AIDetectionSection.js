"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AIDetectionSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const videoContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const linesRef = useRef([]);
  const hotspotsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Fade in section & slide up headline
    tl.fromTo(
      headlineRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Video container scales and rotates slightly
    tl.fromTo(
      videoContainerRef.current,
      { scale: 0.9, rotationY: 5, autoAlpha: 0 },
      { scale: 1, rotationY: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
      "-=0.4"
    );

    // Cards slide in sequentially
    tl.fromTo(
      cardsRef.current,
      { x: 50, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );

    // Connector lines draw smoothly
    tl.fromTo(
      linesRef.current,
      { strokeDasharray: "0, 1000" },
      { strokeDasharray: "1000, 1000", duration: 1.5, ease: "power2.inOut" },
      "-=0.4"
    );

    // Continuous pulse for hotspots
    hotspotsRef.current.forEach((hotspot) => {
      if (hotspot) {
        gsap.to(hotspot, {
          scale: 1.05,
          opacity: 0.8,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });

    // Parallax effect on scroll
    gsap.to(videoContainerRef.current, {
      y: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-slate-50 to-[#f0f4f8] overflow-hidden font-sans"
    >
      {/* Background drifting particles (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Header */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase font-mono mb-4">
            // AI DETECTION ENGINE
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 font-serif">
            Defects found. SNBI-classified. Report-ready.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            StruxVision™ detects and geo-locates every defect, maps it to its
            SNBI element, assigns condition states, and outputs it directly into
            your NBI inspection report.
          </p>
        </div>

        {/* Center Stage: Grid Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
          
          {/* SVG Connector Lines (Desktop Only) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-20" style={{ minHeight: '600px' }}>
             {/* Line 1: Crack to Card 2 */}
             <path
               ref={(el) => (linesRef.current[0] = el)}
               d="M 35% 35% C 45% 35%, 60% 45%, 65% 45%"
               fill="none"
               stroke="#ef4444" // red-500
               strokeWidth="1.5"
               strokeDasharray="0, 1000"
               style={{ filter: "drop-shadow(0 0 4px rgba(239,68,68,0.5))" }}
             />
             {/* Line 2: Corrosion to Card 3 */}
             <path
               ref={(el) => (linesRef.current[1] = el)}
               d="M 50% 55% C 55% 55%, 60% 65%, 65% 65%"
               fill="none"
               stroke="#f97316" // orange-500
               strokeWidth="1.5"
               strokeDasharray="0, 1000"
               style={{ filter: "drop-shadow(0 0 4px rgba(249,115,22,0.5))" }}
             />
             {/* Line 3: Spalling to Card 4 */}
             <path
               ref={(el) => (linesRef.current[2] = el)}
               d="M 28% 65% C 40% 65%, 55% 85%, 65% 85%"
               fill="none"
               stroke="#3b82f6" // blue-500
               strokeWidth="1.5"
               strokeDasharray="0, 1000"
               style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.5))" }}
             />
          </svg>

          {/* Left: Video Container */}
          <div
            ref={videoContainerRef}
            className="lg:col-span-8 relative rounded-[32px] overflow-hidden bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-2"
            style={{ perspective: "1000px" }}
          >
            <div className="relative rounded-[28px] overflow-hidden bg-slate-900 border border-slate-200/50">
              
              {/* Video Top Bar */}
              <div className="absolute top-0 inset-x-0 h-10 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-between px-4 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-green-700">LIVE ANALYSIS</span>
                </div>
                <div className="text-[10px] font-mono tracking-wider text-slate-500">
                  241016_IMG_0002 • 4K
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-red-600 tracking-widest">
                  + 3 DEFECTS
                </div>
              </div>

              {/* Video Element */}
              <video
                src="/b2-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover opacity-90"
              />

              {/* Video Bottom Bar */}
              <div className="absolute bottom-0 inset-x-0 h-8 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-between px-4 border-t border-slate-200/50 text-[9px] font-mono text-slate-400 tracking-widest">
                <div>STRUXVISION v3.2 &nbsp;|&nbsp; MAPIO 5 &nbsp;|&nbsp; TASK: 06.48 - 0.34s</div>
                <div>CAPT AUTO-LINKS /</div>
              </div>

              {/* Video Overlays (Hotspots) */}
              {/* Hotspot 1: Hairline Crack (Red) */}
              <div 
                ref={(el) => (hotspotsRef.current[0] = el)}
                className="absolute top-[20%] left-[30%] w-[12%] h-[25%] border-2 border-red-500 bg-red-500/10 z-10"
              >
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap">
                  HAIRLINE CRACK 94.2%
                </div>
              </div>

              {/* Hotspot 2: Surface Corrosion (Orange) */}
              <div 
                ref={(el) => (hotspotsRef.current[1] = el)}
                className="absolute top-[40%] left-[45%] w-[20%] h-[25%] border-2 border-orange-500 bg-orange-500/10 z-10"
              >
                <div className="absolute -top-6 left-0 bg-orange-500 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap">
                  SURFACE CORROSION 87.6%
                </div>
              </div>

              {/* Hotspot 3: Concrete Spalling (Blue) */}
              <div 
                ref={(el) => (hotspotsRef.current[2] = el)}
                className="absolute top-[60%] left-[25%] w-[15%] h-[15%] border-2 border-blue-500 bg-blue-500/10 z-10"
              >
                <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap">
                  CONCRETE SPALLING 91.3%
                </div>
              </div>

            </div>
          </div>

          {/* Right: Floating UI Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 z-30">
            {/* Card 1: Risk Score */}
            <div 
              ref={(el) => (cardsRef.current[0] = el)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-xl"
            >
              <div className="text-[10px] font-mono tracking-widest text-slate-400 mb-2 uppercase">Structural Risk Assessment</div>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Overall Risk Score</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">SNBI Element Weighted</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-red-500 text-red-600 flex items-center justify-center font-bold text-lg bg-red-50">
                  7.4
                </div>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                <div className="bg-green-500 w-1/4 h-full"></div>
                <div className="bg-yellow-400 w-1/4 h-full"></div>
                <div className="bg-orange-500 w-1/4 h-full"></div>
                <div className="bg-red-500 w-1/4 h-full"></div>
              </div>
              <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-2 tracking-widest">
                <span>LOW</span>
                <span>CRITICAL</span>
              </div>
            </div>

            {/* Card 2: Hairline Crack */}
            <div 
              ref={(el) => (cardsRef.current[1] = el)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-xl flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Hairline Crack</h4>
                  <p className="text-[10px] font-mono text-red-500 mt-0.5">SNBI #290</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-red-600 bg-red-50 border border-red-200 uppercase">High</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Detection Confidence</span>
                  <span className="font-bold text-red-600">94.2%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[94.2%]"></div>
                </div>
              </div>
            </div>

            {/* Card 3: Surface Corrosion */}
            <div 
              ref={(el) => (cardsRef.current[2] = el)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-xl flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Surface Corrosion</h4>
                  <p className="text-[10px] font-mono text-orange-500 mt-0.5">SNBI #215</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-orange-600 bg-orange-50 border border-orange-200 uppercase">Medium</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Detection Confidence</span>
                  <span className="font-bold text-orange-600">87.6%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full w-[87.6%]"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Concrete Spalling */}
            <div 
              ref={(el) => (cardsRef.current[3] = el)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-xl flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Concrete Spalling</h4>
                  <p className="text-[10px] font-mono text-blue-500 mt-0.5">SNBI #302</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 uppercase">High</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>Detection Confidence</span>
                  <span className="font-bold text-blue-600">91.3%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[91.3%]"></div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              ref={(el) => (cardsRef.current[4] = el)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Generate SNBI Report
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
