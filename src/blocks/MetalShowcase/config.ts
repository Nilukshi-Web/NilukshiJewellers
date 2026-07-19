import type { Block } from 'payload'

export const MetalShowcase: Block = {
  slug: 'metalShowcase',
  interfaceName: 'MetalShowcaseBlock',
  labels: {
    singular: 'Metal Showcase',
    plural: 'Metal Showcases',
  },
  fields: [
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Shop now',
      admin: { description: 'Label shown under each metal card.' },
    },
  ],
}
