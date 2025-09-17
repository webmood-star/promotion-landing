import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Suspense } from "react";
import Analytics from "@/components/Analytics";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webmood Medi | 병·의원 홈페이지 전문 제작",
  description: "병·의원 맞춤형 홈페이지/브랜딩/예약 전환 설계",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`h-full overflow-x-clip ${notoSans.className}`}>
      <body
        className={[
          "min-h-screen overflow-x-clip",
          "bg-white text-slate-900",
          "subpixel-antialiased",
          "selection:bg-medi/15 selection:text-slate-900",
        ].join(" ")}
      >
        {/* 전역 헤더 */}
        {/* <Header /> */}

        <main className="min-h-screen">{children}</main>

        {/* 전역 푸터 */}
        {/* <Footer /> */}

        {/* GA4 Analytics with Suspense */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}