import React from 'react'
import { MessageCircle } from 'lucide-react'

import type { CustomCommissionBlock as CustomCommissionBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ProductCard } from '@/components/ProductCard'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { whatsappLink } from '@/utilities/whatsapp'

export const CustomCommissionBlock: React.FC<CustomCommissionBlockProps> = async ({
  eyebrow,
  title,
  lede,
  ctaLabel,
  recentTitle,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const [settings, products] = await Promise.all([
    getCachedGlobal('site-settings', 0)(),
    payload.find({
      collection: 'products',
      depth: 1,
      limit: limit || 8,
      sort: '-createdAt',
      where: {
        section: {
          equals: 'custom',
        },
      },
    }),
  ])

  const waHref = whatsappLink(settings?.whatsapp, settings?.whatsappMessages?.custom)

  return (
    <section className="container py-16">
      {eyebrow && (
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-wine">{eyebrow}</div>
      )}
      <h2 className="mb-4 font-serif text-3xl md:text-4xl">{title}</h2>
      {lede && <p className="mb-6 max-w-2xl leading-relaxed opacity-85">{lede}</p>}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-wine px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-wine/85"
      >
        <MessageCircle size={15} /> {ctaLabel || 'Start on WhatsApp'}
      </a>

      {products.docs.length > 0 && (
        <>
          <h3 className="mb-6 mt-14 font-serif text-2xl">{recentTitle || 'Recent Custom Work'}</h3>
          <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
            {products.docs.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
