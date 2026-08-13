/**
 * Standalone seed runner: `pnpm seed` (or `npm run seed`).
 *
 * Creates a first admin user if none exists, then runs the same seed
 * used by the admin dashboard "Seed your database" button.
 */
import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const ADMIN_EMAIL = 'admin@amarejewellers.com'
const ADMIN_PASSWORD = 'amare2026'

async function run() {
  console.log('Seed script starting — connecting to database...')
  const payload = await getPayload({ config })
  console.log('Payload initialized.')

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: ADMIN_EMAIL } },
  })

  let user = existing.docs[0]

  if (!user) {
    user = await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
    })
    payload.logger.info(`Created admin user ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`)
  }

  const req = await createLocalReq({ user }, payload)
  await seed({ payload, req })

  process.exit(0)
}

// Awaited at the top level: `payload run` exits once this module finishes
// evaluating, so a floating promise here would end the process before the
// database is even connected.
await run().catch((err) => {
  console.error(err)
  process.exit(1)
})
