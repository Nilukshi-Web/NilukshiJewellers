import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { PRODUCT_SECTIONS } from '../ProductCategories'
import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    section: true,
    metal: true,
    category: true,
    images: true,
    price: true,
    available: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'section', 'category', 'price', 'available', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'section',
          type: 'select',
          required: true,
          defaultValue: 'jewellery',
          options: [...PRODUCT_SECTIONS],
          index: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'metal',
          type: 'relationship',
          relationTo: 'metals',
          admin: {
            width: '33%',
            condition: (data) => data?.section === 'jewellery',
            description: 'Used to filter Jewellery by metal tone.',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'product-categories',
          filterOptions: ({ data }) =>
            data?.section
              ? {
                  section: {
                    equals: data.section,
                  },
                }
              : true,
          admin: {
            width: '33%',
            description: 'Pick a category that belongs to the selected section.',
          },
        },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      admin: {
        description: 'First image is used on product cards.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          min: 0,
          admin: {
            width: '33%',
            description: 'In LKR. Leave empty to show “Price on request”.',
          },
        },
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '33%',
            description: 'Unchecked shows a “Sold Out” badge.',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
            description: 'Eligible for “Featured Products” blocks.',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description shown on the product page.',
      },
    },
    {
      name: 'story',
      type: 'textarea',
      label: 'The Story',
      admin: {
        description: 'Optional “story behind the piece” panel.',
      },
    },
    {
      name: 'specs',
      type: 'group',
      label: 'Specifications',
      admin: {
        description: 'Leave any field empty to hide that row on the product page.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'material', type: 'text', admin: { width: '50%' } },
            { name: 'size', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'stoneType', type: 'text', label: 'Stone Type', admin: { width: '50%' } },
            { name: 'stoneColor', type: 'text', label: 'Stone Colour', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'cut', type: 'text', admin: { width: '33%' } },
            { name: 'count', type: 'text', admin: { width: '33%' } },
            { name: 'carat', type: 'text', admin: { width: '33%' } },
          ],
        },
      ],
    },
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
}
