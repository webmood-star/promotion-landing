// C:\projects\promotion-landing\src\components\TermsContent.tsx
"use client";

import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function TermsContent() {
  const router = useRouter();

  return (
    <>
      <Hero />

      <section className="bg-slate-50 border-b border-slate-200 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-slate-800">이용 약관 및 정책</h1>
          <p className="mt-2 text-slate-600 text-sm">
            Webmood Medi 서비스 이용에 대한 약관과 개인정보 처리 방침을 안내합니다.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-16 text-slate-700 leading-relaxed">
        <section className="space-y-6 text-sm">
          <h2 className="text-lg font-semibold">1. 이용 목적</h2>
          <p>
            본 서비스는 홈페이지 제작 및 상담 목적에 한해 운영됩니다. 
            네이버 폼을 통해 제출된 정보는 상담 및 안내를 위해서만 사용됩니다.
          </p>

          <h2 className="text-lg font-semibold">2. 개인정보 처리</h2>
          <p>
            네이버 폼을 통해 수집된 개인정보는 Webmood Medi가 직접
            보관하지 않으며, 상담 완료 후 네이버 정책에 따라 처리됩니다.
            당사는 별도로 제3자에게 정보를 제공하지 않습니다.
          </p>

          <h2 className="text-lg font-semibold">3. 면책</h2>
          <p>
            본 서비스는 상담 목적에 한정되며, 이용자가 제공한 정보에 따라
            발생한 결과에 대해 법적 책임을 지지 않습니다.
          </p>

          <h2 className="text-lg font-semibold">4. 문의</h2>
          <p>
            추가 문의는 아래 이메일을 통해 연락해 주시기 바랍니다. <br />
            <a href="mailto:webmood@example.com" className="text-medi underline">
              webmood@naver.com
            </a>
          </p>
        </section>

        <div className="mt-12 text-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
          >
            ← 뒤로가기
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
