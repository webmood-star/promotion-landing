"use client";

export default function FloatingCTA() {
  const handleClick = () => {
    // ✅ GA4 / custom event 등 추적 로직
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: "FloatingCTA",
      });
    }

    // 필요 시 콘솔 확인
    console.log("Floating CTA clicked");
  };

  return (
    <a
      href="https://naver.me/x4GOmaGM"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick} // 👈 추적
      className="fixed bottom-5 right-5 z-50 rounded-full bg-medi px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:scale-105 transition"
      aria-label="상담 신청하기"
    >
      상담 신청
    </a>
  );
}