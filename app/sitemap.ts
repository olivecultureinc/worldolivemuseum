import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const SITE_URL = "https://www.worldolivemuseum.com";

async function getGlossarySlugs() {
  const filePath = path.join(process.cwd(), "data", "glossary.json");
  const glossary = JSON.parse(await fs.readFile(filePath, "utf-8"));

  return glossary.flatMap((section: any) =>
    section.terms.map((term: any) => term.slug)
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const glossarySlugs = await getGlossarySlugs();

  const staticPages = [
    "",
    "/about",
    "/glossary",
    "/contact",
    "/legal",
    "/privacy",
    "/museum",
  ];

  const staticUrls = staticPages.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const glossaryUrls = glossarySlugs.map((slug: string) => ({
    url: `${SITE_URL}/glossary/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...glossaryUrls];
}