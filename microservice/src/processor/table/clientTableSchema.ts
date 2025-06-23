import sql from 'mssql';

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