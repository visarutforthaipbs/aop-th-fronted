import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "สมัชชาคนจน - Assembly of the Poor",
  description:
    "เว็บไซต์สมัชชาคนจน องค์กรเครือข่ายประชาชนเพื่อการต่อสู้เพื่อความยุติธรรม",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-brand-white text-brand-black">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
