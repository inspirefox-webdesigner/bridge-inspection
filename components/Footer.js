"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_LINKS = {
  PLATFORM: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "SNBI Integration", href: "#snbi" },
    { label: "BIM Integration", href: "#bim" },
    { label: "Predictive Maintenance", href: "#predictive" },
    { label: "Pricing", href: "#pricing" },
  ],
  COMPANY: [
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Press Kit", href: "#press" },
    { label: "Contact", href: "#contact" },
  ],
  RESOURCES: [
    { label: "Documentation", href: "#docs" },
    { label: "API Reference", href: "#api" },
    { label: "Case Studies", href: "#cases" },
    { label: "FHWA Compliance", href: "#fhwa" },
    { label: "Support", href: "#support" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "X / Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

const BOTTOM_LINKS = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Preferences", href: "#cookies" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const socialRef = useRef(null);
  const dividerRef = useRef(null);
  const colRefs = useRef([]);
  const bottomRef = useRef(null);
  const glowRef = useRef(null);
  const gridLinesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gridLines = gridLinesRef.current.filter(Boolean);
    const cols = colRefs.current.filter(Boolean);

    // Guard: skip if critical refs aren't ready
    if (!footerRef.current || !glowRef.current) return;

    // Initial hidden states
    gsap.set(
      [logoRef.current, taglineRef.current, socialRef.current].filter(Boolean),
      { autoAlpha: 0, y: 24 },
    );
    gsap.set(cols, { autoAlpha: 0, y: 32 });
    if (dividerRef.current)
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
    if (bottomRef.current) gsap.set(bottomRef.current, { autoAlpha: 0, y: 12 });
    gsap.set(glowRef.current, { autoAlpha: 0, scale: 0.6 });
    if (gridLines.length)
      gsap.set(gridLines, { scaleY: 0, transformOrigin: "top center" });

    const trigger = {
      trigger: footerRef.current,
      start: "top 90%",
      toggleActions: "play none none reverse",
    };

    const tl = gsap.timeline({ scrollTrigger: trigger });

    // Glow pulse in
    tl.to(
      glowRef.current,
      { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0,
    );

    // Grid lines drop
    if (gridLines.length) {
      tl.to(
        gridLines,
        { scaleY: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        0.1,
      );
    }

    // Logo + tagline
    tl.to(
      [logoRef.current, taglineRef.current].filter(Boolean),
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      },
      0.2,
    );

    // Social icons
    if (socialRef.current) {
      tl.to(
        socialRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.45,
      );
    }

    // Nav columns stagger
    if (cols.length) {
      tl.to(
        cols,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.3,
      );
    }

    // Divider draw
    if (dividerRef.current) {
      tl.to(
        dividerRef.current,
        { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
        0.8,
      );
    }

    // Bottom bar
    if (bottomRef.current) {
      tl.to(
        bottomRef.current,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        1.0,
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Hover tilt on logo
  const handleLogoEnter = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 8,
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLogoLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Link hover
  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 4,
      color: "#60a5fa",
      duration: 0.2,
      ease: "power2.out",
    });
  };
  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "#94a3b8",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0f1e 0%, #060b16 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute"
        style={{
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(30,94,220,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Vertical grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) gridLinesRef.current[i] = el;
          }}
          className="pointer-events-none absolute top-0 bottom-0"
          style={{
            left: `${20 + i * 20}%`,
            width: "1px",
            background:
              "linear-gradient(180deg, transparent, rgba(30,94,220,0.12) 30%, rgba(30,94,220,0.12) 70%, transparent)",
          }}
        />
      ))}

      {/* Top border accent */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(30,94,220,0.5) 30%, rgba(249,115,22,0.4) 70%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-14">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <div
              ref={logoRef}
              className="cursor-pointer"
              style={{ perspective: "600px" }}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
            >
              <Image
                src="./logo-light.svg"
                alt="StruxAI"
                width={160}
                height={46}
                className="h-13 w-auto"
              />
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-sm leading-relaxed"
              style={{ color: "#64748b" }}
            >
              The only AI bridge inspection platform with SNBI element
              auto-linking, Revit BIM integration, and predictive maintenance
              forecasting.
            </p>

            {/* Social icons */}
            <div ref={socialRef} className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#64748b",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "rgba(30,94,220,0.2)",
                      borderColor: "rgba(30,94,220,0.5)",
                      color: "#60a5fa",
                      y: -3,
                      duration: 0.2,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#64748b",
                      y: 0,
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV_LINKS).map(([section, links], idx) => (
            <div
              key={section}
              ref={(el) => {
                if (el) colRefs.current[idx] = el;
              }}
              className="flex flex-col gap-4"
            >
              <h4
                className="text-[10px] md:text-[14px] font-bold tracking-[0.22em] font-mono"
                style={{ color: "#475569" }}
              >
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 group"
                      style={{ color: "#94a3b8", textDecoration: "none" }}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200"
                        style={{ background: "#1e3a5f" }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[11px] font-mono" style={{ color: "#334155" }}>
            © 2026 STRUXAI, INC. · STRUXAI.AI · ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-6">
            {BOTTOM_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-mono transition-colors duration-200"
                style={{ color: "#334155", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#334155";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
