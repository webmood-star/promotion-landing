// C:\projects\promotion-landing\src\components\PatientVoices.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const messages = [
  { 
    desktop: "플레이스는 있지만, 홈페이지가 없잖아.\n정보는 어디서 확인해야 하지?",
    mobile: "플레이스는 있지만,\n홈페이지가 없잖아.\n정보는 어디서 확인해야 하지?",
    img: "/images/people1.png" 
  },
  { 
    desktop: "여기는 이벤트 홍보만 하네. 진료는 잘하는 거 맞아?",
    mobile: "여기는 이벤트 홍보만 하네.\n진료는 잘하는 거 맞아?",
    img: "/images/people2.png" 
  },
  { 
    desktop: "모바일로 보기에 홈페이지가 답답한 느낌이야.\n예약은 잘 되는건가?",
    mobile: "모바일로 보기에\n홈페이지가 답답한 느낌이야.\n예약은 잘 되는건가?",
    img: "/images/people3.png" 
  },
];

const TAIL_STROKE = "#cbd5e1"; // slate-300
const BUBBLE_MAX_W = "sm:max-w-[640px]"; // ✅ 상한 너비만 설정(고정폭 X)

function TailSVG({ side }: { side: "left" | "right" }) {
  const pos = side === "left" ? "left-[-7px]" : "right-[-7px]";
  return (
    <svg
      aria-hidden
      className={`absolute top-1/2 -translate-y-1/2 ${pos} pointer-events-none`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        rx="2"
        fill="white"
        stroke={TAIL_STROKE}
        strokeWidth="1"
        transform="rotate(45 7 7)"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}

export default function PatientVoices() {
  return (
    <section className="bg-white py-24 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10"> {/* ✅ 모바일 여백 확보 */}
        <ul className="space-y-12 sm:space-y-16"> {/* ✅ 모바일 세로 간격 살짝 축소 */}
          {messages.map((msg, i) => {
            const isRight = i % 2 === 1;
            const side = isRight ? "right" : "left";

            return (
              <li
                key={i}
                className={`flex ${isRight ? "justify-end" : "justify-start"}`} // ✅ 오른쪽 줄 밀착
              >
                <div
                  className={`flex items-start ${isRight ? "flex-row-reverse" : ""} gap-4 sm:gap-5`} // ✅ 모바일 gap 조정
                >
                  {/* 아바타 이미지 (모바일 살짝 축소) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border border-slate-300 overflow-hidden shrink-0">
                    <Image
                      src={msg.img}
                      alt="환자 아바타"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* 말풍선 래퍼: 남은 공간을 꽉 쓰도록 */}
                  <div className="relative flex-1 min-w-0"> {/* ✅ 핵심: flex-1 + min-w-0 */}
                    <TailSVG side={side as "left" | "right"} />
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: i * 0.08 }}
                      className={[
                        "max-w-full",              // ✅ 부모 안에서 100%
                        BUBBLE_MAX_W,              // ✅ 큰 화면에서만 상한
                        "rounded-2xl bg-white border border-slate-300 shadow-sm",
                        "px-5 py-4 sm:px-7 sm:py-6", // ✅ 모바일 패딩 조정
                        "text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-slate-900 font-semibold", // 
                        "whitespace-pre-line break-words", // ✅ 긴 단어 줄바꿈
                      ].join(" ")}
                    >
                      <span className="block md:hidden">{msg.mobile}</span>
                      <span className="hidden md:block">{msg.desktop}</span>
                    </motion.div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}