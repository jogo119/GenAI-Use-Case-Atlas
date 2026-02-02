import { describe, expect, it } from 'vitest';
import { filterUseCases } from '@/lib/filtering';
import { seededUseCases } from '@/lib/data';

const baseFilters = {
  query: '',
  industries: [],
  functions: [],
  maturity: [],
  deployments: [],
  dataSensitivity: [],
  vendors: [],
  sortBy: 'recent' as const
};

describe('filterUseCases', () => {
  it('filters by industry', () => {
    const filtered = filterUseCases(seededUseCases, { ...baseFilters, industries: ['finance'] });
    expect(filtered.every((useCase) => useCase.industryTags.includes('finance'))).toBe(true);
  });

  it('filters by vendor', () => {
    const filtered = filterUseCases(seededUseCases, { ...baseFilters, vendors: ['OpenAI'] });
    expect(filtered.every((useCase) => useCase.modelInfo?.vendor === 'OpenAI')).toBe(true);
  });

  it('filters by query', () => {
    const filtered = filterUseCases(seededUseCases, { ...baseFilters, query: 'assistant' });
    expect(filtered.length).toBeGreaterThan(0);
  });
});
