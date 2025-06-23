import sql from 'mssql';

export let dbPool: sql.ConnectionPool;

export function getDbPool(): sql.ConnectionPool {
  if (!dbPool) {
    dbPool = new sql.ConnectionPool({
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      server: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME!,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
      pool: {
        max: 10,
        min: 1,
        idleTimeoutMillis: 30000,
      },
    });
  }

  return dbPool;
}

export async function connectDatabase(maxAttempts = 10, delayMs = 3000): Promise<void> {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      console.log(`🔁 Attempting DB connection (${i}/${maxAttempts})...`);
      await getDbPool().connect();
      console.log('✅ Database connected.');
      return;
    } catch (err) {
      console.error(`❌ Attempt ${i} failed: ${err}`);
      if (i === maxAttempts) throw err;
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
}
