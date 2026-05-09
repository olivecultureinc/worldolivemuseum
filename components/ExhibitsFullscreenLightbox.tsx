"use client";

import { useEffect, useRef, useState } from "react";
import type { Exhibit } from "../lib/types";

type Props = {
  Open: boolean;
  exhibit: Exhibit;
  Close: () => void;
  goNext: () => void;
  goPrev: () => void;
  currentIndex: number;
  total: number;
};

export default function ExhibitsFullscreenLightbox({
  Open,
  exhibit,
  Close,
  goNext,
  goPrev,
  currentIndex,
  total,
}: Props) {

  const [animate, setAnimate] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!Open) return;

    setAnimate(true);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") Close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      setAnimate(false);
    };
  }, [Open, Close, goNext, goPrev]);

  if (!Open) return null;

  // Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 60) goNext();
    if (distance < -60) goPrev();
  };

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        bg-black/80
        flex items-center justify-center p-4
        transition-opacity duration-300
        ${animate ? "opacity-100" : "opacity-0"}
      `}
      onClick={Close}
    >
      {/* CLOSE */}
      <button
        onClick={Close}
        className="fixed top-4 right-5 md:right-8 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-black/70 text-white text-xl font-semibold hover:bg-black transition"
      >
        ✕
      </button>

      {/* COUNTER */}
      <div
        className="
          fixed top-5 left-4 md:left-8 z-[10000]
          text-[12px] md:text-sm
          tracking-[0.08em]
          text-[#D7BE82]
          bg-[#2E2E2E]/80
          px-3 md:px-4 py-1
          rounded-md
          backdrop-blur-sm
          border border-[#A0937D]/30
        "
      >
        {currentIndex + 1} / {total}
      </div>

      {/* CONTENT */}
      <div
        className={`
          relative w-full max-w-6xl mx-auto
          flex flex-col items-center
          transform transition-all duration-300
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div
          className="relative w-full flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={currentIndex} // 🔥 critical for clean transition
            src={exhibit.image_full}
            alt={exhibit.title}
            className="
              max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl
              animate-fadeIn
            "
          />

          {/* PREV */}
          <button
            onClick={goPrev}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 
              w-10 h-10 md:w-12 md:h-12
              flex items-center justify-center
              rounded-full bg-black/70 text-white text-xl font-semibold
              shadow-lg hover:bg-black transition"
          >
            ←
          </button>

          {/* NEXT */}
          <button
            onClick={goNext}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 
              w-10 h-10 md:w-12 md:h-12
              flex items-center justify-center
              rounded-full bg-black/70 text-white text-xl font-semibold
              shadow-lg hover:bg-black transition"
          >
            →
          </button>
        </div>

        {/* CAPTION */}
        <div
          key={currentIndex + "-caption"}
          className="
            bg-white text-black
            px-6 py-5
            mt-4
            rounded-lg
            shadow-lg
            leading-relaxed
            space-y-2
            w-full
            max-h-[25vh]
            overflow-y-auto
            animate-fadeIn
          "
        >
          <div className="text-lg font-semibold">
            {exhibit.title}
          </div>

          <div className="text-sm">
            {exhibit.desc}
          </div>

          {exhibit.source && (
            <div className="text-[11px] tracking-[0.05em] opacity-50 pt-3 italic">
              {exhibit.source}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}