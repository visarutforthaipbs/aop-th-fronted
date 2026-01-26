import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ featuredCampaign }) {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-section-image.jpg"
                    alt="สมัชชาคนจน"
                    fill
                    priority
                    className="object-cover scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-green-dark/90 via-brand-green-dark/60 to-brand-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
                        3 ทศวรรษแห่งการต่อสู้
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-[1.8] drop-shadow-xl">
                        {featuredCampaign?.title?.rendered || "รัฐธรรมนูญคนจน"}
                    </h1>
                    <div
                        className="text-xl md:text-2xl mb-10 leading-relaxed text-gray-100 font-light max-w-3xl mx-auto drop-shadow-md"
                        dangerouslySetInnerHTML={{
                            __html:
                                featuredCampaign?.excerpt?.rendered ||
                                "องค์กรเครือข่ายประชาชนผู้ยากไร้ เพื่อการต่อสู้เพื่อความยุติธรรมและสิทธิขั้นพื้นฐาน",
                        }}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/campaigns"
                            className="inline-flex items-center justify-center bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-brand-red/50 hover:-translate-y-1 text-lg"
                        >
                            ดูงานรณรงค์ทั้งหมด
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 text-lg"
                        >
                            รู้จักเราให้มากขึ้น
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
