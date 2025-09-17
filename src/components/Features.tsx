"use client";

import React from "react";
import { TrendingUp, Handshake, ClipboardList, Target } from "lucide-react";
import { trackCTA } from "@/lib/gtag";

type FeatureItem = { icon: React.ElementType; title: string; desc: string };

const features: FeatureItem[] = [
  { icon: TrendingUp,    title: "성장을 이끄는 Guide",     desc: "트렌드 분석을 바탕으로\n유입 전환 전략을 제시합니다." },
  { icon: Handshake,     title: "신뢰 기반 Partnership",   desc: "24시간 연락 가능한 연락처로\n고객과 소통합니다." },
  { icon: ClipboardList, title: "투명한 Process",         desc: "홈페이지 제작 과정을\n투명하게 공유합니다." },
  { icon: Target,        title: "맞춤형 Website",         desc: "병원 규모·진료과목에 맞는\n1:1 제작으로 신환율을 높입니다." },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경: 은은한 워시 + 라디얼 글로우 유지 */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-medi/10 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900"
          style={{ textWrap: "balance" as any }}
        >
          병원 성장의 첫걸음을 함께하겠습니다
        </h2>

        <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              tabIndex={0}
              className="
                p-8 rounded-2xl bg-white/90 backdrop-blur-[2px]
                border border-medi/40 hover:border-medi/50
                shadow-sm hover:shadow-md hover:-translate-y-0.5
                transition-colors transition-transform
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medi/40
                text-center
              "
            >
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-medi/10 text-medi">
                <f.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed whitespace-pre-line break-keep">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
  <a
    href="https://naver.me/x4GOmaGM"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA("End")}   // ✅ 추적 코드 추가
    className="inline-flex items-center justify-center bg-medi text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-sm hover:shadow-md hover:translate-y-[-1px] transition"
  >
    빠르게 상담 받기
  </a>
</div>
      </div>
    </section>
  );
}