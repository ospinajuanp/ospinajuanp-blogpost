import { getAllPostSlugs, getPostData } from '../../../lib/posts';
import PostContent from './content';

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths;
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = (await params) as { slug: string };
    const postData = await getPostData(slug);

    return <PostContent post={postData} />;
}
