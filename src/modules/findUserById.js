import Airtable from 'airtable';
import dotenv from 'dotenv';
dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

const tableName = 'MemoryEntries';

export async function findUserById(userId) {
  return new Promise((resolve, reject) => {
    base(tableName)
      .select({
        filterByFormula: `{user-id} = '${userId}'`,
        maxRecords: 1
      })
      .firstPage((err, records) => {
        if (err) {
          console.error('❌ Airtable検索エラー:', err);
          return reject(err);
        }

        if (records.length > 0) {
          resolve({
            found: true,
            airtableId: records[0].id,
            fields: records[0].fields
          });
        } else {
          resolve({ found: false });
        }
      });
  });
}
