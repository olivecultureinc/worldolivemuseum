'use client';
import { useMemo, useState, type ChangeEvent } from 'react';
import ExhibitsGridLightbox from './ExhibitsGridLightbox';   // ✅ FIXED

import type { Exhibit } from '../lib/types';                 // ✅ optional but recommended

export default function ExhibitSearch({ exhibits }: { exhibits: Exhibit[] }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState<Exhibit | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return exhibits;
    return exhibits.filter((ex) =>
      (`${ex.exhibit_title_en} ${ex.short_desc_en}`.toLowerCase()).includes(needle)
    );
  }, [q, exhibits]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <input
          value={q}
          onChange={onChange}
          placeholder="Search exhibits…"
          className="w-full md:w-80 px-3 py-2 rounded-lg border bg-white/70"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="px-3 py-2 rounded-lg border bg-white/80"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((ex) => (
          <article
            key={ex.slug}
            className="relative rounded-2xl border overflow-hidden bg-white cursor-pointer"
            onClick={() => {
              setActive(ex);
              setOpen(true);
            }}
          >
            <img
              src={ex.image}
              alt={ex.title_en}
              className="w-full h-56 object-cover bg-neutral-100"
            />
            <div className="p-4">
              <h2 className="font-semibold">{ex.title_en}</h2>
              <p className="text-sm opacity-80 mt-2">{ex.description_en}</p>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <ExhibitsGridLightbox
          open={open}
          exhibits={filtered}
          index={filtered.findIndex((e) => e.slug === active.slug)}
          close={() => {
            setOpen(false);
            setActive(null);
          }}
          goNext={() => {
            const i = filtered.findIndex((e) => e.slug === active.slug);
            setActive(filtered[(i + 1) % filtered.length]);
          }}
          goPrev={() => {
            const i = filtered.findIndex((e) => e.slug === active.slug);
            setActive(filtered[(i - 1 + filtered.length) % filtered.length]);
          }}
        />
      )}
    </div>
  );
}

