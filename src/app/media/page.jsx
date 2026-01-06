import Link from "next/link";
import { FileText, Camera, Video, Book, Film, BookOpen } from "lucide-react";

export default function Media() {
  const mediaCategories = [
    {
      title: "บทความและข้อเขียน",
      description:
        "บทวิเคราะห์ บทความทางวิชาการ และข้อเขียนเกี่ยวกับการเคลื่อนไหว",
      icon: <FileText className="w-16 h-16" />,
      link: "/media/articles",
      color: "bg-brand-green-dark",
    },
    {
      title: "ภาพถ่ายและโปสเตอร์",
      description: "ภาพถ่ายจากการชุมนุม กิจกรรม และโปสเตอร์รณรงค์",
      icon: <Camera className="w-16 h-16" />,
      link: "/media/gallery",
      color: "bg-brand-green-medium",
    },
    {
      title: "วิดีโอและสารคดี",
      description: "วิดีโอบันทึกกิจกรรม สารคดี และคลิปสั้นจากโซเชียลมีเดีย",
      icon: <Video className="w-16 h-16" />,
      link: "/media/videos",
      color: "bg-brand-red",
    },
    {
      title: "หนังสือและรายงาน",
      description: "หนังสือ รายงานการวิจัย และเอกสารสำคัญที่สามารถดาวน์โหลดได้",
      icon: <Book className="w-16 h-16" />,
      link: "/media/books",
      color: "bg-brand-green-dark",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-green-dark text-brand-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-yellow border border-brand-yellow/30 text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
            MEDIA CENTER
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            ห้องสื่อสมัชชาคนจน
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto">
            คลังความรู้ เอกสาร บทความ ภาพถ่าย วิดีโอ และสื่อต่างๆ
            ที่บันทึกการต่อสู้ของเรา
          </p>
        </div>
      </section>

      {/* Media Categories Grid */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaCategories.map((category, index) => (
              <Link key={index} href={category.link} className="group">
                <div
                  className={`${category.color} text-brand-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative h-full transform hover:-translate-y-2`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:bg-white/20 transition-colors"></div>

                  <div className="p-10 relative z-10 flex flex-col h-full">
                    <div className="mb-6 bg-white/10 w-24 h-24 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                      {category.icon}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-lg mb-8 opacity-90 font-light leading-relaxed flex-grow">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center font-bold bg-white/20 py-3 px-6 rounded-full w-fit backdrop-blur-md group-hover:bg-white group-hover:text-brand-green-dark transition-all">
                      เข้าชม
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-brand-black">เนื้อหาเด่น</h2>
            <Link
              href="/media/all"
              className="text-brand-green-dark font-bold hover:underline"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="h-56 bg-brand-green-light/30 flex items-center justify-center group-hover:bg-brand-green-light/50 transition-colors">
                <FileText className="w-20 h-20 text-brand-green-dark transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-green-dark transition-colors">
                  บทความล่าสุด
                </h3>
                <p className="text-gray-600 mb-6 font-light">
                  อ่านบทวิเคราะห์และความคิดเห็นล่าสุดจากนักวิชาการและแกนนำ
                </p>
                <Link
                  href="/media/articles"
                  className="inline-block text-brand-green-dark font-bold border-b-2 border-brand-green-dark/20 hover:border-brand-green-dark transition-colors pb-1"
                >
                  อ่านเพิ่มเติม
                </Link>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="h-56 bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red/20 transition-colors">
                <Film className="w-20 h-20 text-brand-red transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-red transition-colors">
                  วิดีโอยอดนิยม
                </h3>
                <p className="text-gray-600 mb-6 font-light">
                  ชมวิดีโอที่ได้รับความสนใจมากที่สุด บันทึกเหตุการณ์สำคัญ
                </p>
                <Link
                  href="/media/videos"
                  className="inline-block text-brand-red font-bold border-b-2 border-brand-red/20 hover:border-brand-red transition-colors pb-1"
                >
                  ชมวิดีโอ
                </Link>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
              <div className="h-56 bg-brand-yellow/10 flex items-center justify-center group-hover:bg-brand-yellow/20 transition-colors">
                <BookOpen className="w-20 h-20 text-brand-yellow-dark transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-brand-black group-hover:text-brand-yellow-dark transition-colors">
                  หนังสือแนะนำ
                </h3>
                <p className="text-gray-600 mb-6 font-light">
                  ดาวน์โหลดหนังสือและรายงานสำคัญเพื่อการศึกษาค้นคว้า
                </p>
                <Link
                  href="/media/books"
                  className="inline-block text-brand-yellow-dark font-bold border-b-2 border-brand-yellow-dark/20 hover:border-brand-yellow-dark transition-colors pb-1"
                >
                  ดาวน์โหลด
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
