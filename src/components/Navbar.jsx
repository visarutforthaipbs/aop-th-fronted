"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import th from "@/locales/th";
import en from "@/locales/en";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = lang === "en" ? en : th;

  return (
    <nav className="bg-brand-green-dark/90 backdrop-blur-md text-brand-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/logo-white.png"
              alt={lang === "en" ? "Assembly of the Poor" : "สมัชชาคนจน"}
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 lg:space-x-8 items-center whitespace-nowrap">
            <Link
              href="/about"
              className="font-bold hover:text-white transition-colors"
            >
              {t.nav.about}
            </Link>

            <Link
              href="/campaigns"
              className="font-bold hover:text-white transition-colors"
            >
              {t.nav.campaigns}
            </Link>
            <Link
              href="/media"
              className="font-bold hover:text-white transition-colors"
            >
              {t.nav.media}
            </Link>
            <Link
              href="/news"
              className="font-bold hover:text-white transition-colors"
            >
              {t.nav.news}
            </Link>
            <Link
              href="/get-involved"
              className="font-bold hover:text-white transition-colors"
            >
              {t.nav.getInvolved}
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 bg-white text-brand-green-dark rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t.nav.contact}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 transition-all duration-200 text-sm font-bold tracking-wide"
              aria-label="Toggle language"
            >
              <span className={lang === "th" ? "opacity-100" : "opacity-50"}>🇹🇭</span>
              <span className="text-white/40">/</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-50"}>🇬🇧</span>
            </button>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/30 text-sm font-bold"
              aria-label="Toggle language"
            >
              <span className={lang === "th" ? "opacity-100" : "opacity-40"}>🇹🇭</span>
              <span className="text-white/40 text-xs">/</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-40"}>🇬🇧</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-brand-green-dark/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.about}
            </Link>

            <Link
              href="/campaigns"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.campaigns}
            </Link>
            <Link
              href="/media"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.media}
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.news}
            </Link>
            <Link
              href="/get-involved"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.getInvolved}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
