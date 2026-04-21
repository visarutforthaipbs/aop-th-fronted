import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FooterClient";
import { LanguageProvider } from "@/context/LanguageContext";
import LangSync from "@/components/LangSync";
import ScrollToTop from "@/components/ScrollToTop";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://assemblyofthepoor.org";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-noto-sans-thai-looped",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "สมัชชาคนจน - Assembly of the Poor",
    template: "%s | สมัชชาคนจน",
  },
  description:
    "เว็บไซต์สมัชชาคนจน องค์กรเครือข่ายประชาชนเพื่อการต่อสู้เพื่อความยุติธรรม",
  keywords: [
    "สมัชชาคนจน",
    "Assembly of the Poor",
    "สิทธิชุมชน",
    "ความยุติธรรมทางสังคม",
    "ประชาธิปไตย",
    "ชาวบ้าน",
    "ภาคประชาชน",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "/",
    siteName: "สมัชชาคนจน - Assembly of the Poor",
    title: "สมัชชาคนจน - Assembly of the Poor",
    description:
      "เว็บไซต์สมัชชาคนจน องค์กรเครือข่ายประชาชนเพื่อการต่อสู้เพื่อความยุติธรรม",
    images: [
      {
        url: "/images/mobile-version-hero.jpg",
        width: 1200,
        height: 630,
        alt: "สมัชชาคนจน - Assembly of the Poor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "สมัชชาคนจน - Assembly of the Poor",
    description:
      "เว็บไซต์สมัชชาคนจน องค์กรเครือข่ายประชาชนเพื่อการต่อสู้เพื่อความยุติธรรม",
    images: ["/images/mobile-version-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logos/favicon-white.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning className={notoSansThaiLooped.variable}>
      <body
        className={`${notoSansThaiLooped.variable} font-sans bg-brand-white text-brand-black`}
      >
        <LanguageProvider>
          <LangSync />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand-green-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
