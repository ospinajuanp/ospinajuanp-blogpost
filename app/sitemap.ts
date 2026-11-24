import { MetadataRoute } from 'next';
import { getPublicPostsData } from '../lib/posts';
import { SITE_URL } from '../lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPublicPostsData();

    const postUrls = posts.map(post => {
        const lastModified = post.modifiedAt ?? post.date;

        return {
            url: `${SITE_URL}/blog/${post.slug}`,
            lastModified: new Date(lastModified).toISOString(),
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
