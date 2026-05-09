"use client";

import { useState } from "react";
import Link from "next/link";

// Same ID generator used in page.tsx
function getCategoryId(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function GlossarySearch({
  glossary,
  lang,
}: any) {
  const [query, setQuery] = useState("");

  const filtered = glossary.map((section: any) => {
    const sortedTerms = [...section.terms].sort((a, b) =>
      a.term_en.localeCompare(b.term_en)
    );

    const filteredTerms = sortedTerms.filter((term: any) => {
      const termName =
        lang === "fr" ? term.term_fr : term.term_en;
      const termDef =
        lang === "fr"
          ? term.definition_fr
          : term.definition_en;

      return (
        termName.toLowerCase().includes(query.toLowerCase()) ||
        termDef.toLowerCase().includes(query.toLowerCase())
      );
    });

    return {
      ...section,
      terms: filteredTerms,
    };
  });

  return (
    <>
      {/* ================= SEARCH BAR ================= */}
      <div className="max-w-xl mx-auto mb-16">
        <input
          type="text"
          placeholder={
            lang === "fr"
              ? "Rechercher un terme..."
              : "Search a term..."
          }
          className="w-full border border-neutral-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive/40 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ================= FILTERED CONTENT ================= */}
      {filtered.map((section: any) =>
        section.terms.length > 0 ? (
          <div
            key={section.category}
            id={getCategoryId(section.category_en)}
            className="mb-20 scroll-mt-28"
          >
            <h2 className="font-serif text-2xl text-neutral-900 mb-10">
              {lang === "fr"
                ? section.category_fr
                : section.category_en}
            </h2>

            {section.terms.map((term: any) => (
              <div
                key={term.slug}
                className="mb-8 border-l-2 border-olive/30 pl-5"
              >
                <h3 className="font-medium text-neutral-900">
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="hover:text-olive transition-colors duration-200"
                  >
                    {lang === "fr"
                      ? term.term_fr
                      : term.term_en}
                  </Link>
                </h3>

                <p className="text-neutral-600 mt-2 leading-relaxed">
                  {lang === "fr"
                    ? term.definition_fr
                    : term.definition_en}
                </p>
              </div>
            ))}
          </div>
        ) : null
      )}
    </>
  );
}