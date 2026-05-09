"use client";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  src: string;
  alt?: string;
  caption?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function Lightbox({
  isOpen,
  src,
  alt,
  caption,
  onClose,
  onPrev,
  onNext,
}: Props) {
  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* STOP propagation so clicking image doesn't close */}
      <div
        className="relative flex gap-4 max-w-7xl w-full items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute -top-10 left-0 
            px-4 py-2 rounded-lg 
            bg-black/40 hover:bg-black/60 text-white
            fade-in
          "
        >
          Close (Esc)
        </button>

        {/* CAPTION PANEL – LEFT SIDE */}
        <div
          className="
            caption-panel 
            fade-up
            max-w-sm w-[260px]
            text-sm leading-relaxed
          "
        >
          {caption}
        </div>

        {/* IMAGE */}
        <div className="relative flex-1 flex justify-center">
          <img
            src={src}
            alt={alt}
            className="max-h-[85vh] object-contain rounded-xl shadow-2xl lightbox-image"
          />

          {/* PREV BUTTON */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="
                absolute left-0 top-1/2 -translate-y-1/2
                px-3 py-2 rounded-lg 
                bg-black/40 hover:bg-black/60 text-white
                fade-in
              "
            >
              ← Prev
            </button>
          )}

          {/* NEXT BUTTON */}
          {onNext && (
            <button
              onClick={onNext}
              className="
                absolute right-0 top-1/2 -translate-y-1/2
                px-3 py-2 rounded-lg 
                bg-black/40 hover:bg-black/60 text-white
                fade-in
              "
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}