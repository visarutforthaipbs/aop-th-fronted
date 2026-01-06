import Link from "next/link";
import { MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-medium/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
              เกี่ยวกับเรา
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              รู้จักสมัชชาคนจน
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              องค์กรเครือข่ายประชาชนผู้ยากไร้
              เพื่อการต่อสู้เพื่อความยุติธรรมและสิทธิขั้นพื้นฐาน
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-green-dark">
              จาก &quot;ประชาคมเขื่อนถิ่น&quot; สู่ &quot;สมัชชาคนจน&quot;
            </h2>
            <div className="w-24 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
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
            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-brand-red my-8 italic text-gray-700">
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

      {/* Structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              เครือข่ายของประชาชน
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              สมัชชาคนจนประกอบด้วยเครือข่ายชุมชนและองค์กรประชาชนทั่วประเทศ
              แบ่งออกเป็น 7 ภูมิภาค เพื่อการประสานงานที่เข้มแข็ง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "ภาคเหนือ", desc: "เครือข่ายชุมชนภาคเหนือ" },
              { name: "ภาคตะวันออกเฉียงเหนือ", desc: "เครือข่ายชุมชนภาคอีสาน" },
              { name: "ภาคกลาง", desc: "เครือข่ายชุมชนภาคกลาง" },
              { name: "ภาคตะวันออก", desc: "เครือข่ายชุมชนภาคตะวันออก" },
              { name: "ภาคตะวันตก", desc: "เครือข่ายชุมชนภาคตะวันตก" },
              { name: "ภาคใต้", desc: "เครือข่ายชุมชนภาคใต้" },
              { name: "กรุงเทพฯ และปริมณฑล", desc: "เครือข่ายชุมชนเมือง" },
            ].map((region, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-green-dark transition-colors">
                  <MapPin className="w-6 h-6 text-brand-green-dark group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand-black group-hover:text-brand-green-dark transition-colors">
                  {region.name}
                </h3>
                <p className="text-gray-500">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links to FAQ and Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/about/faq" className="group">
              <div className="bg-brand-green-dark text-brand-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
                    คำถามที่พบบ่อย
                  </h3>
                  <p className="text-brand-green-light text-lg mb-8">
                    ค้นหาคำตอบเกี่ยวกับโครงสร้าง สมาชิกภาพ
                    และแนวทางการต่อสู้ของสมัชชาคนจน
                  </p>
                </div>
                <span className="inline-flex items-center text-brand-yellow font-bold group-hover:translate-x-2 transition-transform">
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
            <div className="bg-gray-50 text-brand-black p-10 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col justify-between">
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
