import Link from "next/link";
import { Users, Megaphone, Newspaper } from "lucide-react";

export default function QuickLinksSection() {
    return (
        <section className="py-24 bg-brand-black text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">ร่วมขับเคลื่อนสังคม</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        พลังของประชาชนคือหัวใจของการเปลี่ยนแปลง
                        ร่วมเป็นส่วนหนึ่งในการสร้างสังคมที่เป็นธรรม
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link href="/about" className="group">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-brand-green-dark transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                <Users className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                รู้จักเรา
                            </h3>
                            <p className="text-gray-400 group-hover:text-white/90 transition-colors leading-relaxed">
                                เรียนรู้เกี่ยวกับประวัติ โครงสร้าง และอุดมการณ์ของสมัชชาคนจน
                            </p>
                        </div>
                    </Link>
                    <Link href="/campaigns" className="group">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-brand-red transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                <Megaphone className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">
                                งานรณรงค์
                            </h3>
                            <p className="text-gray-400 group-hover:text-white/90 transition-colors leading-relaxed">
                                ติดตามการเคลื่อนไหว ข้อเรียกร้อง และการต่อสู้ในประเด็นต่างๆ
                            </p>
                        </div>
                    </Link>
                    <Link href="/media" className="group">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 text-center h-full hover:-translate-y-2 flex flex-col items-center">
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 p-4 bg-white/10 rounded-full">
                                <Newspaper className="w-12 h-12 text-white group-hover:text-brand-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-black">
                                ห้องสื่อ
                            </h3>
                            <p className="text-gray-400 group-hover:text-brand-black/80 transition-colors leading-relaxed">
                                คลังความรู้ บทความ ภาพถ่าย และวิดีโอเพื่อการเผยแพร่
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
