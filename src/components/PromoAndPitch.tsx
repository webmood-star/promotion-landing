"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo } from "react";
import { trackCTA } from "@/lib/gtag";

/* Easing (타입 안전) */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* 컨테이너 스태거 */
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

/* 섹션/타이틀 등장 */
const item = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 14 },
  show: { opacity: 1, y: 0, transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE } },
});

/* 리스트 마이크로 모션 */
const liItem = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 6 },
  show: { opacity: 1, y: 0, transition: reduced ? { duration: 0 } : { duration: 0.35, ease: EASE } },
});

export default function OfferCompare() {
  const reduced = useReducedMotion() ?? false;
  const i = useMemo(() => item(reduced), [reduced]);
  const li = useMemo(() => liItem(reduced), [reduced]);

  return (
    <section className="relative bg-white py-16 md:py-24">
      {/* 은은한 라이트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[20rem] w-[20rem] rounded-full bg-medi/10 blur-[110px]"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* 헤드라인 */}
          <motion.h2
            variants={i}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
            style={{ textWrap: "balance" as any }}
          >
            가격은 낮추고 <span className="text-medi font-bold">혜택은 올렸습니다</span>
          </motion.h2>

          {/* 서브: 가격 비교 (밴드) */}
          <motion.div
            variants={i}
            className="mx-auto mt-4 w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-3 text-center shadow-sm"
          >
            <span className="text-sm text-slate-600">스타터 패키지</span>{" "}
            <del className="text-base font-semibold text-slate-500">1,500,000원</del>
            <span className="mx-2 text-slate-400">→</span>
            <span className="text-sm text-slate-600">오픈 이벤트 패키지</span>{" "}
            <strong className="text-lg font-extrabold text-medi">1,000,000원</strong>
          </motion.div>

          {/* 비교 카드 */}
          <motion.div
            variants={i}
            className="mx-auto mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-[0_10px_35px_rgba(2,6,23,0.05)] backdrop-blur supports-[backdrop-filter]:bg-white/70"
          >
            {/* 상단 라벨 */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[13px] font-semibold tracking-wide text-slate-500">서비스 구성 비교</p>
              <p className="text-[11px] text-slate-400">기간 한정 제공</p>
            </div>

            {/* 2열 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 왼쪽: 스타터 패키지 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-slate-700">스타터 패키지</h3>
                <motion.ul
                  variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                  className="mt-3 space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-700 list-disc pl-4"
                >
                  {[
                    "기본 4페이지",
                    "예약 버튼 제공",
                    "기본 색상 테마",
                    "제작 기간 3주 이내",
                    "무상 유지관리 1개월",
                    "기본 SEO 세팅",
                  ].map((t) => (
                    <motion.li key={t} variants={li}>
                      {t}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* 오른쪽: 오픈 이벤트 패키지 (트렌디 업그레이드) */}
              <div className="rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-md">
                {/* 헤더: 체크 배지 + 타이틀 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* 그라데이션 체크 배지 */}
                    <span
                      aria-hidden
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-medi via-medi/80 to-sky-400 text-white shadow-sm"
                    >
                      {/* 심볼을 SVG로 깔끔하게 */}
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10.5l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">오픈 이벤트 패키지</h3>
                  </div>
                  {/* 포인트 라인: 그라데이션 */}
                  <span
                    aria-hidden
                    className="h-1 w-16 rounded-full bg-gradient-to-r from-medi/80 to-medi/40"
                  />
                </div>

                {/* 리스트 */}
                <motion.ul
                  variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                  className="mt-3 space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-900"
                >
                  {[
                    "병·의원 특화 4페이지",
                    "네이버 예약 연동",
                    "카카오톡 상담 연동",
                    "브랜드 컬러 적용",
                    "맞춤 브랜딩 반영",
                    "네이버 지도 위젯 포함",
                    "무상 유지관리 3개월",
                    "검색 최적화 세팅(SEO)",
                    "10일 이내 빠른 제작",
                    "무제한 수정",
                  ].map((t) => (
                    <motion.li key={t} variants={li} className="flex items-start gap-2">
                      {/* 미니 체크 아이콘 */}
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-medi/10 text-medi"
                      >
                        <svg viewBox="0 0 20 20" className="h-3 w-3">
                          <path
                            d="M5 10.5l3 3 7-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="font-semibold">{t}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* 가격 영역 */}
                <div className="mt-5 border-t border-slate-200 pt-3">
                  <p className="text-[12px] font-medium text-slate-500">이벤트 적용가</p>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <p className="text-2xl font-extrabold tracking-tight text-medi">1,000,000원</p>
                    {/* VAT 라벨 */}
                    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500">
                      VAT 별도
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA (풀-블리드 유지) */}
<motion.div variants={i} className="mt-10 flex flex-col items-center gap-3">
  <a
    href="https://naver.me/x4GOmaGM"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA("Package")}   // ✅ 추적 코드 추가
    className="inline-flex w-full items-center justify-center rounded-2xl bg-medi px-7 py-3.5 text-lg sm:text-xl font-semibold text-white shadow-md transition will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:scale-[1.02] active:scale-[0.995]"
    aria-label="오픈 이벤트 패키지 혜택으로 제작 신청"
  >
    오픈 이벤트 패키지로 제작하기
  </a>
            <p className="text-[16px] text-slate-500">
              * 본 혜택은 신청 현황에 따라 조기 종료될 수 있습니다.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}