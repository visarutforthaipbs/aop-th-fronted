"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brand-green-dark/90 backdrop-blur-md text-brand-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="สมัชชาคนจน"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/about"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/history"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              ประวัติศาสตร์
            </Link>
            <Link
              href="/campaigns"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              งานรณรงค์
            </Link>
            <Link
              href="/media"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              ห้องสื่อ
            </Link>
            <Link
              href="/news"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              ข่าวสาร
            </Link>
            <Link
              href="/get-involved"
              className="font-medium hover:text-brand-yellow transition-colors"
            >
              ร่วมสนับสนุน
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 bg-brand-yellow text-brand-green-dark rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              ติดต่อเรา
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-brand-green-dark/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/history"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ประวัติศาสตร์
            </Link>
            <Link
              href="/campaigns"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              งานรณรงค์
            </Link>
            <Link
              href="/media"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ห้องสื่อ
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ข่าวสาร
            </Link>
            <Link
              href="/get-involved"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ร่วมสนับสนุน
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md hover:bg-brand-green-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
