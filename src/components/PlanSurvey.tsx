"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { trackCTA } from "@/lib/gtag";

type TypeKey = "trust" | "trendy" | "conv";
type Choice = { label: string; type: TypeKey };
type Question = { q: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    q: "홈페이지를 제작하는 가장 큰 목적은 무엇인가요?",
    choices: [
      { label: "병원 정보와 신뢰도 강화", type: "trust" },
      { label: "병원 이미지 브랜딩", type: "trendy" },
      { label: "신규 환자 상담/예약 증가", type: "conv" },
    ],
  },
  {
    q: "주요 환자층은 어디에 가깝나요?",
    choices: [
      { label: "연령대 다양, 가족 단위 환자", type: "trust" },
      { label: "20~30대 젊은 층 비중 높음", type: "trendy" },
      { label: "특정 상담·예약 목적 환자 집중", type: "conv" },
    ],
  },
  {
    q: "첫인상에서 가장 중요한 요소는 무엇인가요?",
    choices: [
      { label: "차분하고 안정적인 분위기", type: "trust" },
      { label: "감각적이고 트렌디한 디자인", type: "trendy" },
      { label: "단순하고 직관적인 구조", type: "conv" },
    ],
  },
  {
    q: "현재 가장 부족하다고 느끼는 부분은?",
    choices: [
      { label: "의료진/병원 정보 중심 요소", type: "trust" },
      { label: "이미지·디자인 경쟁력", type: "trendy" },
      { label: "예약·상담 접근성", type: "conv" },
    ],
  },
  {
    q: "환자들이 먼저 해야 하는 행동은 무엇이라 생각하시나요?",
    choices: [
      { label: "병원·의료진 정보 확인", type: "trust" },
      { label: "이미지·비용 등으로 신뢰 확보", type: "trendy" },
      { label: "예약·상담 버튼 클릭", type: "conv" },
    ],
  },
  {
    q: "제작 시 최우선 목표를 하나 고른다면?",
    choices: [
      { label: "환자 신뢰 확보", type: "trust" },
      { label: "브랜드 이미지 차별화", type: "trendy" },
      { label: "상담·예약 전환 강화", type: "conv" },
    ],
  },
  {
    q: "운영과 관련해 가장 걱정되는 부분은?",
    choices: [
      { label: "신뢰가 부족해 보일까 걱정", type: "trust" },
      { label: "평범/촌스럽게 보일까 걱정", type: "trendy" },
      { label: "예약/상담 전환이 안될까 걱정", type: "conv" },
    ],
  },
];

// ✅ oneLiner에 \n 포함 → 렌더러에서 whitespace-pre-line로 줄바꿈 처리
const RESULT_DATA: Record<
  TypeKey,
  {
    title: string;
    oneLinerDesktop: string;
    oneLinerMobile: string;
    recLabel: string;
    recText: string;
    cta: string;
    ctaHref: string;
  }
> = {
  trust: {
    title: "신뢰형 홈페이지",
    oneLinerDesktop: "안정적이고 차분한 디자인으로 의료진·병원 정보를 강조해\n환자에게 신뢰를 전달할 수 있는 신뢰형 홈페이지가 이상적입니다.",
    oneLinerMobile: "안정적이고 차분한 디자인으로\n의료진·병원 정보를 강조해\n환자에게 신뢰를 전달할 수 있는\n신뢰형 홈페이지가 이상적입니다.",
    recLabel: "추천 유형",
    recText: "전문성을 강조하고 싶은 병·의원", 
    cta: "혜택 받고 제작하기",
    ctaHref: "https://naver.me/x4GOmaGM",
  },
  trendy: {
    title: "트렌디형 홈페이지",
    oneLinerDesktop: "세련된 비주얼과 깔끔한 레이아웃으로 젊은 환자층의 눈길을 사로잡고\n병원 이미지를 차별화할 수 있는 트렌디형 홈페이지가 이상적입니다.",
    oneLinerMobile: "세련된 비주얼과 깔끔한 레이아웃으로\n젊은 환자층의 눈길을 사로잡고\n병원 이미지를 차별화할 수 있는\n트렌디형 홈페이지가 이상적입니다.",
    recLabel: "추천 유형",
    recText: "잠재고객이 젊은층인 감각적인 병·의원",
    cta: "혜택 받고 제작하기",
    ctaHref: "https://naver.me/x4GOmaGM",
  },
  conv: {
    title: "간편 상담형 홈페이지",
    oneLinerDesktop: "직관적인 구조와 모바일 친화적인 UI로 환자가 빠르게 예약·상담을 진행할 수 있는\n간편 상담형 홈페이지가 이상적입니다.",
    oneLinerMobile: "직관적인 구조와\n모바일 친화적인 UI로\n환자가 빠르게 예약·상담을\n진행할 수 있는 홈페이지가 이상적입니다.",
    recLabel: "추천 유형",
    recText: "상담 전환이 중요한 병·의원",
    cta: "혜택 받고 제작하기",
    ctaHref: "https://naver.me/x4GOmaGM",
  },
};

