import type { Metadata } from 'next/types'

import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCard } from '@/components/ProductCard'
import { ProductSearch } from '@/components/ProductSearch'

export const dynamic = 'force-dynamic'

const RESULT_LIMIT = 60

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q } = await searchParamsPromise
  const query = (q || '').trim()

  const payload = await getPayload({ config: configPromise })

  // Matches the product's own text as well as its metal, category and
  // specification values, so "sapphire" or "white gold" find pieces too.
  const products = query
    ? await payload.find({
        collection: 'products',
        depth: 1,
        limit: RESULT_LIMIT,
        sort: 'name',
        where: {
          or: [
            { name: { like: query } },
            { description: { like: query } },
            { story: { like: query } },
            { 'category.title': { like: query } },
            { 'metal.name': { like: query } },
            { 'specs.value': { like: query } },
          ],
        },
      })
    : null

  return (
    <div className="container py-14">
      <h1 className="font-serif text-3xl md:text-4xl">Search</h1>

      <ProductSearch autoFocus className="mt-5 max-w-xl" defaultValue={query} />

      {products && (
        <p className="mt-6 text-xs uppercase tracking-widest text-bronze">
          {products.totalDocs === 0
            ? 'No pieces found'
            : `${products.totalDocs} ${products.totalDocs === 1 ? 'piece' : 'pieces'} matching “${query}”`}
          {products.totalDocs > RESULT_LIMIT && ` — showing the first ${RESULT_LIMIT}`}
        </p>
      )}

      {!query && (
        <p className="mt-8 font-serif text-xl italic opacity-60">
          Search our collection by name, metal, stone or category.
        </p>
      )}

      {products && products.totalDocs === 0 && (
        <p className="mt-8 font-serif text-xl italic opacity-60">
          Nothing matched “{query}”. Try a different word, or browse the collections above.
        </p>
      )}

      {products && products.docs.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
          {products.docs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ searchParams }: Args): Promise<Metadata> {
  const { q } = await searchParams
  const query = (q || '').trim()

  return {
    robots: { follow: true, index: false },
    title: query ? `Search: ${query} | NILUKSHI Jewellers` : 'Search | NILUKSHI Jewellers',
  }
}
