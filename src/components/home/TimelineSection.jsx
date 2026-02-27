import Link from "next/link";
import { StaggerContainer, StaggerItem, SlideUpFadeIn } from "@/components/animations/ScrollAnim";
import { timelineData } from "@/data/timeline";

export default function TimelineSection() {
    // Select specific years to feature on the homepage
    const featuredYears = [1995, 1997, 2023];
    const featuredEvents = featuredYears.map(year => timelineData.find(item => item.year === year));
    const labels = ["จุดเริ่มต้น", "ประวัติศาสตร์", "ปัจจุบัน"];

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SlideUpFadeIn className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#004232] mb-4">
                        3 ทศวรรษแห่งการต่อสู้
                    </h2>
                    <div className="w-20 h-1.5 bg-brand-green-dark mx-auto rounded-full"></div>
                </SlideUpFadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {featuredEvents.map((event, index) => (
                        <StaggerItem key={index} className="bg-brand-green-dark text-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-green-dark/30 hover:-translate-y-2 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="text-6xl font-bold text-white/10 mb-6 group-hover:text-white/20 transition-colors absolute top-4 right-4">
                                {event.year}
                            </div>
                            <div className="relative z-10 mt-8">
                                <span className="inline-block px-3 py-1 bg-white text-brand-black border border-white/50 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">
                                    {labels[index]}
                                </span>
                                <h3 className="text-2xl font-bold mb-3 text-white">
                                    {event.title}
                                </h3>
                                <p className="text-white/80 leading-relaxed line-clamp-4">
                                    {event.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <SlideUpFadeIn className="text-center mt-16">
                    <Link
                        href="/campaigns"
                        className="inline-flex items-center text-brand-green-dark font-bold hover:text-brand-black transition-colors text-lg group"
                    >
                        ดูเส้นทางประวัติศาสตร์ทั้งหมด
                        <svg
                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>
                    </Link>
                </SlideUpFadeIn>
            </div>
        </section>
    );
}
