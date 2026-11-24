'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PostData } from '../lib/posts';
import { getPillarLabel, PILLARS } from '../lib/config';
import { formatDate, formatTag } from '../lib/format';
import styles from './PostList.module.css';

export default function PostList({ posts }: { posts: PostData[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activePillar, setActivePillar] = useState<string | null>(null);

    const availablePillars = useMemo(() => {
        const used = new Set(posts.map(post => post.pilar).filter((pilar): pilar is string => Boolean(pilar)));
        return PILLARS.filter(pillar => used.has(pillar.id));
    }, [posts]);

    const filteredPosts = posts.filter(post => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            post.title.toLowerCase().includes(searchLower) ||
            post.description.toLowerCase().includes(searchLower) ||
            (post.tags ?? []).some(tag => tag.toLowerCase().includes(searchLower));

        const matchesPillar = activePillar === null || post.pilar === activePillar;

        return matchesSearch && matchesPillar;
    });

    return (
        <div className={styles['post-list-container']}>
            {/* Filtros por pilar */}
            {availablePillars.length > 0 && (
                <div className={styles['pillar-filters']} role="group" aria-label="Filtrar por pilar">
                    <button
                        type="button"
                        className={`${styles['pillar-chip']} ${activePillar === null ? styles['pillar-chip-active'] : ''}`}
                        onClick={() => setActivePillar(null)}
                    >
                        Todos
                    </button>
                    {availablePillars.map(pillar => (
                        <button
                            key={pillar.id}
                            type="button"
                            className={`${styles['pillar-chip']} ${activePillar === pillar.id ? styles['pillar-chip-active'] : ''}`}
                            onClick={() => setActivePillar(pillar.id)}
                        >
                            {pillar.emoji} {pillar.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Buscador */}
            <div className={styles['search-container']}>
                <div className={styles['search-icon-wrapper']}>
                    <svg className={styles['search-icon']} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="search"
                    placeholder="Buscar artículos por título o descripción..."
                    className={styles['search-input']}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles['posts-wrapper']}>
                {filteredPosts.length === 0 ? (
                    <p className={styles['no-results']}>No se encontraron artículos que coincidan con &quot;{searchQuery}&quot;.</p>
                ) : (
                    <>
                        {/* Featured Post */}
                        {filteredPosts.length > 0 && (
                            <div className={styles['featured-posts']}>
                                {filteredPosts.slice(0, 1).map(({ slug, date, title, description, image, pilar, tags }) => (
                                    <div key={slug} className="group">
                                        <Link href={`/blog/${slug}`} className={styles['post-link']}>
                                            <div className={styles['post-content']}>
                                                {image && (
                                                    <div className={styles['post-image-container']}>
                                                        <img
                                                            src={image}
                                                            alt={title}
                                                            className={styles['post-image']}
                                                        />
                                                    </div>
                                                )}
                                                <div className={styles['post-meta']}>
                                                    <span className={styles['post-date']}>
                                                        {formatDate(date, 'short')}
                                                    </span>
                                                    <h2 className={styles['post-title']}>
                                                        {title}
                                                    </h2>
                                                    {(pilar || (tags && tags.length > 0)) && (
                                                        <div className={styles['post-tags']}>
                                                            {pilar && <span className={styles['post-tag']}>{getPillarLabel(pilar)}</span>}
                                                            {tags?.map(tag => (
                                                                <span key={tag} className={styles['post-tag']}>{formatTag(tag)}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className={styles['post-description']}>
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Grid Posts */}
                        {filteredPosts.length > 1 && (
                            <ul className={styles['grid-posts']}>
                                {filteredPosts.slice(1).map(({ slug, date, title, description, image, pilar, tags }) => (
                                    <li key={slug} className="group" style={{ display: 'flex' }}>
                                        <Link href={`/blog/${slug}`} className={styles['post-link']}>
                                            <div className={styles['post-content']}>
                                                {image && (
                                                    <div className={`${styles['post-image-container']} ${styles['post-image-container-small']}`}>
                                                        <img
                                                            src={image}
                                                            alt={title}
                                                            className={styles['post-image']}
                                                        />
                                                    </div>
                                                )}
                                                <div className={styles['post-meta']}>
                                                    <span className={styles['post-date']}>
                                                        {formatDate(date, 'short')}
                                                    </span>
                                                    <h2 className={`${styles['post-title']} ${styles['post-title-small']}`}>
                                                        {title}
                                                    </h2>
                                                    {(pilar || (tags && tags.length > 0)) && (
                                                        <div className={styles['post-tags']}>
                                                            {pilar && <span className={styles['post-tag']}>{getPillarLabel(pilar)}</span>}
                                                            {tags?.map(tag => (
                                                                <span key={tag} className={styles['post-tag']}>{formatTag(tag)}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className={`${styles['post-description']} ${styles['post-description-small']}`}>
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
