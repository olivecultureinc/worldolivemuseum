"use client";

import type { Exhibit } from "../lib/types";

export default function ExhibitsGrid({
  exhibits,
  lang,
}: {
  exhibits: Exhibit[];
  lang: "en" | "fr";
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {exhibits.map((ex) => (
        <div
          key={ex.exhibit_slug}
          className="rounded-2xl overflow-hidden border bg-white shadow"
        >
          <img
            src={ex.image_preview || ex.image}
            alt={ex.title}
            className="w-full h-56 object-cover"
          />

          <div className="p-4">
            <h3 className="font-semibold">{ex.title}</h3>
            <p className="opacity-70 text-sm">{ex.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}