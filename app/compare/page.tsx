'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useCompareStore } from '@/lib/compare-store';
import { seededUseCases } from '@/lib/data';

export default function ComparePage() {
  const { compareIds, clearCompare } = useCompareStore();
  const selected = useMemo(
    () => seededUseCases.filter((useCase) => compareIds.includes(useCase.id)),
    [compareIds]
  );

  if (compareIds.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 p-12 text-center">
        <p className="text-lg font-semibold text-slate-900">No use cases selected</p>
        <p className="text-sm text-slate-500">Add 2–4 use cases from the browse page to compare.</p>
        <Link href="/" className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm text-white">
          Browse use cases
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Compare use cases</h1>
          <p className="text-sm text-slate-500">Side-by-side comparison of selected use cases.</p>
        </div>
        <button onClick={clearCompare} className="text-sm text-slate-500 hover:text-slate-700">
          Clear selection
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-[800px] border-separate border-spacing-3 text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase text-slate-500">Field</th>
              {selected.map((useCase) => (
                <th key={useCase.id} className="min-w-[220px] rounded-xl bg-white p-4 text-left">
                  <p className="text-sm font-semibold text-slate-900">{useCase.title}</p>
                  <p className="text-xs text-slate-500">{useCase.company.name}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Problem', (useCase) => useCase.problemStatement],
              ['Solution', (useCase) => useCase.solutionSummary],
              ['Workflow', (useCase) => useCase.workflowSteps.join(' · ')],
              ['Maturity', (useCase) => useCase.maturityStage],
              ['Deployment', (useCase) => useCase.deploymentType],
              ['Model info', (useCase) => useCase.modelInfo?.vendor ?? 'Not disclosed'],
              ['Sensitivity', (useCase) => useCase.dataSensitivity],
              ['Metrics', (useCase) => useCase.valueMetrics.map((m) => `${m.metric}: ${m.value}${m.unit ?? ''}`).join(' | ')],
              ['Governance', (useCase) => useCase.governanceNotes ?? '—'],
              ['Sources', (useCase) => `${useCase.sources.length} sources`]
            ].map(([label, getter]) => (
              <tr key={label as string}>
                <td className="rounded-xl bg-slate-100 p-3 text-xs font-semibold uppercase text-slate-500">
                  {label as string}
                </td>
                {selected.map((useCase) => (
                  <td key={useCase.id} className="rounded-xl bg-white p-4 text-slate-700">
                    {(getter as (u: typeof useCase) => string)(useCase)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
