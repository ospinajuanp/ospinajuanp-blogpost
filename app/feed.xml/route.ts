import { getPublicPostsData } from '../../lib/posts';
import { SITE_URL } from '../../lib/config';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const posts = getPublicPostsData().slice(0, 20);

    const items = posts
        .map(post => {
            const url = `${SITE_URL}/blog/${post.slug}`;
            const categories = [post.pilar, ...(post.tags ?? [])]
                .filter((value): value is string => Boolean(value))
                .map(value => `      <category>${escapeXml(value)}</category>`)
                .join('\n');

            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>OspinaJuanP</dc:creator>
${categories}
    </item>`;
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml('OspinaJuanP Blog')}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml('Construcción en público, lecturas y temas personales. Aprendo, documento y construyo conocimiento en público.')}</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=3600',
        },
    });
}
