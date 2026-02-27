import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-white">
              สมัชชาคนจน
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              องค์กรเครือข่ายประชาชนผู้ยากไร้ที่ต่อสู้เพื่อความยุติธรรมและสิทธิขั้นพื้นฐานของประชาชน
              เราเชื่อมั่นในพลังของคนธรรมดาที่จะเปลี่ยนแปลงสังคม
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064381883555"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/assemblyofthepoor.official?fbclid=IwY2xjawQFQOVleHRuA2FlbQIxMABicmlkETJUeEcwaXBEQko4aVhBZGp3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHk5CMo8dmrasnTdnMvUiAJ5kxBp7iuWQwRVuBkw5zvOyaKUKWIzB09NeGqqA_aem_tBV-7Ma7FK9dNd6DRAiXBg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%8A%E0%B8%8A%E0%B8%B2%E0%B8%84%E0%B8%99%E0%B8%88%E0%B8%99-%E0%B8%AB8%E0%B8%84"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@assemblyofthepoor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.38 3.25-1.1 4.7a8.55 8.55 0 0 1-2.92 3.48c-1.25.82-2.73 1.34-4.25 1.48-1.54.14-3.13-.03-4.57-.6-1.45-.58-2.75-1.5-3.7-2.68-1.02-1.25-1.68-2.81-1.88-4.4-.17-1.4.03-2.85.57-4.14.54-1.29 1.37-2.43 2.45-3.23 1.25-.92 2.82-1.42 4.39-1.41.25 0 .5 0 .75.03v4.06c-.16-.01-.33-.01-.49-.01-1.29.02-2.55.51-3.5 1.37-.89.8-1.41 1.95-1.45 3.16-.04 1.25.43 2.5 1.28 3.4.88.93 2.14 1.49 3.45 1.52 1.28.02 2.54-.42 3.5-1.25.9-.78 1.46-1.89 1.57-3.12.03-.31.04-.63.04-.95V.02h3.92z" />
                </svg>
              </a>
              <a
                href="https://x.com/AssemblyPoor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">
              เมนูหลัก
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/campaigns"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> งานรณรงค์
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> ห้องสื่อ
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> ร่วมสนับสนุน
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">
              ติดต่อเรา
            </h3>
            <div className="text-gray-400 space-y-4">
              <p className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-1 text-brand-green-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>
                  99/99 ถนนราชดำเนิน
                  <br />
                  แขวงบวรนิเวศ เขตพระนคร
                  <br />
                  กรุงเทพมหานคร 10200
                </span>
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-brand-green-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <a
                  href="mailto:contact@assemblyofthepoor.org"
                  className="hover:text-white transition-colors"
                >
                  contact@assemblyofthepoor.org
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} สมัชชาคนจน - Assembly of the Poor.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
