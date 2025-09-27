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


// RETAS E CONFIGURAÇÕES PARA A TELA DE CLIENTES --------------------------------------------
// Rota direta para SELECT de cadastro_clientes:
app.get('/tabela_clientes', (req, res) => {
  db.all('SELECT * FROM cadastro_clientes', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  });
});

// Rota para puxar os dados do dashboard da tela de clientes (cadastro_clientes):
app.get('/total_clientes', (req, res) => {
  db.all('SELECT COUNT(id_cliente) AS total_clientes FROM cadastro_clientes', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  });
})

// Rota para pegar o total de clientes ATIVOS em cadastro_clientes:
app.get('/total_clientes_ativos', (req, res) => {
  db.all('SELECT COUNT(id_cliente) AS total_clientes_ativos FROM cadastro_clientes WHERE status_cliente =  "Ativo"', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  });
})

// Rota para pegar o total de clientes INATIVOS em cadastro_clientes:
app.get('/total_clientes_inativos', (req, res) => {
  db.all('SELECT COUNT(id_cliente) AS total_clientes_inativos FROM cadastro_clientes WHERE status_cliente =  "Inativo"', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  }) 
})

// Rota para adicionar novos contatos ao banco de dados pelo front-end da tela de clientes:
app.post('/novo_cliente', (req, res) => {
  const { nome_cliente, telefone, endereco, cpf, status_cliente } = req.body;

  db.run(
    'INSERT INTO cadastro_clientes (nome_cliente, telefone, endereco, cpf, status_cliente) VALUES (?, ?, ?, ?, ?)',
    [nome_cliente, telefone, endereco, cpf, status_cliente],
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(409).json({ mensagem: "CPF já cadastrado!" });
        } else {
          console.error('Erro ao inserir cliente:', err.message);
          res.status(500).json({ mensagem: "Erro ao inserir cliente." });
        }
      } else {
        res.status(200).json({ mensagem: "Cliente cadastrado com sucesso" });
      }
    }
  );
});



/*-------------------------------------------------------------------------------------------*/


// Inicia o servidor e manda um console.log avisando que a porta 3000 foi aberta:
app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});