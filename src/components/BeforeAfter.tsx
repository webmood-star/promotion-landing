"use client";

import {
  Smartphone,
  MousePointerClick,
  AlertTriangle, // ✅ 추가
  HeartHandshake,
} from "lucide-react";

export default function HomeSiteSection() {
  const cardClass =
    "bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition";

  const rowBad = "flex items-center gap-3 text-slate-700"; // 안 좋은 예
  const rowGood = "flex items-center gap-3 text-slate-900 font-semibold"; // 좋은 예

  return (
    <section id="homepage" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* 타이틀 */}
        <header className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            차이가 보이시나요?
          </h2>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* ❌ 안 좋은 예 */}
          <div className={cardClass}>
            <div className="relative w-full h-80 overflow-hidden">
              <video
                src="/videos/bad-example-male.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className={rowBad}>
                <AlertTriangle size={22} className="text-red-500" />
                홈페이지 없음 → 탐색 기회 없음
              </div>
              <div className={rowBad}>
                <AlertTriangle size={22} className="text-red-500" />
                과도한 팝업 → 신뢰 하락
              </div>
              <div className={rowBad}>
                <AlertTriangle size={22} className="text-red-500" />
                복잡한 화면 → 예약 포기
              </div>
              <div className={rowBad}>
                <AlertTriangle size={22} className="text-red-500" />
                브랜딩 부재 → 전문성 부재
              </div>
            </div>
          </div>

          {/* ✅ 좋은 예 */}
          <div className={cardClass}>
            <div className="relative w-full h-80 overflow-hidden">
              <video
                src="/videos/good-example-male.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className={rowGood}>
                <Smartphone size={30} className="text-medi" />
                모바일 최적화 화면 → 신규 환자 유입 증가
              </div>
              <div className={rowGood}>
                <MousePointerClick size={30} className="text-medi" />
                예약 버튼 중심 배치 → 예약 전환 상승
              </div>
              <div className={rowGood}>
                <AlertTriangle size={30} className="text-medi" />
                브랜딩 강화 → 전문의 이미지 구축
              </div>
              <div className={rowGood}>
                <HeartHandshake size={30} className="text-medi" />
                환자 중심 화면 구성 → 방문 결정 유도
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}