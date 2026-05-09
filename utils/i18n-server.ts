// utils/i18n-server.ts
import { cookies } from "next/headers";

export type Lang = "en" | "fr";

/**
 * SERVER-ONLY language resolver.
 * Defines page language based on:
 * 1) URL ?lang=fr|en
 * 2) Cookie ("lang")
 * 3) Default EN
 */
export function resolveLang(searchParams?: Record<string, string>): Lang {
  // 1) URL param first
  const qp = searchParams?.lang;
  if (qp === "fr" || qp === "en") return qp;

  // 2) Cookie
  try {
    const ck = cookies().get("lang")?.value;
    if (ck === "fr") return "fr";
  } catch {}

  // 3) Default EN
  return "en";
}

export const t = (lang: Lang, en: string, fr: string) =>
  lang === "fr" ? fr : en;
