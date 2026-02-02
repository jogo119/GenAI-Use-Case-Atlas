import useCases from '@/data/use-cases.json';
import type { UseCase } from '@/lib/types';

export const seededUseCases = useCases as UseCase[];

export const getUseCaseById = (id: string) =>
  seededUseCases.find((useCase) => useCase.id === id);

export const getUniqueValues = <T,>(values: T[]) =>
  Array.from(new Set(values));

export const industryOptions = getUniqueValues(
  seededUseCases.map((useCase) => useCase.company.industry)
);

export const functionOptions = getUniqueValues(
  seededUseCases.flatMap((useCase) => useCase.functionTags)
);

export const maturityOptions = getUniqueValues(
  seededUseCases.map((useCase) => useCase.maturityStage)
);

export const deploymentOptions = getUniqueValues(
  seededUseCases.map((useCase) => useCase.deploymentType)
);

export const sensitivityOptions = getUniqueValues(
  seededUseCases.map((useCase) => useCase.dataSensitivity)
);

export const vendorOptions = getUniqueValues(
  seededUseCases
    .map((useCase) => useCase.modelInfo?.vendor)
    .filter((vendor): vendor is string => Boolean(vendor))
);
