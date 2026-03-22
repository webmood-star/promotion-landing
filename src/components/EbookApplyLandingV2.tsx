"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { gtagEvent } from "@/lib/gtag";
import { TrendingUp } from "lucide-react";
import { ChevronsDown } from "lucide-react";

const EBOOK_URL = "https://drive.google.com/uc?export=download&id=1b84306uU5xbRYTVZ5G7HATPAoLz0g4hF";
const GUIDE_URL = "여기는 나중에 넣기";

function scrollToForm() {
  document.getElementById("apply-form")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function EbookApplyLanding() {
  const [hospitalRole, setHospitalRole] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");
  
      if (!hospitalRole.trim()) {
        setErrorMessage("병원명 / 직함을 입력해 주세요.");
        return;
      }
  
      if (!phone.trim()) {
        setErrorMessage("연락처를 입력해 주세요.");
        return;
      }
  
      if (!privacyAgree) {
        setErrorMessage("개인정보 수집·이용에 동의해 주세요.");
        return;
      }
  
      setStatus("submitting");
  
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
  
      try {
        const res = await fetch("/api/ebook-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hospitalRole,
            phone,
            marketingOptIn,
          }),
          signal: controller.signal,
        });
  
        clearTimeout(timeoutId);
  
        const data = (await res.json()) as { ok?: boolean; error?: string };
  
        if (!res.ok || !data.ok) {
          setStatus("error");
          setErrorMessage(data.error || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
          return;
        }
  
        setStatus("success");
  
        gtagEvent("generate_lead", {
          form_destination: "ebook_download",
          form_name: "webmood_ebook_apply",
        });
      } catch (error) {
        clearTimeout(timeoutId);
        setStatus("error");
  
        if (error instanceof DOMException && error.name === "AbortError") {
          setErrorMessage("응답이 지연되고 있습니다. 설정을 다시 확인해 주세요.");
          return;
        }
  
        setErrorMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    },
    [hospitalRole, phone, marketingOptIn, privacyAgree]
  );
  
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-5 py-4 text-center">
          <Image src="/webmood-logo.png" alt="웹무드메디" width={40} height={40} className="h-10 w-10 shrink-0" priority />
          <div>
            <p className="text-xl font-semibold text-medi">웹무드메디</p>
            <p className="text-l text-slate-500">병원 전문 마케팅 파트너</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-32 pt-9 md:pb-24 md:pt-14">
      <section className="text-center">
  <p className="inline-flex rounded-full border border-medi/20 bg-medi-light/50 px-3 py-1 text-base font-semibold text-medi">
    무료 전략서 + 의료 광고 필수 가이드
  </p>

  <h1 className="mt-4 text-[34px] font-black leading-tight text-slate-900">
    마케팅은 하고 있는데… <br />
    신환은 그대로예요
  </h1>

  <p className="mt-14 text-xl font-bold text-slate-800">
    이 전략서는 <br />실제 원장님들의 고민에서 시작됐습니다
  </p>

{/* 문제 이미지 */}
<div className="mt-12">
  <img src="/images/sad.png" alt="문제" className="mx-auto w-40" />
</div>

{/* 문제 박스 */}
<div className="mt-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="space-y-3 text-center">
    <p className="text-lg font-semibold leading-relaxed text-slate-800">
      광고는 하고 있는데 예약은 늘지 않아요
    </p>
    <p className="text-lg font-semibold leading-relaxed text-slate-800">
      남들 하는건 다 하는데 결과가 똑같아요
    </p>
    <p className="text-lg font-semibold leading-relaxed text-slate-800">
      대행사에 맡겼지만 여전히 불안해요
    </p>
  </div>
</div>

  <div className="mt-8 text-center">
    <p className="text-[28px] font-black leading-tight text-slate-900">
      전략서 바로 적용
    </p>
    <div className="mt-2 flex justify-center">
  <ChevronsDown className="w-12 h-12 text-slate-800 animate-bounce-slow" />
</div>
</div>

