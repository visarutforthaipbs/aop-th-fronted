"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const { lang, setLang, t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const contactItem = { href: "/contact", key: "contact" };
  const mainNavItems = NAV_ITEMS.filter((item) => item.key !== "contact");

  return (
    <nav className="bg-brand-green-dark/90 backdrop-blur-md text-brand-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            aria-label={lang === "en" ? "Assembly of the Poor home" : "หน้าแรกสมัชชาคนจน"}
          >
            <Image
              src="/logos/logo-2.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
              aria-hidden="true"
            />
            <Image
              src="/logos/new-assem-logo.svg"
              alt={lang === "en" ? "Assembly of the Poor" : "สมัชชาคนจน"}
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 lg:space-x-8 items-center whitespace-nowrap">
            {/* Search bar (expands inline) */}
            <div className="flex items-center">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === "en" ? "Search..." : "ค้นหา..."}
                    className="w-48 px-3 py-1.5 rounded-full text-brand-black text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    onKeyDown={(e) => e.key === "Escape" && handleSearchClose()}
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Search"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleSearchClose}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close search"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Open search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                </button>
              )}
            </div>

            {mainNavItems.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`relative font-bold transition-colors py-1 group ${
                  isActive(href) ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {t.nav[key]}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isActive(href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href={contactItem.href}
              aria-current={isActive(contactItem.href) ? "page" : undefined}
              className="px-5 py-2 bg-white text-brand-green-dark rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t.nav[contactItem.key]}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 transition-all duration-200 text-sm font-bold tracking-wide"
              aria-label="Toggle language"
            >
              <span className={lang === "th" ? "opacity-100" : "opacity-50"}>TH</span>
              <span className="text-white/40">/</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-50"}>EN</span>
            </button>
          </div>

          {/* Mobile: Search + Language + Hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => { setIsOpen(false); setSearchOpen(!searchOpen); }}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="flex items-center gap-1 px-2.5 py-2 min-h-[44px] rounded-full border border-white/30 text-sm font-bold"
              aria-label="Toggle language"
            >
              <span className={lang === "th" ? "opacity-100" : "opacity-40"}>TH</span>
              <span className="text-white/40 text-xs">/</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
            </button>
            <button
              onClick={() => { setIsOpen(!isOpen); setSearchOpen(false); }}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
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

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="lg:hidden bg-brand-green-dark/95 border-t border-white/10 px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Search posts & articles..." : "ค้นหาบทความและข่าวสาร..."}
              className="flex-1 px-4 py-2 rounded-full text-brand-black text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-brand-green-dark rounded-full text-sm font-bold hover:bg-white/90 transition-colors"
            >
              {lang === "en" ? "Search" : "ค้นหา"}
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile navigation"
          className="lg:hidden bg-brand-green-dark/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_ITEMS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActive(href)
                    ? "bg-white/15 border-l-2 border-white font-bold"
                    : "hover:bg-white/10"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t.nav[key]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
