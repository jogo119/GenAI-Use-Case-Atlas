'use client';

import Link from 'next/link';
import type { UseCase } from '@/lib/types';
import { useCompareStore } from '@/lib/compare-store';

const formatDate = (date: string) => new Date(date).toLocaleDateString();

export default function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const { compareIds, toggleCompare } = useCompareStore();
  const isSelected = compareIds.includes(useCase.id);

  return (
    <div className="card flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{useCase.company.industry}</p>
          <Link href={`/use-cases/${useCase.id}`} className="text-lg font-semibold text-slate-900">
            {useCase.title}
          </Link>
          <p className="text-sm text-slate-600">{useCase.company.name}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleCompare(useCase.id)}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            isSelected
              ? 'border-brand-600 bg-brand-50 text-brand-700'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          {isSelected ? 'Added' : 'Add to compare'}
        </button>
      </div>
      <p className="text-sm text-slate-700">{useCase.solutionSummary}</p>
      <div className="flex flex-wrap gap-2">
        {useCase.capabilityTags.map((tag) => (
          <span key={tag} className="tag">
            {tag.replace(/_/g, ' ')}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
        <span>Last verified: {formatDate(useCase.lastVerifiedAt)}</span>
        <span>Confidence: {useCase.confidenceScore}</span>
      </div>
    </div>
  );
}
