import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/dom';

afterEach(() => {
  cleanup();
});

expect.extend({
  toBeInTheDocument(received) {
    const pass = received instanceof Element && document.body.contains(received);
    return {
      pass,
      message: () => `expected element ${received} ${pass ? 'not ' : ''}to be in the document`,
    };
  },
});
