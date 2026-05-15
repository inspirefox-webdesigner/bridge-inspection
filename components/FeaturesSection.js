"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link2, Layers, Activity } from "lucide-react";

const BridgeSVG = ({ className }) => (
  <svg viewBox="0 0 1200 600" className={className} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Deck */}
      <path d="M 0 400 L 1200 400" strokeWidth="6" />
      <path d="M 0 420 L 1200 420" strokeWidth="4" />
      {/* Truss between decks */}
      {Array.from({ length: 60 }).map((_, i) => (
        <path key={`t1-${i}`} d={`M ${i * 20} 400 L ${20 + i * 20} 420 M ${20 + i * 20} 400 L ${i * 20} 420`} strokeWidth="1.5" strokeOpacity="0.6" />
      ))}
      
      {/* Towers */}
      {/* Left Tower */}
      <path d="M 300 480 L 300 100 L 360 100 L 360 480" strokeWidth="4" />
      <path d="M 300 150 L 360 150 M 300 220 L 360 220 M 300 290 L 360 290 M 300 360 L 360 360" strokeWidth="2" strokeOpacity="0.8" />
      <path d="M 300 150 L 360 100 M 300 220 L 360 150 M 300 290 L 360 220 M 300 360 L 360 290" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M 360 150 L 300 100 M 360 220 L 300 150 M 360 290 L 300 220 M 360 360 L 300 290" strokeWidth="1.5" strokeOpacity="0.6" />
      
      {/* Right Tower */}
      <path d="M 840 480 L 840 100 L 900 100 L 900 480" strokeWidth="4" />
      <path d="M 840 150 L 900 150 M 840 220 L 900 220 M 840 290 L 900 290 M 840 360 L 900 360" strokeWidth="2" strokeOpacity="0.8" />
      <path d="M 840 150 L 900 100 M 840 220 L 900 150 M 840 290 L 900 220 M 840 360 L 900 290" strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M 900 150 L 840 100 M 900 220 L 840 150 M 900 290 L 840 220 M 900 360 L 840 290" strokeWidth="1.5" strokeOpacity="0.6" />
      
      {/* Main Cables */}
      <path d="M 0 250 Q 330 100 330 100 Q 600 380 870 100 Q 870 100 1200 250" strokeWidth="5" />
      
      {/* Suspenders */}
      {/* Left section */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 10 + i * 19;
        if (x > 300) return null;
        const yTop = 250 - ((250 - 100) / 330) * x;
        return <path key={`l-${i}`} d={`M ${x} ${yTop} L ${x} 400`} strokeWidth="1.5" strokeOpacity="0.7" />
      })}
      
      {/* Middle section */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 380 + i * 20;
        if (x > 840) return null;
        const a = (100 - 380) / Math.pow(330 - 600, 2);
        const yTop = a * Math.pow(x - 600, 2) + 380;
        return <path key={`m-${i}`} d={`M ${x} ${yTop} L ${x} 400`} strokeWidth="1.5" strokeOpacity="0.7" />
      })}

      {/* Right section */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 910 + i * 19;
        if (x > 1200) return null;
        const yTop = 100 + ((250 - 100) / (1200 - 870)) * (x - 870);
        return <path key={`r-${i}`} d={`M ${x} ${yTop} L ${x} 400`} strokeWidth="1.5" strokeOpacity="0.7" />
      })}

      {/* Nodes / Connections */}
      <circle cx="330" cy="100" r="8" fill="currentColor" />
      <circle cx="870" cy="100" r="8" fill="currentColor" />
    </g>
  </svg>
);

