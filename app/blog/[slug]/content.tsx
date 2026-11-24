'use client';

import { useState } from 'react';
import PasswordProtection from '../../components/PasswordProtection';
import { AdjacentPosts, PostData, SeriesContext } from '../../../lib/posts';
import { getProtectedPostContent } from '../../actions';
import Link from 'next/link';
import { getPillarLabel } from '../../../lib/config';
import { formatDate, formatTag } from '../../../lib/format';
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
        <article className={styles.article}>
            <header className={styles.header}>
                <div className={styles.meta}>
                    <Link href="/">← Volver al inicio</Link>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date, 'long')}</time>
                </div>
                {series && (
                    <div className={styles['series-badge']}>
                        {series.name} · Parte {series.index} de {series.total}
                    </div>
                )}
                <h1 className={styles.title}>{title}</h1>
                {(post.pilar || (post.tags && post.tags.length > 0)) && (
                    <div className={styles['meta-tags']}>
                        {post.pilar && (
                            <span className={styles.tag}>{getPillarLabel(post.pilar)}</span>
                        )}
                        {post.tags?.map(tag => (
                            <span key={tag} className={styles.tag}>{formatTag(tag)}</span>
                        ))}
                    </div>
                )}
                {post.image && (
                    <div className={styles.cover}>
                        <img src={post.image} alt={post.title} />
                    </div>
                )}
                {post.protected && (
                    <div className={styles['unlock-note']}>
                        🔒 Contenido protegido desbloqueado
                    </div>
                )}
            </header>

            <div
                className={styles['article-body']}
                dangerouslySetInnerHTML={{ __html: contentHtml || '' }}
            />

            {(adjacent.previous || adjacent.next) && (
                <nav className={styles['adjacent-nav']} aria-label="Posts relacionados">
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
