import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ospinajuanp-blogpost.vercel.app';
    const posts = getSortedPostsData();

    // Solo exponemos posts que no estén ocultos ni protegidos por contraseña
    const postUrls = posts
        .filter(post => {
            const isHidden = post.hidden === true || String(post.hidden) === 'true';
            const isProtected = post.protected === true || String(post.protected) === 'true';
            return !isHidden && !isProtected;
        })
        .map((post) => {
            // Intentar parsear la fecha, u optimizar usando la fecha actual si falla
            let lastModified = new Date();
            try {
                lastModified = new Date(post.date);
                if (isNaN(lastModified.getTime())) lastModified = new Date();
            } catch (e) { }

            return {
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: lastModified.toISOString(),
            };
        });

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
        },
        ...postUrls,
    ];
}
