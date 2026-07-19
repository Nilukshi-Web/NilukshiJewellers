import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateSite, revalidateSiteDelete } from '@/hooks/revalidateSite'

export const PRODUCT_SECTIONS = [
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Gems', value: 'gems' },
  { label: 'Silver Articles', value: 'silver' },
  { label: 'Custom Jewellery', value: 'custom' },
] as const

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: 'Product Category',
    plural: 'Product Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'order'],
    description:
      'Categories shown as filter tabs and in the navigation. Each category belongs to one section of the site.',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    section: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'jewellery',
      options: [...PRODUCT_SECTIONS],
      index: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first.',
      },
    },
    slugField({ useAsSlug: 'title' }),
  ],
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteDelete],
  },
}
