import { Noto_Sans_Thai_Looped } from "next/font/google"; // [NEW] Import font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// [NEW] Configure font
const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "700"], // Regular and Bold
  variable: "--font-noto-sans-thai-looped", // Define CSS variable
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
