import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { absoluteMediaURL } from './absoluteMediaURL'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { SITE_NAME } from './siteName'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object' && 'url' in image) {
    // Prefer the 1200x630 `og` size. Either may already be an absolute CDN URL.
    const url = absoluteMediaURL(image.sizes?.og?.url || image.url)

    if (url) return url
  }

  return `${getServerSideURL()}/website-template-OG.webp`
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const path = !slug || slug === 'home' ? '/' : `/${slug}`

  const title = doc?.meta?.title ? `${doc.meta.title} | ${SITE_NAME}` : SITE_NAME

  return {
    alternates: {
      canonical: path,
    },
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
  }
}
