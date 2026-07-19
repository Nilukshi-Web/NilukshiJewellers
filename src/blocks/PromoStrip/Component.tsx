import React from 'react'

import type { PromoStripBlock as PromoStripBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const PromoStripBlock: React.FC<PromoStripBlockProps> = ({ heading, text, links }) => {
  return (
    <section className="bg-wine px-6 py-14 text-center text-white">
      <h3 className="mb-2 font-serif text-3xl">{heading}</h3>
      {text && <p className="mx-auto mb-5 max-w-xl opacity-85">{text}</p>}
      {Array.isArray(links) && links.length > 0 && (
        <div className="flex justify-center">
          {links.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              className="border-white bg-transparent uppercase tracking-widest text-white shadow-none hover:bg-white/10 hover:text-white"
            />
          ))}
        </div>
      )}
    </section>
  )
}
