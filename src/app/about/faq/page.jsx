export default function FAQ() {
  const faqs = [
    {
      question: "สมัชชาคนจนคืออะไร?",
      answer: (
        <>
          สมัชชาคนจน (Assembly of the Poor) เป็นขบวนการเคลื่อนไหวทางสังคมและเครือข่ายชาวบ้าน (องค์การนอกภาครัฐ) ที่ก่อตั้งอย่างเป็นทางการเมื่อวันที่ 10 ธันวาคม พ.ศ. 2538 (วันสิทธิมนุษยชนสากล) ที่มหาวิทยาลัยธรรมศาสตร์ โดยรวมตัวจากกลุ่มชาวบ้านที่ได้รับผลกระทบจากโครงการพัฒนาขนาดใหญ่ของรัฐ เช่น เขื่อนปากมูล การประกาศเขตป่าไม้ ที่ดินสาธารณะ และนโยบายที่ทำให้สูญเสียวิถีชีวิต อาชีพ และทรัพยากรธรรมชาติ เป็นกระบอกเสียงให้คนจนในชนบทและเมืองในการเรียกร้องความยุติธรรมและสิทธิพื้นฐาน
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: วิกิพีเดียไทย, BBC Thai 2020, The Matter 2023)</span>
        </>
      ),
    },
    {
      question: "สมัชชาคนจนมีวัตถุประสงค์หลักอะไร?",
      answer: (
        <>
          เพื่อรวมพลังคนจนและผู้ด้อยโอกาสในการเรียกร้องสิทธิขั้นพื้นฐาน เช่น สิทธิในที่ดินทำกิน ทรัพยากรธรรมชาติ (ดิน น้ำ ป่า) การมีส่วนร่วมในการตัดสินใจนโยบายที่กระทบชีวิต และต่อต้านการพัฒนาที่ละเลยผลกระทบต่อชุมชนท้องถิ่น คำขวัญสำคัญคือ &quot;คนจนต้องกำหนดอนาคตของตัวเอง&quot; และ &quot;ประชาธิปไตยที่กินได้ การเมืองที่เห็นหัวคนจน&quot;
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: KPI Wiki, The Active ThaiPBS 2023, Living Rivers Siam)</span>
        </>
      ),
    },
    {
      question: "ใครสามารถเป็นสมาชิกหรือเข้าร่วมสมัชชาคนจนได้บ้าง?",
      answer: (
        <>
          ประชาชนทุกคนที่เห็นด้วยกับเป้าหมายและวิธีการต่อสู้แบบสันติ (เช่น การชุมนุม การเจรจา การรณรงค์) สามารถเข้าร่วมได้ โดยเฉพาะผู้ที่ได้รับผลกระทบโดยตรงจากนโยบายรัฐ เช่น เกษตรกรรายย่อย ประมงพื้นบ้าน ชาวสลัม คนงานโรงงาน และผู้เดือดร้อนจากเขื่อน/ป่าไม้ ไม่มีข้อกำหนดสมาชิกแบบทางการ แต่เน้นการมีส่วนร่วมผ่านเครือข่ายชุมชนทั่วประเทศ
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: The Matter 2023, BBC Thai 2020)</span>
        </>
      ),
    },
    {
      question: "สมัชชาคนจนดำเนินงานอย่างไร?",
      answer: (
        <>
          ดำเนินงานผ่านเครือข่ายชุมชนในภาคต่าง ๆ (เหนือ อีสาน กลาง ใต้) โดยจัดชุมนุมใหญ่ การเดินขบวน การเจรจากับรัฐบาล การยื่นข้อเรียกร้อง (เช่น 35 กรณีในปี 2562) การรณรงค์แก้กฎหมาย/รัฐธรรมนูญ และสร้างความเข้มแข็งให้ชุมชนท้องถิ่น เช่น การปักหลัก 99 วันปี 2540 หรือชุมนุมล่าสุดปี 2566 เพื่อกดดันให้รัฐแก้ปัญหา
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: Wikipedia, Prachatai, The101.world)</span>
        </>
      ),
    },
    {
      question: "จะร่วมสนับสนุนหรือช่วยเหลือสมัชชาคนจนได้อย่างไร?",
      answer: (
        <>
          สามารถสนับสนุนได้หลายรูปแบบ เช่น
          <ul className="list-disc pl-5 my-2 space-y-1">
            <li>เข้าร่วมกิจกรรม/ชุมนุม</li>
            <li>เป็นอาสาสมัครช่วยรณรงค์หรือเผยแพร่ข้อมูล</li>
            <li>บริจาคเงินหรือสิ่งของ (ผ่านช่องทางที่องค์กรประกาศ เช่น Facebook อย่างเป็นทางการ)</li>
            <li>แชร์ข้อมูลข่าวสารเพื่อสร้างความเข้าใจในสังคม</li>
          </ul>
          สมัชชาคนจนเปิดกว้างให้ประชาชนทั่วไปมีส่วนร่วมเพื่อขยายพลังเรียกร้อง
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: Facebook สมัชชาคนจน Assembly of the Poor, The Matter)</span>
        </>
      ),
    },
    {
      question: "สมัชชาคนจนมีแหล่งทุนมาจากไหน?",
      answer: (
        <>
          เป็นองค์กรไม่แสวงหากำไร อาศัยการสนับสนุนจากบริจาคของประชาชนทั่วไป สมาชิกเครือข่าย และองค์กรพัฒนาเอกชน/มูลนิธิที่เห็นคุณค่าการต่อสู้เพื่อความยุติธรรมทางสังคม ไม่ได้รับงบประมาณจากรัฐโดยตรง และเน้นความโปร่งใสในการใช้เงินเพื่อกิจกรรมเคลื่อนไหว (ข้อมูลจากแหล่งต่าง ๆ ยืนยันว่าเป็นการบริจาคจากภาคประชาสังคม ไม่มีหลักฐานการสนับสนุนจากต่างชาติแบบลับ ๆ ในเอกสารสาธารณะหลัก)
          <br /><br />
          <span className="text-sm text-gray-500">(อ้างอิง: KPI Wiki, Living Rivers Siam, และการรายงานในสื่อเช่น Prachatai)</span>
        </>
      ),
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
