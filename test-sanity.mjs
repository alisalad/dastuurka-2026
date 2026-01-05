import { createClient } from '@sanity/client';
import groq from 'groq';

const sanity = createClient({
  projectId: '9pnmhxh9',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
});

const qChapters = groq`*[_type=="chapter"]|order(number asc){
  number,
  "slug": slug.current,
  title,
  description,
  "articleCount": count(*[_type=="article" && references(^._id)])
}`;

const chapters = await sanity.fetch(qChapters);

console.log('Total chapters:', chapters.length);
console.log('\nChecking Somali titles:\n');

chapters.forEach((c) => {
  const soTitle = c?.title?.so || 'MISSING';
  const enTitle = c?.title?.en || 'MISSING';
  console.log(`Chapter ${c.number}: SO="${soTitle}" EN="${enTitle}"`);
});
