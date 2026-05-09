import { resolveLang, t } from "../../utils/i18n-server";

export default async function Privacy({ searchParams }: any) {
  const lang = resolveLang(searchParams);

  return (
    <div className="bg-[#F5F6F0]">

      {/* ================= HEADER ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <div className="w-16 h-px bg-olive/60 mx-auto mb-8" />

        <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-6 tracking-tight">
          {t(lang, "Privacy Policy", "Politique de confidentialité")}
        </h1>

        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {t(
            lang,
            "Information regarding the collection, use, and protection of personal data.",
            "Informations concernant la collecte, l’utilisation et la protection des données personnelles."
          )}
        </p>

      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-12 text-neutral-800 leading-relaxed">

        {/* Data Controller */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Data Controller", "Responsable du traitement")}
          </h2>
          <p>
            {t(
              lang,
              "Olive Culture Inc., registered in Canada, is responsible for the processing of personal information collected through this website.",
              "Olive Culture Inc., société enregistrée au Canada, est responsable du traitement des données personnelles collectées via ce site."
            )}
          </p>
          <p className="mt-4">
            Olive Culture Inc. <br />
            231 Oak Park Blvd, Suite #301 <br />
            Oakville, ON L6H 7S8 <br />
            Canada <br />
            Email: info@oliveculture.ca
          </p>
        </div>

        {/* Information Collected */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Information We Collect", "Données collectées")}
          </h2>

          <p>
            {t(
              lang,
              "We may collect limited personal information when you:",
              "Nous pouvons collecter des données personnelles limitées lorsque vous :"
            )}
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              {t(
                lang,
                "Purchase a digital access pass via Stripe",
                "Achetez un accès numérique via Stripe"
              )}
            </li>
            <li>
              {t(
                lang,
                "Submit an inquiry or contact request",
                "Soumettez une demande de contact"
              )}
            </li>
            <li>
              {t(
                lang,
                "Interact with cookies or language preferences",
                "Interagissez avec les cookies ou les préférences linguistiques"
              )}
            </li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Payments & Stripe", "Paiements et Stripe")}
          </h2>

          <p>
            {t(
              lang,
              "All payment transactions are processed securely by Stripe. Olive Culture Inc. does not store or have direct access to full credit card information.",
              "Toutes les transactions sont traitées de manière sécurisée par Stripe. Olive Culture Inc. ne stocke ni n’a accès aux informations complètes de carte bancaire."
            )}
          </p>

          <p className="mt-4">
            {t(
              lang,
              "Stripe may collect personal and payment information in accordance with its own privacy policy.",
              "Stripe peut collecter des données personnelles et financières conformément à sa propre politique de confidentialité."
            )}
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Cookies", "Cookies")}
          </h2>

          <p>
            {t(
              lang,
              "This website uses minimal cookies to store language preferences and ensure proper functionality.",
              "Ce site utilise des cookies minimaux afin de mémoriser les préférences linguistiques et d’assurer son bon fonctionnement."
            )}
          </p>

          <p className="mt-4">
            {t(
              lang,
              "No advertising tracking cookies are currently deployed.",
              "Aucun cookie de suivi publicitaire n’est actuellement utilisé."
            )}
          </p>
        </div>

        {/* Data Usage */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "How We Use Information", "Utilisation des données")}
          </h2>

          <p>
            {t(
              lang,
              "Personal information is used solely to provide access to digital content, respond to inquiries, and ensure secure transactions in accordance with Canadian privacy laws.",
              "Les données personnelles sont utilisées uniquement pour fournir l’accès au contenu numérique, répondre aux demandes et assurer la sécurité des transactions conformément aux lois canadiennes sur la protection des données."
            )}
          </p>
        </div>

        {/* Data Protection */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Data Protection", "Protection des données")}
          </h2>

          <p>
            {t(
              lang,
              "We implement reasonable technical and organizational measures to protect personal data against unauthorized access, loss, or misuse.",
              "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données contre tout accès non autorisé, perte ou utilisation abusive."
            )}
          </p>
        </div>

        {/* Rights */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Your Rights", "Vos droits")}
          </h2>

          <p>
            {t(
              lang,
              "In accordance with applicable privacy laws, including Canadian federal privacy legislation (PIPEDA), you may request access, correction, or deletion of your personal information.",
              "Conformément aux lois applicables en matière de protection des données, y compris la législation fédérale canadienne (LPRPDE), vous pouvez demander l’accès, la rectification ou la suppression de vos informations personnelles."
            )}
          </p>
        </div>

        {/* Updates */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Policy Updates", "Mises à jour")}
          </h2>

          <p>
            {t(
              lang,
              "This Privacy Policy may be updated periodically. The latest version will always be available on this page.",
              "Cette politique de confidentialité peut être mise à jour périodiquement. La version la plus récente sera toujours disponible sur cette page."
            )}
          </p>
        </div>

      </section>

    </div>
  );
}