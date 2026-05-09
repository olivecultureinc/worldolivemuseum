export type Exhibit = {
  room_id: string;
  room_slug: string;
  exhibit_order: number;
  exhibit_slug: string;
  exhibit_title_en: string;
  exhibit_title_fr: string;
  short_desc_en: string;
  short_desc_fr: string;

  // Derived fields added in page.tsx
  title: string;   // <-- MUST be required
  desc: string;    // <-- MUST be required

  image: string;
  image_preview?: string;
  image_full?: string;
  source?: string;
};