export default function FeaturesSection() {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const headingRef = useRef(null);
  const bridgeRevealRef = useRef(null);
  const bridgeLineRef = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const dot3Ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const outer = outerRef.current;

    // Initial setups
    gsap.set(headingRef.current, { autoAlpha: 0, y: -30 });
    gsap.set(bridgeRevealRef.current, { clipPath: "inset(0 100% 0 0)" });
    gsap.set(bridgeLineRef.current, { left: "0%" });

    gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { autoAlpha: 0, y: 30 });
    gsap.set([dot1Ref.current, dot2Ref.current, dot3Ref.current], { scale: 0, autoAlpha: 0 });
    
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { scaleY: 0, transformOrigin: "bottom" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Heading fade in
    tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 10 }, 0);

    // Bridge reveal continuous animation (from 0 to 100 on timeline)
    tl.to(bridgeRevealRef.current, { clipPath: "inset(0 0% 0 0)", duration: 100, ease: "none" }, 0);
    tl.to(bridgeLineRef.current, { left: "100%", duration: 100, ease: "none" }, 0);

    // Card 1 Pop (At X=200 -> 16.6%)
    tl.to(dot1Ref.current, { scale: 1, autoAlpha: 1, duration: 4, ease: "back.out(1.5)" }, 16.6);
    tl.to(line1Ref.current, { scaleY: 1, duration: 4, ease: "power2.out" }, 18.6);
    tl.to(card1Ref.current, { autoAlpha: 1, y: 0, duration: 6, ease: "power2.out" }, 20.6);

    // Card 2 Pop (At X=600 -> 50%)
    tl.to(dot2Ref.current, { scale: 1, autoAlpha: 1, duration: 4, ease: "back.out(1.5)" }, 50);
    tl.to(line2Ref.current, { scaleY: 1, duration: 4, ease: "power2.out" }, 52);
    tl.to(card2Ref.current, { autoAlpha: 1, y: 0, duration: 6, ease: "power2.out" }, 54);

    // Card 3 Pop (At X=1000 -> 83.3%)
    tl.to(dot3Ref.current, { scale: 1, autoAlpha: 1, duration: 4, ease: "back.out(1.5)" }, 83.3);
    tl.to(line3Ref.current, { scaleY: 1, duration: 4, ease: "power2.out" }, 85.3);
    tl.to(card3Ref.current, { autoAlpha: 1, y: 0, duration: 6, ease: "power2.out" }, 87.3);

    // Fade out scanner line at the end
    tl.to(bridgeLineRef.current, { autoAlpha: 0, duration: 5 }, 100);

    // Extra buffer at the end so it doesn't end abruptly
    tl.to({}, { duration: 10 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
    <div ref={outerRef} className="md:h-[400vh]">
      {/* Desktop/tablet sticky scene — hidden on mobile */}
      <div
        ref={stickyRef}
        id="next-section"
        style={{ position: "sticky", top: 0 }}
        className="relative w-full md:h-screen bg-[#f8fafc] text-[#0f172a] hidden md:flex flex-col justify-center overflow-hidden"
      >
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

        {/* Heading — desktop/tablet only (absolute positioned) */}
        <div ref={headingRef} className="hidden md:block absolute top-10 left-0 right-0 text-center z-30 pointer-events-none px-6">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 block">
            // Industry Firsts
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold font-serif leading-tight text-[#0f172a]">
            Three capabilities no one else offers.
          </h2>
          <p className="mt-3 mb-5 text-slate-500 text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
            StruxAI didn&apos;t build incremental improvements to the status quo. We rebuilt inspection infrastructure from first principles.
          </p>
        </div>

        {/* Interactive Timeline Container — Desktop only */}
        <div className="hidden md:flex w-full h-[700px] mt-48 md:mt-72 lg:mt-80 items-center justify-center pointer-events-none">
          {/* Scalable Container for responsiveness */}
          <div className="relative w-[1200px] h-[600px] flex-shrink-0 origin-center transform scale-[0.45] md:scale-[0.6] lg:scale-75 xl:scale-100 transition-transform duration-300">
            
            {/* Background Faint Bridge */}
            <div className="absolute inset-0 opacity-15">
              <BridgeSVG className="w-full h-full text-slate-400" />
            </div>
            
            {/* Revealed Bridge */}
            <div ref={bridgeRevealRef} className="absolute inset-0 text-[#1e5edc]">
              <BridgeSVG className="w-full h-full text-current drop-shadow-[0_0_15px_rgba(30,94,220,0.5)]" />
            </div>
            
            {/* Scanner Line */}
            <div ref={bridgeLineRef} className="absolute top-[80px] bottom-[150px] w-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20" />

            {/* --- Cards --- */}
            
            {/* Card 1: SNBI Element-Level Connection (Left) */}
            <div className="absolute" style={{ left: "200px", top: "400px", transform: "translate(-50%, -100%)" }}>
              <div className="flex flex-col items-center">
                <div ref={card1Ref} className="w-[22rem] bg-white border border-slate-200 p-6 rounded-2xl shadow-xl pointer-events-auto z-30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                      <Link2 size={15} className="text-[#1e5edc]" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      Industry First
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">SNBI Element-Level Connection</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Every defect StruxAI detects is automatically mapped to its SNBI element — deck, superstructure, substructure, or culvert component — with correct element numbers, condition states, and quantities pre-populated.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Auto-Linked Elements</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["#120 Concrete Deck", "#205 Concrete Column", "#803 Bearing Device"].map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div ref={line1Ref} className="w-[2px] h-24 bg-gradient-to-t from-[#1e5edc] to-blue-200 origin-bottom" />
                <div ref={dot1Ref} className="w-4 h-4 rounded-full bg-white border-4 border-[#1e5edc] shadow-[0_0_10px_rgba(30,94,220,0.8)] z-20 absolute bottom-[-8px]" />
              </div>
            </div>

            {/* Card 2: Revit BIM Integration (Center) */}
            <div className="absolute" style={{ left: "600px", top: "400px", transform: "translate(-50%, -100%)" }}>
              <div className="flex flex-col items-center">
                <div ref={card2Ref} className="w-[22rem] bg-white border border-slate-200 p-6 rounded-2xl shadow-xl pointer-events-auto z-30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
                      <Layers size={15} className="text-[#f97316]" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-[#f97316] uppercase bg-orange-50 px-2 py-1 rounded border border-orange-100">
                      Only in StruxAI
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">Revit BIM Integration</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Upload your bridge&apos;s Revit model directly into StruxAI. Inspection photos are automatically geolocated and attached to their corresponding BIM element — creating a living digital twin.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Supported Formats</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[".RVT", ".IFC", ".NWD", ".FBX"].map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div ref={line2Ref} className="w-[2px] h-10 bg-gradient-to-t from-[#f97316] to-orange-200 origin-bottom" />
                <div ref={dot2Ref} className="w-4 h-4 rounded-full bg-white border-4 border-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)] z-20 absolute bottom-[-8px]" />
              </div>
            </div>

            {/* Card 3: Predictive Maintenance Engine (Right) */}
            <div className="absolute" style={{ left: "1000px", top: "400px", transform: "translate(-50%, -100%)" }}>
              <div className="flex flex-col items-center">
                <div ref={card3Ref} className="w-[22rem] bg-white border border-slate-200 p-6 rounded-2xl shadow-xl pointer-events-auto z-30">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                      <Activity size={15} className="text-[#1e5edc]" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-[#1e5edc] uppercase bg-blue-50 px-2 py-1 rounded border border-blue-100">
                      Only in StruxAI
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">Predictive Maintenance Engine</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    No other inspection platform forecasts what comes next. StruxAI&apos;s predictive engine analyzes inspection history, traffic loading data, and material age to model deterioration curves.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">AI Forecast Outputs</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Condition ratings", "Maintenance triggers", "Cost estimates"].map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div ref={line3Ref} className="w-[2px] h-24 bg-gradient-to-t from-[#1e5edc] to-blue-200 origin-bottom" />
                <div ref={dot3Ref} className="w-4 h-4 rounded-full bg-white border-4 border-[#1e5edc] shadow-[0_0_10px_rgba(30,94,220,0.8)] z-20 absolute bottom-[-8px]" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    {/* ── Mobile Cards — outside sticky, normal document flow ── */}
    <div className="md:hidden bg-[#f8fafc] px-4 pt-10 pb-16 flex flex-col gap-6">
      {/* Mobile heading */}
      <div className="text-center mb-2">
        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 block">
          // Industry Firsts
        </span>
        <h2 className="text-2xl font-bold font-serif leading-tight text-[#0f172a] mb-2">
          Three capabilities no one else offers.
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          StruxAI didn&apos;t build incremental improvements to the status quo. We rebuilt inspection infrastructure from first principles.
        </p>
      </div>

      {/* Card 1 */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
            <Link2 size={15} className="text-[#1e5edc]" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded border border-slate-200">Industry First</span>
        </div>
        <h3 className="text-base font-bold text-[#0f172a] mb-2">SNBI Element-Level Connection</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Every defect StruxAI detects is automatically mapped to its SNBI element — deck, superstructure, substructure, or culvert component — with correct element numbers, condition states, and quantities pre-populated.
        </p>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Auto-Linked Elements</p>
          <div className="flex flex-wrap gap-1.5">
            {["#120 Concrete Deck", "#205 Concrete Column", "#803 Bearing Device"].map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100">
            <Layers size={15} className="text-[#f97316]" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#f97316] uppercase bg-orange-50 px-2 py-1 rounded border border-orange-100">Only in StruxAI</span>
        </div>
        <h3 className="text-base font-bold text-[#0f172a] mb-2">Revit BIM Integration</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Upload your bridge&apos;s Revit model directly into StruxAI. Inspection photos are automatically geolocated and attached to their corresponding BIM element — creating a living digital twin.
        </p>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Supported Formats</p>
          <div className="flex flex-wrap gap-1.5">
            {[".RVT", ".IFC", ".NWD", ".FBX"].map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
            <Activity size={15} className="text-[#1e5edc]" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#1e5edc] uppercase bg-blue-50 px-2 py-1 rounded border border-blue-100">Only in StruxAI</span>
        </div>
        <h3 className="text-base font-bold text-[#0f172a] mb-2">Predictive Maintenance Engine</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          No other inspection platform forecasts what comes next. StruxAI&apos;s predictive engine analyzes inspection history, traffic loading data, and material age to model deterioration curves.
        </p>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">AI Forecast Outputs</p>
          <div className="flex flex-wrap gap-1.5">
            {["Condition ratings", "Maintenance triggers", "Cost estimates"].map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

