import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'brandName',
          type: 'text',
          defaultValue: 'NILUKSHI',
          admin: { width: '50%', description: 'Main logo wordmark.' },
        },
        {
          name: 'brandTagline',
          type: 'text',
          defaultValue: 'JEWELLERS',
          admin: { width: '50%', description: 'Small line under the wordmark.' },
        },
      ],
    },
    {
      name: 'topBarText',
      type: 'text',
      defaultValue: 'Contact Us',
      admin: { description: 'Label of the contact link in the top utility bar.' },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'megaMenu',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show jewellery mega menu',
          admin: {
            description:
              'Shows a dropdown of all metals and jewellery categories under this item.',
          },
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
