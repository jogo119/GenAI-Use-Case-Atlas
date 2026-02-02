export type Industry =
  | 'finance'
  | 'healthcare'
  | 'education'
  | 'legal'
  | 'retail'
  | 'manufacturing'
  | 'logistics'
  | 'energy'
  | 'public_sector'
  | 'technology'
  | 'telecom'
  | 'media'
  | 'other';

export type CorporateFunction =
  | 'HR'
  | 'finance_ops'
  | 'legal_ops'
  | 'sales'
  | 'marketing'
  | 'customer_support'
  | 'IT'
  | 'security'
  | 'procurement'
  | 'analytics'
  | 'compliance';

export type CapabilityTag =
  | 'document_intelligence'
  | 'customer_support_automation'
  | 'developer_productivity'
  | 'workflow_orchestration'
  | 'underwriting'
  | 'fraud_detection'
  | 'regulatory_compliance'
  | 'marketing_generation'
  | 'knowledge_retrieval'
  | 'call_intelligence'
  | 'data_enrichment'
  | 'decision_support';

export type DataSensitivity = 'none' | 'internal' | 'PII' | 'PHI' | 'PCI';

export type DeploymentType =
  | 'internal_tool'
  | 'customer_facing'
  | 'agentic_workflow'
  | 'embedded_feature';

export type MaturityStage = 'pilot' | 'prod' | 'scaled';

export type SourceType = 'press' | 'blog' | 'case_study' | 'news';

export interface Company {
  id: string;
  name: string;
  website: string;
  industry: Industry;
  subIndustry?: string;
  sizeBand?: 'SMB' | 'MM' | 'ENT';
  hqLocation?: string;
  description?: string;
}

export interface ModelInfo {
  vendor?: string;
  modelFamily?: string;
  rag?: boolean;
  fineTune?: boolean;
  agentFramework?: string;
}

export interface ValueMetric {
  metric: string;
  value: string;
  unit?: string;
  sourceRef?: string;
}

export interface Source {
  id: string;
  url: string;
  title: string;
  publisher: string;
  publishedAt: string;
  retrievedAt: string;
  excerpt: string;
  sourceType: SourceType;
  credibilityWeight: number;
}

export interface UseCase {
  id: string;
  title: string;
  company: Company;
  industryTags: Industry[];
  functionTags: CorporateFunction[];
  capabilityTags: CapabilityTag[];
  problemStatement: string;
  solutionSummary: string;
  workflowSteps: string[];
  deploymentType: DeploymentType;
  maturityStage: MaturityStage;
  modelInfo?: ModelInfo;
  dataSensitivity: DataSensitivity;
  governanceNotes?: string;
  valueMetrics: ValueMetric[];
  risksAndMitigations: string[];
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt: string;
  confidenceScore: number;
  sources: Source[];
}

export interface FilterState {
  query: string;
  industries: Industry[];
  functions: CorporateFunction[];
  maturity: MaturityStage[];
  deployments: DeploymentType[];
  dataSensitivity: DataSensitivity[];
  vendors: string[];
  sortBy: 'recent' | 'confidence' | 'cited';
}
