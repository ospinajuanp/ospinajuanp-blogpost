import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts';
import { SITE_URL } from '../lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPostsData();

    const postUrls = posts
        .filter(post => !post.hidden && !post.protected)
        .map((post) => {
            let lastModified = new Date();
            try {
                lastModified = new Date(post.date);
                if (isNaN(lastModified.getTime())) lastModified = new Date();
            } catch (e) {
                console.error(`Error parsing date for post ${post.slug}:`, e);
            }

            return {
                url: `${SITE_URL}/blog/${post.slug}`,
                lastModified: lastModified.toISOString(),
            };
        });

    return [
        {
            url: SITE_URL,
            lastModified: new Date().toISOString(),
        },
        ...postUrls,
    ];
}
