export default function FAQ() {
  const faqs = [
    {
      question: "สมัชชาคนจนคืออะไร?",
      answer:
        "สมัชชาคนจนคือองค์กรเครือข่ายประชาชนผู้ยากไร้ที่ก่อตั้งขึ้นในปี พ.ศ. 2538 เพื่อต่อสู้เรียกร้องสิทธิขั้นพื้นฐานและความยุติธรรมให้กับประชาชนที่ได้รับผลกระทบจากนโยบายการพัฒนา",
    },
    {
      question: "สมัชชาคนจนมีวัตถุประสงค์อะไร?",
      answer:
        "เพื่อรวมพลังของคนจนและผู้ด้อยโอกาสในการเรียกร้องสิทธิในที่ดินทำกิน ทรัพยากรธรรมชาติ และการมีส่วนร่วมในการตัดสินใจที่มีผลกระทบต่อชีวิตความเป็นอยู่",
    },
    {
      question: "ใครสามารถเป็นสมาชิกสมัชชาคนจนได้บ้าง?",
      answer:
        "ประชาชนทุกคนที่เห็นด้วยกับเป้าหมายและวิธีการของสมัชชาคนจนสามารถเข้ามามีส่วนร่วมได้ โดยเฉพาะผู้ที่ได้รับผลกระทบจากนโยบายการพัฒนาและต้องการร่วมกันต่อสู้เพื่อความยุติธรรม",
    },
    {
      question: "สมัชชาคนจนดำเนินงานอย่างไร?",
      answer:
        "เราทำงานผ่านเครือข่ายชุมชนทั่วประเทศ จัดการชุมนุม การรณรงค์ การเจรจากับรัฐบาล และการสร้างความเข้มแข็งให้กับชุมชนท้องถิ่น เพื่อให้ประชาชนมีพลังในการเรียกร้องสิทธิของตนเอง",
    },
    {
      question: "จะร่วมสนับสนุนสมัชชาคนจนได้อย่างไร?",
      answer:
        "คุณสามารถร่วมสนับสนุนได้หลายรูปแบบ ทั้งการเป็นอาสาสมัคร การบริจาคเงินหรือสิ่งของ การเผยแพร่ข้อมูลข่าวสาร หรือการเข้าร่วมกิจกรรมและการชุมนุม",
    },
    {
      question: "สมัชชาคนจนมีแหล่งทุนจากไหน?",
      answer:
        "เราได้รับการสนับสนุนจากการบริจาคของประชาชนทั่วไป องค์กรพัฒนาเอกชน และมูลนิธิต่างๆ ที่เห็นคุณค่าของการต่อสู้เพื่อความยุติธรรมทางสังคม",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-green-dark text-brand-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            คำถามที่พบบ่อย
          </h1>
          <p className="text-xl">คำตอบสำหรับคำถามเกี่ยวกับสมัชชาคนจน</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-brand-green-dark">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-brand-black">
            ยังมีคำถามอื่นๆ อีกหรือไม่?
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            ติดต่อเราได้ตลอดเวลา เรายินดีที่จะตอบคำถามและให้ข้อมูลเพิ่มเติม
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-green-dark hover:bg-brand-black text-brand-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ติดต่อเรา
          </a>
        </div>
      </section>
    </div>
  );
}
