// C:\projects\medi-landing\src\components\landing\reserve\Website.tsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function Website() {
  const [currentIndex, setCurrentIndex] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [
    { src: "/images/portfolio1.png", alt: "바른미소치과 홈페이지 캡처" },
    { src: "/images/portfolio2.png", alt: "고운결피부과 홈페이지 캡처" },
    { src: "/images/portfolio3.png", alt: "온담한의원 홈페이지 캡처" },
  ];

  const getActualIndex = (index: number) =>
    ((index % items.length) + items.length) % items.length;

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => setCurrentIndex((p) => p + 1), 3000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };
  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setTranslateX(clientX - startX);
  };
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 30;
    if (translateX > threshold) setCurrentIndex((i) => i - 1);
    else if (translateX < -threshold) setCurrentIndex((i) => i + 1);
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setCurrentIndex((i) => i - 1);
    else if (e.key === "ArrowRight") setCurrentIndex((i) => i + 1);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (isDragging) {
        setTranslateX(e.clientX - startX);
      }
    };
  
    const up = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const threshold = 30;
      if (translateX > threshold) setCurrentIndex((i) => i - 1);
      else if (translateX < -threshold) setCurrentIndex((i) => i + 1);
      setTranslateX(0);
    };
  
    if (isDragging) {
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
  }, [isDragging, startX, translateX]);

  // 잘림 방지를 위해 전체가 보이도록(scale down) + 여백 보호
  const getSlideStyle = (index: number) => {
    const actualCurrentIndex = getActualIndex(currentIndex);
    let position = index - actualCurrentIndex;

    if (position > 1) position -= items.length;
    else if (position < -1) position += items.length;

    const dragOffset = isDragging ? translateX * 0.003 : 0;

    const centerScale = 0.92;       // 중앙은 아주 살짝 축소
    const sideScale = 0.78;         // 양옆은 더 작게
    const gapMain = 300;
    const gapSide = 280;
    const gapFar  = 350;

    let scale = 0.7;
    let opacity = 0.5;
    let slideTranslateX = position * gapMain;
    let zIndex = 1;

    if (position === 0) {
      scale = centerScale;
      opacity = 1;
      slideTranslateX = dragOffset;
      zIndex = 3;
    } else if (Math.abs(position) === 1) {
      scale = sideScale;
      opacity = 0.7;
      slideTranslateX = position * gapSide + dragOffset * 0.5;
      zIndex = 2;
    } else {
      opacity = 0;
      slideTranslateX = position * gapFar + dragOffset * 0.2;
      zIndex = 0;
    }

    return {
      transform: `translateX(${slideTranslateX}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
    };
  };

  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
      환자 경험의 흐름을 고려한 구조로 바뀝니다
      </h2>

      <div className="mt-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* 모바일 16:10, 태블릿 이상 16:9 비율 박스 → 내부 이미지는 object-contain */}
        <div
          ref={containerRef}
          className="
            relative
            aspect-[16/10] sm:aspect-[16/9] md:h-[28rem] lg:h-[32rem]
            cursor-grab active:cursor-grabbing select-none
            -mx-4 sm:mx-0
          "
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="포트폴리오 캐러셀"
          style={{ perspective: "1000px", touchAction: "pan-y" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="
                absolute inset-0
                mx-1 sm:mx-6 md:mx-8
                rounded-xl sm:rounded-2xl
                overflow-hidden shadow-lg
                bg-slate-100 p-2 sm:p-3        /* 여백+배경으로 레터박스 자연스럽게 */
              "
              style={{ ...getSlideStyle(index), pointerEvents: "none" }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="
                  w-full h-full block select-none
                  object-contain                   /* 잘림 방지 핵심 */
                "
                draggable={false}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
              />
            </div>
          ))}

          {/* 네비 버튼 */}
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all duration-200 z-10"
            aria-label="이전 이미지"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl transition-all duration-200 z-10"
            aria-label="다음 이미지"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a
            href="https://www.notion.so/23de8c3b241e800f918cf8a114c93aee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-slate-300 hover:text-medi transition-colors duration-200"
          >
            <span className="leading-none text-4xl sm:text-5xl md:text-6xl text-slate-300">➜</span>
            <span className="text-2xl sm:text-3xl md:text-4xl">실제 제작 사례 보기</span>
          </a>
        </div>
      </div>
    </section>
  );
}