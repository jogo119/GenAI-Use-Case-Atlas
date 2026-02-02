import { PrismaClient } from '@prisma/client';
import useCases from '../data/use-cases.json';

const prisma = new PrismaClient();

async function main() {
  for (const useCase of useCases) {
    const company = await prisma.company.upsert({
      where: { id: useCase.company.id },
      update: {
        name: useCase.company.name,
        website: useCase.company.website,
        industry: useCase.company.industry,
        subIndustry: useCase.company.subIndustry,
        sizeBand: useCase.company.sizeBand,
        hqLocation: useCase.company.hqLocation,
        description: useCase.company.description
      },
      create: {
        id: useCase.company.id,
        name: useCase.company.name,
        website: useCase.company.website,
        industry: useCase.company.industry,
        subIndustry: useCase.company.subIndustry,
        sizeBand: useCase.company.sizeBand,
        hqLocation: useCase.company.hqLocation,
        description: useCase.company.description
      }
    });

    await prisma.useCase.upsert({
      where: { id: useCase.id },
      update: {
        title: useCase.title,
        companyId: company.id,
        industryTags: useCase.industryTags,
        functionTags: useCase.functionTags,
        capabilityTags: useCase.capabilityTags,
        problemStatement: useCase.problemStatement,
        solutionSummary: useCase.solutionSummary,
        workflowSteps: useCase.workflowSteps,
        deploymentType: useCase.deploymentType,
        maturityStage: useCase.maturityStage,
        modelInfo: useCase.modelInfo,
        dataSensitivity: useCase.dataSensitivity,
        governanceNotes: useCase.governanceNotes,
        valueMetrics: useCase.valueMetrics,
        risksMitigations: useCase.risksAndMitigations,
        lastVerifiedAt: new Date(useCase.lastVerifiedAt),
        confidenceScore: useCase.confidenceScore
      },
      create: {
        id: useCase.id,
        title: useCase.title,
        companyId: company.id,
        industryTags: useCase.industryTags,
        functionTags: useCase.functionTags,
        capabilityTags: useCase.capabilityTags,
        problemStatement: useCase.problemStatement,
        solutionSummary: useCase.solutionSummary,
        workflowSteps: useCase.workflowSteps,
        deploymentType: useCase.deploymentType,
        maturityStage: useCase.maturityStage,
        modelInfo: useCase.modelInfo,
        dataSensitivity: useCase.dataSensitivity,
        governanceNotes: useCase.governanceNotes,
        valueMetrics: useCase.valueMetrics,
        risksMitigations: useCase.risksAndMitigations,
        lastVerifiedAt: new Date(useCase.lastVerifiedAt),
        confidenceScore: useCase.confidenceScore,
        sources: {
          create: useCase.sources.map((source) => ({
            id: source.id,
            url: source.url,
            title: source.title,
            publisher: source.publisher,
            publishedAt: new Date(source.publishedAt),
            retrievedAt: new Date(source.retrievedAt),
            excerpt: source.excerpt,
            sourceType: source.sourceType,
            credibilityWeight: source.credibilityWeight
          }))
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
