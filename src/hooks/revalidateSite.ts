import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

// Catalog data (products, categories, metals) is rendered inside statically
// generated pages and the shared header, so any change revalidates the whole
// frontend tree. The site is small, so a full revalidation is cheap.
export const revalidateSite: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/', 'layout')
  }
  return doc
}

export const revalidateSiteDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/', 'layout')
  }
  return doc
}
