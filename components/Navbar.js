"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    setMenuOpen(false);
    const el = document.getElementById("contact");
    if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="./logo-light.svg"
            alt="StruxAI"
            width={200}
            height={200}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-blue-600 transition-colors">Platform</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">How It Works</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Use Cases</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Resources</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="#" className="text-slate-600 hover:text-blue-600 px-4 py-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
            Sign In
          </Link>
          <button
            onClick={scrollToContact}
            className="bg-[#1e5edc] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-slate-100 bg-white/95 backdrop-blur-md">
          {["Platform", "How It Works", "Use Cases", "Resources"].map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors py-1"
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <Link href="#" className="text-center text-sm font-medium text-slate-600 px-4 py-2.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors">
              Sign In
            </Link>
            <button
              onClick={scrollToContact}
              className="bg-[#1e5edc] text-white px-4 py-2.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
            >
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
