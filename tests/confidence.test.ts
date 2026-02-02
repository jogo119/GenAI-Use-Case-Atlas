import { describe, expect, it } from 'vitest';
import { computeConfidenceScore } from '@/lib/confidence';

describe('computeConfidenceScore', () => {
  it('returns higher scores for recent, credible sources', () => {
    const score = computeConfidenceScore({
      lastVerifiedAt: new Date().toISOString(),
      sources: [
        {
          id: 'src',
          url: 'https://example.com',
          title: 'Example',
          publisher: 'Example',
          publishedAt: new Date().toISOString(),
          retrievedAt: new Date().toISOString(),
          excerpt: 'Example',
          sourceType: 'press',
          credibilityWeight: 0.9
        }
      ]
    });

    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('returns lower scores for older sources', () => {
    const oldDate = new Date();
    oldDate.setFullYear(oldDate.getFullYear() - 2);

    const score = computeConfidenceScore({
      lastVerifiedAt: oldDate.toISOString(),
      sources: [
        {
          id: 'src',
          url: 'https://example.com',
          title: 'Example',
          publisher: 'Example',
          publishedAt: oldDate.toISOString(),
          retrievedAt: oldDate.toISOString(),
          excerpt: 'Example',
          sourceType: 'press',
          credibilityWeight: 0.5
        }
      ]
    });

    expect(score).toBeLessThan(80);
  });
});
