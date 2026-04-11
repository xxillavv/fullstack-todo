import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../prisma/generated/prisma/client.js';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL;
console.log('Database URL:', databaseUrl);

const adapter = new PrismaPg({
  connectionString: databaseUrl,
})

export const prisma = new PrismaClient({ adapter });