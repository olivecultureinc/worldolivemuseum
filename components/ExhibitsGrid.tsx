"use client";

import { useState } from "react";
import ExhibitsGridLightbox from "./ExhibitsGridLightbox";
import type { Exhibit } from "../lib/types";

export default function ExhibitsGrid({
  exhibits,
  lang,
}: {
  exhibits: Exhibit[];
  lang: "en" | "fr";
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function goNext() {
    setIndex((i) => (i + 1) % exhibits.length);
  }

  function goPrev() {
    setIndex((i) => (i - 1 + exhibits.length) % exhibits.length);
  }

  return (
    <>
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {exhibits.map((ex, i) => (
          <div
            key={ex.exhibit_slug}
            className="rounded-2xl overflow-hidden border bg-white shadow group cursor-pointer"
            onClick={() => openAt(i)}
          >
            <img
              src={ex.image_preview}
              alt={ex.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
            />

            <div className="p-4">
              <h3 className="font-semibold">{ex.title}</h3>
              <p className="opacity-70 text-sm">{ex.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      <ExhibitsGridLightbox
        open={open}
        index={index}
        exhibits={exhibits}
        close={() => setOpen(false)}
        goNext={goNext}
        goPrev={goPrev}
      />
    </>
  );
}
