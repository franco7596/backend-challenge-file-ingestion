import fs from 'fs';
import readline from 'readline';
import { insertBatch, executeQuery } from '../database';
import { logger } from '../index';
import { ClientRecordDTO } from './dto/clientRecord.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Client } from './entities/client.entity';
import { createTableQuery, getClientTable } from './table/clientTableSchema';

const FILE_PATH = process.env.FILE_PATH || '';
const BATCH_SIZE = 500;

export async function startProcessing() {
  await executeQuery(createTableQuery); // Ensure the table exists before processing
  const clientTable = getClientTable();
  const fileStream = fs.createReadStream(FILE_PATH);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let batch: Client[] = []; //TODO: this do not must be a DTO
  let lineNumber = 0;
  let errorCount = 0;

  for await (const line of rl) {
    lineNumber++;
    const clientData = await getClientFromText(line);
    if (clientData) {
      batch.push(clientData);
    } else {
      errorCount++;
      logger.warn(`Invalid line ${lineNumber}: ${line}`);
    }

    if (batch.length >= BATCH_SIZE) {
      await insertBatch<Client>(batch, clientTable, (client) => client.toRow()); // TODO: Avoid awaiting insertBatch here to allow concurrent inserts and improve performance
      //beware: not waiting for the result can cause error handling issues or overload the database if concurrency is not managed properly.
      batch = [];
    }
  }

  if (batch.length > 0) {
    await insertBatch<Client>(batch, clientTable, (client) => client.toRow()); // TODO: Avoid awaiting insertBatch here to allow concurrent inserts and improve performance
    //beware: not waiting for the result can cause error handling issues or overload the database if concurrency is not managed properly.
  }

  logger.info(
    `✅ Processing complete. Total lines: ${lineNumber}, Errors: ${errorCount}`
  );
}

async function getClientFromText(line: string): Promise<Client | undefined> {
  const parts = line.split('|');
  if (parts.length < 6) return;

  const [
    firstName,
    lastName,
    dniStr,
    status,
    entryDateStr,
    isPEPStr,
    isSubjectStr,
  ] = parts;

  const record = plainToInstance(ClientRecordDTO, {
    fullName: `${firstName} ${lastName}`,
    dni: parseInt(dniStr),
    status,
    entryDate: new Date(entryDateStr),
    isPEP: isPEPStr === 'true',
    isSubjectToObligation: isSubjectStr ? isSubjectStr === 'true' : null,
    creationDate: new Date(),
  });

  const errors = await validate(record);
  if (errors.length === 0) {
    return new Client(record);
  }
}
