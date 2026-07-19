'use client'

import React, { useState } from 'react'
import { Gem } from 'lucide-react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = {
  available: boolean
  images: MediaType[]
  name: string
}

export const ProductGallery: React.FC<Props> = ({ available, images, name }) => {
  const [active, setActive] = useState(0)
  const current = images[active]

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-sand">
        {current ? (
          <Media resource={current} fill priority imgClassName="object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-sage text-wine">
            <Gem size={32} strokeWidth={1} />
            <span className="font-serif">{name}</span>
          </div>
        )}
        {!available && (
          <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[0.7rem] uppercase tracking-widest text-white">
            Sold Out
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
              className={cn(
                'relative aspect-square overflow-hidden border transition-colors',
                i === active ? 'border-wine' : 'border-transparent opacity-75 hover:opacity-100',
              )}
            >
              <Media resource={img} fill imgClassName="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
