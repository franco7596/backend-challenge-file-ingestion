import sql from 'mssql';

//This file could be better if we use a ORM like TypeORM or Sequelize, but for memory limitations this is the best option.
// This is a small solution for that is not needed a ORM.
export function getClientTable(): sql.Table {
  const table = new sql.Table('Clientes');
  table.create = false;

  table.columns.add('NombreCompleto', sql.NVarChar(100), { nullable: false });
  table.columns.add('DNI', sql.BigInt, { nullable: false });
  table.columns.add('Estado', sql.VarChar(10), { nullable: false });
  table.columns.add('FechaIngreso', sql.Date, { nullable: false });
  table.columns.add('EsPEP', sql.Bit, { nullable: false });
  table.columns.add('EsSujetoObligado', sql.Bit, { nullable: true });
  table.columns.add('FechaCreacion', sql.DateTime, { nullable: false });

  return table;
}

export const createTableQuery = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Clientes' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
  CREATE TABLE dbo.Clientes (
    NombreCompleto NVARCHAR(100) NOT NULL,
    DNI BIGINT NOT NULL,
    Estado VARCHAR(10) NOT NULL,
    FechaIngreso DATE NOT NULL,
    EsPEP BIT NOT NULL,
    EsSujetoObligado BIT NULL,
    FechaCreacion DATETIME NOT NULL
  );
END
`;
