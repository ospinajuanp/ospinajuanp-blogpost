import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAdjacentPosts, getAllPostSlugs, getPostContentHtml, getPostMeta, getSeriesContext, isValidSlug, PostData } from '../../../lib/posts';
import PostContent from './content';
import { SITE_URL } from '../../../lib/config';
import { sanitizeHtml } from '../../../lib/sanitize';

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path: { params: { slug: string } }) => path.params);
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
        return { title: 'Post no encontrado', robots: { index: false, follow: false } };
    }

    let postData;
    try {
        postData = await getPostMeta(slug);
    } catch {
        return { title: 'Post no encontrado', robots: { index: false, follow: false } };
    }

    const isProtected = postData.protected === true;
    const genericTitle = 'Contenido Protegido';
    const genericDescription = 'Contenido protegido. Se requiere contraseña para visualizarlo.';

    return {
        title: isProtected ? genericTitle : postData.title,
        description: isProtected ? genericDescription : postData.description,
        robots: isProtected ? { index: false, follow: false } : undefined,
        openGraph: {
            title: isProtected ? genericTitle : postData.title,
            description: isProtected ? genericDescription : postData.description,
            type: 'article',
            publishedTime: postData.date,
            url: `/blog/${slug}`,
            images: postData.image ? [
                {
                    url: postData.image,
                    width: 1200,
                    height: 630,
                    alt: isProtected ? genericTitle : postData.title,
                }
            ] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: isProtected ? genericTitle : postData.title,
            description: isProtected ? genericDescription : postData.description,
            images: postData.image ? [postData.image] : undefined,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        }
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (!isValidSlug(slug)) {
        notFound();
    }

    let postData;
    try {
        postData = await getPostMeta(slug);
    } catch {
        notFound();
    }

    const isProtected = postData.protected === true;

    // El contenido de los posts protegidos NO se envía al cliente en el payload inicial.
    // Se solicita en vivo a través de la server action tras validar la contraseña.
    let contentHtml: string | undefined;
    if (!isProtected) {
        try {
            contentHtml = sanitizeHtml(await getPostContentHtml(slug));
        } catch {
            notFound();
        }
    }

    const adjacent = getAdjacentPosts(slug);
    const series = getSeriesContext(slug);

    // En posts protegidos ni el título ni la descripción viajan al cliente: solo se
    // entregan tras validar la contraseña.
    const clientPost: PostData = isProtected
        ? {
            ...postData,
            title: 'Contenido Protegido',
            description: 'Contenido protegido. Se requiere contraseña para visualizarlo.',
            image: undefined,
        }
        : postData;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: isProtected ? 'Contenido Protegido' : postData.title,
        description: isProtected ? 'Contenido protegido' : postData.description,
        datePublished: postData.date,
        url: `${SITE_URL}/blog/${slug}`,
        author: {
            '@type': 'Person',
            name: 'OspinaJuanP',
        },
        ...(!isProtected && postData.image && { image: postData.image }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostContent post={{ ...clientPost, contentHtml }} adjacent={adjacent} series={series} />
        </>
    );
}
