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
