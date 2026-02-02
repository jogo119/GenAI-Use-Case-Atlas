-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "subIndustry" TEXT,
    "sizeBand" TEXT,
    "hqLocation" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "UseCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "industryTags" JSON NOT NULL,
    "functionTags" JSON NOT NULL,
    "capabilityTags" JSON NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "solutionSummary" TEXT NOT NULL,
    "workflowSteps" JSON NOT NULL,
    "deploymentType" TEXT NOT NULL,
    "maturityStage" TEXT NOT NULL,
    "modelInfo" JSON,
    "dataSensitivity" TEXT NOT NULL,
    "governanceNotes" TEXT,
    "valueMetrics" JSON NOT NULL,
    "risksMitigations" JSON NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastVerifiedAt" DATETIME NOT NULL,
    "confidenceScore" INTEGER NOT NULL,
    CONSTRAINT "UseCase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "useCaseId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "retrievedAt" DATETIME NOT NULL,
    "excerpt" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "credibilityWeight" REAL NOT NULL,
    CONSTRAINT "Source_useCaseId_fkey" FOREIGN KEY ("useCaseId") REFERENCES "UseCase" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");
