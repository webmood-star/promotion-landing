"use client";

import Link from "next/link";
import { trackCTA } from "@/lib/gtag";

export default function Hero() {
  return (
    <section
      className="
         relative min-h-svh flex items-end md:items-center justify-start text-left text-white overflow-hidden pb-16 md:pb-0
      "
    >
      {/* 배경 영상 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/home-blog-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 */}
      <div
  className="
    relative z-10 px-6 md:pl-20 max-w-3xl 
    mt-0 md:mt-28
    translate-y-[-30px] md:translate-y-0  /* 👈 모바일에서만 위로 30px 올림 */
  "
>
<h1
  className="text-4xl md:text-6xl font-extrabold tracking-[-0.01em]"
  style={{ lineHeight: 1.3 }}
>
  예약이 끊이지 않는 <br />
  홈페이지를 원하세요?
</h1>

<p className="mt-4 text-xl md:text-2xl text-slate-100">
  오픈 이벤트 기간인 10월 31일까지{" "}
  <br className="md:hidden" />
  <span className="text-2xl md:text-3xl font-bold">특별 구성</span>
  으로 제공합니다.
</p>

{/* CTA 버튼 */}
<div className="mt-10 flex flex-row flex-wrap gap-4">
     <Link
      href="/survey"   // 👈 설문 전용 페이지 경로
      className="
        px-6 py-3 text-sm
        sm:px-8 sm:py-4 sm:text-xl
        rounded-lg sm:rounded-xl shadow-md sm:shadow-lg
        bg-medi text-white font-semibold
        transition-transform duration-200 hover:scale-105
        whitespace-nowrap
      "
    >
      홈페이지 유형 추천받기
    </Link>

    <Link
    href="https://naver.me/x4GOmaGM"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA("Hero")}  // 👈 Hero 라벨로 추적
    className="
      px-6 py-3 text-sm
      sm:px-8 sm:py-4 sm:text-xl
      rounded-lg sm:rounded-xl shadow-md sm:shadow-lg
      bg-white text-medi font-semibold
      transition-transform duration-200 hover:scale-105
      whitespace-nowrap
    "
  >
    혜택 받고 제작하기
  </Link>
</div>
      </div>
    </section>
  );
}
