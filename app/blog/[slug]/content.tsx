'use client';

import { useState } from 'react';
import PasswordProtection from '../../components/PasswordProtection';
import { PostData } from '../../../lib/posts';
import Link from 'next/link';

export default function PostContent({ post }: { post: PostData }) {
    const [isUnlocked, setIsUnlocked] = useState(!post.protected);

    if (!isUnlocked) {
        return <PasswordProtection onUnlock={() => setIsUnlocked(true)} />;
    }

    return (
        <article className="prose prose-invert mx-auto">
            <div className="mb-10 text-center">
                <div className="mb-4 text-sm text-[#a3a3a3]">
                    <Link href="/" className="hover:text-white transition-colors">
                        ← Volver al inicio
                    </Link>
                    <span className="mx-2">•</span>
                    <time>{post.date}</time>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                    {post.title}
                </h1>
                {post.image && (
                    <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-xl bg-[#262626]">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover w-full h-full"
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
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                className="text-[#e5e5e5]"
            />
        </article>
    );
}
