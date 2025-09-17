// C:\projects\promotion-landing\src\lib\gtag.ts

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// GA4 이벤트 공통 함수
export function gtagEvent(action: string, params?: Record<string, any>) {
  if (!GA_ID) return;
  (window as any).gtag?.("event", action, params);
}

// CTA 버튼 추적용 헬퍼
export function trackCTA(label: "Hero" | "Result" | "Package" | "End") {
  gtagEvent("cta_click", { label });
}

