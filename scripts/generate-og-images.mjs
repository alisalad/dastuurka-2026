import { ImageResponse } from '@vercel/og';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Mock data - articles
const mockArticles = [
  {
    number: '001',
    slug: 'article-001-the-federal-republic-of-somalia',
    title: { en: 'The Federal Republic of Somalia', so: 'Jamhuuriyadda Federaalka Soomaaliya' },
    chapterSlug: 'chapter-1-general-provisions-and-principles'
  },
  {
    number: '002',
    slug: 'article-002-state-and-religion',
    title: { en: 'State and Religion', so: 'Dowladda iyo Diinta' },
    chapterSlug: 'chapter-1-general-provisions-and-principles'
  }
];

// Mock chapters
const chapters = [
  {
    slug: 'chapter-1-general-provisions-and-principles',
    number: '1',
    title: { en: 'General Provisions and Principles', so: 'Cutub 1 — Xuquuqda Asaasiga ah iyo Waajibaadka Muwaaddinka' }
  }
];

// Fetch real articles from Sanity
async function fetchArticles() {
  try {
    const { createClient } = await import('@sanity/client');
    
    const client = createClient({
      projectId: '9pnmhxh9',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false
    });

    const query = `*[_type == "article"] | order(number asc) {
      _id,
      number,
      "slug": slug.current,
      title,
      "chapterSlug": chapter->slug.current
    }`;

    const articles = await client.fetch(query);
    console.log(`Fetched ${articles.length} articles from Sanity`);
    return articles;
  } catch (error) {
    console.log('Using mock data:', error.message);
    return mockArticles;
  }
}

function pickLang(obj, lang = 'en') {
  if (typeof obj === 'string') return obj;
  return obj?.[lang] || obj?.en || obj?.so || '';
}

async function generateOGImage(article) {
  const articleTitle = pickLang(article.title, 'en');
  const articleNumber = article.number;
  
  // Find chapter info
  const chapter = chapters.find(c => c.slug === article.chapterSlug);
  const chapterTitle = chapter ? pickLang(chapter.title, 'en') : '';
  const chapterNumber = chapter?.number || '';
  const chapterLabel = chapterNumber && chapterTitle 
    ? `CHAPTER ${chapterNumber}: ${chapterTitle.toUpperCase()}`
    : '';

  const imageResponse = new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#dbeafe',
          padding: '80px',
          fontFamily: 'Inter, system-ui, sans-serif',
          position: 'relative',
        },
        children: [
          // Background gradient
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.1,
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0284c7 0%, transparent 70%)',
                display: 'flex',
              }
            }
          },
          // Content
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '40px', zIndex: 1, width: '100%' },
              children: [
                chapterLabel && {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#0369a1',
                      letterSpacing: '0.05em',
                      marginBottom: '10px',
                    },
                    children: chapterLabel
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '72px',
                      fontWeight: 700,
                      color: '#0c4a6e',
                      lineHeight: 1,
                    },
                    children: `Article ${articleNumber}`
                  }
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '52px',
                      fontWeight: 700,
                      color: '#18181b',
                      lineHeight: 1.2,
                      maxWidth: '900px',
                    },
                    children: articleTitle
                  }
                }
              ].filter(Boolean)
            }
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '28px',
                fontWeight: 600,
                color: '#0369a1',
                zIndex: 1,
              },
              children: [
                { type: 'span', props: { children: '📜' } },
                { type: 'span', props: { children: 'Dastuurka Soomaaliya' } }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
    }
  );

  return await imageResponse.arrayBuffer();
}

async function main() {
  console.log('Generating OG images for articles...');
  
  const articles = await fetchArticles();
  const outputDir = join(__dirname, '..', 'public', 'og');
  
  // Create output directory
  await mkdir(outputDir, { recursive: true });
  
  let generated = 0;
  
  for (const article of articles) {
    if (!article.slug) continue;
    
    try {
      const imageBuffer = await generateOGImage(article);
      const outputPath = join(outputDir, `${article.slug}.png`);
      await writeFile(outputPath, Buffer.from(imageBuffer));
      console.log(`✓ Generated: ${article.slug}.png`);
      generated++;
    } catch (error) {
      console.error(`✗ Failed to generate ${article.slug}:`, error.message);
    }
  }
  
  console.log(`\n✅ Generated ${generated} OG images in /public/og/`);
}

main().catch(console.error);
