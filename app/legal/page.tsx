import { resolveLang, t } from "../../utils/i18n-server";

export default async function Legal({ searchParams }: any) {
  const lang = resolveLang(searchParams);

  return (
    <div className="bg-[#F5F6F0]">

      {/* ================= HEADER ================= */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <div className="w-16 h-px bg-olive/60 mx-auto mb-8" />

        <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A24] mb-6 tracking-tight">
          {t(lang, "Legal Notice", "Mentions légales")}
        </h1>

        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {t(
            lang,
            "Legal information governing the use of this website and its content.",
            "Informations légales régissant l’utilisation de ce site web et de son contenu."
          )}
        </p>

      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-12 text-neutral-800 leading-relaxed">

        {/* Publisher */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Publisher", "Éditeur")}
          </h2>

          <p>
            {t(
              lang,
              "This website is operated by Olive Culture Inc., a corporation registered in Canada.",
              "Ce site est exploité par Olive Culture Inc., société enregistrée au Canada."
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

        {/* Intellectual Property */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Intellectual Property", "Propriété intellectuelle")}
          </h2>

          <p>
            {t(
              lang,
              "All content on this website, including but not limited to text, images, digital illustrations, design elements, visual identity, logos, trademarks, and software components, is protected under applicable intellectual property laws.",
              "L’ensemble du contenu de ce site, incluant notamment les textes, images, illustrations numériques, éléments graphiques, identité visuelle, logos, marques et composants logiciels, est protégé par les lois applicables en matière de propriété intellectuelle."
            )}
          </p>

          <p className="mt-4">
            {t(
              lang,
              "Any reproduction, distribution, modification, or public display of content without prior written authorization from Olive Culture Inc. is strictly prohibited.",
              "Toute reproduction, distribution, modification ou diffusion publique sans autorisation écrite préalable d’Olive Culture Inc. est strictement interdite."
            )}
          </p>
        </div>

        {/* Website Development */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Website Development & Design", "Développement et conception du site")}
          </h2>

          <p>
            {t(
              lang,
              "The website structure, user interface, digital architecture, and proprietary design elements are protected and may not be replicated without authorization.",
              "La structure du site, l’interface utilisateur, l’architecture numérique et les éléments de conception propriétaires sont protégés et ne peuvent être reproduits sans autorisation."
            )}
          </p>
        </div>

        {/* Photographs & Media */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Photographs & Media", "Photographies et médias")}
          </h2>

          <p>
            {t(
              lang,
              "Images and visual materials presented on this website are either original creations, licensed assets, or used for educational and informational purposes where applicable.",
              "Les images et supports visuels présentés sur ce site sont soit des créations originales, soit des contenus sous licence, soit utilisés à des fins éducatives et informatives lorsque cela est applicable."
            )}
          </p>
        </div>

        {/* Liability */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Limitation of Liability", "Limitation de responsabilité")}
          </h2>

          <p>
            {t(
              lang,
              "The information provided on this website is intended for educational and cultural purposes only. While every effort is made to ensure accuracy, Olive Culture Inc. makes no warranties regarding completeness or reliability.",
              "Les informations fournies sur ce site sont destinées à des fins éducatives et culturelles uniquement. Bien que tous les efforts soient déployés pour garantir leur exactitude, Olive Culture Inc. ne donne aucune garantie quant à leur exhaustivité ou fiabilité."
            )}
          </p>

          <p className="mt-4">
            {t(
              lang,
              "Olive Culture Inc. shall not be held liable for any direct or indirect damages resulting from the use of this website.",
              "Olive Culture Inc. ne saurait être tenue responsable de tout dommage direct ou indirect résultant de l’utilisation du site."
            )}
          </p>
        </div>

        {/* External Links */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "External Links", "Liens externes")}
          </h2>

          <p>
            {t(
              lang,
              "This website may contain links to third-party websites. Olive Culture Inc. is not responsible for the content or practices of external sites.",
              "Ce site peut contenir des liens vers des sites tiers. Olive Culture Inc. n’est pas responsable du contenu ou des pratiques de ces sites externes."
            )}
          </p>
        </div>

        {/* Governing Law */}
        <div>
          <h2 className="font-serif text-2xl text-[#2F3A24] mb-4">
            {t(lang, "Governing Law", "Droit applicable")}
          </h2>

          <p>
            {t(
              lang,
              "This website and its legal terms are governed by the laws of the Province of Ontario and the applicable federal laws of Canada.",
              "Ce site et ses conditions légales sont régis par les lois de la province de l’Ontario ainsi que par les lois fédérales applicables du Canada."
            )}
          </p>
        </div>

      </section>

    </div>
  );
}