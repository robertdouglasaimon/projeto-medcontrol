// Importando ferramentas necessárias
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import bcrypt from 'bcrypt'; // Biblioteca para criptografia da senha.


// Configuração básica
const app = express();
app.use(cors());
app.use(express.json());

// CORS manual para garantir acesso entre origens
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Caminho do banco
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../banco-dados/farmacia.db');
const db = new Database(dbPath);

// Rota: listar clientes
app.get('/tabela_clientes', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM cadastro_clientes').all();
    res.setHeader("Content-Type", "application/json");
    res.json(rows);
  } catch (err) {
    console.error('Erro na consulta:', err.message);
    res.status(500).json({ mensagem: "Erro ao buscar clientes." });
  }
});

// Rota: total de clientes
app.get('/total_clientes', (req, res) => {
  try {
    const total = db.prepare("SELECT COUNT(id_cliente) AS total_clientes FROM cadastro_clientes").get();
    res.setHeader("Content-Type", "application/json");
    res.json(total);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar clientes." });
  }
});

// Rota: total de clientes ativos
app.get('/total_clientes_ativos', (req, res) => {
  try {
    const ativos = db.prepare("SELECT COUNT(id_cliente) AS total_clientes_ativos FROM cadastro_clientes WHERE status_cliente = 'Ativo'").get();
    res.setHeader("Content-Type", "application/json");
    res.json(ativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar clientes ativos." });
  }
});

// Rota: total de clientes inativos
app.get('/total_clientes_inativos', (req, res) => {
  try {
    const inativos = db.prepare("SELECT COUNT(id_cliente) AS total_clientes_inativos FROM cadastro_clientes WHERE status_cliente = 'Inativo'").get();
    res.setHeader("Content-Type", "application/json");
    res.json(inativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar clientes inativos." });
  }
});

// Rota: cadastrar cliente
app.post('/novo_cliente', (req, res) => {
  const { nome_cliente, telefone, endereco, cpf, status_cliente } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO cadastro_clientes (nome_cliente, telefone, endereco, cpf, status_cliente)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(nome_cliente, telefone, endereco, cpf, status_cliente);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso", id_cliente: info.lastInsertRowid });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      let campo = "Dados duplicados!";
      if (err.message.includes('cpf')) campo = "CPF já cadastrado!";
      else if (err.message.includes('nome_cliente')) campo = "Nome já cadastrado!";
      else if (err.message.includes('telefone')) campo = "Telefone já cadastrado!";
      else if (err.message.includes('endereco')) campo = "Endereço já cadastrado!";
      return res.status(409).json({ mensagem: campo });
    }
    res.status(500).json({ mensagem: "Erro ao inserir cliente." });
  }
});

// Rota: deletar cliente
app.delete('/deletar_cliente/:id_cliente', (req, res) => {
  const id = req.params.id_cliente;
  const stmt = db.prepare('DELETE FROM cadastro_clientes WHERE id_cliente = ?');
  const result = stmt.run(id);

  res.setHeader("Content-Type", "application/json");
  if (result.changes === 0) {
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  } else {
    res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
  }
});

// Rota: editar cliente
app.put('/editar_cliente/:id_cliente', (req, res) => {
  const id = req.params.id_cliente;
  const { nome_cliente, telefone, endereco, cpf, status_cliente } = req.body;

  const stmt = db.prepare(`
    UPDATE cadastro_clientes
    SET nome_cliente = ?, telefone = ?, endereco = ?, cpf = ?, status_cliente = ?
    WHERE id_cliente = ?
  `);
  const result = stmt.run(nome_cliente, telefone, endereco, cpf, status_cliente, id);

  res.setHeader("Content-Type", "application/json");
  if (result.changes === 0) {
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  } else {
    res.status(200).json({ mensagem: "Cliente editado com sucesso" });
  }
});

// Rota: cadastrar funcionário
app.post('/cadastrar_funcionario', (req, res) => {
  const {
    nome_funcionario,
    cargo_funcionario,
    tel_funcionario,
    email_funcionario,
    login_funcionario,
    senha_funcionario
  } = req.body;

  try {
    const senhaCriptografada = bcrypt.hashSync(senha_funcionario, 10); // Criptografia da senha usando a biblioteca bcrypt.

    const stmt = db.prepare(`
      INSERT INTO funcionarios (nome_funcionario, cargo_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      nome_funcionario,
      cargo_funcionario,
      tel_funcionario,
      email_funcionario,
      login_funcionario,
      senhaCriptografada
    );

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso", id_funcionario: info.lastInsertRowid });

  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      let campo = "Campo duplicado!";
      if (err.message.includes('login_funcionario')) campo = "Login já cadastrado!";
      else if (err.message.includes('email_funcionario')) campo = "Email já cadastrado!";
      else if (err.message.includes('tel_funcionario')) campo = "Telefone já cadastrado!";
      return res.status(409).json({ mensagem: campo });
    }
    res.status(500).json({ mensagem: "Erro ao cadastrar funcionário." });
  }
});


// Rota para o login de funcionários no sistema:
app.post('/login_funcionario', (req, res) => {
  const { login_funcionario, senha_funcionario } = req.body;

  try {
    const stmt = db.prepare(`SELECT * FROM funcionarios WHERE login_funcionario = ?`);
    const funcionario = stmt.get(login_funcionario);

    res.setHeader("Content-Type", "application/json");

    if (funcionario && bcrypt.compareSync(senha_funcionario, funcionario.senha_funcionario)) {
      // Monta resposta segura com flag de login e dados essenciais
      res.status(200).json({
        autenticado: true,
        funcionario: {
          id: funcionario.id,
          nome: funcionario.nome_funcionario,
          cargo: funcionario.cargo_funcionario,
          email: funcionario.email_funcionario
        }
      });
    } else {
      res.status(401).json({ autenticado: false, mensagem: "Login ou senha inválidos" });
    }
  } catch (err) {
    console.error("❌ Erro ao verificar login:", err.message);
    res.status(500).json({ autenticado: false, mensagem: "Erro interno no servidor" });
  }
});
/*-----------------------------------------------------------------------------------------*/
// Rota: dashboard da tela de produtos (total de produtos, produtos mais vendidosm produtos menos vendidos e valor do estoque)

// Total de produtos
app.get('/dashboard_produtos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(id_produto) AS total_produtos FROM cadastro_produtos");
    const totalProdutos = stmt.get(); // Pega o total de produtos que criamos na consulta da linha acima.
    res.setHeader("Content-Type", "application/json");
    res.json(totalProdutos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
  }
})





// Rota: tabela de produtos
app.get('/cadastro_produtos', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM cadastro_produtos');
    const produtos = stmt.all(); // Pega todos os produtos.

    res.setHeader("Content-Type", "application/json"); // Define o cabeçalho da resposta como JSON.
    res.status(200).json(produtos); // Envia a resposta com os produtos.
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos." });
  }
})





//------------------------------------------------------------------------------------------//

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../../front-end/medcontrol-login')));

// Iniciar servidor
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse http://localhost:${PORT}`);
});

