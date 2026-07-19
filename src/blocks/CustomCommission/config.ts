import type { Block } from 'payload'

export const CustomCommission: Block = {
  slug: 'customCommission',
  interfaceName: 'CustomCommissionBlock',
  labels: {
    singular: 'Custom Commission',
    plural: 'Custom Commissions',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Made to Order',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Custom Jewellery',
    },
    {
      name: 'lede',
      type: 'textarea',
      admin: { description: 'Intro paragraph under the title.' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Start on WhatsApp',
      admin: {
        description:
          'WhatsApp button label. The number and prefilled message come from Site Settings.',
      },
    },
    {
      name: 'recentTitle',
      type: 'text',
      defaultValue: 'Recent Custom Work',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 8,
      admin: { description: 'How many custom products to show.' },
    },
  ],
}
