import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { MetalShowcaseBlock as MetalShowcaseBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const MetalShowcaseBlock: React.FC<MetalShowcaseBlockProps> = async ({ ctaLabel }) => {
  const payload = await getPayload({ config: configPromise })

  const metals = await payload.find({
    collection: 'metals',
    limit: 12,
    pagination: false,
    sort: 'order',
  })

  if (!metals.docs.length) return null

  return (
    <section className="grid grid-cols-1 gap-px border-y border-bronze/35 bg-bronze/35 sm:grid-cols-3">
      {metals.docs.map((metal) => (
        <Link
          key={metal.id}
          href={`/jewellery?metal=${metal.slug}`}
          className="flex flex-col items-center gap-2.5 bg-cream px-6 py-10 text-center transition-colors hover:bg-sand/40"
        >
          <span
            className="inline-block h-9 w-9 rounded-full border border-black/15"
            style={{ background: metal.swatchColor }}
          />
          <span className="font-serif text-2xl">{metal.name}</span>
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-wine">
            {ctaLabel || 'Shop now'} <ArrowRight size={13} strokeWidth={1.6} />
          </span>
        </Link>
      ))}
    </section>
  )
}
