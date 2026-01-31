import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ featuredCampaign }) {
    return (
        <section className="relative min-h-screen flex flex-col pt-24 bg-brand-primary overflow-hidden">
            {/* Top Navigation / Content Container */}
            <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">

                {/* Main English Title */}
                <div className="w-full text-center mt-8">
                    <h1 className="font-bold text-brand-secondary leading-[0.85] tracking-tight
                        text-[12vw] xl:text-[200px] flex flex-col items-center justify-center">
                        <span>ASSEMBLY</span>
                        <span>OF THE POOR</span>
                    </h1>
                </div>

                {/* Bottom Section Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-[-5%] lg:mt-[-8%]">

                    {/* Left: Thai Title */}
                    <div className="lg:col-span-3 text-left self-end mb-32 lg:mb-56 pl-4 order-2 lg:order-1">
                        <h2 className="text-[#004232] font-bold leading-[0.9] text-[20vw] lg:text-[140px]">
                            สมัชชา<br />คนจน
                        </h2>
                    </div>

                    {/* Center: Illustration */}
                    <div className="lg:col-span-6 flex justify-center items-end relative z-20 order-1 lg:order-2">
                        <div className="relative w-full max-w-[1000px] aspect-square">
                            <Image
                                src="/images/hero-img-home.svg"
                                alt="Assembly of the Poor Illustration"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Description & Button */}
                    <div className="lg:col-span-3 flex flex-col items-start gap-6 self-end mb-32 lg:mb-56 pr-4 order-3 lg:order-3">
                        <p className="text-[#004232] text-sm md:text-base lg:text-sm font-medium leading-relaxed opacity-90">
                            สมัชชาคนจน เป็นเครือข่ายชาวบ้านคนจนจากชุมชนท้องถิ่นต่างๆ
                            ที่ได้รับผลกระทบจากการพัฒนาของรัฐ ที่เกิดขึ้นท่ามกลางการแย่งชิงทรัพยากรธรรมชาติ
                            อาทิ ดิน น้ำ ป่า ระหว่างภาครัฐและเอกชนกับชาวบ้านที่อยู่ในชุมชนท้องถิ่นทั้งในชนบทและในเมือง
                            อันเป็นนโยบาย โครงการพัฒนาของรัฐ กฎหมาย ฯลฯ ที่รุกรานวิถีชีวิต
                            ละเมิดสิทธิในการจัดการทรัพยากรของชุมชนท้องถิ่นทำลายวัฒนธรรมที่แตกต่างหลากหลาย..
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center bg-brand-accent hover:bg-[#004a25] text-white text-sm font-bold px-6 py-2 rounded-full transition-all duration-300"
                        >
                            อ่านต่อ
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
