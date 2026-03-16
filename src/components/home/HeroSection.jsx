"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import th from "@/locales/th";
import en from "@/locales/en";

export default function HeroSection({ featuredCampaign }) {
    const { lang } = useLanguage();
    const t = lang === "en" ? en : th;

    const titleVariantTop = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 0.95, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.2 } }
    };

    const titleVariantBottom = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 0.95, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.4 } }
    };

    const subtitleVariantLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } }
    };

    const subtitleVariantRight = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } }
    };

    const imageVariant = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 0.8 } }
    };

    return (
        <>
            {/* Mobile Hero - Static Image */}
            <section className="relative w-full md:hidden">
                <Image
                    src="/images/mobile-version-hero.jpg"
                    alt={t.hero.alt}
                    width={750}
                    height={1334}
                    className="w-full h-auto"
                    priority
                />
            </section>

            {/* Desktop Hero - Animated Layout */}
            <section className="relative min-h-[100svh] hidden md:flex flex-col items-center justify-end bg-brand-primary overflow-hidden w-full pt-20">
                {/* Background Text Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                    {/* สมัชชา - decorative design element, kept in Thai */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={titleVariantTop}
                        className="absolute top-[8%] w-full flex justify-center"
                    >
                        <h1 className="text-[#005738] font-black tracking-tighter w-full text-center text-[24vw] leading-[0.8]">
                            สมัชชา
                        </h1>
                    </motion.div>

                    {/* ASSEMBLY OF THE POOR - Flanking the center */}
                    <div className="absolute top-[45%] w-full flex justify-between px-12 max-w-7xl left-1/2 -translate-x-1/2 lg:px-24 xl:px-32 z-10 whitespace-nowrap">
                        <motion.span
                            initial="hidden"
                            animate="visible"
                            variants={subtitleVariantLeft}
                            className="text-white font-bold tracking-wider text-3xl lg:text-5xl drop-shadow-md"
                        >
                            ASSEMBLY
                        </motion.span>
                        <motion.span
                            initial="hidden"
                            animate="visible"
                            variants={subtitleVariantRight}
                            className="text-white font-bold tracking-wider text-3xl lg:text-5xl drop-shadow-md"
                        >
                            OF THE POOR
                        </motion.span>
                    </div>

                    {/* คนจน - decorative design element, kept in Thai */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={titleVariantBottom}
                        className="absolute bottom-[2%] w-full flex justify-center z-0"
                    >
                        <h1 className="text-[#005738] font-black tracking-tighter w-full text-center text-[34vw] leading-[0.75]">
                            คนจน
                        </h1>
                    </motion.div>
                </div>

                {/* Foreground Illustration Container */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={imageVariant}
                    className="relative w-full max-w-[800px] lg:max-w-[1000px] px-8 aspect-[4/3] z-10 pointer-events-none mt-auto"
                >
                    <Image
                        src="/images/hero-2.svg"
                        alt={t.hero.alt}
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </motion.div>
            </section>
        </>
    );
}
