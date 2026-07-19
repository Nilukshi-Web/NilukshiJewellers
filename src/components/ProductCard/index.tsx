import React from 'react'
import Link from 'next/link'
import { Gem } from 'lucide-react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatPrice } from '@/utilities/formatPrice'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const image = product.images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[10/11] overflow-hidden bg-sand">
        {image && typeof image === 'object' ? (
          <Media
            resource={image}
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-sage text-wine">
            <Gem size={28} strokeWidth={1} />
            <span className="font-serif text-sm">{product.name}</span>
          </div>
        )}
        {!product.available && (
          <span className="absolute left-3 top-3 bg-ink px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
      </div>
      <div className="pt-3">
        <div className="font-serif text-lg leading-snug">{product.name}</div>
        <div className="text-sm text-wine">{formatPrice(product.price)}</div>
      </div>
    </Link>
  )
}
