import type { UseCase } from '@/lib/types';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const jaccardSimilarity = (a: string, b: string) => {
  const aTokens = new Set(normalize(a).split(' '));
  const bTokens = new Set(normalize(b).split(' '));
  const intersection = [...aTokens].filter((token) => bTokens.has(token));
  const union = new Set([...aTokens, ...bTokens]);
  return intersection.length / Math.max(union.size, 1);
};

export const isDuplicateUseCase = (candidate: UseCase, existing: UseCase[]) => {
  return existing.some((useCase) => {
    const sameSource = candidate.sources.some((source) =>
      useCase.sources.some((existingSource) => existingSource.url === source.url)
    );
    if (sameSource) return true;

    const sameCompany = normalize(useCase.company.name) === normalize(candidate.company.name);
    const titleSimilarity = jaccardSimilarity(useCase.title, candidate.title);

    return sameCompany && titleSimilarity >= 0.8;
  });
};
