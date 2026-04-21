"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Circle, ExternalLink } from "lucide-react";
import { timelineData as timeline } from "@/data/timeline";
import { useTranslation } from "@/context/LanguageContext";

export default function About() {
  const [selectedYear, setSelectedYear] = useState(1995);

  const { lang, t } = useTranslation();

  const selectedTimeline = timeline.find((t) => t.year === selectedYear);

  const displayYear = (year) => lang === "th" ? year + 543 : year;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-dark/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-secondary text-brand-black border border-brand-yellow/50 text-sm font-bold uppercase tracking-wider mb-6">
              {t.about.badge}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.about.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              {t.about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-green-dark">
              {t.about.story.heading}
            </h2>
            <div className="w-24 h-1.5 bg-brand-green-dark mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            {lang === "en" ? (
              <>
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-brand-green-dark first-letter:mr-3 first-letter:float-left">
                  The &ldquo;Assembly of the Poor&rdquo; is a network of poor villagers from various local communities
                  who have been impacted by state-driven development — arising amid the contest over natural resources
                  such as land, water, and forests between the state, private sector, and local communities in both
                  rural and urban areas, through policies, development projects, and laws that encroach on livelihoods,
                  violate communities&apos; rights over resource management, and destroy diverse cultural identities.
                </p>
                <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-black my-8 italic text-gray-700">
                  <p className="mb-0">
                    &quot;The Assembly of the Poor was officially founded on December 10, 1995 (International Human
                    Rights Day) at Thammasat University.&quot;
                  </p>
                </div>
                <p>
                  Representatives of various affected local communities from Thailand and 10 other Asian countries
                  gathered to establish the organization. They then jointly drafted the &ldquo;Mun River Declaration&rdquo;
                  or &ldquo;Pak Mun Declaration&rdquo; from December 11–14, 1995, in Khong Chiam District, Ubon Ratchathani Province.
                </p>
                <p>
                  Participants shared the view that the ideology supporting only economic growth by the state and
                  private sector is dangerous to people and to social development. Therefore, it was considered an
                  urgent necessity to revise and change perspectives, ideas, strategies, and practice in the
                  development process of both the state and private companies — toward progress for all of humanity
                  without borders.
                </p>
                <p>
                  At its founding, the Assembly of the Poor aimed to be a people&apos;s movement that harnesses the
                  power of collective cooperation, exchanges experiences, and coordinates mutual assistance in
                  advocating that the state must distribute resources to all people equally and justly, and that
                  people must have a say in determining their own future and coordinating cooperation to solve
                  the problems of AOP member groups.
                </p>
              </>
            ) : (
              <>
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-brand-green-dark first-letter:mr-3 first-letter:float-left">
                  &ldquo;สมัชชาคนจน&rdquo; เป็นเครือข่ายชาวบ้านคนจนจากชุมชนท้องถิ่นต่างๆ
                  ที่ได้รับผลกระทบจากการพัฒนาของรัฐ
                  ที่เกิดขึ้นท่ามกลางการแย่งชิงทรัพยากรธรรมชาติ อาทิ ดิน น้ำ ป่า
                  ระหว่างภาครัฐและเอกชนกับชาวบ้านที่อยู่ในชุมชนท้องถิ่นทั้งในชนบทและในเมือง
                  อันเป็นนโยบาย โครงการพัฒนาของรัฐ กฎหมาย ฯลฯ ที่รุกรานวิถีชีวิต
                  ละเมิดสิทธิในการจัดการทรัพยากรของชุมชนท้องถิ่น
                  ทำลายวัฒนธรรมที่แตกต่างหลากหลาย
                </p>
                <p>
                  สมัชชาคนจนก่อตั้งขึ้นอย่างเป็นทางการ เมื่อวันที่ 10 ธันวาคม 2538 (วันสิทธิมนุษยชนสากล)
                  ที่มหาวิทยาลัยธรรมศาสตร์ โดยมีตัวแทนชุมชนท้องถิ่นต่างๆ ที่ได้รับผลกระทบจากการพัฒนา
                  ทั้งในประเทศ และอีก 10 ประเทศในทวีปเอเชียได้เข้าร่วมกันก่อตั้ง
                  หลังจากนั้นได้ร่วมกันร่าง &ldquo;คำประกาศลำน้ำมูน&rdquo; หรือ &ldquo;ปฏิญญาปากมูน&rdquo;
                  ขึ้นในระหว่างวันที่ 11-14 ธันวาคม 2538 ณ อ.โขงเจียม จ.อุบลราชธานี
                </p>
                <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-black my-8 italic text-gray-700">
                  <p className="mb-2">
                    &ldquo;...เรามีความเห็นร่วมกันว่า แนวความคิดที่สนับสนุนแต่เพียงการเติบโตทางเศรษฐกิจของรัฐและภาคธุรกิจเอกชน
                    เป็นแนวคิดที่เป็นอันตรายต่อประชาชนและต่อการพัฒนาสังคม
                    จึงถือเป็นความจำเป็นอย่างเร่งด่วนที่จะต้องได้รับการแก้ไขและเปลี่ยนแปลงทัศนะ
                    ความคิด ยุทธศาสตร์ และการปฏิบัติในกระบวนการพัฒนาทั้งของรัฐและบริษัทเอกชนเสียใหม่
                    ตามแนวทางที่จะมุ่งไปสู่ความก้าวหน้าของมวลมนุษยชาติที่ไร้พรมแดน…&rdquo;
                  </p>
                  <p className="text-right text-sm font-semibold not-italic">(คำประกาศลำน้ำมูล, 15 ธันวาคม 2538)</p>
                </div>
                <p>
                  ในการก่อตั้ง สมัชชาคนจน จึงมีวัตถุประสงค์เพื่อเป็นขบวนการการเคลื่อนไหวของประชาชนที่รวบรวมพลังแห่งความร่วมมือ
                  แลกเปลี่ยนประสบการณ์ ประสานความช่วยเหลือซึ่งกันและกัน
                  ในการผลักดันให้ตระหนักว่า รัฐต้องจัดสรรทรัพยากรต่างๆให้ประชาชนทุกคนอย่างเท่าเทียมและเป็นธรรม
                  และให้ประชาชนมีส่วนร่วมในการกำหนดอนาคตของตนเองและประสานความร่วมมือซึ่งกันและกัน
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              {t.about.timeline.heading}
            </h2>
            <div className="w-24 h-1 bg-brand-black mx-auto rounded-full"></div>
          </div>

          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {timeline.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${selectedYear === item.year
                  ? "bg-brand-green-dark text-white shadow-[0_10px_20px_rgba(0,146,83,0.3)] -translate-y-[2px]"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-brand-green-dark border border-gray-200"
                  }`}
              >
                {displayYear(item.year)}
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          {selectedTimeline && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-5xl mx-auto border border-gray-100 relative overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                  <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-green-dark to-brand-green-dark opacity-20 md:opacity-100">
                    {displayYear(selectedTimeline.year)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                      {lang === "en" && selectedTimeline.titleEn ? selectedTimeline.titleEn : selectedTimeline.title}
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-light mb-6">
                      {lang === "en" && selectedTimeline.descriptionEn ? selectedTimeline.descriptionEn : selectedTimeline.description}
                    </p>
                    {selectedTimeline.sourceUrl && (
                      <a
                        href={selectedTimeline.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-brand-green-dark font-bold hover:underline"
                      >
                        {t.about.timeline.sourceLink}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h4 className="text-lg font-bold mb-6 text-brand-green-dark flex items-center">
                    <span className="w-8 h-8 bg-brand-green-dark text-white rounded-full flex items-center justify-center mr-3">
                      <Star className="w-4 h-4" />
                    </span>
                    {t.about.timeline.highlights}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(lang === "en" && selectedTimeline.highlightsEn ? selectedTimeline.highlightsEn : selectedTimeline.highlights).map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start p-3 bg-white rounded-xl shadow-sm"
                      >
                        <span className="text-brand-black mr-3 mt-1">
                          <Circle className="w-2 h-2 fill-current" />
                        </span>
                        <span className="text-gray-700 font-medium">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>




      {/* Link to FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/about/faq" className="group">
            <div className="bg-brand-green-dark text-brand-white p-10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-white transition-colors">
                  {t.about.faqCard.title}
                </h3>
                <p className="text-brand-white text-lg mb-8">
                  {t.about.faqCard.desc}
                </p>
              </div>
              <span className="inline-flex items-center text-brand-white font-bold group-hover:translate-x-2 transition-transform">
                {t.about.faqCard.cta}{" "}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
