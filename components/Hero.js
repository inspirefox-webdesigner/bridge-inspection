"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const outerRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;

    // Hide content initially — ensure video is visible from the start
    gsap.set(contentRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(videoWrapRef.current, { autoAlpha: 1, scale: 1, borderRadius: "0px" });

    // ── Hybrid: forward = play/playbackRate (smooth), reverse = rVFC seek ──
    const SCROLL_ZONE = window.innerHeight * 3.5;

    let videoDuration = 0;
    let lastScrollY = window.scrollY;
    let direction = 1; // 1 = forward, -1 = reverse
    let rafId;

    // Reverse scrub state
    let targetTime = 0;
    let displayTime = 0;
    let rVFCHandle = null;

    const getScrollProgress = () => {
      const rect = outerRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      return Math.max(0, Math.min(1, -rect.top / SCROLL_ZONE));
    };

    const initVideo = () => {
      videoDuration = video.duration;
      video.pause();
      video.currentTime = 0;
      displayTime = 0;
      targetTime = 0;
    };

    if (video.readyState >= 1) {
      initVideo();
    } else {
      video.addEventListener("loadedmetadata", initVideo, { once: true });
    }

    // ── Reverse mode: requestVideoFrameCallback loop ──
    // rVFC fires exactly when browser is ready to paint next frame → no seek queue jam
    const LERP = 0.5;
    const reverseLoop = () => {
      if (direction !== -1) return; // stop if direction changed
      const diff = targetTime - displayTime;
      displayTime =
        Math.abs(diff) < 0.001 ? targetTime : displayTime + diff * LERP;
      const t = Math.max(0, Math.min(videoDuration, displayTime));
      video.currentTime = t;
      if ("requestVideoFrameCallback" in video) {
        rVFCHandle = video.requestVideoFrameCallback(reverseLoop);
      } else {
        rVFCHandle = requestAnimationFrame(reverseLoop);
      }
    };

    const stopReverse = () => {
      if (rVFCHandle !== null) {
        if ("cancelVideoFrameCallback" in video)
          video.cancelVideoFrameCallback(rVFCHandle);
        else cancelAnimationFrame(rVFCHandle);
        rVFCHandle = null;
      }
    };

    // ── Forward mode: velocity → playbackRate ──
    let targetRate = 0;
    let currentRate = 0;
    let stopTimer = null;
    const MAX_RATE = 1.5;
    const MIN_RATE = 0.1; // browser minimum is ~0.0625; stay safely above it

    const forwardTick = () => {
      if (direction !== 1) {
        rafId = null;
        return;
      }
      currentRate += (targetRate - currentRate) * 0.12;
      if (currentRate < MIN_RATE) {
        currentRate = 0;
        if (!video.paused) video.pause();
      } else {
        // Clamp to browser-supported range [0.1, 16] before setting
        const rate = Math.max(0.1, Math.min(16, currentRate));
        if (video.paused) video.play().catch(() => {});
        video.playbackRate = rate;
      }
      rafId = requestAnimationFrame(forwardTick);
    };

    const fullReset = () => {
      // Stop everything and reset to initial state (scroll position = 0)
      stopReverse();
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      clearTimeout(stopTimer);
      video.pause();
      video.currentTime = 0;
      displayTime = 0;
      targetTime = 0;
      targetRate = 0;
      currentRate = 0;
      direction = 1;
      lastScrollY = 0;
      // Reset GSAP states
      gsap.set(videoWrapRef.current, { scale: 1, autoAlpha: 1, borderRadius: "0px" });
      gsap.set(contentRef.current, { autoAlpha: 0, y: 50 });
      // Restart forward tick
      rafId = requestAnimationFrame(forwardTick);
    };

    const onScroll = () => {
      if (videoDuration <= 0) return;

      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      if (dy === 0) return;

      // Detect instant scroll-to-top jump (e.g. from ScrollToTop button)
      if (currentScrollY === 0 && Math.abs(dy) > window.innerHeight) {
        fullReset();
        return;
      }

      // Sync displayTime with actual video position to avoid jumps after
      // returning to the hero section from far below
      const syncedTime = video.currentTime;
      if (Math.abs(syncedTime - displayTime) > 0.5) {
        displayTime = syncedTime;
        targetTime = syncedTime;
      }

      const newDir = dy > 0 ? 1 : -1;

      if (newDir !== direction) {
        direction = newDir;

        if (direction === 1) {
          // Switch to forward: stop reverse loop, start play
          stopReverse();
          displayTime = video.currentTime;
          targetRate = 0;
          currentRate = 0;
          if (!rafId) rafId = requestAnimationFrame(forwardTick);
        } else {
          // Switch to reverse: stop forward play, start rVFC loop
          video.pause();
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          displayTime = video.currentTime;
          targetTime = getScrollProgress() * videoDuration;
          reverseLoop();
        }
      }

      if (direction === 1) {
        // Update forward velocity
        const velocity = Math.abs(dy) / 16;
        targetRate = Math.min(velocity * 4, MAX_RATE);
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
          targetRate = 0;
        }, 150);
      } else {
        // Update reverse target
        targetTime = getScrollProgress() * videoDuration;
      }
    };

    // Listen for instant scroll-to-top from ScrollToTop button
    const onHeroReset = () => fullReset();
    window.addEventListener("hero:reset", onHeroReset);

    // Start in forward mode
    rafId = requestAnimationFrame(forwardTick);
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Phase 2 (70% → 100%): video shrinks + content reveals ──
    // scrub:true so reverse scroll fully reverses the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: "70% bottom",
        end: "bottom bottom",
        scrub: 1,
        onLeaveBack: () => {
          // Re-entering hero from below — reset video to playing state
          stopReverse();
          displayTime = video.currentTime;
          targetRate = 0;
          currentRate = 0;
          direction = 1;
          lastScrollY = window.scrollY;
          if (!rafId) rafId = requestAnimationFrame(forwardTick);
        },
      },
    });

    tl.to(
      videoWrapRef.current,
      {
        scale: 0.75,
        autoAlpha: 0,
        borderRadius: "24px",
        duration: 1,
        ease: "power2.inOut",
      },
      0,
    );
    tl.to(
      contentRef.current,
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.3,
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (rafId) cancelAnimationFrame(rafId);
      stopReverse();
      clearTimeout(stopTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hero:reset", onHeroReset);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "500vh" }}>
      <div
        style={{ position: "sticky", top: 0 }}
        className="w-full h-screen bg-[#0a0f1e] overflow-hidden"
      >
        {/* ── Full-screen video — starts slightly zoomed in ── */}
        <div ref={videoWrapRef} className="absolute inset-0 origin-center">
          <video
            ref={videoRef}
            src="./video-bridge2.mp4"
            className="w-full h-full object-cover object-center"
            style={{
              transform: "scale(1.08)",
              transformOrigin: "center center",
            }}
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* ── Hero content (revealed after video) ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 bg-[#f8fafc]"
          style={{ visibility: "hidden" }}
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold tracking-wider text-[#1e5edc] text-center max-w-xs sm:max-w-none">
            <span className="w-2 h-2 rounded-full bg-[#1e5edc] animate-pulse flex-shrink-0" />
            <span>INDUSTRY FIRST · SNBI ELEMENT-LINKED INSPECTION</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-[#0f172a] leading-[1.1] mb-6 max-w-5xl">
            AI-Powered Bridge Inspection.
            <br />
            <span className="italic font-light text-[#1e5edc]">
              Reports in Minutes.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base md:text-lg text-slate-500 mb-10 leading-relaxed">
            StruxAI&apos;s computer vision platform detects cracks, corrosion,
            and spalling — then automatically links every finding to your SNBI
            element inventory and generates fully NBI-compliant reports.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el)
                  window.__lenis
                    ? window.__lenis.scrollTo(el, { offset: -80 })
                    : el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#1e5edc] text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 font-semibold flex items-center gap-2"
            >
              Request Demo <span className="text-lg">→</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el)
                  window.__lenis
                    ? window.__lenis.scrollTo(el, { offset: -80 })
                    : el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-slate-800 px-8 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors font-semibold flex items-center gap-2 shadow-sm"
            >
              <span className="text-[#1e5edc]">▶</span> See How It Works
            </button>
          </div>

          {/* Trusted by */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mr-1">
              TRUSTED BY
            </span>
            {["FHWA", "AASHTO", "Turner Construction", "AECOM", "Woolpert"].map(
              (name) => (
                <div
                  key={name}
                  className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 shadow-sm"
                >
                  {name}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
