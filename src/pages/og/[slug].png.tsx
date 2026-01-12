import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';
import { fetchArticles, pickLang } from '../../lib/sanity';
import { mockArticles, chapters } from '../../lib/data';

export const prerender = true;

export async function getStaticPaths() {
  const sanity = await fetchArticles();
  const articles = sanity || mockArticles;
  return articles
    .filter((a: any) => a?.slug)
    .map((a: any) => ({ params: { slug: a.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  // Fetch article data
  let article = mockArticles.find((a) => a.slug === slug);
  const sanity = await fetchArticles();
  const sanityArticle = (sanity || []).find((a: any) => a.slug === slug);
  if (sanityArticle) article = sanityArticle;

  if (!article) {
    return new Response('Not found', { status: 404 });
  }

  // Get article details
  const articleTitle = typeof article.title === 'string' 
    ? article.title 
    : pickLang(article.title, 'en');
  
  const articleNumber = article.number;
  
  // Find chapter info
  const chapterSlug = article.chapterSlug;
  const chapter = chapters.find(c => c.slug === chapterSlug);
  const chapterTitle = chapter 
    ? (typeof chapter.title === 'string' ? chapter.title : pickLang(chapter.title, 'en'))
    : '';
  const chapterNumber = chapter?.number || '';
  const chapterLabel = chapterNumber && chapterTitle 
    ? `CHAPTER ${chapterNumber}: ${chapterTitle.toUpperCase()}`
    : '';

  // Load Somalia emblem SVG - we'll skip embedding it for now
  // and use a simple placeholder since SVG embedding in Satori has limitations

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#dbeafe',
          padding: '80px',
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* Background gradient for depth */}
        <div
          style={{
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
          }}
        />

        {/* Top Section - Chapter Label */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', zIndex: 1, width: '100%' }}>
          {chapterLabel && (
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#0369a1',
                letterSpacing: '0.05em',
                marginBottom: '10px',
              }}
            >
              {chapterLabel}
            </div>
          )}

          {/* Article Number */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#0c4a6e',
              lineHeight: 1,
            }}
          >
            Article {articleNumber}
          </div>

          {/* Article Title */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              color: '#18181b',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {articleTitle}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '28px',
            fontWeight: 600,
            color: '#0369a1',
            zIndex: 1,
          }}
        >
          <span>📜</span>
          <span>Dastuurka Soomaaliya</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};
