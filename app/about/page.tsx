import { resolveLang, t } from "../../utils/i18n-server";

export default async function About({ searchParams }: any) {
  const lang = resolveLang(searchParams);

  return (
    <div className="bg-[#F5F6F0]">

      {/* ================= HERO ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <div className="w-16 h-px bg-olive/60 mx-auto mb-8" />

        <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-6 tracking-tight">
          {t(lang, "About the Museum", "À propos du Musée")}
        </h1>

        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {t(
            lang,
            "A digital institution dedicated to the cultural, historical, and sensory heritage of olive oil.",
            "Une institution numérique dédiée au patrimoine culturel, historique et sensoriel de l’huile d’olive."
          )}
        </p>

      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-neutral-800 leading-relaxed space-y-6">

        <h2 className="font-serif text-2xl md:text-3xl text-[#2F3A24] tracking-tight">
          {t(lang, "Our Mission", "Notre mission")}
        </h2>

        <p>
          {t(
            lang,
            "World Olive Museum exists to preserve, interpret, and illuminate the civilizational legacy of olive oil across time, geography, and culture.",
            "World Olive Museum existe pour préserver, interpréter et mettre en lumière l’héritage civilisationnel de l’huile d’olive à travers le temps, les territoires et les cultures."
          )}
        </p>

        <p>
          {t(
            lang,
            "Through curated galleries, scholarly context, and immersive digital exhibitions, the Museum presents a structured cultural journey spanning more than six millennia — connecting agriculture, ritual, trade, science, and everyday life across the Mediterranean world and beyond.",
            "À travers des galeries thématiques, un contexte académique et des expositions numériques immersives, le Musée propose un parcours culturel structuré couvrant plus de six millénaires — reliant agriculture, rituels, commerce, science et vie quotidienne à travers le monde méditerranéen et au-delà."
          )}
        </p>

      </section>

      {/* ================= CULTURAL CONTEXT ================= */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-neutral-800 leading-relaxed space-y-6">

        <h2 className="font-serif text-2xl md:text-3xl text-[#2F3A24] tracking-tight">
          {t(lang, "Why Olive Oil Matters", "Pourquoi l’huile d’olive est essentielle")}
        </h2>

        <p>
          {t(
            lang,
            "Few agricultural products have shaped religion, trade, medicine, gastronomy, and daily life as profoundly as olive oil.",
            "Peu de produits agricoles ont façonné la religion, le commerce, la médecine, la gastronomie et la vie quotidienne avec autant de profondeur que l’huile d’olive."
          )}
        </p>

        <p>
          {t(
            lang,
            "From ancient Mediterranean ports to contemporary culinary traditions, olive oil remains both a cultural symbol and a living craft.",
            "Des ports antiques de la Méditerranée aux traditions culinaires contemporaines, l’huile d’olive demeure à la fois un symbole culturel et un savoir-faire vivant."
          )}
        </p>

      </section>

      {/* ================= INSTITUTION ================= */}
      <section className="bg-[#E7EBD7] py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="font-serif text-3xl md:text-4xl text-[#2F3A24] mb-6 tracking-tight">
            Olive Culture Inc.
          </h2>

          <p className="text-neutral-800 leading-relaxed max-w-2xl mx-auto text-lg">
            World Olive Museum is an independent cultural initiative of Olive Culture Inc.,
            a Canadian corporation dedicated to advancing education, research,
            and public understanding of olive oil heritage across civilizations.
          </p>

          <p className="mt-6 text-neutral-700 max-w-2xl mx-auto">
            Olive Culture Inc. supports scholarly inquiry, digital preservation,
            and structured dissemination to ensure that olive culture remains
            accessible to future generations.
          </p>

        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-neutral-800 leading-relaxed text-center">

        <p className="italic text-neutral-700 max-w-3xl mx-auto">
          {t(
            lang,
            "World Olive Museum stands at the intersection of history, culture, and craftsmanship — inviting visitors to explore olive oil not merely as a product, but as a civilizational thread woven through human history.",
            "World Olive Museum se situe à la croisée de l’histoire, de la culture et du savoir-faire — invitant les visiteurs à découvrir l’huile d’olive non comme un simple produit, mais comme un fil civilisationnel traversant l’histoire humaine."
          )}
        </p>

      </section>

    </div>
  );
}