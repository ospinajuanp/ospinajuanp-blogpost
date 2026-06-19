import { describe, it, expect } from 'vitest';
import { SITE_URL, THEME_DARK, THEME_SECONDARY, DEFAULT_THEME } from '../lib/config';

describe('config', () => {
  it('should export SITE_URL as a string', () => {
    expect(typeof SITE_URL).toBe('string');
    expect(SITE_URL.length).toBeGreaterThan(0);
  });

  it('should export theme constants as strings', () => {
    expect(typeof THEME_DARK).toBe('string');
    expect(typeof THEME_SECONDARY).toBe('string');
    expect(typeof DEFAULT_THEME).toBe('string');
  });

  it('should have dark as the default theme', () => {
    expect(DEFAULT_THEME).toBe(THEME_DARK);
  });

  it('should have different values for each theme', () => {
    expect(THEME_DARK).not.toBe(THEME_SECONDARY);
  });
});
