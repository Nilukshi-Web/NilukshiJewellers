import type { Metadata } from 'next'

import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { Check, Facebook, Instagram, MessageCircle, Phone } from 'lucide-react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { whatsappLink } from '@/utilities/whatsapp'
import { cn } from '@/utilities/ui'
import { ProductGallery } from './ProductGallery.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return products.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const specRows: { key: string; label: string }[] = [
  { key: 'material', label: 'Material' },
  { key: 'stoneType', label: 'Stone' },
  { key: 'stoneColor', label: 'Stone Colour' },
  { key: 'cut', label: 'Cut' },
  { key: 'count', label: 'Count' },
  { key: 'carat', label: 'Carat' },
  { key: 'size', label: 'Size' },
]

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug: decodeURIComponent(slug) })

  if (!product) notFound()

  const settings = await getCachedGlobal('site-settings', 0)()

  const waMessage = (settings?.whatsappMessages?.product || 'Hi, I’m interested in “{product}”.')
    .replaceAll('{product}', product.name)
    .replaceAll('{price}', formatPrice(product.price))
  const waHref = whatsappLink(settings?.whatsapp, waMessage)

  const images = (product.images || []).filter(
    (img): img is MediaType => typeof img === 'object' && img !== null,
  )

  const eyebrow =
    (product.metal && typeof product.metal === 'object' && product.metal.name) ||
    (product.category && typeof product.category === 'object' && product.category.title) ||
    null

  const specs = specRows
    .map(({ key, label }) => ({
      label,
      value: product.specs?.[key as keyof typeof product.specs],
    }))
    .filter((row) => row.value && row.value !== '—')

  return (
    <article className="container grid grid-cols-1 gap-10 py-14 lg:grid-cols-2">
      <ProductGallery images={images} name={product.name} available={product.available ?? true} />

      <div>
        {eyebrow && (
          <div className="mb-2 text-xs uppercase tracking-[0.22em] text-wine">{eyebrow}</div>
        )}
        <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>
        <div className="mt-2 text-lg text-wine">{formatPrice(product.price)}</div>

        {product.description && (
          <p className="mt-5 leading-relaxed opacity-85">{product.description}</p>
        )}

        {product.story && (
          <div className="mt-6 bg-sand px-5 py-4">
            <div className="mb-1 font-serif italic text-wine">The Story</div>
            <p className="text-sm leading-relaxed">{product.story}</p>
          </div>
        )}

        {specs.length > 0 && (
          <table className="mt-6 w-full border-collapse text-sm">
            <tbody>
              {specs.map((row) => (
                <tr key={row.label} className="border-b border-bronze/25">
                  <td className="w-1/3 py-2 text-[0.7rem] uppercase tracking-wider text-bronze">
                    {row.label}
                  </td>
                  <td className="py-2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div
          className={cn(
            'mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider',
            product.available ? 'bg-sage/35 text-green-900' : 'bg-wine/10 text-wine',
          )}
        >
          <Check size={13} /> {product.available ? 'Available' : 'Sold Out'}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {settings?.whatsapp && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-wine px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-wine/85"
            >
              <MessageCircle size={15} /> WhatsApp Us
            </a>
          )}
          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              aria-label="Call"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze"
            >
              <Phone size={16} />
            </a>
          )}
          {settings?.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze"
            >
              <Instagram size={16} />
            </a>
          )}
          {settings?.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze"
            >
              <Facebook size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug: decodeURIComponent(slug) })

  if (!product) return {}

  const image = product.images?.[0]
  const ogImage =
    image && typeof image === 'object' && image.url ? `${getServerSideURL()}${image.url}` : undefined

  return {
    title: `${product.name} | AMARÉ Jewellers`,
    description: product.description || undefined,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
