import type { Config } from 'drizzle-kit'
import { env } from './env'

export default {
  schema: 'src/drizzle/schema/*',
  out: 'src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config
