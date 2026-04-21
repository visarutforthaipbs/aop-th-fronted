"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function FAQ() {
  const { t } = useTranslation();
  const faqs = t.faq.questions;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-green-dark text-brand-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.faq.heroTitle}
          </h1>
          <p className="text-xl">{t.faq.heroSubtitle}</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-brand-green-dark">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-brand-black">
            {t.faq.ctaTitle}
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            {t.faq.ctaDesc}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-green-dark hover:bg-brand-black text-brand-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t.faq.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