{/* 결과 이미지 */}
<div className="mt-12">
  <img src="/images/good.png" alt="결과" className="mx-auto w-44" />
</div>

{/* 결과 박스 */}
<div className="mt-2 rounded-3xl border border-medi/15 bg-medi-light/20 p-6 shadow-sm">
  <div className="space-y-3 text-center">
    <p className="text-2xl font-black leading-relaxed text-slate-900">
      신환이 점점 늘어나는 마케팅
    </p>
    <p className="text-2xl font-black leading-relaxed text-slate-900">
      광고비 대비 예약 전환 상승
    </p>
    <p className="text-2xl font-black leading-relaxed text-slate-900">
      마케팅 운영의 결정권
    </p>
  </div>
</div>

  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={scrollToForm}
      className="
        inline-flex w-full max-w-xs items-center justify-center
        rounded-xl bg-medi px-6 py-3.5 text-2xl font-semibold text-white
        shadow-[0_5px_0_0_rgba(0,0,0,0.15)]
        transition-all duration-100
        hover:bg-medi-dark
        active:translate-y-[3px] active:scale-[0.98]
        active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-medi focus-visible:ring-offset-2
      "
    >
      전략서 받고 바로 적용하기
    </button>
  </div>
</section>

<section className="mt-12 px-4 text-center">
  <div className="flex flex-col items-center">

    {/* 상단 카피 */}
    <p className="text-2xl md:text-lg font-semibold text-slate-900 mb-[-10px]">
      실제 병원 분석 데이터 기반
    </p>

    {/* 이미지 */}
    <div className="mt-[2px] mb-0 flex justify-center px-0">
      <div className="w-full max-w-none">
        <Image
          src="/images/7.png"
          alt="웹무드메디 전자책 표지"
          width={420}
          height={560}
          priority
          className="h-auto w-full object-contain scale-125"
        />
      </div>
    </div>

    {/* 메인 카피 */}
    <p className="text-2xl md:text-4xl font-semibold text-slate-700">
      마케팅 비용은 줄이고
    </p>

    <p className="mt-3 text-2xl md:text-4xl font-semibold text-slate-700 flex items-center justify-center gap-2">
      <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-red-500" />
      <span className="font-black text-4xl md:text-5xl text-slate-900 leading-none">
        예약은 늘어나는
      </span>
    </p>

    <p className="mt-3 text-2xl md:text-4xl font-semibold text-slate-700">
      병원 마케팅 성공 공식
    </p>

    <p className="mt-12 text-2xl md:text-2xl font-black text-slate-800">
      즉시 실행 가능한 전략서!
    </p>

    {/* 혜택 영역 */}
    <div className="mt-12 w-full max-w-2xl">

      <p className="text-2xl md:text-base font-semibold text-slate-700 leading-snug">
      ✔ 지금 전략서를 신청하시면
        <br />
        <span className="inline-block mt-1 font-black bg-yellow-100 px-2 py-[2px] rounded-sm text-slate-900">
          바로 적용 가능한
        </span>
      </p>

      <p className="mt-2 text-3xl font-black text-slate-900 leading-tight">
        의료광고 필수 가이드
      </p>

      <p className="mt-2 text-2xl md:text-base font-semibold text-slate-700 leading-snug">
        를{" "}
        <span className="relative inline-block px-1 pb-4">
          <span className="relative z-10">함께 제공합니다</span>

          <svg
            className="absolute left-0 bottom-[0px] w-[140%] h-7 pointer-events-none"
            viewBox="0 0 220 40"
            fill="none"
          >
            <path d="M8 14 C60 6, 120 8, 180 10" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M6 28 C62 20, 122 21, 182 23" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      </p>

      {/* 혜택 박스 */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-xl font-bold text-slate-900 leading-snug text-center">
          전략서에 담긴<br />
          <span className="inline-block text-2xl font-black leading-tight">
            특별한 혜택 3가지
          </span>
        </p>

        <ul className="mt-6 space-y-6 text-xl md:text-2xl font-semibold text-slate-900 text-left">
          <li className="flex items-start gap-3">
            <span className="text-2xl md:text-3xl">☝️</span>
            <span>병원 맞춤 황금 키워드 3개</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl md:text-3xl">✌️</span>
            <span>셀프 병원 브랜딩 시트</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl md:text-3xl">🤟</span>
            <span>환자 데이터 활용 전략</span>
          </li>
        </ul>
      </div>

      {/* 🔥 CTA 버튼 (맨 마지막) */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={scrollToForm}
          className="
            inline-flex w-full max-w-xs items-center justify-center
            rounded-xl bg-medi px-6 py-3.5 text-2xl font-semibold text-white
            shadow-[0_5px_0_0_rgba(0,0,0,0.15)]
            transition-all duration-100
            hover:brightness-95
            active:translate-y-[3px] active:scale-[0.98]
            active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-medi focus-visible:ring-offset-2
          "
        >
          무료 전략서 바로 받기
        </button>
      </div>

    </div>
  </div>
</section>
<section className="mt-12 px-4 text-center">
  <div className="mx-auto max-w-2xl">

    {/* 질문 */}
    <p className="text-3xl md:text-3xl font-black text-slate-700">
      어떤 내용이 <br />포함되어 있나요?
    </p>

    {/* 👇 이미지 (답 시작 포인트) */}
    <div className="mt-6 flex justify-center">
      <Image
        src="/images/1.png"
        alt="전략서 핵심"
        width={200}
        height={200}
        className="h-auto w-60 md:w-60
      "
      />
    </div>

    {/* 근거 */}
    <p className="mt-0 text-xl md:text-lg font-semibold text-slate-800 leading-relaxed">
      직접 분석한 200곳 이상의 <br />병원 데이터를 기반으로
    </p>

    {/* 1,2,3 */}
    <div className="mt-6 space-y-4 text-center">
      <p className="text-3xl font-semibold text-slate-900">
        바로 적용 가능한 
      </p>
      <p className="text-3xl font-semibold text-slate-900">
        환자를 부르는 
      </p>
      <p className="text-3xl font-semibold text-slate-900">
        병원 마케팅의 핵심만
      </p>
    </div>

    {/* 닫는 문장 */}
    <p className="mt-6 text-xl md:text-lg font-semibold text-slate-800 leading-relaxed">
     정리했습니다.
    </p>

    {/* CTA */}
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={scrollToForm}
        className="
          inline-flex w-full max-w-xs items-center justify-center
          rounded-xl bg-medi px-6 py-3.5 text-2xl font-semibold text-white
          shadow-[0_5px_0_0_rgba(0,0,0,0.15)]
          transition-all duration-100
          hover:brightness-95
          active:translate-y-[3px] active:scale-[0.98]
          active:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-medi focus-visible:ring-offset-2
        "
      >
        무료 전략서 바로 받기
      </button>
    </div>

  </div>
</section>
<section className="mt-4 px-4 text-center">

  <p className="mt-10 text-2xl font-semibold text-slate-600">
    👇 전략서 실제 페이지
  </p>

  <div className="mx-auto mt-4 max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <Image
      src="/images/77.png"
      alt="전자책 실제 내용 일부"
      width={900}
      height={600}
      className="h-auto w-full object-cover"
    />
  </div>

  <div className="mt-6">
    <p className="mt-4 text-xl md:text-lg font-semibold text-slate-800 text-center leading-snug">
      <span className="font-black text-2xl md:text-5xl text-slate-900 leading-none bg-yellow-100 px-2 py-0.5 rounded">
        상위 3% 병원
      </span>{" "}
      의 비밀, <br />
      내 환자의 데이터 활용법
    </p>
  </div>

</section>
<p className="mt-6 text-center text-2xl md:text-2xl font-semibold text-slate-900 animate-arrow">
👇 지금 무료로 확인해 보세요
</p>
<section id="apply-form" className="mt-6 scroll-mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8">
  <h2 className="text-center text-2xl font-bold text-slate-900">바로 링크 받기</h2>

  {status === "success" ? (
    <div className="mt-6 rounded-xl border border-medi/30 bg-white p-6 text-center">
      <p className="text-lg font-semibold text-slate-900">자료가 준비되었습니다.</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">아래 버튼을 눌러 바로 다운로드해 주세요.</p>
      <div className="mt-5 space-y-3">
        <a
          href={EBOOK_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-xl bg-medi px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-medi-dark"
        >
          전자책 다운로드
        </a>
      </div>
    </div>
  ) : (
    <form className="mx-auto mt-6 max-w-xl space-y-4" onSubmit={onSubmit} noValidate>
      <div className="text-left">
        <label htmlFor="ea-hospital-role" className="block text-xl font-medium text-slate-700">
          병원명 / 직함 <span className="text-red-600">*</span>
        </label>
        <input
          id="ea-hospital-role"
          name="hospitalRole"
          required
          placeholder="예: 웹무드치과 / 대표원장"
          value={hospitalRole}
          onChange={(e) => setHospitalRole(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-medi/30 transition focus:border-medi focus:ring-2"
        />
      </div>

      <div className="text-left">
        <label htmlFor="ea-phone" className="block text-xl font-medium text-slate-700">
          연락처 <span className="text-red-600">*</span>
        </label>
        <input
          id="ea-phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-medi/30 transition focus:border-medi focus:ring-2"
        />
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-left">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={privacyAgree}
            onChange={(e) => setPrivacyAgree(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-medi focus:ring-medi"
          />
          <span>
            <span className="font-medium text-slate-900">(필수)</span> 개인정보 수집·이용에 동의합니다.
            <span className="mt-1 block text-xs leading-relaxed text-slate-500">
              수집 항목: 병원명/직함, 연락처. 목적: 전자책 및 안내 자료 제공, 문의 응대.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(e) => setMarketingOptIn(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-medi focus:ring-medi"
          />
          <span>
            <span className="font-medium text-slate-900">(선택)</span> 병원 마케팅 인사이트·소식 수신에 동의합니다.
          </span>
        </label>
      </div>

      {errorMessage ? (
        <p className="text-center text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="
          w-full rounded-2xl bg-medi py-4 text-xl md:text-2xl font-semibold text-white
          shadow-[0_6px_0_0_rgba(0,0,0,0.15)]
          transition-all duration-150
          hover:brightness-95
          active:translate-y-[2px] active:shadow-[0_3px_0_0_rgba(0,0,0,0.15)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-medi focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {status === "submitting" ? "확인 중…" : "확인 링크 바로 받기"}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
        입력하신 정보는 외부에 공유되지 않으며,
        <br />
        자료만 받아보실 수 있습니다.
      </p>
    </form>
  )}
</section>

        <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5">
  <p className="text-center text-l leading-relaxed text-slate-600">
    웹무드메디는 병원 마케팅을 전문으로 하며<br />
    <span className="font-medium text-slate-800">
      예약 전환 중심의 전략을 설계합니다
    </span>
  </p>
</section>

        <p className="mt-10 text-center text-xs text-slate-400">© {new Date().getFullYear()} 웹무드메디</p>
      </main>

      {status !== "success" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
<button
  type="button"
  onClick={scrollToForm}
  className="
    w-full rounded-xl bg-medi py-3.5 text-3xl font-black text-white
    shadow-[0_7px_0_0_rgba(0,0,0,0.16),0_12px_24px_rgba(0,0,0,0.12)]
    transition-all duration-100
    hover:brightness-[0.97]
    active:translate-y-[3px]
    active:shadow-[0_3px_0_0_rgba(0,0,0,0.16),0_6px_12px_rgba(0,0,0,0.10)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-medi focus-visible:ring-offset-2
    animate-cta-soft
  "
>
  무료 전략서 바로 받기
</button>
        </div>
      ) : null}
    </div>
  );
}