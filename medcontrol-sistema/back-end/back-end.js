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

/*-----------------------------------------------------------------------------------------*/
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

// Produto mais vendido
app.get('/dashboard_produtos_mais_vendidos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido FROM cadastro_produtos GROUP BY nome_produto ORDER BY total_vendido DESC LIMIT 1");
    const produtoMaisVendido = stmt.get(); // Pega o produto mais vendido que criamos na consulta da linha acima.
    res.setHeader("Content-Type", "application/json");
    res.json(produtoMaisVendido);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
  }
})

// Rota para obter o produto menos vendido:
app.get('/dashboard_produtos_menos_vendidos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido FROM cadastro_produtos GROUP BY nome_produto ORDER BY total_vendido ASC LIMIT 1");
    const produtoMenosVendido = stmt.get(); // Pega o produto menos vendido que criamos na consulta da linha acima.
    res.setHeader("Content-Type", "application/json");
    res.json(produtoMenosVendido);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
  }
})

// Rota para obter o valor total do estoque:
app.get('/dashboard_total_estoque', (req, res) => {
  try {
    const stmt = db.prepare("SELECT CONCAT('R$', FORMAT((SELECT SUM(preco_venda) AS total_estoque FROM cadastro_produtos), 'f2')) AS total_estoque;");
    const totalEstoque = stmt.get(); // Pega o total do estoque que criamos na consulta da linha acima.
    res.setHeader("Content-Type", "application/json");
    res.json(totalEstoque);
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

// Rota: cadastrar novo produto
app.post('/novo_produto', (req, res) => {
  const { nome_produto, descricao, fabricante, qtd_estoque, lote, data_validade, preco_venda, quantidade_vendida } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO cadastro_produtos (nome_produto, descricao, fabricante, qtd_estoque, lote, data_validade, preco_venda, quantidade_vendida )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(nome_produto, descricao, fabricante, qtd_estoque, lote, data_validade, preco_venda, quantidade_vendida);

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ mensagem: "Produto cadastrado com sucesso." });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao cadastrar produto." });
  }
});

