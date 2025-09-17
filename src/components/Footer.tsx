// C:\projects\promotion-landing\src\components\Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      {/* 상단 얇은 그라디언트 디바이더 */}
      <div
        aria-hidden
        className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />

      <div className="max-w-6xl mx-auto px-4 pt-12 pb-14 sm:pt-14 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 text-sm">
        {/* 회사 소개 */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Webmood Medi
          </h3>
          <p className="text-slate-600 leading-relaxed">
            웹무드 메디 오픈 이벤트는 <br />
            병·의원 특화 패키지로 제공합니다.<br />
            기간 한정 혜택, 지금 신청하세요.
          </p>
        </div>

{/* 서비스 */}
<div>
  <h3 className="text-base font-semibold text-slate-800 mb-4">
    서비스
  </h3>
  <ul className="space-y-2 text-slate-600">
    <li>병·의원 홈페이지 전문 제작</li>
    <li>
      <Link href="/terms" className="hover:text-medi">
        이용 약관 및 정책
      </Link>
    </li>
  </ul>
</div>

        {/* 문의 */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            문의하기
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <a
                href="mailto:webmood@example.com"
                className="hover:text-medi"
              >
                webmood@naver.com
              </a>
            </li>
          </ul>
        </div>

        {/* 저작권 */}
        <div>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            저작권
          </h3>
          <p className="text-slate-600 leading-relaxed">
            © {new Date().getFullYear()} Webmood Medi. <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}