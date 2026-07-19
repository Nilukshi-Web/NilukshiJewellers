import type { Block } from 'payload'

import { PRODUCT_SECTIONS } from '../../collections/ProductCategories'

export const ProductCatalog: Block = {
  slug: 'productCatalog',
  interfaceName: 'ProductCatalogBlock',
  labels: {
    singular: 'Product Catalog',
    plural: 'Product Catalogs',
  },
  fields: [
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'jewellery',
      options: [...PRODUCT_SECTIONS],
      admin: {
        description: 'Which section of products this catalog shows.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'Optional intro paragraph under the title.' },
    },
    {
      name: 'emptyStateText',
      type: 'text',
      defaultValue: 'No pieces here yet — check back soon.',
    },
  ],
}
