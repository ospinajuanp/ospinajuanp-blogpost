'use server'

import { timingSafeEqual } from 'crypto';
import { getPostContentHtml, getPostMeta } from '../lib/posts';
import { sanitizeHtml } from '../lib/sanitize';

function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

export async function verifyPostPassword(password: string): Promise<boolean> {
    const secret = process.env.BLOG_POST_SECRET;

    // Artificial delay to prevent timing attacks (optional but good practice)
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!secret) {
        console.error('BLOG_POST_SECRET is not set in environment variables');
        return false;
    }

    return safeCompare(password, secret);
}

export interface ProtectedPostPayload {
    title: string;
    description: string;
    contentHtml: string;
}

export async function getProtectedPostContent(slug: string, password: string): Promise<ProtectedPostPayload | null> {
    const isValid = await verifyPostPassword(password);

    if (!isValid) {
        return null;
    }

    try {
        const post = await getPostMeta(slug);

        if (!post.protected) {
            return null;
        }

        const contentHtml = await getPostContentHtml(slug);

        return {
            title: post.title,
            description: post.description,
            contentHtml: sanitizeHtml(contentHtml),
        };
    } catch (error) {
        console.error(`Error loading protected content for ${slug}:`, error);
        return null;
    }
}
