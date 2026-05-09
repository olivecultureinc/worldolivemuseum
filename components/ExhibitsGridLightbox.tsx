"use client";

import { useState } from "react";
import type { Exhibit } from "../lib/types";
import ExhibitsFullscreenLightbox from "./ExhibitsFullscreenLightbox";

type Props = {
  exhibits: Exhibit[];
  lang: string;
  roomTitle: string; // ✅ NEW
};

export default function ExhibitsGridLightbox({ exhibits, lang, roomTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openLightbox = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const goNext = () =>
    setIndex((prev) => (prev + 1) % exhibits.length);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + exhibits.length) % exhibits.length);

  return (
    <>
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {exhibits.map((ex, i) => (
          <article
            key={ex.exhibit_slug}
            className="rounded-xl overflow-hidden border border-neutral-200 bg-white cursor-pointer hover:shadow-md transition"
            onClick={() => openLightbox(i)}
          >
            <img
              src={ex.image_preview}
              alt={ex.title}
              className="w-full h-72 object-contain bg-gray-50 p-6 rounded-2xl"
            />
            <div className="p-4">
              <h2 className="font-semibold">{ex.title}</h2>
              <p className="text-sm opacity-70">{ex.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <ExhibitsFullscreenLightbox
          Open={open}
          exhibit={exhibits[index]}
          Close={close}
          goNext={goNext}
          goPrev={goPrev}
          currentIndex={index}
          total={exhibits.length}
          roomTitle={roomTitle} // ✅ NEW
        />
      )}
    </>
  );
}