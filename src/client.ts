import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
   log: ['query', 'error', 'warn', 'error']
})

export default prisma