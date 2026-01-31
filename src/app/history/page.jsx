"use client";

import { useState } from "react";
import { ScrollText, Scale, FileText, Star, Circle } from "lucide-react";

export default function History() {
  const [selectedYear, setSelectedYear] = useState(1995);

  const timeline = [
    {
      year: 1995,
      title: "การก่อตั้งสมัชชาคนจน",
      description:
        "เกิดจากการรวมตัวของประชาชนผู้ยากไร้ที่ได้รับผลกระทบจากโครงการพัฒนาของรัฐ โดยเฉพาะโครงการเขื่อนขนาดใหญ่ เป็นจุดเริ่มต้นของการต่อสู้เพื่อสิทธิและความยุติธรรม",
      highlights: [
        "การชุมนุมครั้งแรกของกลุ่มประชาชนผู้ได้รับผลกระทบ",
        "การก่อตั้งเครือข่ายชุมชนระดับภูมิภาค",
        "การเรียกร้องให้รัฐรับผิดชอบต่อผลกระทบ",
      ],
    },
    {
      year: 1997,
      title: "ประกาศเขื่อนถิ่น",
      description:
        "การชุมนุมครั้งประวัติศาสตร์ที่กรุงเทพฯ นำไปสู่การประกาศเขื่อนถิ่น เป็นหนึ่งในเหตุการณ์สำคัญที่แสดงให้เห็นถึงพลังของการรวมตัวของประชาชน",
      highlights: [
        "การชุมนุมของประชาชนนับหมื่นคน",
        "การเจรจากับรัฐบาลเพื่อหาทางออก",
        "การประกาศเขื่อนถิ่นอย่างเป็นทางการ",
      ],
    },
    {
      year: 2000,
      title: "การขยายเครือข่าย",
      description:
        "การขยายเครือข่ายไปยังประเด็นอื่นๆ นอกเหนือจากเขื่อน รวมถึงปัญหาที่ดิน ทรัพยากรธรรมชาติ และสิทธิชุมชน",
      highlights: [
        "การรวมกลุ่มประเด็นที่ดินทำกิน",
        "การต่อสู้เรื่องป่าชุมชน",
        "การสร้างเครือข่ายทั่วประเทศ",
      ],
    },
    {
      year: 2010,
      title: "การต่อสู้ยังคงดำเนินต่อ",
      description:
        "แม้จะเผชิญกับอุปสรรคมากมาย แต่สมัชชาคนจนยังคงดำเนินการต่อสู้เพื่อความยุติธรรมและสิทธิของประชาชน",
      highlights: [
        "การรณรงค์เรื่องรัฐธรรมนูญคนจน",
        "การเคลื่อนไหวด้านสิทธิที่ดิน",
        "การสร้างความเข้มแข็งให้กับชุมชน",
      ],
    },
    {
      year: 2023,
      title: "ปัจจุบัน",
      description:
        "สมัชชาคนจนยังคงเป็นเสียงของคนจนและผู้ด้อยโอกาส ต่อสู้เพื่อความยุติธรรมทางสังคม และสิทธิขั้นพื้นฐานของประชาชน",
      highlights: [
        "การรณรงค์ต่อเนื่องในประเด็นต่างๆ",
        "การสร้างพลังประชาชนในระดับฐานราก",
        "การเชื่อมโยงกับเครือข่ายระดับนานาชาติ",
      ],
    },
  ];

  const selectedTimeline = timeline.find((t) => t.year === selectedYear);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            TIMELINE
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            ประวัติศาสตร์
            <br />
            และเส้นทางการต่อสู้
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl">
            เรื่องราวของการเคลื่อนไหวเพื่อความยุติธรรมตลอด 3 ทศวรรษ
            จากจุดเริ่มต้นสู่พลังที่เข้มแข็ง
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              เส้นทางการต่อสู้
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
          </div>

          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {timeline.map((item) => (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${selectedYear === item.year
                  ? "bg-brand-green-dark text-white shadow-lg shadow-brand-green-dark/30 scale-110"
                  : "bg-white text-gray-500 hover:bg-gray-100 hover:text-brand-green-dark border border-gray-200"
                  }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          {selectedTimeline && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-5xl mx-auto border border-gray-100 relative overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-light/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                  <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-green-dark to-brand-green-medium opacity-20 md:opacity-100">
                    {selectedTimeline.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                      {selectedTimeline.title}
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                      {selectedTimeline.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h4 className="text-lg font-bold mb-6 text-brand-green-dark flex items-center">
                    <span className="w-8 h-8 bg-brand-green-dark text-white rounded-full flex items-center justify-center mr-3">
                      <Star className="w-4 h-4" />
                    </span>
                    เหตุการณ์สำคัญ
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTimeline.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start p-3 bg-white rounded-xl shadow-sm"
                      >
                        <span className="text-brand-red mr-3 mt-1">
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

      {/* Declarations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
                เอกสารประวัติศาสตร์
              </h2>
              <p className="text-gray-600 text-lg">
                หลักฐานและบันทึกสำคัญของการต่อสู้
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "ประกาศเขื่อนถิ่น",
                desc: "เอกสารสำคัญจากการชุมนุมปี 2540",
                icon: <ScrollText className="w-8 h-8 text-brand-green-dark" />,
              },
              {
                title: "รัฐธรรมนูญคนจน",
                desc: "ข้อเรียกร้องและวิสัยทัศน์ของประชาชน",
                icon: <Scale className="w-8 h-8 text-brand-green-dark" />,
              },
              {
                title: "บันทึกการชุมนุม",
                desc: "เอกสารบันทึกการชุมนุมครั้งสำคัญ",
                icon: <FileText className="w-8 h-8 text-brand-green-dark" />,
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-brand-green-light/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {doc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{doc.desc}</p>
                <button className="flex items-center text-brand-red font-bold group-hover:translate-x-2 transition-transform">
                  ดาวน์โหลด PDF
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-20 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern/pattern-green.svg')] opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                คลังข้อมูล
                <br />
                และงานวิจัย
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                รวบรวมเอกสาร รายงาน
                และงานวิจัยที่เกี่ยวข้องกับการเคลื่อนไหวของสมัชชาคนจน
                เพื่อเป็นฐานข้อมูลสาธารณะ
              </p>
              <button className="bg-brand-yellow text-brand-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                ดูคลังข้อมูลทั้งหมด
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="space-y-6">
                  {[
                    {
                      title: "รายงานการศึกษาผลกระทบจากโครงการเขื่อน",
                      size: "2.5 MB",
                      date: "2023",
                    },
                    {
                      title: "ประวัติศาสตร์การเคลื่อนไหวของสมัชชาคนจน",
                      size: "4.1 MB",
                      date: "2022",
                    },
                    {
                      title: "สิทธิชุมชนและการจัดการทรัพยากร",
                      size: "1.8 MB",
                      date: "2023",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-start">
                        <div className="bg-brand-red/20 p-3 rounded-lg mr-4 text-brand-red">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1 text-gray-100">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            PDF • {item.size} • อัพเดทล่าสุด: {item.date}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
