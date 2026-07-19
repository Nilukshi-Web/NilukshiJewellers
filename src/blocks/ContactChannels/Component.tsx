import React from 'react'
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'

import type { ContactChannelsBlock as ContactChannelsBlockProps } from '@/payload-types'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { whatsappLink } from '@/utilities/whatsapp'

const cardClass =
  'flex flex-col items-center gap-1.5 border border-bronze/40 px-4 py-7 text-center transition-colors hover:bg-sand/60'

export const ContactChannelsBlock: React.FC<ContactChannelsBlockProps> = async ({
  eyebrow,
  title,
}) => {
  const settings = await getCachedGlobal('site-settings', 0)()

  return (
    <section className="container max-w-4xl py-16">
      {eyebrow && (
        <div className="mb-2 text-xs uppercase tracking-[0.22em] text-wine">{eyebrow}</div>
      )}
      <h2 className="mb-6 font-serif text-3xl md:text-4xl">{title}</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {settings?.whatsapp && (
          <a
            className={cardClass}
            href={whatsappLink(settings.whatsapp, settings.whatsappMessages?.general)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={20} strokeWidth={1.4} />
            <span>WhatsApp</span>
            <small className="text-xs opacity-65">+{settings.whatsapp}</small>
          </a>
        )}
        {settings?.phone && (
          <a className={cardClass} href={`tel:${settings.phone}`}>
            <Phone size={20} strokeWidth={1.4} />
            <span>Call Us</span>
            <small className="text-xs opacity-65">{settings.phone}</small>
          </a>
        )}
        {settings?.instagram && (
          <a className={cardClass} href={settings.instagram} target="_blank" rel="noreferrer">
            <Instagram size={20} strokeWidth={1.4} />
            <span>Instagram</span>
            <small className="text-xs opacity-65">Follow us</small>
          </a>
        )}
        {settings?.facebook && (
          <a className={cardClass} href={settings.facebook} target="_blank" rel="noreferrer">
            <Facebook size={20} strokeWidth={1.4} />
            <span>Facebook</span>
            <small className="text-xs opacity-65">Follow us</small>
          </a>
        )}
      </div>

      {(settings?.address || settings?.hours) && (
        <p className="mt-8 leading-relaxed opacity-85">
          {settings.address && (
            <>
              <MapPin size={14} className="mr-1 inline-block align-[-2px]" />
              {settings.address}
              <br />
            </>
          )}
          {settings.hours}
        </p>
      )}
    </section>
  )
}
