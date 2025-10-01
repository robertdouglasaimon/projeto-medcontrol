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

// Configurando o CORS para permitir que o back-end seja acessado de outras origens:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ou substitua "*" por "http://127.0.0.1:5500" se quiser restringir
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


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
      res.status(500).json({ mensagem: "Erro ao buscar clientes." });
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
      res.status(500).json({ mensagem: "Erro ao buscar clientes." });
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
      res.status(500).json({ mensagem: "Erro ao buscar clientes ativos." });
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
      res.status(500).json({ mensagem: "Erro ao buscar clientes inativos." });
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
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(409).json({ mensagem: "CPF já cadastrado!" });
        } else {
          console.error('Erro ao inserir cliente:', err.message);
          res.status(500).json({ mensagem: "Erro ao inserir cliente." });
        }
      } else {
        res.status(201).json({ mensagem: "Cliente cadastrado com sucesso", id_cliente: this.lastID });
      }
    }
  );
});

/*-------------------------------------------------------------------------------------------*/
// Rota para "deletar" da tabela cadastro_clientes/

// Garantindo que o back-end seja acessado de outras origens:
// Nota: Foi necessário pois o back-end não tava permitindo que o front-end fosse acessado de outras origens. E consequentemente não mandava os alertas de sucesso (mesmo tendo feito o delete dos dados, ele não avisava que tava feito e sim dava erro de fetch). Por isso foi necesário GARANTIR que o back-end fosse acessado de outras origens e assim, permitindo os alertas de sucesso lá no front-end. Cuidar para NUNCA APAGAR ESSA OPÇÃO POR DESCUIDO!
app.options('/deletar_cliente/:id_cliente', (req, res) => {
  res.sendStatus(200);
});

// Rota para deletar da tabela cadastro_clientes:
app.delete('/deletar_cliente/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;

  db.run('DELETE FROM cadastro_clientes WHERE id_cliente = ?', [id_cliente], function (err) {
    if (err) {
      console.error('Erro ao deletar cliente:', err.message);
      res.status(500).json({ mensagem: "Erro ao deletar cliente." });
    } else {
      if (this.changes === 0) {
        res.status(404).json({ mensagem: "Cliente não encontrado." });
      } else {
        res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
      }
    }
  });
});

// Rota para editar da tabela cadastro_clientes:
app.put('/editar_cliente/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;
  const { nome_cliente, telefone, endereco, cpf, status_cliente } = req.body;

  db.run(
    'UPDATE cadastro_clientes SET nome_cliente = ?, telefone = ?, endereco = ?, cpf = ?, status_cliente = ? WHERE id_cliente = ?',
    [nome_cliente, telefone, endereco, cpf, status_cliente, id_cliente],
    function (err) {
      if (err) {
        console.error('Erro ao editar cliente:', err.message);
        res.status(500).json({ mensagem: "Erro ao editar cliente." });
      } else {
        if (this.changes === 0) {
          res.status(404).json({ mensagem: "Cliente não encontrado." });
        } else {
          res.status(200).json({ mensagem: "Cliente editado com sucesso" });
        }
      }
    }
  );
});

// Rota para cadastrar funcionarios:-----------------------------------------------------
// Configurando o front-end para estar em execução:
app.use(express.static(path.join(__dirname, '../front-end/medcontrol-login')));

// Rota para cadastrar funcionarios:
app.post('/cadastrar_funcionario', (req, res) => {
  const { nome_funcionario, cargo_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario } = req.body;

  db.run(
    `INSERT INTO funcionarios (nome_funcionario, cargo_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome_funcionario, cargo_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ mensagem: "Login já cadastrado!" });
        }
        console.error('Erro ao cadastrar funcionário:', err.message);
        return res.status(500).json({ mensagem: "Erro ao cadastrar funcionário." });
      }

      res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso", id_funcionario: this.lastID });
    }
  );
});
/*-----------------------------------------------------------------------------------*/




/*-------------------------------------------------------------------------------------------*/

// Inicia o servidor e manda um console.log avisando que a porta 3000 foi aberta:
app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
