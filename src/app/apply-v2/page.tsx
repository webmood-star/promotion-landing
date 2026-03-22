import type { Metadata } from "next";
import EbookApplyLanding from "@/components/EbookApplyLandingV2";

export const metadata: Metadata = {
  title: "병원 마케팅 전자책 PDF 신청 | 웹무드메디",
  description:
    "마케팅 비용 대비 내원이 갈리는 이유와 실패 패턴을 정리한 전자책. 신청 시 의료 광고 필수 가이드 제공.",
  openGraph: {
    title: "병원 마케팅 전자책 PDF 신청 | 웹무드메디",
    description:
      "병원 전문 마케팅 파트너 웹무드메디 — 전자책 PDF와 의료 광고 필수 가이드를 보내드립니다.",
  },
};

export default function ApplyPage() {
  return <EbookApplyLanding />;
}