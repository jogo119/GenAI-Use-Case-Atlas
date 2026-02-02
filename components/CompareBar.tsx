'use client';

import Link from 'next/link';
import { useCompareStore } from '@/lib/compare-store';

export default function CompareBar() {
  const { compareIds, clearCompare } = useCompareStore();

  if (compareIds.length === 0) return null;

  return (
    <div className="card sticky bottom-6 mx-auto mt-8 flex flex-wrap items-center justify-between gap-4 px-6 py-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">Comparison tray</p>
        <p className="text-xs text-slate-500">Select up to 4 use cases to compare.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          {compareIds.length} selected
        </span>
        <Link
          href="/compare"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white"
        >
          Compare
        </Link>
        <button
          type="button"
          onClick={clearCompare}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
