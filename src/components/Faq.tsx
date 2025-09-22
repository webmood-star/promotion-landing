"use client";

import type { ReactNode } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FAQItem = {
  q: string | ReactNode;
  a: string | ReactNode;
};

const FAQS: FAQItem[] = [
  { q: "이벤트 기간은 언제까지인가요?", a: "이번 오픈 이벤트는 9월 30일까지 진행됩니다." },
  {
    q: "이벤트 혜택은 무엇인가요?",
    a: "정가 150만원 패키지를 100만원에 제공하며,\n병·의원에 특화된 추가 혜택까지 포함됩니다.",
  },
  { q: "홈페이지 제작 기간은 얼마나 걸리나요?", a: "오픈 이벤트 패키지는 10일 정도 소요되며 구성과 상황에 따라 달라질 수 있습니다." },
  { q: "신청 후 절차는 어떻게 되나요?", a: "네이버 상담폼 작성 → 맞춤 상담 → 계약 및 제작 순서로 진행됩니다." },
  { q: "결제 방법은 어떻게 되나요?", a: "이벤트 기간 내에는 현금결제만 가능합니다.\n결제 시 현금영수증을 발급해드리니 안심하고 이용하세요." },
  { q: "신청이 몰리면 조기 마감될 수도 있나요?", a: "제작 일정에 따라 조기 마감될 수 있으니 빠른 신청을 권장드립니다." },
];

export default function Faq() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 text-center">신청 전, 꼭 확인하세요</h2>

        <div className="mt-10 space-y-6">
          {FAQS.map((item, i) => (
            <FaqCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqCard({ item, index }: { item: FAQItem; index: number }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { amount: 0.35 });
    const controls = useAnimation();
    const prefersReduced = useReducedMotion();
    const [hasEntered, setHasEntered] = useState(false);
  
    // ✅ "살짝" 살아있는 느낌
    const yInit = prefersReduced ? 0 : 24; // 첫 진입 시작점 (조금만 더 멀리)
    const yIdle = prefersReduced ? 0 : 6;  // 뷰포트 벗어났을 때 대기 위치
    const idleOpacity = prefersReduced ? 1 : 0.9; // 재진입 대비 살짝 어둡게
    const idleScale = prefersReduced ? 1 : 0.995; // 아주 미세한 축소 (깜빡임 대신 생동감)
  
    const variants = {
      hidden: { opacity: 0, y: yInit, scale: 1 },
      enter: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.55, delay: index * 0.12, ease: "easeOut" },
      },
      reEnter: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.4, ease: [0.22, 0.8, 0.2, 1] }, // 살짝만 강조
      },
      idle: {
        opacity: idleOpacity, y: yIdle, scale: idleScale,
        transition: { duration: 0.3 },
      },
    } as const;
  
    useEffect(() => {
      if (inView) {
        controls.start(hasEntered ? "reEnter" : "enter");
        setHasEntered(true);
      } else {
        controls.start("idle");
      }
    }, [inView, controls, hasEntered]);
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
      >
        {/* 질문 */}
        <div className="flex items-center gap-3">
          <MessageSquare className="shrink-0 text-medi" size={28} strokeWidth={2.2} aria-hidden="true" />
          <span className="text-xl sm:text-2xl font-semibold text-slate-900">{item.q}</span>
        </div>
  
        {/* 답변 */}
        <p className="mt-3 text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
          {typeof item.a === "string" ? item.a : item.a}
        </p>
      </motion.div>
    );
  }