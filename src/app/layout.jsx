import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import LangSync from "@/components/LangSync";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-thai-looped",
  display: "swap",
});

export const metadata = {
  title: "สมัชชาคนจน - Assembly of the Poor",
  description:
    "เว็บไซต์สมัชชาคนจน องค์กรเครือข่ายประชาชนเพื่อการต่อสู้เพื่อความยุติธรรม",
  icons: {
    icon: "/logos/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${notoSansThaiLooped.variable} font-sans bg-brand-white text-brand-black`}
      >
        <LanguageProvider>
          <LangSync />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
