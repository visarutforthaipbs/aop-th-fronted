"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslation } from "@/context/LanguageContext";

export default function HeroSection({ featuredCampaign }) {
    const { lang, t } = useTranslation();
    const reduced = useReducedMotion();
    const { scrollY } = useScroll();

    // Parallax transforms
    const yTop = useTransform(scrollY, [0, 500], [0, -100]);
    const yBottom = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityText = useTransform(scrollY, [0, 400], [0.95, 0]);

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
            {/* Mobile Hero - Dynamic Layout */}
            <section className="relative w-full aspect-[9/16] bg-brand-primary overflow-hidden md:hidden flex flex-col justify-end">
                {/* Pattern Background Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.2] pointer-events-none z-0"
                    style={{ 
                        backgroundImage: "url('/pattern/pattern-green.svg')",
                        backgroundSize: '300px',
                        backgroundRepeat: 'repeat'
                    }}
                ></div>

                {/* Mobile Text Overlay */}
                <div className="absolute inset-0 flex flex-col justify-start items-center p-6 pt-24 z-10 text-center pointer-events-none">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-brand-accent font-black text-[18vw] leading-none mb-1"
                    >
                        สมัชชา
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-white font-bold text-2xl tracking-widest drop-shadow-lg"
                    >
                        ASSEMBLY OF THE POOR
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-brand-accent font-black text-[28vw] leading-none mt-2"
                    >
                        คนจน
                    </motion.h1>
                </div>

                {/* Mobile Illustration */}
                <div className="relative w-full h-[45%] z-20">
                    <Image
                        src="/images/hero-2.svg"
                        alt={t.hero.alt}
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </div>
            </section>

            {/* Desktop Hero - Animated Layout */}
            <section className="relative min-h-[100svh] hidden md:flex flex-col items-center justify-end bg-brand-primary overflow-hidden w-full pt-20">
                {/* Pattern Background Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
                    style={{ 
                        backgroundImage: "url('/pattern/pattern-green.svg')",
                        backgroundSize: '600px',
                        backgroundRepeat: 'repeat'
                    }}
                ></div>

                {/* Background Text Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
                    {/* สมัชชา - decorative design element, kept in Thai */}
                    <motion.div
                        initial={reduced ? false : "hidden"}
                        animate={reduced ? false : "visible"}
                        variants={titleVariantTop}
                        style={{ y: yTop, opacity: opacityText }}
                        className="absolute top-[4%] w-full flex justify-center"
                        aria-hidden="true"
                    >
                        <h1 className="text-brand-accent font-black tracking-tighter w-full text-center text-[24vw] leading-[0.8]">
                            สมัชชา
                        </h1>
                    </motion.div>

                    {/* ASSEMBLY OF THE POOR - Flanking the center */}
                    <div className="absolute top-[45%] w-full flex justify-between px-12 max-w-7xl left-1/2 -translate-x-1/2 lg:px-24 xl:px-32 z-20 whitespace-nowrap">
                        <motion.span
                            initial={reduced ? false : "hidden"}
                            animate={reduced ? false : "visible"}
                            variants={subtitleVariantLeft}
                            className="text-white font-bold tracking-wider text-3xl lg:text-5xl drop-shadow-md"
                        >
                            ASSEMBLY
                        </motion.span>
                        <motion.span
                            initial={reduced ? false : "hidden"}
                            animate={reduced ? false : "visible"}
                            variants={subtitleVariantRight}
                            className="text-white font-bold tracking-wider text-3xl lg:text-5xl drop-shadow-md"
                        >
                            OF THE POOR
                        </motion.span>
                    </div>

                    {/* คนจน - decorative design element, kept in Thai */}
                    <motion.div
                        initial={reduced ? false : "hidden"}
                        animate={reduced ? false : "visible"}
                        variants={titleVariantBottom}
                        style={{ y: yBottom, opacity: opacityText }}
                        className="absolute bottom-[2%] w-full flex justify-center z-10"
                        aria-hidden="true"
                    >
                        <h1 className="text-brand-accent font-black tracking-tighter w-full text-center text-[34vw] leading-[0.75]">
                            คนจน
                        </h1>
                    </motion.div>
                </div>

                {/* Foreground Illustration Container */}
                <motion.div
                    initial={reduced ? false : "hidden"}
                    animate={reduced ? false : "visible"}
                    variants={imageVariant}
                    className="relative w-full max-w-[800px] lg:max-w-[1000px] px-8 aspect-[4/3] z-30 pointer-events-none mt-auto"
                >
                    <Image
                        src="/images/hero-2.svg"
                        alt={t.hero.alt}
                        fill
                        className="object-contain object-bottom"
                        priority
                        sizes="(max-width: 1024px) 800px, 1000px"
                    />
                </motion.div>
            </section>
        </>
    );
}
