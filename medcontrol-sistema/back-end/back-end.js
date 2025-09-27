// Importando as ferramentas necessárias para montar o back-end do medcontrol:
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurando o back-end para estar em execução:

/*----------------------------------------------------------------------------------------*/
const app = express();
app.use(cors());
app.use(express.json());

/** Dicionário de expressões:
 * const app = express(); : Cria uma instância do Express, que é um framework web para Node.js. Isso permite criar e configurar rotas, middlewares e outros recursos para o back-end.
 * 
 * app.use(cors()); : Habilita o CORS (Cross-Origin Resource Sharing), que permite que o back-end seja acessado de outras origens.
 * 
 * app.use(express.json()); : Habilita o middleware para analisar o corpo das solicitações HTTP como JSON (Ele transforma o que tu pede para o banco de dados em JSON).
 */

/*-----------------------------------------------------------------------------------------*/

// Resolve caminho do banco para não dar erro tanto com o caminho relativo quanto com o caminho absoluto:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../medcontrol-sistema/banco-dados/farmacia.db');

// Conectando ao banco de dados:
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ Erro ao abrir o banco:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados');
  }
});

// Rota direta para SELECT de cadastro_clientes:
app.get('/cadastro_clientes', (req, res) => {
  db.all('SELECT * FROM cadastro_clientes', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  });
});


// Inicia o servidor e manda um console.log avisando que a porta 3000 foi aberta:
app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});