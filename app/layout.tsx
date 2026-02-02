import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GenAI Use Case Atlas',
  description: 'A searchable repository of enterprise GenAI use cases.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="border-b border-slate-200 bg-white">
          <div className="container flex items-center justify-between py-6">
            <div>
              <Link href="/" className="text-lg font-semibold text-slate-900">
                GenAI Use Case Atlas
              </Link>
              <p className="text-sm text-slate-500">
                Public, verified enterprise GenAI use cases.
              </p>
            </div>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Browse
              </Link>
              <Link href="/compare" className="hover:text-slate-900">
                Compare
              </Link>
              <Link href="/add" className="rounded-full bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
                Add Use Case
              </Link>
            </nav>
          </div>
        </div>
        <main className="container py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="container flex flex-col gap-2 py-6 text-sm text-slate-500">
            <p>Public information only. Verify with primary sources.</p>
            <p>GenAI Use Case Atlas MVP · Built for discovery and comparison.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
