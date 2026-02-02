'use client';

import { useState } from 'react';
import { isDuplicateUseCase } from '@/lib/dedup';
import { seededUseCases } from '@/lib/data';
import type { UseCase } from '@/lib/types';

interface MetadataResponse {
  title?: string;
  excerpt?: string;
}

export default function AddUseCasePage() {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState<MetadataResponse>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [summary, setSummary] = useState('');
  const [dedupWarning, setDedupWarning] = useState<string | null>(null);

  const fetchMetadata = async () => {
    setStatus('loading');
    try {
      const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed');
      const data = (await response.json()) as MetadataResponse;
      setMetadata(data);
      setTitle(data.title ?? '');
      setSummary(data.excerpt ?? '');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleCheck = () => {
    const candidate: UseCase = {
      id: 'candidate',
      title: title || metadata.title || 'Untitled',
      company: {
        id: 'candidate-company',
        name: companyName || 'Unknown Company',
        website: url || '',
        industry: 'other'
      },
      industryTags: ['other'],
      functionTags: [],
      capabilityTags: [],
      problemStatement: '',
      solutionSummary: summary || '',
      workflowSteps: [],
      deploymentType: 'internal_tool',
      maturityStage: 'pilot',
      dataSensitivity: 'internal',
      valueMetrics: [],
      risksAndMitigations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastVerifiedAt: new Date().toISOString(),
      confidenceScore: 0,
      sources: [
        {
          id: 'candidate-source',
          url,
          title: title || metadata.title || 'Source',
          publisher: 'Manual submission',
          publishedAt: new Date().toISOString(),
          retrievedAt: new Date().toISOString(),
          excerpt: summary || '',
          sourceType: 'news',
          credibilityWeight: 0.5
        }
      ]
    };

    if (isDuplicateUseCase(candidate, seededUseCases)) {
      setDedupWarning('This submission looks similar to an existing use case or source URL.');
    } else {
      setDedupWarning('No obvious duplicates detected.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="card p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Add a use case</h1>
        <p className="mt-2 text-sm text-slate-600">
          Submit a public source URL. We will fetch the page title and excerpt, then you can complete the structured
          fields.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="card space-y-4 p-6">
          <label className="text-sm font-semibold text-slate-900">Source URL</label>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com/case-study"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={fetchMetadata}
            className="w-fit rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white"
            disabled={!url}
          >
            Fetch metadata
          </button>
          {status === 'loading' && <p className="text-sm text-slate-500">Fetching metadata…</p>}
          {status === 'error' && <p className="text-sm text-red-600">Unable to fetch metadata. Try again.</p>}
          {status === 'success' && (
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">{metadata.title}</p>
              <p className="mt-1">{metadata.excerpt}</p>
            </div>
          )}
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="text-sm font-semibold text-slate-900">Dedup check</h2>
          <p className="text-xs text-slate-500">
            We flag likely duplicates if the company and title are very similar or the source URL already exists.
          </p>
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600"
          >
            Run dedup check
          </button>
          {dedupWarning && <p className="text-sm text-slate-600">{dedupWarning}</p>}
        </div>
      </div>

      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Structured fields</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-900">Company name</label>
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900">Use case title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900">Summary</label>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            rows={4}
          />
        </div>
        <button
          type="button"
          className="w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Save submission (stub)
        </button>
        <p className="text-xs text-slate-500">
          Saving is stubbed for MVP. Connect to Prisma to persist records.
        </p>
      </div>
    </div>
  );
}
