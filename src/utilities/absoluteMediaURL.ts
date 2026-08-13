import { getServerSideURL } from './getURL'

/**
 * Absolute URL for a media file, for use in metadata and structured data where
 * crawlers will not resolve a relative path.
 *
 * Uploads served from the CDN already carry an absolute URL; locally stored
 * files carry a `/api/media/file/...` path that needs the site origin.
 */
export const absoluteMediaURL = (url?: null | string): string | undefined => {
  if (!url) return undefined

  return /^https?:\/\//i.test(url) ? url : `${getServerSideURL()}${url}`
}
