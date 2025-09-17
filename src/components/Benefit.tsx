"use client";

import React from "react";
import {
  MonitorSmartphone,
  MousePointerClick,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

type Item = {
  icon: React.ElementType;  // 컴포넌트 타입으로 보관
  title: string;
  img: string;
};

const reportItems: Item[] = [
  { icon: MonitorSmartphone, title: "디자인 / UX 점검",   img: "/images/diagnosis/ux.png" },
  { icon: MousePointerClick, title: "예약 / 상담 전환 구조", img: "/images/diagnosis/cta.png" },
  { icon: ClipboardList,     title: "검색 최적화 설정",   img: "/images/diagnosis/search.png" },
  { icon: ShieldCheck,       title: "브랜드 신뢰도",       img: "/images/diagnosis/brand.png" },
];

export default function BenefitSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
      확실한 기준으로 환자 신뢰를 만듭니다</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reportItems.map(({ icon: Icon, title, img }, i) => (
            <div
              key={i}
              className="relative h-52 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col items-center justify-center text-center"
            >
              <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative flex flex-col items-center justify-center">
                <div className="bg-white/80 rounded-full p-3 mb-3 inline-flex items-center justify-center">
                  <Icon size={28} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white drop-shadow">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}