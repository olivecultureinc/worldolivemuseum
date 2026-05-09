import { resolveLang } from "../../utils/i18n-server";
import { promises as fs } from "fs";
import path from "path";
import GlossarySearch from "../../components/GlossarySearch";

const SITE_URL = "https://www.worldolivemuseum.com";

async function getGlossary() {
  const filePath = path.join(process.cwd(), "data", "glossary.json");
  return JSON.parse(await fs.readFile(filePath, "utf-8"));
}

// Safe ID generator
function getCategoryId(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function GlossaryPage({ searchParams }: any) {
  const lang = resolveLang(searchParams);
  const glossary = await getGlossary();

  // ================= STRUCTURED DATA =================

  const allTerms = glossary.flatMap((section: any) =>
    section.terms.map((term: any) => ({
      "@type": "DefinedTerm",
      name: term.term_en,
      description: term.definition_en,
      url: `${SITE_URL}/glossary/${term.slug}`,
    }))
  );

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Olive Oil Glossary",
    description:
      "A structured reference of key terminology related to olive oil production, sensory analysis, and Mediterranean heritage.",
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: allTerms,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetSchema),
        }}
      />

      <div className="bg-white">

        {/* ================= HERO ================= */}
        <section className="bg-[#E7EBD7] py-16 md:py-20 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="w-12 h-px bg-[#6B7B4E]/70 mx-auto mb-6" />

            <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-6 tracking-tight">
              {lang === "fr"
                ? "Glossaire de l’huile d’olive"
                : "Glossary of Olive Oil"}
            </h1>

            <p className="text-neutral-800 max-w-2xl mx-auto leading-relaxed">
              {lang === "fr"
                ? "Répertoire structuré des principaux termes liés à la production, à l’analyse sensorielle et au patrimoine méditerranéen de l’huile d’olive."
                : "A structured reference of key terminology related to olive oil production, sensory analysis, and Mediterranean heritage."}
            </p>
          </div>
        </section>

        {/* ================= CATEGORY NAVIGATION ================= */}
        <section className="py-10 border-b border-neutral-200/60">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-6 justify-center text-sm tracking-wide">
            {glossary.map((section: any) => {
              const id = getCategoryId(section.category_en);
              return (
                <a
                  key={section.category}
                  href={`#${id}`}
                  className="text-neutral-600 hover:text-olive transition-colors"
                >
                  {lang === "fr"
                    ? section.category_fr
                    : section.category_en}
                </a>
              );
            })}
          </div>
        </section>

        {/* ================= SEARCH + CONTENT ================= */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <GlossarySearch glossary={glossary} lang={lang} />
          </div>
        </section>

      </div>
    </>
  );
}