// Rota: deletar produto da tabela cadastro_produtos do banco de dados:
app.delete('/deletar_produto/:nome_produto', (req, res) => {
  const nome = req.params.nome_produto;
  const stmt = db.prepare('DELETE FROM cadastro_produtos WHERE nome_produto = ?');
  const result = stmt.run(nome);

  if (result.changes > 0) {
    res.status(200).json({ mensagem: 'Produto deletado com sucesso.' });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
});

// Rota: editar produto da tabela cadastro_produtos do banco de dados:
app.put('/editar_produto/:id_produto', (req, res) => {
  const id = req.params.id_produto;
  const {
    nome_produto,
    descricao,
    fabricante,
    qtd_estoque,
    lote,
    data_validade,
    preco_venda,
    quantidade_vendida
  } = req.body;
  console.log("🔧 Requisição recebida para editar produto:", req.params.id_produto);

  const stmt = db.prepare(`
    UPDATE cadastro_produtos
    SET nome_produto = ?, descricao = ?, fabricante = ?, qtd_estoque = ?, lote = ?, data_validade = ?, preco_venda = ?, quantidade_vendida = ?
    WHERE id_produto = ?
  `);

  const resultado = stmt.run(
    nome_produto,
    descricao,
    fabricante,
    qtd_estoque,
    lote,
    data_validade,
    preco_venda,
    quantidade_vendida,
    id
  );

  if (resultado.changes > 0) {
    res.status(200).json({ mensagem: 'Produto editado com sucesso.' });
  } else {
    res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }
});

/*--------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------*/
// Rota:dashboard da tela de estoque (total de estoque, perdas e descarte, nivel de estoque)

// Rota: Obter o valor total do estoque:
app.get('/dashboard_estoque', (req, res) => {
  try {
    const stmt = db.prepare("SELECT SUM(qtd_estoque) AS total_estoque FROM controle_estoque;");
    const totalEstoque = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(totalEstoque);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
  }
})

// Rota: Obter o valor de perdas e descarte:
app.get('/dashboard_perdas_descarte', (req, res) => {
  try {
    const stmt = db.prepare("SELECT SUM(perdas_descarte) AS total_perdas_descarte FROM controle_estoque");
    const totalPerdasDescarte = stmt.get(); 
    res.setHeader("Content-Type", "application/json");
    res.json(totalPerdasDescarte);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
}})

// Rota: Obter o nivel de estoque:
app.get("/nivel_estoque", (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        ROUND((SUM(p.qtd_estoque) * 100.0) / (
          SELECT SUM(qtd_estoque) FROM controle_estoque
        ), 2) AS nivel_estoque
      FROM cadastro_produtos AS p;
    `);

    const resultado = stmt.get();
    console.log("📦 Resultado da consulta:", resultado);

    res.json({ nivel_estoque: resultado.nivel_estoque });
  } catch (error) {
    console.error("❌ Erro ao consultar nível de estoque:", error.message);
    res.status(500).json({ erro: "Erro ao consultar nível de estoque." });
  }
});

// Rota: Obter os valores da tabela controle_estoque (lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte, id_controle_estoque[Não vou usar o id, mas precisa chamar]) para criar a tabela de estoque:
app.get('/tabela_estoque', (req, res) => {
  try {
    const stmt = db.prepare("SELECT id_controle_estoque, lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte FROM controle_estoque;");
    const tabelaEstoque = stmt.all();
    res.setHeader("Content-Type", "application/json");
    res.json(tabelaEstoque);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar produtos."})
  }
})

// Rota: para cadastro de novo registro de Lote:
app.post('/cadastro_lote', (req, res) => {
  const { lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte } = req.body;

  const stmt = db.prepare(`
    INSERT INTO controle_estoque (lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte);
  res.status(201).json({ mensagem: 'Cadastro efetuado com sucesso!' });
});

// Rota: para editar um registro do banco de dados e da tabela controle_estoque:
app.put('/editar_lote/:id_controle_estoque', (req, res) => {
  const id = req.params.id_controle_estoque;
  const {
    lote_estoque,
    qtd_entrada,
    saida_produto,
    qtd_estoque,
    produto_validade,
    perdas_descarte
  } = req.body;

  const stmt = db.prepare(`
    UPDATE controle_estoque
    SET lote_estoque = ?, qtd_entrada = ?, saida_produto = ?, qtd_estoque = ?, produto_validade = ?, perdas_descarte = ?
    WHERE id_controle_estoque = ?
  `);

  const result = stmt.run(lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte, id);
  if (result.changes > 0) {
    res.status(200).json({ mensagem: 'Registro editado com sucesso!' });
  } else {
    res.status(404).json({ mensagem: 'Registro nao encontrado.' });
  }
});

// Rota: para deletar um registro do banco de dados e da tabela controle_estoque:
app.delete('/deletar_lote/:id_controle_estoque', (req, res) => {
  const id = req.params.id_controle_estoque;
  const stmt = db.prepare('DELETE FROM controle_estoque WHERE id_controle_estoque = ?');
  const result = stmt.run(id);

  if (result.changes > 0) {
    res.status(200).json({ mensagem: 'Registro deletado com sucesso!' });
  } else {
    res.status(404).json({ mensagem: 'Registro nao encontrado.' });
  }
});
//------------------------------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------------------------------//
// Rota: dashboard da tela de vendas (total de vendas, vendas realizadas, médias por vendas)
app.get('/dashboard_vendas', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(id_vendas) AS total_vendas, SUM(valor_venda) AS vendas_realizadas, ROUND(AVG(valor_venda), 2) AS vendas_medias FROM vendas;");
    const dashboardVendas = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboardVendas);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar vendas."})
  }
})


// Rota: relacionada aos dados da tabela de vendas:
app.get('/tabela_vendas', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM vendas;");
    const tabelaVendas = stmt.all();
    res.setHeader("Content-Type", "application/json");
    res.json(tabelaVendas);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar vendas."})
  }
})


