import type { CollectionSlug, File, Payload, PayloadRequest } from 'payload'

import type { Media } from '@/payload-types'

import { categorySeeds, heroImageSeeds, metalSeeds, productSeeds } from './amare-data'
import { contactFormSeed, customEnquiryFormSeed } from './amare-forms'
import {
  aboutPage,
  contactPage,
  customPage,
  gemsPage,
  homePage,
  jewelleryPage,
  silverPage,
} from './amare-pages'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'products',
  'product-categories',
  'metals',
  'forms',
  'form-submissions',
  'search',
]

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `pnpm seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding AMARÉ Jewellers database...')

  payload.logger.info(`— Clearing collections...`)

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding metals and categories...`)

  const metalDocs = Object.fromEntries(
    await Promise.all(
      metalSeeds.map(async (metal) => {
        const doc = await payload.create({
          collection: 'metals',
          context: { disableRevalidate: true },
          data: metal,
        })
        return [metal.slug, doc] as const
      }),
    ),
  )

  const categoryDocs = Object.fromEntries(
    await Promise.all(
      categorySeeds.map(async (category) => {
        const doc = await payload.create({
          collection: 'product-categories',
          context: { disableRevalidate: true },
          data: { ...category },
        })
        return [category.slug, doc] as const
      }),
    ),
  )

  payload.logger.info(`— Fetching and seeding media (this can take a moment)...`)

  const heroBuffers = await Promise.all(
    heroImageSeeds.map((img) => fetchFileByURL(img.url, img.filename)),
  )
  const productBuffers = await Promise.all(
    productSeeds.map((product) =>
      fetchFileByURL(product.imageUrl, `${product.slug}.jpg`).catch((err) => {
        payload.logger.warn(`Image fetch failed for ${product.slug}: ${err.message}`)
        return null
      }),
    ),
  )

  const heroMedia: Media[] = []
  for (let i = 0; i < heroImageSeeds.length; i++) {
    heroMedia.push(
      await payload.create({
        collection: 'media',
        data: { alt: heroImageSeeds[i].alt },
        file: heroBuffers[i],
      }),
    )
  }

  const productMedia: (Media | null)[] = []
  for (let i = 0; i < productSeeds.length; i++) {
    const buffer =
      productBuffers[i] ||
      // fall back to the first hero image so `images` (required) is never empty
      { ...heroBuffers[0], name: `${productSeeds[i].slug}.jpg` }
    productMedia.push(
      await payload.create({
        collection: 'media',
        data: { alt: productSeeds[i].name },
        file: buffer,
      }),
    )
  }

  payload.logger.info(`— Seeding products...`)

  // Created in order so `latest` sorting matches the original catalog order
  for (let i = 0; i < productSeeds.length; i++) {
    const product = productSeeds[i]
    await payload.create({
      collection: 'products',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        name: product.name,
        slug: product.slug,
        section: product.section,
        metal: product.metal ? metalDocs[product.metal]?.id : undefined,
        category: categoryDocs[product.category]?.id,
        images: [productMedia[i]!.id],
        price: product.price,
        available: product.available,
        featured: product.featured,
        description: product.description,
        story: product.story,
        specs: product.specs,
      },
    })
  }

  payload.logger.info(`— Seeding forms...`)

  const [contactForm, enquiryForm] = await Promise.all([
    payload.create({
      collection: 'forms',
      depth: 0,
      data: contactFormSeed,
    }),
    payload.create({
      collection: 'forms',
      depth: 0,
      data: customEnquiryFormSeed,
    }),
  ])

  payload.logger.info(`— Seeding pages...`)

  const [
    _home,
    jewelleryDoc,
    gemsDoc,
    silverDoc,
    customDoc,
    aboutDoc,
    contactDoc,
  ] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: homePage({ heroImages: heroMedia, metaImage: heroMedia[2] }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: jewelleryPage(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: gemsPage(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: silverPage(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: customPage({ enquiryForm }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: aboutPage(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: { disableRevalidate: true },
      data: contactPage({ contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  const pageRef = (doc: { id: number }, label: string, megaMenu = false) => ({
    link: {
      type: 'reference' as const,
      label,
      reference: {
        relationTo: 'pages' as const,
        value: doc.id,
      },
    },
    ...(megaMenu ? { megaMenu: true } : {}),
  })

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      context: { disableRevalidate: true },
      data: {
        brandName: 'AMARÉ',
        brandTagline: 'JEWELLERS',
        topBarText: 'Contact Us',
        navItems: [
          pageRef(jewelleryDoc, 'Jewellery', true),
          pageRef(gemsDoc, 'Gems'),
          pageRef(silverDoc, 'Silver Articles'),
          pageRef(customDoc, 'Custom Jewellery'),
          pageRef(aboutDoc, 'About Us'),
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      context: { disableRevalidate: true },
      data: {
        blurb:
          'Fine jewellery crafted in Colombo, worn everywhere. Each piece is made to order by our in-house goldsmiths.',
        visitHeading: 'Visit',
        contactHeading: 'Contact',
        followHeading: 'Follow',
        copyright: '© 2026 AMARÉ Jewellers. All rights reserved.',
        navItems: [pageRef(contactDoc, 'Contact page →')],
      },
    }),
    payload.updateGlobal({
      slug: 'site-settings',
      context: { disableRevalidate: true },
      data: {
        whatsapp: '94771234567',
        phone: '+94 11 234 5678',
        email: 'hello@amarejewellers.com',
        instagram: 'https://instagram.com/amarejewellers',
        facebook: 'https://facebook.com/amarejewellers',
        address: '24 Ward Place, Colombo 07, Sri Lanka',
        hours: 'Mon – Sat, 10am – 7pm',
        whatsappMessages: {
          general: 'Hi AMARÉ, I have a question.',
          product: 'Hi AMARÉ, I’m interested in “{product}” ({price}). Is it available?',
          custom: 'Hi AMARÉ, I’d like to discuss a custom jewellery piece.',
        },
      },
    }),
  ])

  payload.logger.info('Seeded AMARÉ Jewellers database successfully!')
}

async function fetchFileByURL(url: string, name?: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()
  const filename = name || url.split('/').pop() || `file-${Date.now()}`

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: 'image/jpeg',
    size: data.byteLength,
  }
}
