'use client';

import { useMemo, useState } from 'react';
import CompareBar from '@/components/CompareBar';
import FilterPanel from '@/components/FilterPanel';
import UseCaseCard from '@/components/UseCaseCard';
import {
  deploymentOptions,
  functionOptions,
  industryOptions,
  maturityOptions,
  seededUseCases,
  sensitivityOptions,
  vendorOptions
} from '@/lib/data';
import { filterUseCases, sortUseCases } from '@/lib/filtering';
import type { FilterState } from '@/lib/types';

const defaultFilters: FilterState = {
  query: '',
  industries: [],
  functions: [],
  maturity: [],
  deployments: [],
  dataSensitivity: [],
  vendors: [],
  sortBy: 'recent'
};

export default function HomePage() {
  const [filters, setFilters] = useState(defaultFilters);
  const filtered = useMemo(() => filterUseCases(seededUseCases, filters), [filters]);
  const results = useMemo(() => sortUseCases(filtered, filters.sortBy), [filtered, filters.sortBy]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-brand-50 p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Search the GenAI Use Case Atlas</h1>
        <p className="mt-2 text-slate-600">
          Explore verified enterprise GenAI implementations across industries. Filter by maturity, deployment,
          data sensitivity, or vendor to compare what teams built and the outcomes they reported.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <FilterPanel
          filters={filters}
          industryOptions={industryOptions}
          functionOptions={functionOptions}
          maturityOptions={maturityOptions}
          deploymentOptions={deploymentOptions}
          sensitivityOptions={sensitivityOptions}
          vendorOptions={vendorOptions}
          onChange={setFilters}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Use cases</h2>
            <p className="text-sm text-slate-500">{results.length} results</p>
          </div>
          {results.length === 0 ? (
            <div className="card flex flex-col items-center gap-2 p-12 text-center">
              <p className="text-lg font-semibold text-slate-900">No matches found</p>
              <p className="text-sm text-slate-500">Try adjusting filters or search terms.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((useCase) => (
                <UseCaseCard key={useCase.id} useCase={useCase} />
              ))}
            </div>
          )}
        </div>
      </div>
      <CompareBar />
    </div>
  );
}
