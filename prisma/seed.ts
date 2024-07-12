import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { PrismaClient } from '@prisma/client'

const data = fs.readFileSync('prisma/testData/item.csv');
const records = parse(data, { columns: true });
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  for (const record of records) {
    const item = await prisma.itemData.create({
      data: {
        world: record.world,
        name: record.name,
        desc: record.desc,
        obtain: record.obtain,
        require: record.require,
        category: Number(record.category),
        slug: record.slug
      }
    })
    console.log(`Created user with id: ${item.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })