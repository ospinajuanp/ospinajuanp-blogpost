import { Metadata, ResolvingMetadata } from 'next';
import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import PostContent from './content';
import { SITE_URL } from '../../../lib/config';
import { sanitizeHtml } from '../../../lib/sanitize';

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path: { params: { slug: string } }) => path.params);
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return {
        title: postData.title,
        description: postData.description,
        openGraph: {
            title: postData.title,
            description: postData.description,
            type: 'article',
            publishedTime: postData.date,
            url: `/blog/${slug}`,
            images: postData.image ? [
                {
                    url: postData.image,
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                }
            ] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: postData.title,
            description: postData.description,
            images: postData.image ? [postData.image] : undefined,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        }
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    const sanitizedContent = sanitizeHtml(postData.contentHtml || '');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: postData.title,
        description: postData.description,
        datePublished: postData.date,
        url: `${SITE_URL}/blog/${slug}`,
        author: {
            '@type': 'Person',
            name: 'OspinaJuanP',
        },
        ...(postData.image && { image: postData.image }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostContent post={{ ...postData, contentHtml: sanitizedContent }} />
        </>
    );
}
