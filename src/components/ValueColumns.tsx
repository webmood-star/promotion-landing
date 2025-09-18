"use client";

import { motion, useAnimation, useInView, cubicBezier, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";

type Metric = { label: string; to: number; color: string }; // 0~1
type BarCustom = { index: number; to: number };

const easeOut = cubicBezier(0.16, 1, 0.3, 1); // ✅ number[] 대신 cubicBezier 함수

const METRICS: Metric[] = [
  { label: "신환 유입", to: 0.82, color: "bg-sky-400" },
  { label: "문의 건수", to: 0.68, color: "bg-sky-300" },
  { label: "내원 환자", to: 0.90, color: "bg-medi" },
];

// ✅ Variants 타입 + custom 파라미터 명시
const barVariants: Variants = {
  hide: { scaleY: 0 },
  show: (c: BarCustom) => ({
    scaleY: c.to,
    transition: { duration: 1.0, ease: easeOut, delay: 0.08 * c.index },
  }),
};

export default function ValueColumns() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
    else controls.start("hide"); // 한 번만 재생하려면 이 줄 지우세요.
  }, [inView, controls]);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
        성장은 홈페이지에서 시작됩니다</h2>
        </header>

        <div ref={rootRef} className="mt-12">
          <div className="relative h-72 w-full rounded-2xl border border-slate-200 bg-white/80 p-6">
            <div className="flex h-full items-end justify-around gap-10">
              {METRICS.map((m, i) => (
                <div key={m.label} className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-56 rounded-t-2xl overflow-hidden bg-slate-100">
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-full ${m.color} rounded-t-2xl origin-bottom transform-gpu`}
                      variants={barVariants}
                      initial="hide"
                      animate={controls}
                      // ✅ custom은 객체로: index + to
                      custom={{ index: i, to: m.to }}
                      aria-hidden
                    />
                    <div className="absolute top-0 left-0 right-0 h-4 bg-white/30 pointer-events-none" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700 text-center">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-sky-100 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-16 -left-20 h-64 w-64 rounded-full bg-cyan-100 blur-3xl opacity-60" />
    </section>
  );
}