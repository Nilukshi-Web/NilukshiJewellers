import type { GlobalConfig } from 'payload'

import { revalidateTag, revalidatePath } from 'next/cache'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Contact details and WhatsApp messages used across the whole site.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
          required: true,
          defaultValue: '94771234567',
          admin: {
            width: '50%',
            description: 'Digits only, with country code (e.g. 94771234567).',
          },
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+94 11 234 5678',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Opening Hours',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: { width: '50%' },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'group',
      name: 'whatsappMessages',
      label: 'WhatsApp Prefilled Messages',
      fields: [
        {
          name: 'general',
          type: 'text',
          defaultValue: 'Hi, I have a question.',
          admin: { description: 'Used by general “WhatsApp us” links.' },
        },
        {
          name: 'product',
          type: 'text',
          defaultValue: 'Hi, I’m interested in “{product}” ({price}). Is it available?',
          admin: {
            description:
              'Used on product pages. {product} and {price} are replaced automatically.',
          },
        },
        {
          name: 'custom',
          type: 'text',
          defaultValue: 'Hi, I’d like to discuss a custom jewellery piece.',
          admin: { description: 'Used by the custom commission section.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('global_site-settings', 'max')
        revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
}
