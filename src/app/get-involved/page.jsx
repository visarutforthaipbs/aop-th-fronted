"use client";

import { useState } from "react";
import { Handshake, Coins, Share2 } from "lucide-react";

export default function GetInvolved() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "volunteer",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (would connect to backend)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-25"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white border border-white/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            GET INVOLVED
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            ร่วมสนับสนุน
            <br />
            สมัชชาคนจน
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto">
            พลังของคุณสำคัญต่อการต่อสู้เพื่อความยุติธรรม
            ร่วมเป็นส่วนหนึ่งในการเปลี่ยนแปลงสังคม
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-black">
              วิธีการสนับสนุน
            </h2>
            <div className="w-24 h-1 bg-brand-black mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center">
              <div className="w-20 h-20 bg-gray-100/30 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Handshake className="w-10 h-10 text-brand-green-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black group-hover:text-brand-green-dark transition-colors">
                ร่วมเป็นอาสาสมัคร
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ร่วมงานกับเราในการจัดกิจกรรม การรณรงค์
                และการสร้างเครือข่ายเพื่อขับเคลื่อนประเด็นทางสังคม
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Coins className="w-10 h-10 text-white-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black group-hover:text-white-dark transition-colors">
                สนับสนุนทุนการต่อสู้
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                บริจาคเพื่อสนับสนุนกิจกรรม การเคลื่อนไหว
                และการช่วยเหลือพี่น้องผู้ได้รับผลกระทบ
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center">
              <div className="w-20 h-20 bg-brand-black/20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Share2 className="w-10 h-10 text-brand-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-black group-hover:text-brand-black transition-colors">
                เผยแพร่ข้อมูล
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ช่วยกันแชร์ข่าวสาร สร้างความตระหนักรู้
                และเป็นกระบอกเสียงให้กับผู้ที่ถูกละเมิดสิทธิ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-100/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-brand-black">
              ร่วมเป็นส่วนหนึ่งของเรา
            </h2>

            {submitted ? (
              <div className="p-8 bg-green-50 text-brand-green-dark rounded-2xl border border-green-100 text-center animate-fade-in-up">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">
                  ขอบคุณสำหรับความสนใจ!
                </h3>
                <p className="text-lg">
                  เราได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder="ระบุชื่อของคุณ"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none"
                      placeholder="08x-xxx-xxxx"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      สนใจสนับสนุนในรูปแบบ
                    </label>
                    <div className="relative">
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none appearance-none"
                      >
                        <option value="volunteer">อาสาสมัคร</option>
                        <option value="donation">บริจาคเงิน</option>
                        <option value="media">เผยแพร่ข้อมูล</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    ข้อความเพิ่มเติม
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green-dark focus:border-transparent transition-all outline-none resize-none"
                    placeholder="บอกเราว่าคุณต้องการช่วยเหลืออย่างไร หรือมีความเชี่ยวชาญด้านไหนเป็นพิเศษ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green-dark hover:bg-brand-black text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-brand-green-dark/30 hover:-translate-y-1 text-lg"
                >
                  ส่งข้อมูลสมัคร
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Donation Info */}
      <section className="py-20 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern/pattern-green.svg')] opacity-5"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            สนับสนุนทุนการต่อสู้
          </h2>
          <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto">
            การบริจาคของคุณช่วยให้เราสามารถดำเนินกิจกรรม รณรงค์
            และช่วยเหลือพี่น้องผู้ได้รับผลกระทบได้อย่างต่อเนื่อง
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 max-w-2xl mx-auto">
            <h3 className="font-bold text-2xl mb-6 text-white">
              ข้อมูลบัญชีธนาคาร
            </h3>
            <div className="space-y-4 text-left inline-block">
              <p className="text-xl md:text-2xl">
                <span className="text-gray-400 text-base block mb-1">
                  ชื่อบัญชี
                </span>
                สมัชชาคนจน
              </p>
              <div className="h-px bg-white/10 w-full my-4"></div>
              <p className="text-xl md:text-2xl">
                <span className="text-gray-400 text-base block mb-1">
                  ธนาคาร
                </span>
                (ข้อมูลจะถูกเพิ่มเติม)
              </p>
              <div className="h-px bg-white/10 w-full my-4"></div>
              <p className="text-xl md:text-2xl font-mono tracking-wider text-white">
                <span className="text-gray-400 text-base block mb-1 font-sans tracking-normal">
                  เลขที่บัญชี
                </span>
                XXX-X-XXXXX-X
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-brand-black">
              เครื่องมือรณรงค์
            </h2>
            <p className="text-gray-600 text-lg">
              ดาวน์โหลดโลโก้ โปสเตอร์ และสื่อต่างๆ เพื่อช่วยเผยแพร่
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "โลโก้และแบรนด์",
                desc: "ไฟล์โลโก้และแนวทางการใช้งาน",
                icon: "🎨",
              },
              {
                title: "โปสเตอร์รณรงค์",
                desc: "โปสเตอร์และภาพประกอบสำหรับแชร์",
                icon: "🖼️",
              },
              {
                title: "เอกสารข้อมูล",
                desc: "แผ่นพับและเอกสารประชาสัมพันธ์",
                icon: "📄",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 font-light">{item.desc}</p>
                <button className="flex items-center text-brand-black font-bold group-hover:translate-x-2 transition-transform">
                  ดาวน์โหลด
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
