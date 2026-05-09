"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { t, Lang } from "../../utils/i18n-client";

export default function ThankYouPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const q = sp.get("lang");
    setLang(q === "fr" ? "fr" : "en");

    // Auto-activate 7-day access immediately after successful payment
    document.cookie = `weekly_pass=1; path=/; max-age=${
      60 * 60 * 24 * 7
    }; SameSite=Lax`;
  }, [sp]);

  const enter = () => {
    const qs = lang === "fr" ? "?lang=fr" : "";
    router.push(`/museum${qs}`);
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/gateway.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,220,0.18)_0%,rgba(0,0,0,0.18)_75%)]" />

      <div className="relative z-10 max-w-xl w-full text-center px-6 text-white">
        <h1 className="font-serif text-3xl md:text-[2.7rem] mb-3 tracking-tight tracking-[-0.01em] drop-shadow-md">
          {t(lang, "Access Granted", "Accès accordé")}
        </h1>

        <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 whitespace-pre-line">
          {t(
            lang,
            "Your weekly digital pass is now active.\nWelcome to the museum.",
            "Votre pass numérique hebdomadaire est désormais actif.\nBienvenue au musée."
          )}
        </p>

        <div className="w-12 h-px bg-white/60 mx-auto mb-6" />

        <button
          onClick={enter}
          className="px-8 py-3 rounded-xl bg-olive hover:bg-olive/90 text-white font-medium transition shadow-xl backdrop-blur-sm"
        >
          {t(lang, "Enter the Museum →", "Entrer dans le musée →")}
        </button>

        <div className="mt-5">
          <div className="w-16 h-px bg-white/70 mx-auto mb-2" />
          <p className="text-xs text-white/90 tracking-wide">
            {t(
              lang,
              "Access valid for 7 days from activation.",
              "Accès valide pendant 7 jours à compter de l’activation."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}