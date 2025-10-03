import Database from 'better-sqlite3';
const db = new Database('../banco-dados/farmacia.db');

const result = db.prepare("SELECT COUNT(id_cliente) AS total_clientes_ativos FROM cadastro_clientes WHERE status_cliente = 'Ativo'").get();
console.log(result);
