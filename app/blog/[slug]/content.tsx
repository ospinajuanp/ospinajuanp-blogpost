'use client';

import { useState } from 'react';
import PasswordProtection from '../../components/PasswordProtection';
import { AdjacentPosts, PostData, SeriesContext } from '../../../lib/posts';
import { getProtectedPostContent } from '../../actions';
import Link from 'next/link';
import { getPillarLabel } from '../../../lib/config';
import styles from './content.module.css';

interface PostContentProps {
    post: PostData;
    adjacent: AdjacentPosts;
    series: SeriesContext | null;
}

export default function PostContent({ post, adjacent, series }: PostContentProps) {
    const [isUnlocked, setIsUnlocked] = useState(!post.protected);
    const [unlockedContent, setUnlockedContent] = useState<string | null>(null);
    const [unlockedTitle, setUnlockedTitle] = useState<string | null>(null);

    const handleUnlock = async (password: string): Promise<boolean> => {
        const payload = await getProtectedPostContent(post.slug, password);

        if (!payload) {
            return false;
        }

        setUnlockedContent(payload.contentHtml);
        setUnlockedTitle(payload.title);
        setIsUnlocked(true);
        return true;
    };

    if (!isUnlocked) {
        return <PasswordProtection onSubmit={handleUnlock} />;
    }

    const contentHtml = post.protected ? unlockedContent : post.contentHtml;
    const title = post.protected ? (unlockedTitle ?? post.title) : post.title;

    return (
        <article className="prose prose-lg prose-invert mx-auto">
            <div className="mb-10 text-center">
                <div className="mb-4 text-sm text-[#a3a3a3]">
                    <Link href="/" className="hover:text-white transition-colors">
                        ← Volver al inicio
                    </Link>
                    <span className="mx-2">•</span>
                    <time>{post.date}</time>
                </div>
                {series && (
                    <div className={styles['series-badge']}>
                        {series.name} · Parte {series.index} de {series.total}
                    </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                    {title}
                </h1>
                {(post.pilar || (post.tags && post.tags.length > 0)) && (
                    <div className={styles['meta-tags']}>
                        {post.pilar && (
                            <span className={styles['tag']}>{getPillarLabel(post.pilar)}</span>
                        )}
                        {post.tags?.map(tag => (
                            <span key={tag} className={styles['tag']}>{tag}</span>
                        ))}
                    </div>
                )}
                {post.image && (
                    <div className="relative w-full mb-8 overflow-hidden rounded-xl bg-[#262626]">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto"
                        />
                    </div>
                )}
                {post.protected && (
                    <div className="inline-block bg-[#1a1a1a] text-xs text-[#a3a3a3] px-3 py-1 rounded-full border border-[#333] mb-6">
                        🔒 Contenido protegido desbloqueado
                    </div>
                )}
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: contentHtml || '' }}
                className="text-[#e5e5e5]"
            />

            {(adjacent.previous || adjacent.next) && (
                <nav className={styles['adjacent-nav']}>
                    {adjacent.previous ? (
                        <Link href={`/blog/${adjacent.previous.slug}`} className={styles['adjacent-link']}>
                            <span className={styles['adjacent-label']}>← Anterior</span>
                            <span className={styles['adjacent-title']}>{adjacent.previous.title}</span>
                        </Link>
                    ) : (
                        <span />
                    )}
                    {adjacent.next && (
                        <Link href={`/blog/${adjacent.next.slug}`} className={`${styles['adjacent-link']} ${styles['adjacent-link-right']}`}>
                            <span className={styles['adjacent-label']}>Siguiente →</span>
                            <span className={styles['adjacent-title']}>{adjacent.next.title}</span>
                        </Link>
                    )}
                </nav>
            )}
        </article>
    );
}
