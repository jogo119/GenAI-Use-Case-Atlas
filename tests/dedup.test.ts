import { describe, expect, it } from 'vitest';
import { isDuplicateUseCase } from '@/lib/dedup';
import { seededUseCases } from '@/lib/data';
import type { UseCase } from '@/lib/types';

describe('isDuplicateUseCase', () => {
  it('detects duplicate source URL', () => {
    const existing = seededUseCases[0];
    const candidate: UseCase = {
      ...existing,
      id: 'candidate',
      title: 'New title',
      sources: [...existing.sources]
    };

    expect(isDuplicateUseCase(candidate, seededUseCases)).toBe(true);
  });

  it('detects duplicate company and similar title', () => {
    const existing = seededUseCases[0];
    const candidate: UseCase = {
      ...existing,
      id: 'candidate',
      title: `${existing.title} summary`,
      sources: [
        {
          ...existing.sources[0],
          id: 'new-source',
          url: 'https://example.com/new'
        }
      ]
    };

    expect(isDuplicateUseCase(candidate, seededUseCases)).toBe(true);
  });
});
