"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { t, Lang } from "../utils/i18n-client";

export default function Footer({ initialLang = "en" }: { initialLang?: Lang }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const q = sp.get("lang");
    if (q === "fr" || q === "en") {
      setLang(q);
    } else {
      setLang(document.cookie.includes("lang=fr") ? "fr" : "en");
    }

    const handler = (e: any) => {
      if (e.detail === "fr" || e.detail === "en") setLang(e.detail);
    };

    window.addEventListener("app:lang-changed", handler);
    return () => window.removeEventListener("app:lang-changed", handler);
  }, [pathname, sp]);

  const qs = lang === "fr" ? "?lang=fr" : "";

  return (
    <footer className="border-t bg-white/70 mt-16">

      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-sm">

        {/* Column 1 */}
        <div>
          <div className="font-medium mb-2">
            {t(lang, "About", "À propos")}
          </div>
          <p className="opacity-80">
            {t(
              lang,
              "World Olive Museum is a digital cultural initiative exploring olive civilization, heritage, and sensory science.",
              "World Olive Museum est une initiative culturelle numérique explorant la civilisation de l’olive, son patrimoine et la science sensorielle."
            )}
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <div className="font-medium mb-2">
            {t(lang, "Links", "Liens")}
          </div>

          <ul className="space-y-1">
            <li>
              <Link href={`/about${qs}`} className="hover:text-olive transition-colors">
                {t(lang, "About", "À propos")}
              </Link>
            </li>
            <li>
              <Link href={`/glossary${qs}`} className="hover:text-olive transition-colors">
                {t(lang, "Glossary", "Glossaire")}
              </Link>
            </li>
            <li>
              <Link href={`/contact${qs}`} className="hover:text-olive transition-colors">
                {t(lang, "Contact", "Contact")}
              </Link>
            </li>
            <li>
              <Link href={`/legal${qs}`} className="hover:text-olive transition-colors">
                {t(lang, "Legal Notice", "Mentions légales")}
              </Link>
            </li>
            <li>
              <Link href={`/privacy${qs}`} className="hover:text-olive transition-colors">
                {t(lang, "Privacy Policy", "Politique de confidentialité")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <div className="font-medium mb-2">
            {t(lang, "Supported by", "Soutenu par")}
          </div>
          <p className="opacity-80">
            {t(
              lang,
              "An independent project by Olive Culture Inc.",
              "Un projet indépendant de Olive Culture Inc."
            )}
          </p>
        </div>

      </div>

      <div className="bg-[#E7EBD7] text-center py-4 text-sm">
        © 2026 Olive Culture Inc.{" "}
        {t(lang, "All rights reserved.", "Tous droits réservés.")}
      </div>

    </footer>
  );
}