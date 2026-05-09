import { resolveLang, t } from "../../utils/i18n-server";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import ExhibitsGridLightbox from "../../components/ExhibitsGridLightbox";

async function getData() {
  const roomsPath = path.join(process.cwd(), "data", "rooms.json");
  const exhibitsPath = path.join(process.cwd(), "data", "exhibits.json");

  const rooms = JSON.parse(await fs.readFile(roomsPath, "utf-8"));
  const exhibits = JSON.parse(await fs.readFile(exhibitsPath, "utf-8"));

  return { rooms, exhibits };
}

export default async function MuseumPage({ searchParams }: any) {
  const lang = resolveLang(searchParams);
  const { rooms, exhibits } = await getData();
  const slug = searchParams?.room;

  /* =========================================================
     ROOMS OVERVIEW PAGE – 3 COLUMN ARCHIVAL GRID (OPTIMIZED)
  ========================================================== */
  if (!slug) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-2">
          <ol className="flex items-center gap-2">
            <li aria-current="page" className="opacity-70">
              {t(lang, "All Rooms", "Toutes les Salles")}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-6 max-w-3xl">
          <h1 className="font-serif text-3xl md:text-[2.4rem] font-medium tracking-tight text-neutral-900">
            {t(lang, "The Museum", "Le Musée")}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-neutral-700">
            {t(
              lang,
              "Choose a room to begin your visit.",
              "Choisissez une salle pour commencer votre visite."
            )}
          </p>

          <div className="mt-4 border-t border-neutral-200/70 max-w-4xl" />
        </header>

        {/* Rooms Grid – Reduced Vertical Density */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-8 mt-5">

          {rooms.map((r: any) => (
            <Link
              key={r.id}
              href={`/museum?room=${r.slug}${lang === "fr" ? "&lang=fr" : ""}`}
              className="group h-full"
            >
              <article className="h-full bg-neutral-50/50 rounded-[20px] border border-neutral-200/60 p-4 transition hover:bg-neutral-50 flex flex-col">

                {/* Image Plate – Native 3:2 */}
                <div className="aspect-[3/2] overflow-hidden bg-neutral-100">
                  <img
                    src={r.hero_image}
                    alt={t(lang, r.title_en, r.title_fr)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Caption */}
                <div className="mt-3">

                  <h2 className="font-serif text-[1.1rem] tracking-tight text-neutral-900">
                    {t(lang, r.title_en, r.title_fr)}
                  </h2>

                  <p className="mt-2 text-sm leading-[1.55] text-neutral-700">
                    {t(lang, r.theme_en, r.theme_fr)}
                  </p>

                </div>

              </article>
            </Link>
          ))}

        </div>
      </div>
    );
  }

  /* =========================================================
     SINGLE ROOM PAGE (UNCHANGED)
  ========================================================== */

  const room = rooms.find((r: any) => r.slug === slug) ?? rooms[0];

  const roomExhibits = exhibits
    .filter((e: any) => String(e.room_id) === String(room.id))
    .map((e: any) => ({
      ...e,
      room_slug: e.room_slug ?? room.slug,
      title: lang === "fr" ? e.exhibit_title_fr : e.exhibit_title_en,
      desc: lang === "fr" ? e.short_desc_fr : e.short_desc_en,
    }));

  const qs = lang === "fr" ? "&lang=fr" : "";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm mb-3">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href={`/museum${lang === "fr" ? "?lang=fr" : ""}`}
              className="underline opacity-80 hover:opacity-100"
            >
              {t(lang, "All Rooms", "Toutes les Salles")}
            </Link>
          </li>
          <li aria-hidden="true" className="opacity-50">/</li>
          <li aria-current="page" className="opacity-70">
            {t(lang, room.title_en, room.title_fr)}
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-[280px_minmax(0,850px)] gap-10">

        {/* SIDEBAR */}
        <aside className="md:sticky md:top-28 h-max">
          <div className="rounded-[28px] border border-neutral-200/60 bg-neutral-50/80 p-7 shadow-sm">

            <div className="text-xs tracking-[0.2em] font-serif text-neutral-500 mb-6">
              {t(lang, "Rooms", "Salles")}
            </div>

            <ul className="space-y-4">
              {rooms.map((r: any) => {
                const active = r.slug === room.slug;

                return (
                  <li key={r.slug}>
                    <Link
                      href={`/museum?room=${r.slug}${qs}`}
                      aria-current={active ? "page" : undefined}
                      className={`group block px-5 py-4 rounded-2xl transition-all duration-200 ${active
                          ? "bg-olive/10 border border-olive/40"
                          : "hover:bg-neutral-100"
                        }`}
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-[6px] w-2 h-2 rounded-full ${active ? "bg-olive" : "bg-neutral-300"
                              }`}
                          />
                          <span
                            className={`text-sm leading-snug ${active
                                ? "font-semibold text-neutral-900"
                                : "text-neutral-700 group-hover:text-neutral-900"
                              }`}
                          >
                            {t(lang, r.title_en, r.title_fr)}
                          </span>
                        </div>

                        {active && (
                          <span className="text-[10px] uppercase tracking-wide text-olive">
                            {t(lang, "Here", "Ici")}
                          </span>
                        )}

                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

          </div>
        </aside>

        {/* CONTENT */}
        <section>
          <header className="mb-10 max-w-4xl pr-6">

            <h1 className="font-serif text-[2.1rem] md:text-[2.4rem] font-medium tracking-tight text-neutral-900 leading-[1.2]">
              {t(lang, room.title_en, room.title_fr)}
            </h1>

            <p className="mt-5 text-[1.05rem] leading-[1.75] text-neutral-700">
              {t(lang, room.theme_en, room.theme_fr)}
            </p>

            <div className="mt-6 border-t border-neutral-200/50" />

          </header>

          <ExhibitsGridLightbox
            exhibits={roomExhibits}
            lang={lang}
            roomTitle={t(lang, room.title_en, room.title_fr)}
          />
        </section>

      </div>
    </div>
  );
}