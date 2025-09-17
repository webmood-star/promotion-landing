"use client";

import { motion, useAnimation, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { MessageSquare, Brush, Code2, ShieldCheck } from "lucide-react";

type Step = { icon: JSX.Element; title: string; desc: string };

function StepCard({ icon, title, desc, index }: Step & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "0px 0px -10% 0px" });
  const controls = useAnimation();
  const prefersReduced = useReducedMotion() ?? false;
  const hasEnteredRef = useRef(false);

  // “살짝 살아있는” 파라미터 (FAQ와 동일 컨셉)
  const yInit = prefersReduced ? 0 : 24;     // 첫 진입 시작점
  const yIdle = prefersReduced ? 0 : 6;      // 화면 벗어나면 살짝 아래
  const idleOpacity = prefersReduced ? 1 : 0.9;
  const idleScale = prefersReduced ? 1 : 0.995;

  // ✅ 함수 Variant + cubic-bezier 배열(easeOut 대체) + 타입 안전
  const variants: Variants = {
    hidden: { opacity: 0, y: yInit, scale: 1 },
    enter: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReduced
        ? { duration: 0 }
        : { duration: 0.55, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] },
    }),
    reEnter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReduced ? { duration: 0 } : { duration: 0.4, ease: [0.22, 0.8, 0.2, 1] },
    },
    idle: {
      opacity: idleOpacity,
      y: yIdle,
      scale: idleScale,
      transition: prefersReduced ? { duration: 0 } : { duration: 0.3, ease: [0.2, 0, 0, 1] },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start(hasEnteredRef.current ? "reEnter" : "enter");
      hasEnteredRef.current = true;
    } else {
      controls.start("idle");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      custom={index} // ✅ enter(i) 지연에 index 사용
      className="
        relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm
        transition will-change-transform transform-gpu
        hover:shadow-md hover:-translate-y-0.5 motion-reduce:transition-none
        before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:rounded-t-2xl
        before:bg-gradient-to-r before:from-medi before:via-cyan-400 before:to-transparent
      "
    >
      <div className="flex items-start gap-4">
        <div className="grid place-items-center w-14 h-14 rounded-xl bg-medi/15 text-medi shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{title}</h3>
          <p className="mt-1 text-[15.5px] leading-7 text-slate-700 whitespace-pre-line break-keep min-h-[3.5rem]">
            {desc}
          </p>
        </div>
      </div>

      <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-medi ring-1 ring-medi/30">
        Step {index + 1}
      </span>
    </motion.div>
  );
}

export default function Process() {
  const steps: Step[] = [
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "상담 & 기획",
      desc: "병원 특성과 환자층을 분석해\n맞춤 기획안을 제시합니다.",
    },
    {
      icon: <Brush className="w-7 h-7" />,
      title: "디자인 시안",
      desc: "3일 이내에 디자인 시안을 완성하고\n무제한 수정이 가능합니다.",
    },
    {
      icon: <Code2 className="w-7 h-7" />,
      title: "개발 & 구축",
      desc: "의뢰 병·의원에 완전히 맞춘\n홈페이지를 개발합니다.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "검수 & 오픈",
      desc: "최종 검수 후 오픈 후에\n3개월 무상 보수를 지원합니다.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <header className="text-center">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900"
            style={{ textWrap: "balance" as any }}
          >
            병·의원 홈페이지, 이렇게 제작합니다
          </h2>
        </header>

        <div className="relative mt-14">
          <div className="grid grid-cols-2 gap-5 sm:gap-6 xl:gap-8">
            {steps.map((s, i) => (
              <StepCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}