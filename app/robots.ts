import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/config';
import { getSortedPostsData } from '../lib/posts';

export default function robots(): MetadataRoute.Robots {
    const protectedPaths = getSortedPostsData()
        .filter(post => post.protected)
        .map(post => `/blog/${post.slug}`);

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', ...protectedPaths],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
