"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // Current language detected from ?lang=
  const current = sp.get("lang") === "fr" ? "fr" : "en";

  function setLang(next: "en" | "fr") {
    // Save in cookie
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Build updated URL
    const params = new URLSearchParams(sp.toString());

    if (next === "fr") {
      params.set("lang", "fr");
    } else {
      params.delete("lang");
    }

    const url = `${pathname}${params.size ? `?${params.toString()}` : ""}`;

    // 🔥 Notify Footer, StripeButton, etc.
    window.dispatchEvent(
      new CustomEvent("app:lang-changed", { detail: next })
    );

    // Navigate + refresh
    router.push(url);
    router.refresh();
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 text-xs rounded ${
          current === "en"
            ? "bg-olive/10 border border-olive/30"
            : "border border-transparent hover:bg-black/5"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={`px-2 py-1 text-xs rounded ${
          current === "fr"
            ? "bg-olive/10 border border-olive/30"
            : "border border-transparent hover:bg-black/5"
        }`}
      >
        FR
      </button>
    </div>
  );
}
