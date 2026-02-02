import { differenceInDays, parseISO } from 'date-fns';
import type { UseCase } from '@/lib/types';

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

export const computeConfidenceScore = (useCase: Pick<UseCase, 'sources' | 'lastVerifiedAt'>) => {
  const now = new Date();
  const averageCredibility =
    useCase.sources.reduce((sum, source) => sum + source.credibilityWeight, 0) /
    Math.max(useCase.sources.length, 1);
  const recencyDays = differenceInDays(now, parseISO(useCase.lastVerifiedAt));
  const recencyScore = recencyDays <= 30 ? 1 : recencyDays <= 180 ? 0.8 : recencyDays <= 365 ? 0.6 : 0.4;

  const weightedScore = averageCredibility * 60 + recencyScore * 40;
  return clamp(Math.round(weightedScore));
};
