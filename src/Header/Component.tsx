import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

export async function Header() {
  const payload = await getPayload({ config: configPromise })

  const [headerData, settings, metals, jewelleryCategories] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('site-settings', 0)(),
    payload.find({
      collection: 'metals',
      limit: 12,
      pagination: false,
      sort: 'order',
    }),
    payload.find({
      collection: 'product-categories',
      limit: 50,
      pagination: false,
      sort: 'order',
      where: {
        section: {
          equals: 'jewellery',
        },
      },
    }),
  ])

  return (
    <HeaderClient
      categories={jewelleryCategories.docs}
      data={headerData}
      metals={metals.docs}
      settings={settings}
    />
  )
}
