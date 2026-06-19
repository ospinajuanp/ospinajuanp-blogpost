import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../lib/sanitize';

describe('sanitizeHtml', () => {
  it('should allow safe HTML tags', () => {
    const html = '<p>Hello <strong>world</strong></p>';
    const result = sanitizeHtml(html);
    expect(result).toBe('<p>Hello <strong>world</strong></p>');
  });

  it('should remove script tags to prevent XSS', () => {
    const html = '<p>Hello</p><script>alert("XSS")</script>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert');
  });

  it('should remove event handlers', () => {
    const html = '<p onclick="alert(1)">Click me</p>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('onclick');
  });

  it('should allow links with safe attributes', () => {
    const html = '<a href="https://example.com" target="_blank">Link</a>';
    const result = sanitizeHtml(html);
    expect(result).toContain('href="https://example.com"');
    expect(result).toContain('target="_blank"');
  });

  it('should remove javascript: URLs', () => {
    const html = '<a href="javascript:alert(1)">Click</a>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('javascript:');
  });

  it('should handle empty string', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('should allow images with alt text', () => {
    const html = '<img src="image.jpg" alt="Description" />';
    const result = sanitizeHtml(html);
    expect(result).toContain('src="image.jpg"');
    expect(result).toContain('alt="Description"');
  });
});
