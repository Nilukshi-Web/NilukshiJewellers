/**
 * One-off brand rename for an existing database: `pnpm payload run scripts/rename-brand.ts`.
 *
 * The seed files now say NILUKSHI, but globals already stored in the database
 * keep whatever was seeded before. This updates them in place, leaving all
 * other page content untouched.
 */
import { getPayload } from 'payload'

import config from '@payload-config'

const OLD = 'AMARÉ'
const NEW = 'NILUKSHI'

async function run() {
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({ slug: 'header' })
  if (header?.brandName?.includes(OLD)) {
    await payload.updateGlobal({
      slug: 'header',
      data: { brandName: header.brandName.replaceAll(OLD, NEW) },
    })
    payload.logger.info(`header.brandName → ${header.brandName.replaceAll(OLD, NEW)}`)
  }

  const footer = await payload.findGlobal({ slug: 'footer' })
  if (footer?.copyright?.includes(OLD)) {
    await payload.updateGlobal({
      slug: 'footer',
      data: { copyright: footer.copyright.replaceAll(OLD, NEW) },
    })
    payload.logger.info(`footer.copyright → ${footer.copyright.replaceAll(OLD, NEW)}`)
  }

  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const messages = settings?.whatsappMessages
  if (messages) {
    const renamed = Object.fromEntries(
      Object.entries(messages).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.replaceAll(OLD, NEW) : value,
      ]),
    )
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { whatsappMessages: renamed },
    })
    payload.logger.info('site-settings.whatsappMessages updated')
  }

  payload.logger.info('Brand rename complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
