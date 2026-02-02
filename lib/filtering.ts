import type { FilterState, UseCase } from '@/lib/types';

const normalize = (value: string) => value.toLowerCase().trim();

const matchesQuery = (useCase: UseCase, query: string) => {
  if (!query) return true;
  const normalized = normalize(query);
  return (
    normalize(useCase.title).includes(normalized) ||
    normalize(useCase.company.name).includes(normalized) ||
    normalize(useCase.solutionSummary).includes(normalized) ||
    useCase.capabilityTags.some((tag) => normalize(tag).includes(normalized))
  );
};

const matchesList = <T,>(target: T[], selected: T[]) =>
  selected.length === 0 || selected.some((value) => target.includes(value));

export const filterUseCases = (useCases: UseCase[], filters: FilterState) => {
  return useCases
    .filter((useCase) => matchesQuery(useCase, filters.query))
    .filter((useCase) => matchesList(useCase.industryTags, filters.industries))
    .filter((useCase) => matchesList(useCase.functionTags, filters.functions))
    .filter((useCase) => matchesList([useCase.maturityStage], filters.maturity))
    .filter((useCase) => matchesList([useCase.deploymentType], filters.deployments))
    .filter((useCase) => matchesList([useCase.dataSensitivity], filters.dataSensitivity))
    .filter((useCase) =>
      filters.vendors.length === 0
        ? true
        : useCase.modelInfo?.vendor
        ? filters.vendors.includes(useCase.modelInfo.vendor)
        : false
    );
};

export const sortUseCases = (useCases: UseCase[], sortBy: FilterState['sortBy']) => {
  return [...useCases].sort((a, b) => {
    if (sortBy === 'confidence') {
      return b.confidenceScore - a.confidenceScore;
    }
    if (sortBy === 'cited') {
      return b.sources.length - a.sources.length;
    }
    return new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime();
  });
};
