import { getDbPool } from './database';
import 'dotenv-flow/config';
import 'reflect-metadata';
import { createApp } from './app';
import pino from 'pino';



export const logger = pino({ level: 'info' });

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  main();
});

async function main() {
  try {
    console.log('✅ DB_USER:', process.env.DB_USER);
    console.log('✅ DB_PASS:', process.env.DB_PASS);
    console.log('✅ DB_HOST:', process.env.DB_HOST);
    console.log('✅ DB_NAME:', process.env.DB_NAME);
    console.log('🔌 Connecting to the database...');
    await getDbPool().connect();
    console.log('✅ Database connected.');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
  }
}
