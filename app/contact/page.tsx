import { resolveLang, t } from "../../utils/i18n-server";

export default async function Contact({ searchParams }: any) {
  const lang = resolveLang(searchParams);

  return (
    <div className="bg-[#F5F6F0]">

      {/* ================= HEADER ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <div className="w-16 h-px bg-olive/60 mx-auto mb-8" />

        <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-6 tracking-tight">
          {t(lang, "Contact", "Contact")}
        </h1>

        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {t(
            lang,
            "For general inquiries, partnerships, or institutional matters, please contact us using the information below.",
            "Pour toute demande générale, partenariat ou question institutionnelle, veuillez nous contacter aux coordonnées ci-dessous."
          )}
        </p>

      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-12 text-neutral-800 leading-relaxed">

        {/* Organization */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            Olive Culture Inc.
          </h2>

          <p>
            231 Oak Park Blvd, Suite #301 <br />
            Oakville, ON L6H 7S8 <br />
            Canada
          </p>

          <p className="mt-4">
            Email:{" "}
            <a
              href="mailto:info@oliveculture.ca"
              className="text-olive hover:underline"
            >
              info@oliveculture.ca
            </a>
          </p>
        </div>

        {/* Museum Identity */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "World Olive Museum", "World Olive Museum")}
          </h2>

          <p>
            {t(
              lang,
              "The World Olive Museum is an educational digital initiative of Olive Culture Inc., dedicated to the preservation and dissemination of olive oil heritage.",
              "Le World Olive Museum est une initiative numérique éducative d’Olive Culture Inc., dédiée à la préservation et à la diffusion du patrimoine oléicole."
            )}
          </p>
        </div>

        {/* Response Notice */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Response Time", "Délai de réponse")}
          </h2>

          <p>
            {t(
              lang,
              "We aim to respond to all inquiries within 2–3 business days.",
              "Nous nous efforçons de répondre à toute demande dans un délai de 2 à 3 jours ouvrables."
            )}
          </p>
        </div>

      </section>

    </div>
  );
}