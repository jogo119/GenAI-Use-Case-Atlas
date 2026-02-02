'use client';

import type {
  CorporateFunction,
  DataSensitivity,
  DeploymentType,
  FilterState,
  Industry,
  MaturityStage
} from '@/lib/types';

interface FilterPanelProps {
  filters: FilterState;
  industryOptions: Industry[];
  functionOptions: CorporateFunction[];
  maturityOptions: MaturityStage[];
  deploymentOptions: DeploymentType[];
  sensitivityOptions: DataSensitivity[];
  vendorOptions: string[];
  onChange: (next: FilterState) => void;
}

const toggleValue = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export default function FilterPanel({
  filters,
  industryOptions,
  functionOptions,
  maturityOptions,
  deploymentOptions,
  sensitivityOptions,
  vendorOptions,
  onChange
}: FilterPanelProps) {
  return (
    <div className="card flex flex-col gap-6 p-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Search</h3>
        <input
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="Search by company, use case, or capability"
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
      <FilterSection
        title="Industries"
        options={industryOptions}
        selected={filters.industries}
        onToggle={(value) => onChange({ ...filters, industries: toggleValue(filters.industries, value) })}
      />
      <FilterSection
        title="Functions"
        options={functionOptions}
        selected={filters.functions}
        onToggle={(value) => onChange({ ...filters, functions: toggleValue(filters.functions, value) })}
      />
      <FilterSection
        title="Maturity"
        options={maturityOptions}
        selected={filters.maturity}
        onToggle={(value) => onChange({ ...filters, maturity: toggleValue(filters.maturity, value) })}
      />
      <FilterSection
        title="Deployment"
        options={deploymentOptions}
        selected={filters.deployments}
        onToggle={(value) => onChange({ ...filters, deployments: toggleValue(filters.deployments, value) })}
      />
      <FilterSection
        title="Data Sensitivity"
        options={sensitivityOptions}
        selected={filters.dataSensitivity}
        onToggle={(value) => onChange({ ...filters, dataSensitivity: toggleValue(filters.dataSensitivity, value) })}
      />
      <FilterSection
        title="LLM Vendor"
        options={vendorOptions}
        selected={filters.vendors}
        onToggle={(value) => onChange({ ...filters, vendors: toggleValue(filters.vendors, value) })}
      />
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(event) => onChange({ ...filters, sortBy: event.target.value as FilterState['sortBy'] })}
          className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="recent">Most recent</option>
          <option value="confidence">Highest confidence</option>
          <option value="cited">Most cited</option>
        </select>
      </div>
    </div>
  );
}

interface FilterSectionProps<T> {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
}

function FilterSection<T extends string>({ title, options, selected, onToggle }: FilterSectionProps<T>) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                isActive ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'
              }`}
            >
              {option.replace(/_/g, ' ')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
