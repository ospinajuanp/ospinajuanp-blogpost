import { describe, it, expect } from 'vitest';
import {
    PostFrontmatterSchema,
    getAdjacentPosts,
    getPostMeta,
    getPublicPostsData,
    getSeriesContext,
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

    it('should reject an invalid pilar id', () => {
        expect(() => PostFrontmatterSchema.parse({ pilar: 'no-existe' })).toThrow();
    });

    it('should accept a valid pilar id', () => {
        const result = PostFrontmatterSchema.parse({ pilar: 'construccion' });
        expect(result.pilar).toBe('construccion');
    });

    it('should parse tags declared as an array', () => {
        const result = PostFrontmatterSchema.parse({ tags: ['zentral', 'ocr'] });
        expect(result.tags).toEqual(['zentral', 'ocr']);
    });

    it('should parse tags declared as a comma separated string', () => {
        const result = PostFrontmatterSchema.parse({ tags: 'zentral, ocr' });
        expect(result.tags).toEqual(['zentral', 'ocr']);
    });

    it('should keep tags undefined when not present', () => {
        const result = PostFrontmatterSchema.parse({ title: 'Sin tags' });
        expect(result.tags).toBeUndefined();
    });

    it('should parse series as string', () => {
        const result = PostFrontmatterSchema.parse({ series: 'Zentral' });
        expect(result.series).toBe('Zentral');
    });
});

describe('isValidSlug', () => {
    it('should accept slugs with normal characters', () => {
        expect(isValidSlug('siete-anos-despues-me-dijeron-que-no')).toBe(true);
    });

    it('should reject path traversal attempts', () => {
        expect(isValidSlug('../../etc/passwd')).toBe(false);
        expect(isValidSlug('..%2F..%2Fsecret')).toBe(false);
        expect(isValidSlug('a/b')).toBe(false);
    });

    it('should reject empty or non string slugs', () => {
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
        const posts = getSortedPostsData();
        for (const post of posts) {
            expect(post.contentHtml).toBeUndefined();
        }
    });

    it('should expose pilar and tags when present', () => {
        const posts = getSortedPostsData();
        const withPillar = posts.filter(post => post.pilar);
        expect(withPillar.length).toBeGreaterThan(0);

        for (const post of withPillar) {
            expect(post.tags).toBeDefined();
        }
    });
});

describe('getPublicPostsData', () => {
    it('should exclude hidden and protected posts', () => {
        const posts = getPublicPostsData();
        for (const post of posts) {
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

describe('getAdjacentPosts', () => {
    it('should return previous and next posts for a known slug', () => {
        const adjacent = getAdjacentPosts('zentral-ocr-gemini-conciliacion-bancaria');
        expect(adjacent.previous).not.toBeNull();
        expect(adjacent.next).not.toBeNull();
        expect(adjacent.previous?.slug).not.toBe(adjacent.next?.slug);
    });

    it('should return nulls for an unknown slug', () => {
        const adjacent = getAdjacentPosts('no-existe');
        expect(adjacent.previous).toBeNull();
        expect(adjacent.next).toBeNull();
    });

    it('should never point to hidden or protected posts', () => {
        const posts = getPublicPostsData();
        for (const post of posts) {
            const adjacent = getAdjacentPosts(post.slug);
            expect(adjacent.previous?.protected).toBeFalsy();
            expect(adjacent.next?.protected).toBeFalsy();
        }
    });
});

describe('getSeriesContext', () => {
    it('should return the series position for a post in a series', () => {
        const context = getSeriesContext('zentral-arquitectura-multitenant-en-el-edge');
        expect(context).not.toBeNull();
        expect(context?.name).toBe('Zentral');
        expect(context?.index).toBe(1);
        expect(context?.total).toBe(2);
    });

    it('should return null for a post without a series', () => {
        expect(getSeriesContext('mi-primera-libreria-open-source')).toBeNull();
    });
});
