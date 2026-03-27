"use client";

import { useState } from "react";
import { Handshake, Coins, Share2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import th from "@/locales/th";
import en from "@/locales/en";

export default function GetInvolved() {
  const { lang } = useLanguage();
  const t = lang === "en" ? en : th;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "volunteer",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (would connect to backend)
    console.log("Form submitted:", formData);
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
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white border border-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            {t.getInvolved.badge}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
            {t.getInvolved.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto">
            {t.getInvolved.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              {t.getInvolved.waysTitle}
            </h2>
            <div className="w-24 h-1 bg-brand-black mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center">
              <div className="w-20 h-20 bg-gray-100/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Handshake className="w-10 h-10 text-brand-green-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors">
                {t.getInvolved.volunteer}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.getInvolved.volunteerDesc}
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center">
              <div className="w-20 h-20 bg-brand-black/20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Share2 className="w-10 h-10 text-brand-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black group-hover:text-brand-black transition-colors">
                {t.getInvolved.spread}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.getInvolved.spreadDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-100/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-brand-black">
              {t.getInvolved.formTitle}
            </h2>

            {submitted ? (
              <div className="p-8 bg-green-50 text-brand-green-dark rounded-2xl border border-green-100 text-center animate-fade-in-up">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">
                  {t.getInvolved.successTitle}
                </h3>
                <p className="text-lg">
                  {t.getInvolved.successDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      {t.getInvolved.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder={t.getInvolved.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      {t.getInvolved.email} <span className="text-red-500">*</span>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      {t.getInvolved.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder={t.getInvolved.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      {t.getInvolved.interest}
                    </label>
                    <div className="relative">
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none appearance-none"
                      >
                        <option value="volunteer">{t.getInvolved.volunteerOption}</option>
                        <option value="media">{t.getInvolved.mediaOption}</option>
                        <option value="other">{t.getInvolved.otherOption}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    {t.getInvolved.additionalMsg}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none resize-none"
                    placeholder={t.getInvolved.additionalPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-green-dark/30 hover:-translate-y-1 text-lg"
                >
                  {t.getInvolved.submitForm}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
