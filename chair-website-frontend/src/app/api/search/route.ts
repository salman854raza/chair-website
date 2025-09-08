import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { searchProductsQuery } from '@/lib/sanity/queries';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await sanityClient.fetch(searchProductsQuery, { q: query });

  return NextResponse.json({ results });
}