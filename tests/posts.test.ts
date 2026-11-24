import { describe, it, expect } from 'vitest';
import {
    PostFrontmatterSchema,
    getPostMeta,
    getPublicPostsData,
    getSortedPostsData,
    isValidSlug,
} from '../lib/posts';

describe('PostFrontmatterSchema', () => {
    it('should validate a complete post frontmatter', () => {
        const validData = {
            title: 'Test Post',
            date: '2024-01-01',
            description: 'A test post',
            image: 'image.jpg',
            hidden: false,
            protected: false,
        };

        const result = PostFrontmatterSchema.parse(validData);
        expect(result).toEqual(validData);
    });

    it('should validate a minimal post frontmatter', () => {
        const result = PostFrontmatterSchema.parse({});
        expect(result).toEqual({});
    });

    it('should validate hidden as boolean', () => {
        const result = PostFrontmatterSchema.parse({ hidden: true });
        expect(result.hidden).toBe(true);
    });

    it('should validate protected as boolean', () => {
        const result = PostFrontmatterSchema.parse({ protected: true });
        expect(result.protected).toBe(true);
    });

    it('should strip additional unknown properties by default', () => {
        const result = PostFrontmatterSchema.parse({ title: 'Test', unknownField: 'value' });
        expect(result.title).toBe('Test');
        expect(Object.keys(result)).not.toContain('unknownField');
    });
});

describe('isValidSlug', () => {
    it('should accept slugs with normal characters', () => {
        expect(isValidSlug('siete-anos-despues-me-dijeron-que-no')).toBe(true);
    });

    it('should reject path traversal attempts', () => {
        expect(isValidSlug('../../etc/passwd')).toBe(false);
        expect(isValidSlug('a/b')).toBe(false);
    });

    it('should reject empty slugs', () => {
        expect(isValidSlug('')).toBe(false);
    });
});

describe('getSortedPostsData', () => {
    it('should return posts sorted by date descending', () => {
        const posts = getSortedPostsData();
        expect(posts.length).toBeGreaterThan(0);

        for (let i = 1; i < posts.length; i++) {
            expect(posts[i - 1].date >= posts[i].date).toBe(true);
        }
    });

    it('should never expose contentHtml in the listing payload', () => {
        for (const post of getSortedPostsData()) {
            expect(post.contentHtml).toBeUndefined();
        }
    });
});

describe('getPublicPostsData', () => {
    it('should exclude hidden and protected posts', () => {
        for (const post of getPublicPostsData()) {
            expect(post.hidden).toBeFalsy();
            expect(post.protected).toBeFalsy();
        }
    });

    it('should be a subset of all posts', () => {
        expect(getPublicPostsData().length).toBeLessThan(getSortedPostsData().length);
    });
});

describe('getPostMeta', () => {
    it('should return metadata without contentHtml', async () => {
        const post = await getPostMeta('zentral-ocr-gemini-conciliacion-bancaria');
        expect(post.slug).toBe('zentral-ocr-gemini-conciliacion-bancaria');
        expect(post.title.length).toBeGreaterThan(0);
        expect(post.contentHtml).toBeUndefined();
    });

    it('should throw for an invalid slug', async () => {
        await expect(getPostMeta('../secreto')).rejects.toThrow();
    });
});
