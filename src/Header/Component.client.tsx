'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, MapPin, Menu, Phone, Search as SearchIcon, X } from 'lucide-react'

import type { Header, Metal, ProductCategory, SiteSetting } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ProductSearch } from '@/components/ProductSearch'

interface HeaderClientProps {
  categories: ProductCategory[]
  data: Header
  metals: Metal[]
  settings: SiteSetting
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  categories,
  data,
  metals,
  settings,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navItems = data?.navItems || []

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-wine text-xs text-white">
        <div className="container flex items-center justify-between py-2 tracking-wide">
          {settings?.address && settings.mapUrl ? (
            <a
              href={settings.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:underline hover:underline-offset-4"
            >
              <MapPin size={13} strokeWidth={1.6} /> {settings.address}
            </a>
          ) : (
            <span className="flex items-center gap-1.5">
              {settings?.address && (
                <>
                  <MapPin size={13} strokeWidth={1.6} /> {settings.address}
                </>
              )}
            </span>
          )}
          <Link href="/contact" className="flex items-center gap-1.5 underline underline-offset-4">
            <Phone size={13} strokeWidth={1.6} /> {data?.topBarText || 'Contact Us'}
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 border-b border-bronze/35 bg-cream">
        <div className="container flex items-center gap-6 py-3.5">
          <button
            className="flex md:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
          </button>

          <Link href="/" className="flex flex-col leading-none text-wine">
            <span className="font-serif text-3xl tracking-[0.12em]">
              {data?.brandName || 'NILUKSHI'}
            </span>
            {data?.brandTagline && (
              <span className="mt-0.5 text-[0.55rem] tracking-[0.35em] text-bronze">
                {data.brandTagline}
              </span>
            )}
          </Link>

          <nav className="mx-auto hidden items-center gap-8 md:flex">
            {navItems.map(({ link, megaMenu }, i) => {
              if (megaMenu && metals.length > 0) {
                return (
                  <div key={i} className="group relative">
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="flex items-center gap-1 py-2 text-[0.82rem] uppercase tracking-widest hover:text-wine"
                    >
                      <ChevronDown size={13} strokeWidth={1.6} />
                    </CMSLink>

                    <div className="invisible absolute left-1/2 top-full z-50 flex -translate-x-1/2 gap-11 border border-bronze/35 bg-white p-8 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                      {metals.map((m) => (
                        <div key={m.id} className="flex min-w-[130px] flex-col gap-1.5">
                          <div className="mb-1 flex items-center gap-2 whitespace-nowrap font-serif text-lg text-wine">
                            <span
                              className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/15"
                              style={{ background: m.swatchColor }}
                            />
                            {m.name}
                          </div>
                          {categories.map((c) => (
                            <Link
                              key={c.id}
                              href={`/jewellery?metal=${m.slug}&category=${c.slug}`}
                              className="whitespace-nowrap text-sm capitalize opacity-80 hover:text-wine hover:opacity-100"
                            >
                              {c.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="py-2 text-[0.82rem] uppercase tracking-widest hover:text-wine"
                />
              )
            })}
          </nav>

          <ProductSearch
            className="ml-auto hidden w-52 shrink-0 md:block lg:w-64"
            placeholder="Search products…"
          />

          <Link href="/search" aria-label="Search" className="ml-auto md:hidden">
            <SearchIcon size={20} strokeWidth={1.4} />
          </Link>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-bronze/25 bg-white px-6 pb-6 pt-3 md:hidden">
            <ProductSearch className="mb-2" placeholder="Search products…" />

            {metals.length > 0 && (
              <>
                <div className="mt-2 font-serif text-lg text-wine">Jewellery</div>
                {metals.map((m) => (
                  <div key={m.id} className="mt-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-black/15"
                        style={{ background: m.swatchColor }}
                      />
                      {m.name}
                    </div>
                    <div className="ml-5 mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/jewellery?metal=${m.slug}&category=${c.slug}`}
                          className="text-sm capitalize opacity-75"
                        >
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
            <div className="mt-3 flex flex-col">
              {navItems
                .filter((item) => !item.megaMenu)
                .map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    appearance="inline"
                    className="border-t border-bronze/20 py-2.5 text-sm uppercase tracking-widest"
                  />
                ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
