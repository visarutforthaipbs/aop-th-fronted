"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:aopthailand2538@gmail.com?subject=ติดต่อจาก ${encodeURIComponent(formData.name)}: ${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`ชื่อ: ${formData.name}\nอีเมล: ${formData.email}\n\nข้อความ:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-green-dark/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white border border-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            ติดต่อสอบถาม
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            ติดต่อเรา
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto">
            ส่งข้อความถึงเรา เรายินดีรับฟังและตอบคำถามของคุณ
            เพื่อร่วมกันขับเคลื่อนสังคม
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-bold mb-8 text-brand-black">
                ส่งข้อความถึงเรา
              </h2>
              {submitted ? (
                <div className="p-8 bg-green-50 text-brand-green-dark rounded-2xl border border-green-100 text-center flex flex-col items-center">
                  <div className="mb-4">
                    <CheckCircle className="w-16 h-16 text-brand-green-dark" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    ขอบคุณสำหรับข้อความ!
                  </h3>
                  <p>เราได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        ชื่อ-นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                        placeholder="ระบุชื่อของคุณ"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        อีเมล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      หัวข้อ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder="เรื่องที่ต้องการติดต่อ"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      ข้อความ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none resize-none"
                      placeholder="เขียนข้อความของคุณที่นี่..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-green-dark/30 hover:-translate-y-1"
                  >
                    ส่งข้อความถึงเรา
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-brand-black">
                  ข้อมูลติดต่อ
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  หากมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม
                  สามารถติดต่อเราได้ตามช่องทางด้านล่าง
                </p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow flex items-start">
                <div className="bg-gray-100/30 p-3 rounded-full mr-6 text-brand-green-dark">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-brand-black">
                    ที่อยู่
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    สมาคมวิถีชนบท (สวช.)
                    <br />
                    666 ถนนเจริญนคร แขวงบางลำภูล่าง
                    <br />
                    เขตคลองสาน กรุงเทพมหานคร 10600
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow flex items-start">
                <div className="bg-gray-100/30 p-3 rounded-full mr-6 text-brand-green-dark">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-brand-black">
                    ช่องทางติดต่อ
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-brand-black">
                        อีเมล:
                      </span>{" "}
                      aopthailand2538@gmail.com
                    </p>

                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-6 text-brand-black">
                  ติดตามเราบนโซเชียลมีเดีย
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100064381883555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-brand-green-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:scale-110 shadow-lg shadow-brand-green-dark/20"
                    aria-label="Facebook"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/assemblyofthepoor.official?fbclid=IwY2xjawQFQOVleHRuA2FlbQIxMABicmlkETJUeEcwaXBEQko4aVhBZGp3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHk5CMo8dmrasnTdnMvUiAJ5kxBp7iuWQwRVuBkw5zvOyaKUKWIzB09NeGqqA_aem_tBV-7Ma7FK9dNd6DRAiXBg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-brand-green-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:scale-110 shadow-lg shadow-brand-green-dark/20"
                    aria-label="Instagram"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%8A%E0%B8%8A%E0%B8%B2%E0%B8%84%E0%B8%99%E0%B8%88%E0%B8%99-%E0%B8%AB8%E0%B8%84"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-brand-green-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:scale-110 shadow-lg shadow-brand-green-dark/20"
                    aria-label="YouTube"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@assemblyofthepoor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-brand-green-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:scale-110 shadow-lg shadow-brand-green-dark/20"
                    aria-label="TikTok"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.38 3.25-1.1 4.7a8.55 8.55 0 0 1-2.92 3.48c-1.25.82-2.73 1.34-4.25 1.48-1.54.14-3.13-.03-4.57-.6-1.45-.58-2.75-1.5-3.7-2.68-1.02-1.25-1.68-2.81-1.88-4.4-.17-1.4.03-2.85.57-4.14.54-1.29 1.37-2.43 2.45-3.23 1.25-.92 2.82-1.42 4.39-1.41.25 0 .5 0 .75.03v4.06c-.16-.01-.33-.01-.49-.01-1.29.02-2.55.51-3.5 1.37-.89.8-1.41 1.95-1.45 3.16-.04 1.25.43 2.5 1.28 3.4.88.93 2.14 1.49 3.45 1.52 1.28.02 2.54-.42 3.5-1.25.9-.78 1.46-1.89 1.57-3.12.03-.31.04-.63.04-.95V.02h3.92z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/AssemblyPoor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-brand-green-dark text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-black hover:scale-110 shadow-lg shadow-brand-green-dark/20"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 rounded-3xl overflow-hidden h-96 relative shadow-inner">
            <iframe
              title="สมาคมวิถีชนบท (สวช.) Location"
              src="https://maps.google.com/maps?q=13.716631479200355,100.50643457980348&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
