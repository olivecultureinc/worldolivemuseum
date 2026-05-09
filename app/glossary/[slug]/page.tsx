import { notFound } from "next/navigation";
import { resolveLang } from "../../../utils/i18n-server";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { SITE } from "../../../lib/site";

async function getGlossary() {
  const filePath = path.join(process.cwd(), "data", "glossary.json");
  return JSON.parse(await fs.readFile(filePath, "utf-8"));
}

export async function generateMetadata({ params }: any) {
  const glossary = await getGlossary();

  const term = glossary
    .flatMap((section: any) => section.terms)
    .find((t: any) => t.slug === params.slug);

  if (!term) return {};

  const title = `${term.term_en} – Olive Oil Glossary | ${SITE.name}`;
  const description = term.definition_en;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/glossary/${term.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/glossary/${term.slug}`,
      siteName: SITE.name,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function GlossaryTermPage({ params, searchParams }: any) {
  const lang = resolveLang(searchParams);
  const glossary = await getGlossary();

  const section = glossary.find((s: any) =>
    s.terms.some((t: any) => t.slug === params.slug)
  );

  if (!section) return notFound();

  const term = section.terms.find((t: any) => t.slug === params.slug);

  if (!term) return notFound();

  const related = section.terms.filter((t: any) => t.slug !== term.slug);

  /* ================= STRUCTURED DATA ================= */

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term_en,
    description: term.definition_en,
    url: `${SITE.url}/glossary/${term.slug}`,
    inDefinedTermSet: `${SITE.url}/glossary`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Glossary",
        item: `${SITE.url}/glossary`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: term.term_en,
        item: `${SITE.url}/glossary/${term.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="bg-white">
        {/* HERO */}
        <section className="bg-[#E7EBD7] py-16 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-sm text-neutral-600 mb-6">
              <Link href="/glossary" className="hover:text-olive">
                Glossary
              </Link>
              <span className="mx-2">/</span>
              {lang === "fr"
                ? section.category_fr
                : section.category_en}
            </div>

            <div className="w-12 h-px bg-[#6B7B4E]/70 mx-auto mb-6" />

            <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-4 tracking-tight">
              {lang === "fr" ? term.term_fr : term.term_en}
            </h1>

            <p className="text-neutral-600 text-sm tracking-wide">
              {lang === "fr"
                ? section.category_fr
                : section.category_en}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="border-l-4 border-olive/40 pl-6 mb-12">
              <p className="text-neutral-800 leading-relaxed text-lg">
                {lang === "fr"
                  ? term.definition_fr
                  : term.definition_en}
              </p>
            </div>

            {/* Related Terms */}
            {related.length > 0 && (
              <>
                <h2 className="font-serif text-2xl mb-6">
                  {lang === "fr"
                    ? "Termes associés"
                    : "Related Terms"}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {related.slice(0, 4).map((r: any) => (
                    <Link
                      key={r.slug}
                      href={`/glossary/${r.slug}`}
                      className="border rounded-xl p-5 hover:shadow-md transition bg-white"
                    >
                      <h3 className="font-medium mb-2 hover:text-olive">
                        {lang === "fr"
                          ? r.term_fr
                          : r.term_en}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-3">
                        {lang === "fr"
                          ? r.definition_fr
                          : r.definition_en}
                      </p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <Link
              href="/glossary"
              className="text-olive hover:underline text-sm"
            >
              ← {lang === "fr"
                ? "Retour au glossaire"
                : "Back to glossary"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}