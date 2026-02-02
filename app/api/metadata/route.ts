import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'GenAI-Use-Case-Atlas' } });
    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to fetch URL' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $('title').first().text().trim();
    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '';

    const excerpt = description || $('p').first().text().trim().slice(0, 240);

    return NextResponse.json({ title, excerpt });
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
