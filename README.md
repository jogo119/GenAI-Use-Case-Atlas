# GenAI Use Case Atlas

GenAI Use Case Atlas is a production-quality MVP that catalogs publicly documented enterprise GenAI use cases. It supports search, filtering, and side-by-side comparison, with a lightweight ingestion workflow for adding new sources.

## Features

- Browse a curated dataset of enterprise GenAI use cases with filters for industry, function, maturity, deployment type, data sensitivity, and LLM vendor.
- Detailed use case pages with company context, workflow steps, governance notes, and public evidence.
- Comparison view for 2–4 use cases.
- Add-by-URL ingestion stub that fetches page metadata and performs dedup checks.
- Prisma + SQLite schema with seed data and migration.

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + SQLite
- Vitest for unit tests

## Getting started

```bash
npm install
```

Create a local SQLite database:

```bash
cp .env.example .env
npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
```

Run the app:

```bash
npm run dev
```

## Ingestion flow

1. Paste a public URL on **Add Use Case**.
2. The app fetches the page title and meta description (or first paragraph) for context.
3. Fill in the structured fields and run a dedup check.
4. Saving is stubbed for the MVP, but the Prisma schema and seed script show how to persist records.

> **Important:** Do not scrape or bypass paywalls. Prefer RSS, sitemaps, and official case studies. Obey robots.txt when implementing crawlers.

## Testing

```bash
npm run test
```

## Notes on data quality

- Confidence scores combine source credibility and recency.
- Use cases include references to public sources with timestamps.
- This project does not collect personal data.

## Project structure

- `app/`: Next.js pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Filtering, dedup, confidence scoring logic.
- `data/`: Seed dataset.
- `prisma/`: Schema, migration, and seed script.
- `tests/`: Unit tests.
