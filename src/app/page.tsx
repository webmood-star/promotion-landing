import Hero from "@/components/Hero";
import PromoAndPitch from "@/components/PromoAndPitch";
import TrustSection from "@/components/TrustSection";
import PatientVoices from "@/components/PatientVoices";
import BeforeAfter from "@/components/BeforeAfter";
import BenefitSection from "@/components/Benefit";
import Cases from "@/components/Cases";
import ValueColumns from "@/components/ValueColumns";
import Process from "@/components/Process";
import Faq from "@/components/Faq"; // ✅ 추가
import FeaturesSection from "@/components/Features";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>로딩 중...</div>}>
        <Hero />
        <PromoAndPitch />
        <TrustSection />
        <PatientVoices />
        <BeforeAfter />
        <BenefitSection />
        <Cases />
        <ValueColumns />
        <Process />
        <Faq /> {/* ✅ Process 밑에 삽입 */}
        <FeaturesSection />
        <Footer />
      </Suspense>
    </main>
  );
}