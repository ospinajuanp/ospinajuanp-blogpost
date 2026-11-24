'use client';

import { useState } from 'react';
import PasswordProtection from '../../components/PasswordProtection';
import { PostData } from '../../../lib/posts';
import { getProtectedPostContent } from '../../actions';
import Link from 'next/link';

export default function PostContent({ post }: { post: PostData }) {
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
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                    {title}
                </h1>
                {post.image && (
                    <div className="relative w-full mb-8 overflow-hidden rounded-xl bg-[#262626]">
                        <img
                            src={post.image}
                            alt={title}
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
        </article>
    );
}
