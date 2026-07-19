import type { Block } from 'payload'

export const FeaturedProducts: Block = {
  slug: 'featuredProducts',
  interfaceName: 'FeaturedProductsBlock',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Handpicked',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "This Season's Edit",
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured products', value: 'featured' },
        { label: 'Latest products', value: 'latest' },
        { label: 'Individual selection', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy !== 'manual',
      },
    },
    {
      name: 'selectedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'manual',
      },
    },
  ],
}
