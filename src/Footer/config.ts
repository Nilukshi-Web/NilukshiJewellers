import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'blurb',
      type: 'textarea',
      admin: { description: 'Short paragraph under the logo.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visitHeading',
          type: 'text',
          defaultValue: 'Visit',
          admin: { width: '33%' },
        },
        {
          name: 'contactHeading',
          type: 'text',
          defaultValue: 'Contact',
          admin: { width: '33%' },
        },
        {
          name: 'followHeading',
          type: 'text',
          defaultValue: 'Follow',
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'Bottom copyright line.' },
    },
    {
      name: 'navItems',
      type: 'array',
      admin: {
        initCollapsed: true,
        description: 'Optional extra links shown in the footer.',
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
