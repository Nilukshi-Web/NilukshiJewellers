import React, { Suspense } from 'react'

import type { ProductCatalogBlock as ProductCatalogBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CatalogClient } from './Component.client'

export const ProductCatalogBlock: React.FC<ProductCatalogBlockProps> = async ({
  section,
  title,
  intro,
  emptyStateText,
}) => {
  const payload = await getPayload({ config: configPromise })

  const [products, categories, metals] = await Promise.all([
    payload.find({
      collection: 'products',
      depth: 1,
      limit: 300,
      pagination: false,
      sort: '-createdAt',
      where: {
        section: {
          equals: section,
        },
      },
    }),
    payload.find({
      collection: 'product-categories',
      limit: 50,
      pagination: false,
      sort: 'order',
      where: {
        section: {
          equals: section,
        },
      },
    }),
    section === 'jewellery'
      ? payload.find({
          collection: 'metals',
          limit: 12,
          pagination: false,
          sort: 'order',
        })
      : Promise.resolve(null),
  ])

  return (
    <Suspense fallback={null}>
      <CatalogClient
        categories={categories.docs}
        emptyStateText={emptyStateText}
        intro={intro}
        metals={metals?.docs || []}
        products={products.docs}
        section={section}
        title={title}
      />
    </Suspense>
  )
}
