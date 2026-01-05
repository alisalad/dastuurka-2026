import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

function loadDotEnv(envPath) {
  if (!fs.existsSync(envPath)) return;
  const src = fs.readFileSync(envPath, 'utf8');
  for (const line of src.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    const val = trimmed.slice(idx + 1);
    if (!process.env[key]) process.env[key] = val;
  }
}

(async function main() {
  const envPath = path.resolve(new URL(import.meta.url).pathname, '..', '.env');
  // Try common locations: project root `sanity/.env` and repo root `/.env`
  loadDotEnv(path.resolve(process.cwd(), '.env'));
  loadDotEnv(envPath);

  const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
  const token = process.env.SANITY_TOKEN;

  if (!token) {
    console.error('Missing SANITY_TOKEN. Please set SANITY_TOKEN in your environment or in the sanity/.env file.');
    console.error('You can create a token in your Sanity project settings with write access.');
    process.exit(1);
  }

  if (!projectId) {
    console.error('Unable to determine `projectId`. Set SANITY_STUDIO_PROJECT_ID or PUBLIC_SANITY_PROJECT_ID in env.');
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-12-01',
    token,
    useCdn: false,
  });

  console.log('Searching for articles missing `chapter` reference...');
  const articles = await client.fetch('*[_type == "article" && !defined(chapter)]{_id, number}');
  console.log(`Found ${articles.length} articles without chapter.`);

  let updated = 0;
  for (const art of articles) {
    if (typeof art.number !== 'number') {
      console.log(`Skipping ${art._id} (no number)`);
      continue;
    }
    const chap = await client.fetch('*[_type == "chapter" && number == $num][0]{_id, number}', { num: art.number });
    if (!chap) {
      console.log(`No chapter found for article ${art._id} (number ${art.number})`);
      continue;
    }
    await client.patch(art._id).set({ chapter: { _type: 'reference', _ref: chap._id } }).commit();
    console.log(`Patched article ${art._id} -> chapter ${chap._id}`);
    updated++;
  }

  console.log(`Done. Updated ${updated} articles.`);
  process.exit(0);
})();
