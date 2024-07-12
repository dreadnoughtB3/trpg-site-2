import * as fs from 'fs';
import { parse } from 'csv-parse/sync'
const data = fs.readFileSync('../static/testData/item.csv');
const records = parse(data);
for (const record of records) {
  console.log(record);
}


// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })