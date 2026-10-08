'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import type { Metal, Product, ProductCategory } from '@/payload-types'

import { ProductCard } from '@/components/ProductCard'
import { cn } from '@/utilities/ui'

type Props = {
  categories: ProductCategory[]
  emptyStateText?: string | null
  intro?: string | null
  metals: Metal[]
  products: Product[]
  section: 'jewellery' | 'gems' | 'silver' | 'custom'
  title: string
}

const relSlug = (rel: Product['metal'] | Product['category']): string | null =>
  rel && typeof rel === 'object' ? rel.slug || null : null

export const CatalogClient: React.FC<Props> = ({
  categories,
  emptyStateText,
  intro,
  metals,
  products,
  section,
  title,
}) => {
  const searchParams = useSearchParams()
  const showMetalTabs = section === 'jewellery' && metals.length > 0
  const showCategoryTabs = categories.length > 1

  const paramMetal = searchParams.get('metal')
  const paramCategory = searchParams.get('category')

  // null means "All" metals
  const [activeMetal, setActiveMetal] = useState<string | null>(
    showMetalTabs ? metals.find((m) => m.slug === paramMetal)?.slug || null : null,
  )
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories.find((c) => c.slug === paramCategory)?.slug || null,
  )

  // Keep tabs in sync when the URL changes (e.g. mega menu click while already on this page)
  useEffect(() => {
    if (showMetalTabs) {
      setActiveMetal(metals.find((m) => m.slug === paramMetal)?.slug || null)
    }
    setActiveCategory(categories.find((c) => c.slug === paramCategory)?.slug || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramMetal, paramCategory])

  const syncUrl = (metal: string | null, category: string | null) => {
    const params = new URLSearchParams()
    if (metal) params.set('metal', metal)
    if (category) params.set('category', category)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }

  const visible = useMemo(
    () =>
      products.filter((p) => {
        if (showMetalTabs && activeMetal && relSlug(p.metal) !== activeMetal) return false
        if (activeCategory && relSlug(p.category) !== activeCategory) return false
        return true
      }),
    [products, activeMetal, activeCategory, showMetalTabs],
  )

  return (
    <section className="container py-16">
      {showMetalTabs && (
        <div className="mb-6 flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              setActiveMetal(null)
              setActiveCategory(null)
              syncUrl(null, null)
            }}
            className={cn(
              'flex items-center gap-2 rounded-full border px-5 py-2 font-serif text-lg transition-colors',
              !activeMetal ? 'border-ink bg-ink text-white' : 'border-bronze hover:bg-sand/50',
            )}
          >
            All
          </button>
          {metals.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveMetal(m.slug || null)
                setActiveCategory(null)
                syncUrl(m.slug || null, null)
              }}
              className={cn(
                'flex items-center gap-2 rounded-full border px-5 py-2 font-serif text-lg transition-colors',
                activeMetal === m.slug
                  ? 'border-ink bg-ink text-white'
                  : 'border-bronze hover:bg-sand/50',
              )}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: m.swatchColor }}
              />
              {m.name}
            </button>
          ))}
        </div>
      )}

      <h2 className="mb-2 font-serif text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mb-4 max-w-2xl leading-relaxed opacity-85">{intro}</p>}

      {showCategoryTabs && (
        <div className="mb-8 mt-5 flex flex-wrap gap-6 border-b border-bronze/35 pb-3.5">
          <button
            onClick={() => {
              setActiveCategory(null)
              syncUrl(activeMetal, null)
            }}
            className={cn(
              'border-b-2 pb-1 text-xs uppercase tracking-widest transition-colors',
              !activeCategory
                ? 'border-wine text-wine'
                : 'border-transparent opacity-60 hover:opacity-100',
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.slug || null)
                syncUrl(activeMetal, c.slug || null)
              }}
              className={cn(
                'border-b-2 pb-1 text-xs uppercase tracking-widest transition-colors',
                activeCategory === c.slug
                  ? 'border-wine text-wine'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="py-12 text-center font-serif text-xl italic opacity-60">
          {emptyStateText || 'No pieces here yet — check back soon.'}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
