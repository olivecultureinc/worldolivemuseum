import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE_URL = "https://www.worldolivemuseum.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "World Olive Museum",
    template: "%s | World Olive Museum",
  },
  description:
    "An immersive digital museum dedicated to olive culture, olive oil history, sensory science, and Mediterranean heritage.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      fr: "/?lang=fr",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "World Olive Museum",
    description:
      "An immersive digital museum dedicated to olive culture and olive oil heritage.",
    siteName: "World Olive Museum",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Olive Museum",
    description:
      "An immersive digital museum dedicated to olive culture and olive oil heritage.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieLang = cookies().get("lang")?.value === "fr" ? "fr" : "en";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olive Culture Inc.",
    url: SITE_URL,
    sameAs: [
      "https://www.worldolivemuseum.com",
      "https://www.oliveculture.ca",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "World Olive Museum",
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: "Olive Culture Inc.",
    },
  };

  return (
    <html lang={cookieLang} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer initialLang={cookieLang} />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </body>
    </html>
  );
}