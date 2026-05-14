"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROLES = [
  "Select your role...",
  "DOT / State Transportation Agency",
  "Civil / Structural Engineer",
  "Infrastructure Contractor",
  "Bridge Owner / Municipality",
  "Engineering Consultant",
  "Other",
];

const TRUST_BADGES = [
  { icon: "✓", text: "40+ Agency Deployments" },
  { icon: "✓", text: "620K+ Bridges Analyzed" },
  { icon: "✓", text: "4.9 / 5 Customer Rating" },
];

function FieldWrapper({ label, focused, children, ref }) {
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <label
        className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono"
        style={{ color: focused ? "#1e5edc" : "#64748b" }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white transition-all duration-200"
        style={{
          border: `1.5px solid ${focused ? "#1e5edc" : "#e2e8f0"}`,
          boxShadow: focused ? "0 0 0 3px rgba(30,94,220,0.1)" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2} className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-black text-slate-900">You&apos;re on the list.</h3>
      <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
        We&apos;ll reach out within one business day to schedule your live demo.
      </p>
      <div
        className="px-4 py-2 rounded-lg text-[11px] font-mono text-emerald-600"
        style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        ✓ Confirmation sent to your email
      </div>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const cardRef     = useRef(null);
  const badgesRef   = useRef(null);
  const fieldRefs   = useRef([]);
  const btnRef      = useRef(null);
  const formRef     = useRef(null);

  const [form, setForm]           = useState({ name: "", org: "", email: "", role: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(null);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(btnRef.current, {
      scale: 0.96, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => setSubmitted(true),
    });
  };

  const handleFocus = (name) => setFocused(name);
  const handleBlur  = ()     => setFocused(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;

    // start hidden
    gsap.set([labelRef.current, headingRef.current, subRef.current], { autoAlpha: 0, y: 30 });
    gsap.set(cardRef.current,   { autoAlpha: 0, y: 50, scale: 0.97 });
    gsap.set(badgesRef.current, { autoAlpha: 0, y: 16 });

    const base = { trigger: section, start: "top 80%", toggleActions: "play none none reverse" };

    // heading stagger
    gsap.to([labelRef.current, headingRef.current, subRef.current], {
      autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.13, ease: "power3.out",
      scrollTrigger: base,
    });

    // card rises up with slight bounce
    gsap.to(cardRef.current, {
      autoAlpha: 1, y: 0, scale: 1, duration: 0.9, delay: 0.25, ease: "power3.out",
      scrollTrigger: base,
    });

    // fields cascade in after card
    const fields = fieldRefs.current.filter(Boolean);
    gsap.set(fields, { autoAlpha: 0, y: 18 });
    gsap.to(fields, {
      autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power2.out", delay: 0.5,
      scrollTrigger: base,
    });

    // button fade
    gsap.set(btnRef.current, { autoAlpha: 0, y: 12 });
    gsap.to(btnRef.current, {
      autoAlpha: 1, y: 0, duration: 0.5, delay: 0.9, ease: "power2.out",
      scrollTrigger: base,
    });

    // badges
    gsap.to(badgesRef.current, {
      autoAlpha: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power2.out",
      scrollTrigger: base,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#f8fafc] overflow-hidden"
    >
      {/* dot grid — matches other sections */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <p ref={labelRef} className="text-[11px] font-bold tracking-[0.22em] text-blue-500 uppercase font-mono mb-4">
            // Get Started
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            Book a <span className="italic text-blue-600">30-minute</span> live demo.
          </h2>
          <p ref={subRef} className="text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            See SNBI element auto-linking, BIM integration, predictive maintenance
            forecasts, and full report generation — live, with your own images if you&apos;d like.
          </p>
        </div>

        {/* Form card */}
        <div
          ref={cardRef}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)" }}
        >
          {/* top accent */}
          <div style={{ height: "3px", background: "linear-gradient(90deg, #1e5edc, #f97316)" }} />

          <div className="p-8 md:p-10">
            {submitted ? (
              <SuccessState />
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Org */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWrapper
                    ref={(el) => { if (el) { el.dataset.field = "name"; fieldRefs.current[0] = el; } }}
                    label="Full Name"
                    focused={focused === "name"}
                  >
                    <input
                      name="name" type="text" placeholder="Jane Kowalski, PE"
                      value={form.name} onChange={handleChange}
                      onFocus={() => handleFocus("name")} onBlur={handleBlur}
                      required
                      className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    ref={(el) => { if (el) { el.dataset.field = "org"; fieldRefs.current[1] = el; } }}
                    label="Organization"
                    focused={focused === "org"}
                  >
                    <input
                      name="org" type="text" placeholder="Missouri DOT"
                      value={form.org} onChange={handleChange}
                      onFocus={() => handleFocus("org")} onBlur={handleBlur}
                      required
                      className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
                    />
                  </FieldWrapper>
                </div>

                {/* Email */}
                <FieldWrapper
                  ref={(el) => { if (el) { el.dataset.field = "email"; fieldRefs.current[2] = el; } }}
                  label="Work Email"
                  focused={focused === "email"}
                >
                  <input
                    name="email" type="email" placeholder="jane@modot.mo.gov"
                    value={form.email} onChange={handleChange}
                    onFocus={() => handleFocus("email")} onBlur={handleBlur}
                    required
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm outline-none"
                  />
                </FieldWrapper>

                {/* Role */}
                <FieldWrapper
                  ref={(el) => { if (el) { el.dataset.field = "role"; fieldRefs.current[3] = el; } }}
                  label="Your Role"
                  focused={focused === "role"}
                >
                  <select
                    name="role" value={form.role} onChange={handleChange}
                    onFocus={() => handleFocus("role")} onBlur={handleBlur}
                    required
                    className="w-full bg-transparent text-sm outline-none appearance-none cursor-pointer"
                    style={{ color: form.role ? "#1e293b" : "#94a3b8" }}
                  >
                    {ROLES.map((r) => (
                      <option
                        key={r}
                        value={r === "Select your role..." ? "" : r}
                        style={{ color: r === "Select your role..." ? "#94a3b8" : "#1e293b" }}
                      >
                        {r}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth={2} className="w-4 h-4 flex-shrink-0 pointer-events-none">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </FieldWrapper>

                {/* Submit */}
                <button
                  ref={btnRef}
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide mt-1 transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #e85d04 0%, #f97316 100%)",
                    boxShadow: "0 6px 24px rgba(249,115,22,0.35)",
                  }}
                >
                  Book My Demo →
                </button>

                <p className="text-center text-[11px] text-slate-400 font-mono">
                  No spam. SOC 2 Type II certified. Your data is never sold.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div ref={badgesRef} className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.text} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <span className="text-emerald-500 font-bold">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
