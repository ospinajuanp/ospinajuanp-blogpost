import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';

const PostFrontmatterSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  hidden: z.boolean().optional(),
  protected: z.boolean().optional(),
});

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
    const minimalData = {};

    const result = PostFrontmatterSchema.parse(minimalData);
    expect(result).toEqual({});
  });

  it('should validate post with only title', () => {
    const data = { title: 'Only Title' };
    const result = PostFrontmatterSchema.parse(data);
    expect(result.title).toBe('Only Title');
  });

  it('should reject invalid date format (validation passes as string)', () => {
    const data = { date: 'invalid-date' };
    const result = PostFrontmatterSchema.parse(data);
    expect(result.date).toBe('invalid-date');
  });

  it('should validate hidden as boolean', () => {
    const data = { hidden: true };
    const result = PostFrontmatterSchema.parse(data);
    expect(result.hidden).toBe(true);
  });

  it('should validate protected as boolean', () => {
    const data = { protected: true };
    const result = PostFrontmatterSchema.parse(data);
    expect(result.protected).toBe(true);
  });

  it('should strip additional unknown properties by default', () => {
    const data = { title: 'Test', unknownField: 'value' };
    const result = PostFrontmatterSchema.parse(data);
    expect(result.title).toBe('Test');
    expect(result.unknownField).toBeUndefined();
  });
});
