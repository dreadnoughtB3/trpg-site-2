import { PrismaClient } from '@prisma/client'
import { createPaginator } from "prisma-extension-pagination";
type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>
let prisma: ExtendedPrismaClient

const globalForPrisma = global as unknown as {
    prisma: ExtendedPrismaClient | undefined
}

const paginate = createPaginator({
  pages: {
    limit: 12
  }
});

function getExtendedClient() {
    return new PrismaClient().$extends({
      model: {
        itemData: {
          paginate,
        }
      }
    })
  }

if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = getExtendedClient()
}
prisma = globalForPrisma.prisma

export default prisma
