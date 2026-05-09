"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { t, Lang } from "../utils/i18n-client";

export default function Header() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const lang: Lang = sp.get("lang") === "fr" ? "fr" : "en";

  const qs = lang === "fr" ? "?lang=fr" : "";

  const isHome = pathname === "/";
  const isMuseum = pathname === "/museum";

  return (
    <header className="w-full sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-neutral-200/60">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          href={`/${qs}`}
          className="font-serif text-xl text-olive tracking-tight"
        >
          {t(lang, "Olive Museum", "Musée de l’Olive")}
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm tracking-wide">

          {/* Home */}
          <Link
            href={`/${qs}`}
            className={`relative px-1 py-1 transition-colors duration-200 ${
              isHome
                ? "text-olive font-medium"
                : "text-neutral-700 hover:text-olive"
            }`}
          >
            {t(lang, "Home", "Accueil")}
            {isHome && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-olive rounded-full" />
            )}
          </Link>

          {/* Museum */}
          <Link
            href={`/museum${qs}`}
            className={`relative px-1 py-1 transition-colors duration-200 ${
              isMuseum
                ? "text-olive font-medium"
                : "text-neutral-700 hover:text-olive"
            }`}
          >
            {t(lang, "Museum", "Musée")}
            {isMuseum && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-olive rounded-full" />
            )}
          </Link>

        </nav>

        {/* Language Switch */}
        <LanguageToggle />
      </div>
    </header>
  );
}