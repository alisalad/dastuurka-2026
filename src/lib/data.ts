export type Lang = 'en' | 'so';

export type Chapter = {
  number: number;
  slug: string;
  title: { en: string; so: string };
  description: { en: string; so: string };
  articleCount: number;
};

export type Article = {
  number: number;
  chapterSlug: string;
  title: { en: string; so: string };
  body: { en: string; so: string };
  slug?: string;
};

export const chapters: Chapter[] = [
  { number: 1, slug: 'chapter-1', title: { en: 'The Federal Republic', so: 'Jamhuuriyadda Federaalka' }, description: { en: 'Foundations, sovereignty, and national identity.', so: 'Aasaaska, madax-bannaanida, iyo aqoonsiga qaranka.' }, articleCount: 12 },
  { number: 2, slug: 'chapter-2', title: { en: 'Rights & Duties', so: 'Xuquuqda & Waajibaadka' }, description: { en: 'Fundamental rights, freedoms, and responsibilities.', so: 'Xuquuqaha aasaasiga ah, xorriyadaha, iyo waajibaadka.' }, articleCount: 18 },
  { number: 3, slug: 'chapter-3', title: { en: 'The Land', so: 'Dhulka' }, description: { en: 'Territory, resources, and environment.', so: 'Xuduudaha, kheyraadka, iyo deegaanka.' }, articleCount: 7 },
  { number: 4, slug: 'chapter-4', title: { en: 'Representation', so: 'Matalaadda' }, description: { en: 'Citizenship, elections, and political participation.', so: 'Muwaadinnimo, doorasho, iyo ka-qaybgal siyaasadeed.' }, articleCount: 9 },
  { number: 5, slug: 'chapter-5', title: { en: 'Legislature', so: 'Sharci-dejinta' }, description: { en: 'Parliament structure and powers.', so: 'Qaab-dhismeedka iyo awoodaha Baarlamaanka.' }, articleCount: 15 },
  { number: 6, slug: 'chapter-6', title: { en: 'Executive', so: 'Fulinta' }, description: { en: 'President, Prime Minister, and Council of Ministers.', so: 'Madaxweynaha, Ra’iisul Wasaaraha, iyo Golaha Wasiirrada.' }, articleCount: 16 },
  { number: 7, slug: 'chapter-7', title: { en: 'Judiciary', so: 'Garsoorka' }, description: { en: 'Courts, independence, and justice.', so: 'Maxkamadaha, madaxbannaanida, iyo cadaaladda.' }, articleCount: 11 },
  { number: 8, slug: 'chapter-8', title: { en: 'Public Finance', so: 'Maaliyadda Dadweynaha' }, description: { en: 'Budgeting, taxation, and accountability.', so: 'Miisaaniyad, cashuur, iyo isla-xisaabtan.' }, articleCount: 8 },
  { number: 9, slug: 'chapter-9', title: { en: 'Security', so: 'Amniga' }, description: { en: 'National security institutions and oversight.', so: 'Hay’adaha amniga qaranka iyo kormeerka.' }, articleCount: 6 },
  { number: 10, slug: 'chapter-10', title: { en: 'Federal Member States', so: 'Dowlad-goboleedyada Federaalka' }, description: { en: 'Federalism, division of powers, cooperation.', so: 'Federaalnimo, qaybinta awoodaha, iskaashi.' }, articleCount: 10 },
  { number: 11, slug: 'chapter-11', title: { en: 'Independent Commissions', so: 'Guddiyada Madaxa-bannaan' }, description: { en: 'Oversight bodies and constitutional offices.', so: 'Hay’adaha kormeerka iyo xilalka dastuuriga.' }, articleCount: 5 },
  { number: 12, slug: 'chapter-12', title: { en: 'Amendments', so: 'Wax-ka-beddelka' }, description: { en: 'How the constitution can be changed.', so: 'Sida dastuurka loo beddeli karo.' }, articleCount: 4 },
  { number: 13, slug: 'chapter-13', title: { en: 'Transitional Provisions', so: 'Qodobbada Ku-meelgaarka ah' }, description: { en: 'Transition mechanisms and timelines.', so: 'Habraacyada ku-meelgaarka ah iyo jadwalka.' }, articleCount: 7 },
  { number: 14, slug: 'chapter-14', title: { en: 'Final Provisions', so: 'Qodobbada Gabagabada' }, description: { en: 'Implementation and interpretation.', so: 'Dhaqan-gelin iyo fasiraad.' }, articleCount: 6 },
  { number: 15, slug: 'chapter-15', title: { en: 'Annexes', so: 'Lifaaqyada' }, description: { en: 'Annexes and supporting material.', so: 'Lifaaqyo iyo qoraallo taageero ah.' }, articleCount: 2 },
];

export const mockArticles: Article[] = chapters.flatMap((chapter) => {
  return Array.from({ length: chapter.articleCount }).map((_, idx) => {
    const n = idx + 1;
    return {
      number: n,
      chapterSlug: chapter.slug,
      slug: `${chapter.slug}-article-${String(n).padStart(3, '0')}`,
      title: { en: `Article ${n}: Sample Title`, so: `Qodobka ${n}: Cinwaan Tusaale` },
      body: {
        en: 'This is placeholder content. Connect Sanity to show the real constitution text.',
        so: 'Kani waa qoraal tusaale ah. Ku xiro Sanity si aad u muujiso qoraalka rasmiga ah.'
      }
    };
  });
});
