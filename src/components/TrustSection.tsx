// C:\projects\promotion-landing\src\components\TrustSection.tsx
"use client";

import { Stethoscope, Users, BarChart2, Package, type LucideIcon } from "lucide-react";

type PromiseItem = {
  icon: LucideIcon;        // ✅ 아이콘 타입 교체
  title: string;
  desc: string;
};

const promises: PromiseItem[] = [
  { icon: Stethoscope, title: "병의원 전문",   desc: "의료 정책 흐름까지 반영하는\n병의원 맞춤 안전 설계" },
  { icon: Users,       title: "환자+병원",     desc: "환자와 병원을 함께 생각하는\n홈페이지 구축" },
  { icon: BarChart2,   title: "맞춤 피드백",     desc: "피드백을 바탕으로 한\n무제한 수정" },
  { icon: Package,     title: "오픈 이벤트 패키지", desc: "9월 30일까지\n오픈 이벤트 패키지 제작" },
];

export default function TrustSection() {
  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
  About
  <span className="text-medi">Webmood Medi</span>
</h2>

<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {promises.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <div className="mb-4 text-medi">
                <Icon size={40} strokeWidth={1.5} aria-hidden />  {/* ✅ 정상 */}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 whitespace-pre-line leading-relaxed max-w-xs mx-auto">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}