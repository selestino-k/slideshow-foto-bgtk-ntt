import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '@/src/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

// Create a singleton pool for better connection management
const globalForPool = globalThis as unknown as {
  pool: Pool | undefined
}

const pool = globalForPool.pool ?? new Pool({ 
  connectionString,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

if (process.env.NODE_ENV !== 'production') globalForPool.pool = pool

const adapter = new PrismaPg(pool)

// Prisma singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma