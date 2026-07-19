import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const PromoStrip: Block = {
  slug: 'promoStrip',
  interfaceName: 'PromoStripBlock',
  labels: {
    singular: 'Promo Strip',
    plural: 'Promo Strips',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 1 },
    }),
  ],
}