export default function PlanSurvey() {
  const total = QUESTIONS.length;

  const [step, setStep] = useState<number>(0); // 0..total-1, total이면 결과
  const [counts, setCounts] = useState<Record<TypeKey, number>>({
    trust: 0,
    trendy: 0,
    conv: 0,
  });
  const [history, setHistory] = useState<TypeKey[]>([]);

  const progress = useMemo(
    () => Math.round((Math.min(step, total) / total) * 100),
    [step, total]
  );
  const isFinished = step >= total;

  // 동률일 때 최근 선택 우선, 기본 trust
  const resultType = useMemo<TypeKey>(() => {
    if (!isFinished) return "trust";
    const max = Math.max(counts.trust, counts.trendy, counts.conv);
    const tied = (["trust", "trendy", "conv"] as TypeKey[]).filter(
      (k) => counts[k] === max
    );
    if (tied.length === 1) return tied[0];
    for (let i = history.length - 1; i >= 0; i--) {
      if (tied.includes(history[i])) return history[i];
    }
    return "trust";
  }, [isFinished, counts, history]);

  const onSelect = (type: TypeKey) => {
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setHistory((prev) => [...prev, type]);
    setStep((s) => s + 1);
  };

  const onPrev = () => {
    if (step === 0) return;
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setCounts((c) => ({ ...c, [last]: Math.max(0, c[last] - 1) }));
      return prev.slice(0, -1);
    });
    setStep((s) => s - 1);
  };

  const onRestart = () => {
    setStep(0);
    setCounts({ trust: 0, trendy: 0, conv: 0 });
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 고정 바 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-14">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            홈으로 가기
          </Link>
          <div className="text-sm text-slate-400">웹무드 메디</div>
          <div className="min-w-[84px]" />
        </div>
        {/* 진행바: medi 컬러 */}
        <div className="h-1 w-full bg-slate-200">
          <div
            className="h-1 bg-medi transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {!isFinished ? (
          <QuestionStep
            index={step}
            total={total}
            data={QUESTIONS[step]}
            onSelect={onSelect}
            onPrev={onPrev}
          />
        ) : (
          <ResultView type={resultType} onRestart={onRestart} />
        )}
      </main>
    </div>
  );
}

function QuestionStep({
  index,
  total,
  data,
  onSelect,
  onPrev,
}: {
  index: number;
  total: number;
  data: Question;
  onSelect: (type: TypeKey) => void;
  onPrev: () => void;
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-medi">
          질문 {index + 1} / {total}
        </span>
        <span className="text-xs text-slate-400">
          진행률 {Math.round((index / total) * 100)}%
        </span>
      </div>

      <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">
        {data.q}
      </h2>

      <div className="mt-6 grid gap-3">
        {data.choices.map((c, i) => (
          <button
            key={i}
            onMouseDown={(e) => e.preventDefault()} // 마우스 포커스 생성 방지
            onClick={(e) => {
              (e.currentTarget as HTMLButtonElement).blur(); // 잔상 제거
              onSelect(c.type);
            }}
            className="
              w-full text-left px-5 py-4 rounded-xl
              border border-slate-200 bg-white
              hover:bg-slate-50 hover:shadow transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-medi
            "
          >
            <span className="text-slate-800">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← 이전으로
        </button>
        <span className="text-xs text-slate-400">선택 시 다음으로 이동합니다</span>
      </div>
    </section>
  );
}

function ResultView({
  type,
  onRestart,
}: {
  type: TypeKey;
  onRestart: () => void;
}) {
  const data = RESULT_DATA[type];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center">
      <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-medi text-xs font-medium">
        설문 완료
      </p>

      <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
        {data.title}
      </h2>

      {/* ✅ oneLiner 줄바꿈 적용 */}
      <p className="mt-4 whitespace-pre-line text-slate-700 leading-relaxed">
        <span className="block md:hidden">{data.oneLinerMobile}</span>
        <span className="hidden md:block">{data.oneLinerDesktop}</span>
      </p>

      {/* 추천 유형 (라벨만) */}
      <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
        <span className="text-xs font-semibold text-slate-500">{data.recLabel}</span>
        <span className="text-sm text-slate-700">{data.recText}</span>
      </div>

      {/* CTA: 한 개, medi 컬러 → 네이버 폼 새 탭 */}
      <div className="mt-8">
  <a
    href={data.ctaHref}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA("Result")}   // ✅ 추적 코드 추가
    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-medi text-white font-semibold shadow-sm hover:shadow-md hover:scale-[1.01] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-medi"
  >
    {data.cta}
  </a>
</div>

      {/* 보조 링크 */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="text-sm text-slate-500 hover:text-slate-800 underline"
        >
          다시 시작하기
        </button>
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 underline">
          홈으로 가기
        </Link>
      </div>
    </section>
  );
}