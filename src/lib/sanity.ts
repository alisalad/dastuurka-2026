import { createClient } from '@sanity/client';
import groq from 'groq';
import type { Lang } from './data';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-06-01';
const token = import.meta.env.SANITY_READ_TOKEN;

export const sanityEnabled = Boolean(projectId);

export const sanity = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token,
      perspective: 'published',
    })
  : null;

export const qChapters = groq`*[_type=="chapter"]|order(number asc){
  number,
  "slug": slug.current,
  title,
  description,
  "articleCount": count(*[_type=="article" && references(^._id)])
}`;

export const qChapterWithArticles = groq`*[_type == "chapter" && slug.current == $slug][0]{
  number,
  "slug": slug.current,
  title,
  description,
  "articles": *[_type == "article" && references(^._id)]|order(number asc){
    number,
    "slug": slug.current,
    title,
    body
  }
}`;

export const qArticles = groq`*[_type=="article"]|order(number asc){
  number,
  "slug": slug.current,
  "chapterSlug": chapter->slug.current,
  title,
  body
}`;

export const qArticleBySlug = groq`*[_type=="article" && slug.current==$slug][0]{
  number,
  "slug": slug.current,
  "chapterSlug": chapter->slug.current,
  title,
  body
}`;

export async function fetchChapters() {
  if (!sanity) return null;
  return await sanity.fetch(qChapters);
}

export async function fetchChapterWithArticles(slug: string) {
  if (!sanity) return null;
  return await sanity.fetch(qChapterWithArticles, { slug });
}

export async function fetchArticles() {
  if (!sanity) return null;
  return await sanity.fetch(qArticles);
}

export async function fetchArticleBySlug(slug: string) {
  if (!sanity) return null;
  return await sanity.fetch(qArticleBySlug, { slug });
}

export function pickLang(value: any, lang: Lang) {
  if (!value) return '';
  return value[lang] ?? value.en ?? value.so ?? '';
}
