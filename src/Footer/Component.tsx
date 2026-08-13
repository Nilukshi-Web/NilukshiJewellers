import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { whatsappLink } from '@/utilities/whatsapp'

export async function Footer() {
  const [footerData, headerData, settings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('header', 0)(),
    getCachedGlobal('site-settings', 0)(),
  ])

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-ink text-sand">
      <div className="container grid grid-cols-1 gap-8 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="font-serif text-3xl tracking-[0.12em] text-sand">
              {headerData?.brandName || 'NILUKSHI'}
            </span>
            {headerData?.brandTagline && (
              <span className="mt-0.5 text-[0.55rem] tracking-[0.35em] text-sage">
                {headerData.brandTagline}
              </span>
            )}
          </Link>
          {footerData?.blurb && (
            <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-85">{footerData.blurb}</p>
          )}
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-bronze">
            {footerData?.visitHeading || 'Visit'}
          </div>
          {settings?.address && <p className="mb-1.5 text-sm opacity-85">{settings.address}</p>}
          {settings?.hours && <p className="text-sm opacity-85">{settings.hours}</p>}
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-bronze">
            {footerData?.contactHeading || 'Contact'}
          </div>
          {settings?.phone && <p className="mb-1.5 text-sm opacity-85">{settings.phone}</p>}
          {settings?.email && <p className="mb-1.5 text-sm opacity-85">{settings.email}</p>}
          <nav className="mt-1 flex flex-col gap-1">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="text-sm text-sand/90 underline-offset-4" />
            ))}
          </nav>
        </div>

        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-bronze">
            {footerData?.followHeading || 'Follow'}
          </div>
          <div className="flex gap-3">
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-bronze"
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
                className="flex h-8 w-8 items-center justify-center rounded-full border border-bronze"
              >
                <Facebook size={16} />
              </a>
            )}
            {settings?.whatsapp && (
              <a
                href={whatsappLink(settings.whatsapp)}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-bronze"
              >
                <MessageCircle size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      {footerData?.copyright && (
        <div className="border-t border-sand/15 py-5 text-center text-xs opacity-60">
          {footerData.copyright}
        </div>
      )}
    </footer>
  )
}
