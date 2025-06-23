import sql from 'mssql';
import { logger } from '../index';
import { dbPool } from './connection';

export async function insertBatch<T>(
  records: T[],
  baseTable: sql.Table,
  rowMapper: (record: T) => any[]
) {
  try {
    for (const rec of records) {
      baseTable.rows.add(...rowMapper(rec));
    }
    await dbPool.request().bulk(baseTable);
    logger.info(`📥 Inserted batch of ${records.length} records.`);
  } catch (error) {
    logger.error('❌ Error inserting batch:', error);
  }
}

export async function executeQuery(query: string) {
  try {
    const result = await dbPool.request().query(query);
    return result;
  } catch (error) {
    logger.error('❌ Error executing query:', error);
    throw error;
  }
}
