/**
 * Helpers for serving media from the CloudFront distribution in front of the
 * S3 bucket (S3_CDN_URL). Used both by the storage plugin, to rewrite the
 * public `url` of every upload and image size, and by the Media collection's
 * admin thumbnail.
 */

/** CDN origin without a trailing slash, or undefined when no CDN is configured. */
export const CDN_URL = process.env.S3_CDN_URL?.replace(/\/+$/, '') || undefined

/**
 * Absolute CDN URL for a stored file, or null when there is no CDN configured
 * or no filename to point at (callers fall back to Payload's own file route).
 */
export const cdnFileURL = (filename?: unknown, prefix?: unknown): null | string => {
  if (!CDN_URL || typeof filename !== 'string' || !filename) return null

  const path = typeof prefix === 'string' && prefix ? `${prefix.replace(/^\/+|\/+$/g, '')}/` : ''

  return `${CDN_URL}/${path}${filename}`
}
