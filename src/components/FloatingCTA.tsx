"use client";

import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();

  // /card 페이지에서는 숨김
  if (pathname.startsWith("/card")) return null;

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: "FloatingCTA",
      });
    }
    console.log("Floating CTA clicked");
  };

  return (
    <a
      href="https://naver.me/x4GOmaGM"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-medi px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:scale-105 transition"
      aria-label="상담 신청하기"
    >
      상담 신청
    </a>
  );
}