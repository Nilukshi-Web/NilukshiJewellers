'use client'

import React, { useEffect, useState } from 'react'

import type { HeroCarouselBlock as HeroCarouselBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroCarouselBlock: React.FC<HeroCarouselBlockProps> = ({
  eyebrow,
  heading,
  subheading,
  slides,
  links,
}) => {
  const [slide, setSlide] = useState(0)
  const count = slides?.length || 0

  useEffect(() => {
    if (count < 2) return
    const t = setInterval(() => setSlide((s) => (s + 1) % count), 5000)
    return () => clearInterval(t)
  }, [count])

  return (
    <section className="relative h-[78vh] min-h-[460px] overflow-hidden">
      {slides?.map((s, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === slide ? 'opacity-100' : 'opacity-0',
          )}
        >
          {s.image && typeof s.image === 'object' && (
            <Media resource={s.image} fill priority={i === 0} imgClassName="object-cover" />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55" />
      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center text-white">
        {eyebrow && (
          <div className="mb-3 text-xs uppercase tracking-[0.22em] text-sand">{eyebrow}</div>
        )}
        <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{heading}</h1>
        {subheading && <p className="mt-4 mb-2 max-w-xl text-base opacity-90">{subheading}</p>}
        {Array.isArray(links) && links.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className={cn(
                  'uppercase tracking-widest',
                  link?.appearance === 'outline' &&
                    'border-white bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white',
                )}
              />
            ))}
          </div>
        )}
      </div>
      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
          {slides?.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={cn(
                'h-[7px] rounded-full transition-all',
                i === slide ? 'w-5 bg-white' : 'w-[7px] bg-white/45',
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}
