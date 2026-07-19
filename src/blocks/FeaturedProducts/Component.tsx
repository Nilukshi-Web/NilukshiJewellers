import React from 'react'

import type { Product, FeaturedProductsBlock as FeaturedProductsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCard } from '@/components/ProductCard'

export const FeaturedProductsBlock: React.FC<FeaturedProductsBlockProps> = async ({
  eyebrow,
  title,
  populateBy,
  limit: limitFromProps,
  selectedProducts,
}) => {
  const limit = limitFromProps || 6
  let products: Product[] = []

  if (populateBy === 'manual' && selectedProducts?.length) {
    products = selectedProducts.filter((p): p is Product => typeof p === 'object')
  } else {
    const payload = await getPayload({ config: configPromise })
    const fetched = await payload.find({
      collection: 'products',
      depth: 1,
      limit,
      sort: '-createdAt',
      ...(populateBy === 'featured'
        ? {
            where: {
              featured: {
                equals: true,
              },
            },
          }
        : {}),
    })
    products = fetched.docs
  }

  if (!products.length) return null

  return (
    <section className="container py-16">
      {eyebrow && (
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-wine">{eyebrow}</div>
      )}
      <h2 className="mb-7 font-serif text-3xl md:text-4xl">{title}</h2>
      <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
