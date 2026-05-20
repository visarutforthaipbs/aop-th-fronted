"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { SlideUpFadeIn } from "@/components/animations/ScrollAnim";
import { timelineData } from "@/data/timeline";
import { useTranslation } from "@/context/LanguageContext";

export default function TimelineSection() {
    const { lang, t } = useTranslation();
    const containerRef = useRef(null);

    // Filter events based on SOP/Design (1995, 1997, 2023)
    const featuredYears = [1995, 1997, 2023];
    const featuredEvents = featuredYears.map(year => timelineData.find(item => item.year === year));

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="py-32 bg-white relative overflow-hidden" ref={containerRef}>
            {/* Hand-drawn Pattern Background (Subtle) */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url('/pattern/pattern-green.svg')", backgroundSize: '400px' }}
            ></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SlideUpFadeIn className="text-center mb-24">
                    <h2 className="text-5xl font-extrabold text-brand-black mb-6 tracking-tighter">
                        {t.timeline.heading}
                    </h2>
                    <div className="w-24 h-2 bg-brand-green-dark mx-auto rounded-full"></div>
                </SlideUpFadeIn>

                <div className="relative">
                    {/* The Connecting Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2">
                        <motion.div 
                            className="absolute top-0 left-0 right-0 bg-brand-green-dark origin-top"
                            style={{ scaleY, height: '100%' }}
                        />
                    </div>

                    {/* Events */}
                    <div className="space-y-24">
                        {featuredEvents.map((event, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Marker */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-brand-green-dark rounded-full -translate-x-1/2 z-20 flex items-center justify-center shadow-lg"
                                >
                                    <div className="w-2 h-2 bg-brand-green-dark rounded-full"></div>
                                </motion.div>

                                {/* Content Card */}
                                <div className="w-full md:w-[45%] ml-12 md:ml-0">
                                    <motion.div 
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:border-brand-green-dark/20 hover:shadow-2xl transition-all duration-500 group"
                                    >
                                        <div className="text-4xl font-black text-brand-green-dark/20 mb-4 group-hover:text-brand-green-dark/40 transition-colors">
                                            {event.year}
                                        </div>
                                        <span className="inline-block px-4 py-1.5 bg-brand-yellow text-brand-black rounded-full text-xs font-bold mb-4 uppercase tracking-widest shadow-sm">
                                            {t.timeline.labels[index]}
                                        </span>
                                        <h3 className="text-2xl font-bold mb-4 text-brand-black">
                                            {lang === "en" && event.titleEn ? event.titleEn : event.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {lang === "en" && event.descriptionEn ? event.descriptionEn : event.description}
                                        </p>
                                    </motion.div>
                                </div>
                                
                                {/* Spacer for desktop */}
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <SlideUpFadeIn className="text-center mt-24">
                    <Link
                        href="/campaigns"
                        className="inline-flex items-center px-10 py-4 bg-brand-green-dark text-white rounded-full font-bold hover:bg-brand-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
                    >
                        {t.timeline.cta}
                        <svg
                            className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>
                    </Link>
                </SlideUpFadeIn>
            </div>
        </section>
    );
}
