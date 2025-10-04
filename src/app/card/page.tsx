"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, MessageSquare, ClipboardList } from "lucide-react";

const BRAND = {
  name: "정서희",
  title: "Web Director · 대표",
  phone: "010-3636-3683", // 표시용
  phoneHref: "01036363683", // 실제 tel 링크용 (하이픈 제거)
  logoSrc: "/images/webmood1.png",
  site: "https://www.webmoodmedi.com",
  blogSample:
    "https://example.com/brand-case?utm_source=qr_card&utm_medium=qr&utm_campaign=proposal",
  kakao: "https://open.kakao.com/o/your-link",
  form: "https://naver.me/xxF9RrGS",
};

const CATEGORIES = [
  { label: "브랜드", desc: "설문을 바탕으로 병·의원 이미지를 맞춤 반영합니다." },
  { label: "예약", desc: "환자가 바로 예약·상담을 신청하도록 흐름을 설계합니다." },
  { label: "콘텐츠", desc: "환자 입장에서 신뢰를 주는 전문 글을 작성합니다." },
];

export default function DigitalCard() {
  const [flipped, setFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="relative [perspective:1200px]">
          <div
            className={`relative h-[560px] rounded-3xl shadow-xl border bg-white transition-transform duration-500 [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* FRONT */}
            <section className="absolute inset-0 grid place-items-center px-8 [backface-visibility:hidden]">
              <div className="text-center space-y-8">
                <Image
                  src={BRAND.logoSrc}
                  alt="WEBMOOD 로고"
                  width={300}
                  height={300}
                  className="object-contain mx-auto"
                  priority
                />
                <button
                  onClick={() => setFlipped(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#00c4d1] px-6 py-3 text-white font-semibold hover:opacity-90"
                >
                  연락처 보기
                </button>
              </div>
            </section>

            {/* BACK */}
            <section className="absolute inset-0 px-6 py-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">
              {/* 소개 문구 */}
              <p className="text-xs text-slate-500 text-center">
                병·의원 전문 브랜딩 홈페이지 제작 & 블로그 대행
              </p>

              {/* 이름/직함 */}
              <div className="mt-5 text-center">
                <h2 className="text-2xl font-bold text-slate-900">{BRAND.name}</h2>
                <p className="mt-1 text-slate-600">{BRAND.title}</p>
              </div>

              {/* 전화번호 (명함 느낌: 중앙, 큼직, 아이콘 없음) */}
              <div className="mt-1 text-center">
                <a
                  href={`tel:${BRAND.phoneHref}`}
                  className="block text-lg font-semibold text-slate-900 hover:text-[#00c4d1]"
                >
                  {BRAND.phone}
                </a>
              </div>

              {/* 액션 버튼 (브랜딩 예시 → 카톡 → 네이버폼) */}
              <div className="mt-8 space-y-3">
                {/* 브랜딩 예시글 */}
                <a
                  href={BRAND.blogSample}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 py-1"
                >
                  <ExternalLink className="size-5 shrink-0" />
                  <span className="text-sm underline underline-offset-4">웹무드메디 블로그 포스팅 사례 보기</span>
                </a>

                {/* 카톡 문의 */}
                <a
                  href={BRAND.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-slate-900 py-1"
                >
                  <MessageSquare className="size-5 shrink-0" />
                  <span className="text-sm underline underline-offset-4">블로그 대행 문의하기</span>
                </a>

                {/* 네이버폼 상담신청 */}
                <a
    href={BRAND.form}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 bg-[#00c4d1] text-white font-semibold rounded-xl px-4 py-2 text-sm shadow hover:opacity-90 transition"
  >
    <ClipboardList className="size-4 shrink-0" />
    20만원 상당의 40분 컨설팅 무료로 신청하기
  </a>
</div>

              {/* 카테고리 (후킹 문구 + 칩) */}
              <div className="mt-10 text-center">
                <p className="text-sm font-semibold text-slate-800 mb-3">
                  의료 전문 콘텐츠, 브랜드 전략까지 한 번에.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === cat.label ? null : cat.label
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        activeCategory === cat.label
                          ? "bg-[#00c4d1] text-white border-[#00c4d1]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 선택된 카테고리 설명 */}
              {activeCategory && (
                <p className="mt-3 text-center text-sm text-slate-600">
                  {CATEGORIES.find((c) => c.label === activeCategory)?.desc}
                </p>
              )}

              {/* 홈페이지 주소 + 앞면으로 돌아가기 */}
              <div className="mt-4 text-center">
                <a
                  href={BRAND.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:underline"
                >
                  www.webmoodmedi.com
                </a>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setFlipped(false)}
                  className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-700"
                >
                  앞면으로 돌아가기
                </button>
              </div>
            </section>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Webmood Medi
        </p>
      </div>
    </main>
  );
}