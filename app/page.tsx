import StripeButton from "../components/StripeButton";
import Link from "next/link";
import { cookies } from "next/headers";
import { resolveLang, t } from "../utils/i18n-server";
import { promises as fs } from "fs";
import path from "path";

async function getRooms() {
  const roomsPath = path.join(process.cwd(), "data", "rooms.json");
  const rooms = JSON.parse(await fs.readFile(roomsPath, "utf-8"));
  return rooms;
}

export default async function Home({ searchParams }: any) {
  const lang = resolveLang(searchParams);
  const rooms = await getRooms();

  const cookieStore = cookies();
  const hasPass = cookieStore.get("weekly_pass")?.value === "1";

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url('/hero-texture.jpg')",
            backgroundPosition: "center 35%",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,238,210,0.12)_0%,rgba(0,0,0,0.55)_75%)]" />

        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 tracking-tight text-white/95">
            {t(lang, "World Olive Museum", "Musée Mondial de l’Olive")}
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            {t(
              lang,
              "Six millennia of civilization, distilled.",
              "Six millénaires de civilisation, distillés."
            )}
          </p>

          <div className="flex flex-col items-center gap-4">
            {hasPass ? (
              <Link
                href={`/museum?lang=${lang}`}
                className="inline-flex items-center rounded-xl bg-[#6B7B4E] px-8 py-4 text-white font-medium shadow-lg hover:bg-[#5C6A42] transition"
              >
                {t(lang, "Enter the Museum →", "Entrer dans le musée →")}
              </Link>
            ) : (
              <StripeButton
                lang={lang}
                labelEn="Weekly Digital Pass — $5"
                labelFr="Pass numérique hebdomadaire — 5$"
              />
            )}

            <span className="text-sm text-white/80 tracking-wide">
              {hasPass
                ? t(
                    lang,
                    "Your 7-day pass is active. Return anytime through the Home page.",
                    "Votre pass de 7 jours est actif. Revenez à tout moment via la page d’accueil."
                  )
                : t(
                    lang,
                    "One-week digital access",
                    "Accès numérique d’une semaine"
                  )}
            </span>
          </div>
        </div>
      </section>

      {/* ================= NARRATIVE INTRO ================= */}
      <section className="bg-[#E7EBD7] border-t border-olive/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="w-16 h-px bg-olive/60 mx-auto mb-6" />

          <p className="text-lg leading-relaxed text-neutral-800">
            {t(
              lang,
              "From ancient harbors and sacred groves to stone mills and modern tables, the olive tree has shaped civilizations, rituals, trade, and daily life across the Mediterranean world.",
              "Des anciens ports et bosquets sacrés aux moulins en pierre et aux tables modernes, l’olivier a façonné les civilisations, les rituels, le commerce et la vie quotidienne à travers le monde méditerranéen."
            )}
          </p>
        </div>
      </section>

      {/* ================= VALUE SECTION ================= */}
      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-5xl text-neutral-900 mb-8">
            {t(lang, "What You Unlock Inside", "Ce que vous débloquez")}
          </h2>

          <div className="space-y-5 text-lg text-neutral-700 mb-6">
            <p>
              {t(
                lang,
                "✔ Access 5 curated galleries and 25 museum-grade exhibits",
                "✔ Accès à 5 galeries et 25 expositions"
              )}
            </p>

            <p>
              {t(
                lang,
                "✔ Learn to recognize authentic olive oil and avoid common frauds",
                "✔ Apprenez à reconnaître une huile d’olive authentique"
              )}
            </p>

            <p>
              {t(
                lang,
                "✔ Master tasting, aromas, defects, and culinary pairing",
                "✔ Maîtrisez la dégustation et les accords culinaires"
              )}
            </p>
          </div>

          {!hasPass && (
            <>
              <p className="text-sm text-neutral-500 mb-6">
                {t(
                  lang,
                  "One-time access • No subscription • Instant entry after payment",
                  "Accès unique • Sans abonnement • Entrée immédiate après paiement"
                )}
              </p>

              <StripeButton
                lang={lang}
                labelEn="Unlock Full Access — $5"
                labelFr="Débloquer l’accès complet — 5$"
              />
            </>
          )}
        </div>
      </section>

      {/* ================= GALLERIES ================= */}
      <section className="pt-2 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-24 h-px bg-olive/60 mx-auto mb-8" />

          <h2 className="font-serif text-4xl text-neutral-900 text-center mb-14">
            {t(lang, "The Galleries", "Les galeries")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((r: any) => (
              <div
                key={r.id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <img
                    src={r.thumb_image ?? r.thumbnail ?? r.hero_image ?? r.hero}
                    alt={r.title_en}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
                  />
                </div>

                <div className="p-6 text-center">
                  <div className="font-serif text-xl text-neutral-900">
                    {t(lang, r.title_en, r.title_fr)}
                  </div>

                  <p className="text-sm text-neutral-500">
                    {t(lang, r.theme_en, r.theme_fr)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8 md:max-w-4xl md:mx-auto">
            {rooms.slice(3, 5).map((r: any) => (
              <div
                key={r.id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  <img
                    src={r.thumb_image ?? r.thumbnail ?? r.hero_image ?? r.hero}
                    alt={r.title_en}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
                  />
                </div>

                <div className="p-6 text-center">
                  <div className="font-serif text-xl text-neutral-900">
                    {t(lang, r.title_en, r.title_fr)}
                  </div>

                  <p className="text-sm text-neutral-500">
                    {t(lang, r.theme_en, r.theme_fr)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20 text-neutral-700">
            <p className="font-medium">
              {t(
                lang,
                "Five thematic galleries. Twenty-five curated exhibits.",
                "Cinq galeries thématiques. Vingt-cinq expositions sélectionnées."
              )}
            </p>

            <p className="mt-2 text-sm">
              {t(
                lang,
                "One immersive journey across millennia.",
                "Un voyage immersif à travers les millénaires."
              )}
            </p>

            <p className="mt-4 text-sm italic text-neutral-500">
              {t(
                lang,
                "A cultural journey through light, land, and legacy.",
                "Un voyage culturel à travers la lumière, la terre et l’héritage."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ================= INSTITUTIONAL SECTION ================= */}
      <section className="bg-[#E7EBD7] py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="w-12 h-px bg-[#6B7B4E]/70 mx-auto mb-6" />

          <h2 className="font-serif text-3xl md:text-4xl text-[#2F3A24] mb-5 tracking-tight">
            Olive Culture Inc.
          </h2>

          <p className="text-neutral-800 leading-relaxed max-w-2xl mx-auto text-lg">
            {t(
              lang,
              "World Olive Museum is a digital cultural initiative of Olive Culture Inc., advancing research, preservation, and public understanding of olive heritage across cultures and centuries.",
              "Le Musée Mondial de l’Olive est une initiative culturelle numérique de Olive Culture Inc."
            )}
          </p>
        </div>
      </section>
    </div>
  );
}