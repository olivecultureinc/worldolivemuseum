// utils/i18n-client.ts
export type Lang = "en" | "fr";

/** Tiny translator for client components */
export function t(lang: Lang, en: string, fr: string) {
  return lang === "fr" ? fr : en;
}
