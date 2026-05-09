// lib/i18n.ts
import { cookies } from 'next/headers';

export function getLang(searchParams?: Record<string,string>) {
  const qp = searchParams?.lang;
  if (qp === 'fr' || qp === 'en') return qp;
  const ck = cookies().get('lang')?.value;
  return ck === 'fr' ? 'fr' : 'en';
}

export function t(lang: 'en'|'fr', en: string, fr: string) {
  return lang === 'fr' ? fr : en;
}
