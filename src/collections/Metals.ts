import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateSite, revalidateSiteDelete } from '@/hooks/revalidateSite'

export const Metals: CollectionConfig = {
  slug: 'metals',
  labels: {
    singular: 'Metal',
    plural: 'Metals',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'swatchColor', 'order'],
    description:
      'Metal tones used to organise Jewellery (e.g. Yellow Gold, White Gold, Rose Gold). Shown as tabs and in the mega menu.',
  },
  defaultPopulate: {
    name: true,
    slug: true,
    swatchColor: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'swatchColor',
      type: 'text',
      required: true,
      defaultValue: '#C9A24B',
      admin: {
        description: 'Hex colour for the swatch dot, e.g. #C9A24B',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first.',
      },
    },
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteDelete],
  },
}
