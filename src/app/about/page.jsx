"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ScrollText, Scale, FileText, Star, Circle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { timelineData as timeline } from "@/data/timeline";

export default function About() {
  const [selectedYear, setSelectedYear] = useState(1995);
  const [expandedCategories, setExpandedCategories] = useState([0]); // Open first by default

  const toggleCategory = (idx) => {
    if (expandedCategories.includes(idx)) {
      setExpandedCategories(expandedCategories.filter(i => i !== idx));
    } else {
      setExpandedCategories([...expandedCategories, idx]);
    }
  };

  const selectedTimeline = timeline.find((t) => t.year === selectedYear);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-dark/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-secondary text-brand-black border border-brand-yellow/50 text-sm font-bold uppercase tracking-wider mb-6">
              เกี่ยวกับเรา
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              รู้จักสมัชชาคนจน
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              องค์กรเครือข่ายประชาชนผู้ยากไร้
              ต่อสู้เพื่อความยุติธรรมและสิทธิขั้นพื้นฐาน
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-brand-green-dark">
              จาก &quot;121 กรณีปัญหา&quot; สู่ &quot;สมัชชาคนจน&quot;
            </h2>
            <div className="w-24 h-1.5 bg-brand-green-dark mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-brand-green-dark first-letter:mr-3 first-letter:float-left">
              &ldquo;สมัชชาคนจน&rdquo; เป็นเครือข่ายชาวบ้านคนจนจากชุมชนท้องถิ่นต่างๆ
              ที่ได้รับผลกระทบจากการพัฒนาของรัฐ
              ที่เกิดขึ้นท่ามกลางการแย่งชิงทรัพยากรธรรมชาติ อาทิ ดิน น้ำ ป่า
              ระหว่างภาครัฐและเอกชนกับชาวบ้านที่อยู่ในชุมชนท้องถิ่นทั้งในชนบทและในเมือง
              อันเป็นนโยบาย โครงการพัฒนาของรัฐ กฎหมาย ฯลฯ ที่รุกรานวิถีชีวิต
              ละเมิดสิทธิในการจัดการทรัพยากรของชุมชนท้องถิ่น
              ทำลายวัฒนธรรมที่แตกต่างหลากหลาย
            </p>
            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-black my-8 italic text-gray-700">
              <p className="mb-0">
                &quot;สมัชชาคนจนก่อตั้งขึ้นอย่างเป็นทางการ เมื่อวันที่ 10 ธันวาคม
                2538 (วันสิทธิมนุษยชนสากล) ที่มหาวิทยาลัยธรรมศาสตร์&quot;
              </p>
            </div>
            <p>
              โดยมีตัวแทนชุมชนท้องถิ่นต่างๆ ที่ได้รับผลกระทบจากการพัฒนา
              ทั้งในประเทศ และอีก 10 ประเทศในทวีปเอเชียได้เข้าร่วมกันก่อตั้ง
              หลังจากนั้นได้ร่วมกันร่าง &ldquo;คำประกาศลำน้ำมูน&rdquo; หรือ &ldquo;ปฏิญญาปากมูน&rdquo;
              ขึ้นในระหว่างวันที่ 11-14 ธันวาคม 2538 ณ อ.โขงเจียม จ.อุบลราชธานี
            </p>
            <p>
              โดยผู้เข้าร่วมมีความเห็นร่วมกันว่าแนวคิดที่สนับสนุนแต่เพียงการเติบโตทางเศรษฐกิจของภาครัฐและภาคธุรกิจเอกชน
              เป็นแนวคิดที่เป็นอันตรายต่อประชาชนและต่อการพัฒนาสังคม
              จึงถือเป็นความจำเป็นอย่างเร่งด่วนที่จะต้องได้รับการแก้ไขและเปลี่ยนแปลงทัศนะ
              ความคิด ยุทธศาสตร์
              และการปฏิบัติในกระบวนการพัฒนาทั้งของรัฐและบริษัทเอกชนเสียใหม่
              ตามแนวทางที่จะมุ่งไปสู่ความก้าวหน้าของมวลมนุษยชาติที่ไร้พรมแดน
            </p>
            <p>
              ในการก่อตั้ง สมัชชาคนจน
              มีวัตถุประสงค์เพื่อเป็นขบวนการการเคลื่อนไหวของประชาชนที่รวบรวมพลังแห่งความร่วมมือ
              แลกเปลี่ยนประสบการณ์ ประสานความช่วยเหลือซึ่งกันและกัน
              ในการผลักดันให้ตระหนักว่า
              รัฐต้องจัดสรรทรัพยากรต่างๆให้ประชาชนทุกคนอย่างเท่าเทียมและเป็นธรรม
              และให้ประชาชนมีส่วนร่วมในการกำหนดอนาคตของตนเองและประสานความร่วมมือซึ่งกันและกันเพื่อการแก้ไขปัญหาของกลุ่มสมาชิกสมัชชาคนจน
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              เส้นทางการต่อสู้
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
                {item.year}
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
                    {selectedTimeline.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                      {selectedTimeline.title}
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-light mb-6">
                      {selectedTimeline.description}
                    </p>
                    {selectedTimeline.sourceUrl && (
                      <a
                        href={selectedTimeline.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-brand-green-dark font-bold hover:underline"
                      >
                        อ่านข้อมูลเพิ่มเติมจากแหล่งอ้างอิง
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
                    เหตุการณ์สำคัญ
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTimeline.highlights.map((highlight, index) => (
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


      {/* Declarations Section */}
      <section className="py-20 bg-gray-50">
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
                title: "สมุดปกดำสมัชชาคนจน",
                desc: "คู่มือประชาชนยุคไอเอ็มเอฟ (เอกสารสำคัญปี 2541 เกี่ยวกับวิกฤตเศรษฐกิจและข้อเรียกร้องของสมัชชาคนจน)",
                icon: <ScrollText className="w-8 h-8 text-brand-green-dark" />,
                links: [
                  { label: "ดูเอกสาร (ตึกทะเบียน มธ.)", url: "https://digital.library.tu.ac.th/tu_dc/frontend/Info/item/dc:273986" }
                ]
              },
              {
                title: "(ร่าง) รัฐธรรมนูญคนจน",
                desc: "เอกสารข้อเสนอเชิงนโยบายจากสมัชชาคนจน ปี 2562 เกี่ยวกับประชาธิปไตยที่กินได้",
                icon: <Scale className="w-8 h-8 text-brand-green-dark" />,
                links: [
                  { label: "ดาวน์โหลด PDF", url: "https://www.ilaw.or.th/articles/6326?download=6327" }
                ]
              },
              {
                title: "มติ ครม. และแนวทางแก้ไข",
                desc: "มติคณะรัฐมนตรีและบันทึกการประชุมอย่างเป็นทางการเกี่ยวกับการแก้ปัญหาสมัชชาคนจน",
                icon: <FileText className="w-8 h-8 text-brand-green-dark" />,
                links: [
                  { label: "มติ ครม. ปี 2543 (ข้อเรียกร้อง)", url: "https://resolution.soc.go.th/PDF_UPLOAD/2543/P_142365_3.pdf" },
                  { label: "มติ ครม. ปี 2554 (ปัญหาสำคัญ)", url: "https://www.soc.go.th/wp-content/uploads/slkupload/44v55.pdf" },
                  { label: "บันทึกการประชุม ปี 2566", url: "https://www.opm.go.th/opmportal/multimedia/phoobeas/FilePDF/Month2024/Month66-11.pdf" }
                ]
              },
              {
                title: "ประวัติศาสตร์การชุมนุม",
                desc: "เอกสารวิชาการประกอบการชุมนุมปี 2540 พัฒนาการ และยุทธศาสตร์ขจัดความยากจน",
                icon: <ScrollText className="w-8 h-8 text-brand-green-dark" />,
                links: [
                  { label: "ยุทธศาสตร์ขจัดความยากจน ปี 2544", url: "https://tdri.or.th/wp-content/uploads/2013/07/YE2001_2_01.pdf" },
                  { label: "บทที่ 3 ประวัติและการชุมนุม", url: "https://doi.nrct.go.th/admin/doc/doc_487962.pdf" }
                ]
              },
              {
                title: "เอกสารแต่งตั้งและวารสาร",
                desc: "วารสารการแก้ปัญหาและคำสั่งแต่งตั้งคณะกรรมการแก้ไขปัญหาจากข้อเรียกร้อง",
                icon: <FileText className="w-8 h-8 text-brand-green-dark" />,
                links: [
                  { label: "วารสารเกี่ยวกับสมัชชาคนจน", url: "https://www.opm.go.th/multimedia/nam/OPMbyEEW/10Magazine/6journal1_05.pdf" },
                  { label: "แต่งตั้ง กก. แก้ปัญหาเขื่อนปากมูล", url: "http://www.oic.go.th/FILEWEB/CABINFOCENTEROPM/DRAWER01/GENERAL/DATA0002/00002764.PDF" }
                ]
              }
            ].map((doc, idx) => (
              <div
                key={idx}
                className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {doc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-1">{doc.desc}</p>
                <div className="space-y-4 mt-auto pt-6 border-t border-gray-100">
                  {doc.links.map((link, lidx) => (
                    <a
                      key={lidx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-brand-black font-bold hover:text-brand-green-dark hover:translate-x-2 transition-all"
                    >
                      <span className="truncate">{link.label}</span>
                      <svg
                        className="w-4 h-4 ml-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
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
              <button className="bg-brand-yellow text-brand-black px-8 py-3 rounded-full font-bold hover:bg-white hover:-translate-y-[2px] transition-all duration-300">
                ดูคลังข้อมูลทั้งหมด
              </button>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="space-y-8">
                  {[
                    {
                      category: "รายงานการศึกษาผลกระทบจากโครงการเขื่อน",
                      documents: [
                        {
                          title: "การต่อสู้และการฟื้นฟูวิถีชีวิตผู้ได้รับผลกระทบจากเขื่อนราษีไศล",
                          size: "2 MB",
                          date: "2018",
                          url: "http://202.28.34.124/dspace/bitstream/123456789/173/1/56010181002.pdf"
                        },
                        {
                          title: "กรณีศึกษา ชุมชนลุ่มน้ำที่ได้รับผลกระทบจากการก่อสร้างเขื่อนปากมูล",
                          size: "8 MB",
                          date: "2004",
                          url: "https://elibrary.tsri.or.th/fullP/PDF4480089/PDF4480089_full.pdf"
                        },
                        {
                          title: 'แม่มูน "การกลับมาของคนหาปลา"',
                          size: "23 MB",
                          date: "ไม่ระบุ",
                          url: "https://www.livingriversiam.org/3river-thai/pm/tb_research/pmd_TBR-book.pdf"
                        }
                      ]
                    },
                    {
                      category: "ประวัติศาสตร์การเคลื่อนไหวของสมัชชาคนจน",
                      documents: [
                        {
                          title: "ประวัติการเคลื่อนไหวของชาวนาไทยจากอดีต-ปัจจุบัน",
                          size: "254 KB",
                          date: "2550",
                          url: "https://archive.lib.cmu.ac.th/full/T/2550/socde0350aw_bib.pdf"
                        },
                        {
                          title: "การเมืองบนท้องถนน 99 วัน สมัชชาคนจน และประวัติศาสตร์การเดินขบวน",
                          size: "1 MB",
                          date: "2001",
                          url: "https://tdri.or.th/wp-content/uploads/2013/07/YE2001_2_01.pdf"
                        },
                        {
                          title: "บันทึกการประชุมและปัญหาสมัชชาคนจน (สำนักนายกฯ)",
                          size: "5 MB",
                          date: "2023",
                          url: "https://www.opm.go.th/opmportal/multimedia/phoobeas/FilePDF/Month2024/Month66-11.pdf"
                        }
                      ]
                    },
                    {
                      category: "สิทธิชุมชนและการจัดการทรัพยากร",
                      documents: [
                        {
                          title: "(ร่าง) รัฐธรรมนูญคนจน",
                          size: "ไม่ระบุ",
                          date: "2562-2564",
                          url: "https://www.ilaw.or.th/articles/6326?download=6327"
                        },
                        {
                          title: "สิทธิชุมชนในการจัดการทรัพยากรธรรมชาติและสิ่งแวดล้อม",
                          size: "3 MB",
                          date: "2018",
                          url: "http://ethesisarchive.library.tu.ac.th/thesis/2018/TU_2018_5901034727_9606_10156.pdf"
                        },
                        {
                          title: "สิทธิชุมชนและการจัดการทรัพยากร (ฉบับสมบูรณ์)",
                          size: "1 MB",
                          date: "ไม่ระบุ",
                          url: "https://elibrary.tsri.or.th/fullP/RDG4210012/RDG4210012V6/RDG4210012V6_s01.pdf"
                        }
                      ]
                    }
                  ].map((cat, idx) => {
                    const isExpanded = expandedCategories.includes(idx);
                    return (
                      <div key={idx} className="mb-4 bg-brand-black/40 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                        <button
                          onClick={() => toggleCategory(idx)}
                          className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors text-left"
                        >
                          <h3 className={`text-lg sm:text-xl font-bold pr-4 transition-colors ${isExpanded ? "text-white" : "text-gray-300"}`}>
                            {cat.category}
                          </h3>
                          {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-brand-green-dark flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="space-y-2 px-5 pb-5 animate-fade-in-up">
                            {cat.documents.map((item, docIdx) => (
                              <a
                                key={docIdx}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                              >
                                <div className="flex items-start mb-2 sm:mb-0">
                                  <div className="bg-brand-black/40 p-3 rounded-lg mr-4 text-gray-500 group-hover:text-brand-green-dark transition-colors">
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
                                    <h4 className="font-bold text-lg mb-1 text-gray-100 group-hover:text-white transition-colors line-clamp-2">
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                      PDF • {item.size} • ปี: {item.date}
                                    </p>
                                  </div>
                                </div>
                                <div className="p-2 text-gray-500 group-hover:text-brand-green-dark transition-colors sm:ml-4 shrink-0">
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
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Links to FAQ and Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/about/faq" className="group">
              <div className="bg-brand-green-dark text-brand-white p-10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-white transition-colors">
                    คำถามที่พบบ่อย
                  </h3>
                  <p className="text-brand-white text-lg mb-8">
                    ค้นหาคำตอบเกี่ยวกับโครงสร้าง สมาชิกภาพ
                    และแนวทางการต่อสู้ของสมัชชาคนจน
                  </p>
                </div>
                <span className="inline-flex items-center text-brand-white font-bold group-hover:translate-x-2 transition-transform">
                  อ่านเพิ่มเติม{" "}
                  <svg
                    className="w-5 h-5 ml-2"
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
                </span>
              </div>
            </Link>
            <div className="bg-gray-50 text-brand-black p-10 rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-brand-green-dark">
                  เครือข่ายพันธมิตร
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  เราทำงานร่วมกับองค์กรภาคประชาสังคมและเครือข่ายต่างๆ
                  เพื่อขับเคลื่อนสังคมที่เป็นธรรม
                </p>
              </div>
              <span className="inline-block text-gray-400 font-medium bg-gray-200 px-4 py-2 rounded-full self-start">
                (ข้อมูลจะถูกเพิ่มเติม)
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
