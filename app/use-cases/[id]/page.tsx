import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getUseCaseById, seededUseCases } from '@/lib/data';

const formatDate = (value: string) => new Date(value).toLocaleDateString();

export default function UseCaseDetailPage({ params }: { params: { id: string } }) {
  const useCase = getUseCaseById(params.id);

  if (!useCase) {
    notFound();
  }

  const similar = seededUseCases
    .filter((candidate) =>
      candidate.id !== useCase.id &&
      candidate.capabilityTags.some((tag) => useCase.capabilityTags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm text-brand-600">
        ← Back to search
      </Link>
      <div className="card p-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">{useCase.company.industry}</p>
          <h1 className="text-3xl font-semibold text-slate-900">{useCase.title}</h1>
          <p className="text-sm text-slate-600">{useCase.company.name}</p>
          <div className="flex flex-wrap gap-2">
            {useCase.capabilityTags.map((tag) => (
              <span key={tag} className="tag">
                {tag.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">What they built</h2>
            <p className="mt-2 text-sm text-slate-600">{useCase.solutionSummary}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {useCase.workflowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Public evidence</h2>
            <div className="mt-4 space-y-4">
              {useCase.sources.map((source) => (
                <div key={source.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">{source.title}</p>
                  <p className="text-xs text-slate-500">
                    {source.publisher} · {formatDate(source.publishedAt)}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{source.excerpt}</p>
                  <Link href={source.url} className="mt-2 inline-block text-sm text-brand-600">
                    View source
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Value & outcomes</h2>
            <table className="mt-4 w-full text-sm">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2">Metric</th>
                  <th className="py-2">Value</th>
                  <th className="py-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {useCase.valueMetrics.map((metric) => (
                  <tr key={metric.metric} className="border-t border-slate-200">
                    <td className="py-2 text-slate-700">{metric.metric}</td>
                    <td className="py-2 text-slate-700">
                      {metric.value} {metric.unit}
                    </td>
                    <td className="py-2 text-slate-500">{metric.sourceRef ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900">Risks & governance</h2>
            <p className="mt-2 text-sm text-slate-600">{useCase.governanceNotes}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {useCase.risksAndMitigations.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900">At a glance</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Deployment:</span> {useCase.deploymentType}
              </p>
              <p>
                <span className="font-medium text-slate-900">Maturity:</span> {useCase.maturityStage}
              </p>
              <p>
                <span className="font-medium text-slate-900">Sensitivity:</span> {useCase.dataSensitivity}
              </p>
              <p>
                <span className="font-medium text-slate-900">LLM Vendor:</span>{' '}
                {useCase.modelInfo?.vendor ?? 'Not disclosed'}
              </p>
              <p>
                <span className="font-medium text-slate-900">Approach:</span>{' '}
                {useCase.modelInfo?.rag ? 'RAG' : 'Prompting'}
                {useCase.modelInfo?.fineTune ? ' + Fine-tune' : ''}
              </p>
              <p>
                <span className="font-medium text-slate-900">Confidence:</span> {useCase.confidenceScore}
              </p>
              <p>
                <span className="font-medium text-slate-900">Last verified:</span>{' '}
                {formatDate(useCase.lastVerifiedAt)}
              </p>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900">Company profile</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Website:</span>{' '}
                <Link href={useCase.company.website} className="text-brand-600">
                  {useCase.company.website}
                </Link>
              </p>
              <p>
                <span className="font-medium text-slate-900">HQ:</span> {useCase.company.hqLocation}
              </p>
              <p>
                <span className="font-medium text-slate-900">Size:</span> {useCase.company.sizeBand}
              </p>
              <p>{useCase.company.description}</p>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-900">Similar use cases</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {similar.length === 0 ? (
                <p>No similar cases yet.</p>
              ) : (
                similar.map((caseItem) => (
                  <Link
                    key={caseItem.id}
                    href={`/use-cases/${caseItem.id}`}
                    className="block rounded-lg border border-slate-200 p-3 hover:border-brand-300"
                  >
                    <p className="text-sm font-semibold text-slate-900">{caseItem.title}</p>
                    <p className="text-xs text-slate-500">{caseItem.company.name}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
