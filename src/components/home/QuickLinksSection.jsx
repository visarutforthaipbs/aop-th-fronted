"use client";

import Link from "next/link";
import { Users, Megaphone, Newspaper } from "lucide-react";
import { StaggerContainer, StaggerItem, SlideUpFadeIn } from "@/components/animations/ScrollAnim";
import { useTranslation } from "@/context/LanguageContext";

export default function QuickLinksSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-brand-black text-white relative overflow-hidden">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "url('/pattern/pattern-green.svg')", backgroundRepeat: 'repeat' }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SlideUpFadeIn className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t.quickLinksHome.heading}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        {t.quickLinksHome.subtitle}
                    </p>
                </SlideUpFadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StaggerItem>
                        <Link href="/about" className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-brand-green-dark transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                    <Users className="w-12 h-12 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">
                                    {t.quickLinksHome.about}
                                </h3>
                                <p className="text-gray-500 group-hover:text-white/90 transition-colors leading-relaxed">
                                    {t.quickLinksHome.aboutDesc}
                                </p>
                            </div>
                        </Link>
                    </StaggerItem>

                    <StaggerItem>
                        <Link href="/campaigns" className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-brand-black transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                    <Megaphone className="w-12 h-12 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white">
                                    {t.quickLinksHome.campaigns}
                                </h3>
                                <p className="text-gray-500 group-hover:text-white/90 transition-colors leading-relaxed">
                                    {t.quickLinksHome.campaignsDesc}
                                </p>
                            </div>
                        </Link>
                    </StaggerItem>

                    <StaggerItem>
                        <Link href="/media" className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-white hover:text-brand-black transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                    <Newspaper className="w-12 h-12 text-white group-hover:text-brand-black" aria-hidden="true" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-black">
                                    {t.quickLinksHome.media}
                                </h3>
                                <p className="text-gray-500 group-hover:text-brand-black/80 transition-colors leading-relaxed">
                                    {t.quickLinksHome.mediaDesc}
                                </p>
                            </div>
                        </Link>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    );
}