// Rota: para cadastro de novo registro de vendas:
app.post('/cadastrar_venda', (req, res) => {
  try {
    const { id_vendas, produtos_vendidos, vendas_medias, data_venda, valor_venda, cupom_fiscal, id_cliente,
    id_controle_estoque } = req.body;

    const stmt = db.prepare(`
      INSERT INTO vendas (id_vendas, produtos_vendidos, vendas_medias, data_venda, valor_venda, cupom_fiscal, id_cliente,
    id_controle_estoque)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id_vendas, produtos_vendidos, vendas_medias, data_venda, valor_venda, cupom_fiscal, id_cliente,
    id_controle_estoque);
    res.status(201).json({ mensagem: 'Cadastro efetuado com sucesso!' });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao cadastrar venda."})
  }
});

// Rota para pegar o id do cliente para a tabela de vendas:
app.get('/cliente-ultimo', (req, res) => {
  try {
    const row = db.prepare("SELECT id_cliente FROM cadastro_clientes ORDER BY id_cliente DESC LIMIT 1").get();
    res.json({ id_cliente: row?.id_cliente || null });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar cliente." });
  }
});

// Rota para pegar o id do estoque para a tabela de vendas:
app.get('/estoque-ultimo', (req, res) => {
  try {
    const row = db.prepare("SELECT id_controle_estoque FROM controle_estoque ORDER BY id_controle_estoque DESC LIMIT 1").get();
    res.json({ id_controle_estoque: row?.id_controle_estoque || null });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar estoque." });
  }
});
//------------------------------------------------------------------------------------------------------------------------------------------//

// Rota para apagar um registro da tabela através do botão excluir:
app.delete('/deletar_venda/:id_vendas', (req, res) => {
  try {  
    const id = req.params.id_vendas;
    const stmt = db.prepare('DELETE FROM vendas WHERE id_vendas = ?');
    const resultado = stmt.run(id);

    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Registro deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Registro nao encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'A tentativa de deletar um registro não funcionou corretamente.' });
  };

});

// Rota para atualizar um registro da tabela de vendas:
app.put('/editar_venda/:id_vendas', (req, res) => {
  try {
    const id = req.params.id_vendas;
    const { id_vendas, produtos_vendidos, vendas_medias, data_venda, valor_venda, cupom_fiscal, id_cliente,
    id_controle_estoque } = req.body;

    const stmt = db.prepare(`
      UPDATE vendas
      SET id_vendas = ?, produtos_vendidos = ?, vendas_medias = ?, data_venda = ?, valor_venda = ?, cupom_fiscal = ?, id_cliente = ?,
      id_controle_estoque = ?
      WHERE id_vendas = ?
    `);

    const resultado = stmt.run(id_vendas, produtos_vendidos, vendas_medias, data_venda, valor_venda, cupom_fiscal, id_cliente,
    id_controle_estoque, id);
    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Registro atualizado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Registro não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'A tentativa de editar um registro não funcionou corretamente.' });
  };
});
//------------------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------------------//
// Rota: dashboard da tela de fornecedores-------------------------------------------------------------------//
// Rota: Obter o total de fornecedores:
app.get('/dashboard_fornecedores_total', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(id_fornecedor) AS total_fornecedores FROM cadastro_fornecedores;");
    const dashboard_fornecedores_total = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_fornecedores_total);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar fornecedores."})
  }
});

// Rota: Obert o total de fornecedores ativos:
app.get('/dashboard_fornecedores_ativos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(status) AS total_fornecedores_ativos FROM cadastro_fornecedores WHERE status = 'Ativo';");
    const dashboard_fornecedores_ativos = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_fornecedores_ativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar fornecedores."})
  }
});

// Rota: Obert o total de fornecedores inativos:
app.get('/dashboard_fornecedores_inativos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(status) AS total_fornecedores_inativos FROM cadastro_fornecedores WHERE status = 'Inativo';");
    const dashboard_fornecedores_inativos = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_fornecedores_inativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar fornecedores."})
  }
});
//-------------------------------------------------------------------------------------------------------//

// Rota: relacionada aos dados da tabela de fornecedores:
app.get('/tabela_fornecedores', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM cadastro_fornecedores;");
    const fornecedores = stmt.all();
    res.setHeader("Content-Type", "application/json");
    res.json(fornecedores);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar fornecedores."})
  }
});

// Rota: relacionada ao cadastro de novos fornecedores pelo botão "+ Novo fornecedor":
app.post('/cadastro_fornecedores', (req, res) => {
  try {
    const idFornecedor = req.params.id_fornecedor;
    const {nome_fornecedor, cnpj, contato, status} = req.body;
    const stmt = db.prepare("INSERT INTO cadastro_fornecedores (nome_fornecedor, cnpj, contato, status) VALUES (?, ?, ?, ?);");
    const resultado = stmt.run(nome_fornecedor, cnpj, contato, status);
    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Fornecedor cadastrado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Fornecedor nao cadastrado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'A tentativa de cadastrar um fornecedor nao funcionou corretamente.' });
  };
});


// Rota: relacionada a editar os itens da tabela fornecedores pelo front através do botão editar:
app.post('/editar_fornecedores/:id_fornecedor', (req, res) => {
  try {
    const fornecedor_id = req.params.id_fornecedor;
    const {nome_fornecedor, cnpj, contato, status} = req.body;
    const stmt = db.prepare("UPDATE cadastro_fornecedores SET nome_fornecedor = ?, cnpj = ?, contato = ?, status = ? WHERE id_fornecedor = ?;");
    const resultado = stmt.run(nome_fornecedor, cnpj, contato, status, fornecedor_id);
    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Fornecedor editado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Fornecedor nao editado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'A tentativa de editar um fornecedor nao funcionou corretamente.' });
  };
})

// Rota: relacionada a excluisão de um registro da tabela de fornecedores pelo front-end:
app.delete('/deletar_fornecedor/:id_fornecedor', (req, res) => {
  try {
    const id = req.params.id_fornecedor;
    const stmt = db.prepare('DELETE FROM cadastro_fornecedores WHERE id_fornecedor = ?');
    const resultado = stmt.run(id);
    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Fornecedor deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Fornecedor nao encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'A tentativa de deletar um fornecedor nao funcionou corretamente.' });
  };
});
//------------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------------//
// Rota: dashboard da tela de funcionarios:------------------------------------------------------------//
// Rota: Obter o total de funcionarios:
app.get('/dashboard_funcionarios', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(id_funcionario) AS total_funcionario FROM funcionarios;");
    const dashboard_funcionarios_total = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_funcionarios_total);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar funcionarios."})
  }
})

// Rota: Obter o total de funcionarios ativos:
app.get('/dashboard_funcionarios_ativos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(status) AS total_funcionario_ativos FROM funcionarios WHERE status = 'Ativo';");
    const dashboard_funcionarios_ativos = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_funcionarios_ativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar funcionarios."})
  }
})

// Rota: Obter o total de funcionarios inativos:
app.get('/dashboard_funcionarios_inativos', (req, res) => {
  try {
    const stmt = db.prepare("SELECT COUNT(status) AS total_funcionario_inativos FROM funcionarios WHERE status = 'Inativo';");
    const dashboard_funcionarios_inativos = stmt.get();
    res.setHeader("Content-Type", "application/json");
    res.json(dashboard_funcionarios_inativos);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar funcionarios."})
  }
});
//-----------------------------------------------------------------------------------------------------//
// Rota: relacionada aos dados da tabela de funcionarios:
app.get('/tabela_funcionarios', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM funcionarios;");
    const tabela_funcionarios = stmt.all();
    res.setHeader("Content-Type", "application/json");
    res.json(tabela_funcionarios);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar funcionarios."})
  }
})


// Rota: relacionada ao cadastro de novos funcionarios pelo botão "+ Novo Funcionário":
app.post('/cadastro_funcionarios', (req, res) => {
  try {
    const {
      nome_funcionario,
      cargo_funcionario,
      salario_funcionario,
      tel_funcionario,
      email_funcionario,
      login_funcionario,
      senha_funcionario,
      admissao,
      demissao,
      status
    } = req.body;

    const stmt = db.prepare("INSERT INTO funcionarios (nome_funcionario, cargo_funcionario, salario_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario, admissao, demissao, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

    const resultado = stmt.run(
      nome_funcionario,
      cargo_funcionario,
      salario_funcionario,
      tel_funcionario,
      email_funcionario,
      login_funcionario,
      senha_funcionario,
      admissao,
      demissao,
      status
    );

    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Funcionario cadastrado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Funcionario nao cadastrado.' });
    }
  } catch (err) {
    console.error("❌ Erro no backend:", err);
    res.status(500).json({ mensagem: 'A tentativa de cadastrar um funcionario nao funcionou corretamente.' });
  }
});


// Rota: relacionada a editar os itens da tabela funcionarios pelo front através do botão editar:
app.post('/editar_funcionario/:id_funcionario', (req, res) => {
  try {
    const funcionario_id = req.params.id_funcionario;
    const {
      nome_funcionario, 
      cargo_funcionario, 
      admissao, 
      demissao, 
      salario_funcionario,
      status,
      tel_funcionario, 
      email_funcionario, 
      login_funcionario, 
      senha_funcionario
    } = req.body;

    const stmt = db.prepare(`
      UPDATE funcionarios SET 
        nome_funcionario = ?, 
        cargo_funcionario = ?, 
        admissao = ?, 
        demissao = ?, 
        salario_funcionario = ?, 
        status = ?, 
        tel_funcionario = ?, 
        email_funcionario = ?, 
        login_funcionario = ?, 
        senha_funcionario = ?
      WHERE id_funcionario = ?;
    `);

    const resultado = stmt.run(
      nome_funcionario, 
      cargo_funcionario, 
      admissao, 
      demissao, 
      salario_funcionario, 
      status,  
      tel_funcionario, 
      email_funcionario, 
      login_funcionario, 
      senha_funcionario, 
      funcionario_id
    );

    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Funcionário editado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Funcionário não editado.' });
    }
  } catch (err) {
    console.error("❌ Erro no backend:", err);
    res.status(500).json({ mensagem: 'Erro interno ao editar funcionário.' });
  }
});

// Rota: excluir um funcionario pelo botão excluir:
app.delete('/deletar_funcionario/:id_funcionario', (req, res) => {
  try {  
    const id = req.params.id_funcionario;
    const stmt = db.prepare('DELETE FROM funcionarios WHERE id_funcionario = ?');
    const resultado = stmt.run(id);

    if (resultado.changes > 0) {
      res.status(200).json({ mensagem: 'Funcionario excluido com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Funcionario nao excluido.' });
    }
  } catch (err) {
    console.error("❌ Erro no backend:", err);
    res.status(500).json({ mensagem: 'A tentativa de excluir um funcionario nao funcionou corretamente.' });
  }
});




//-------------------------------------------------------------------------------------------------------------------//
// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../../front-end/medcontrol-login')));

// Iniciar servidor
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Acesse http://localhost:${PORT}`);
});

