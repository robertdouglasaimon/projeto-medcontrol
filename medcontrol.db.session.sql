SELECT* FROM cadastro_clientes;
SELECT* FROM cadastro_produtos;
SELECT* FROM vendas;
SELECT* FROM controle_estoque;
SELECT* FROM cadastro_fornecedores;
SELECT * FROM historico_fornecimento;

DROP TABLE funcionarios;

-- Criando a tabela de funcionários da empresa:
CREATE TABLE IF NOT EXISTS funcionarios (
  id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_funcionario VARCHAR(100) NOT NULL,
  cargo_funcionario VARCHAR(100) NOT NULL,
  salario_funcionario DECIMAL(10, 2) DEFAULT 1.500,
  tel_funcionario VARCHAR(20),
  email_funcionario VARCHAR(100),
  login_funcionario VARCHAR(100) NOT NULL,
  senha_funcionario VARCHAR(100) NOT NULL
)

INSERT INTO funcionarios (
  nome_funcionario,
  cargo_funcionario,
  salario_funcionario,
  tel_funcionario,
  email_funcionario,
  login_funcionario,
  senha_funcionario
) VALUES 
('Robert Douglas', 'Proprietário/Administrador', 10000.00, '(61) 98462-5920', 'robertdouglas@medcontrol.com', 'robertdouglasaimon', '123456789');


-- Renomeando a coluna historico_compra para endereco
ALTER TABLE cadastro_clientes RENAME COLUMN historico_compra TO endereco;

-- Deletando a coluna status_cliente:
ALTER TABLE cadastro_clientes DROP COLUMN status_cliente;

-- Adicionando a coluna status_cliente:
ALTER TABLE cadastro_clientes ADD COLUMN status_cliente VARCHAR(8);


DROP TABLE cadastro_clientes;

CREATE TABLE cadastro_clientes (
  id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_cliente VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  endereco VARCHAR(100),
  cpf VARCHAR(14) NOT NULL UNIQUE,
  status_cliente VARCHAR(8)
);


-- Fazendo a inserção dos dados manualmente na tabela cadastro_clientes :D
INSERT INTO cadastro_clientes (
  nome_cliente, 
  cpf, 
  telefone, 
  endereco, 
  status_cliente
) VALUES
('João Silva', '123.456.789-00', '(61) 99999-1111', 'Rua das Palmeiras, 45', 'Ativo'),
('Maria Oliveira', '987.654.321-00', '(61) 98888-2222', 'Av. Central, 120', 'Inativo'),
('Carlos Souza', '456.789.123-00', '(61) 97777-3333', 'Rua do Comércio, 89', 'Ativo'),
('Ana Paula Lima', '321.654.987-00', '(61) 96666-4444', 'Travessa das Flores, 12', 'Inativo'),
('Fernanda Costa', '789.123.456-00', '(61) 95555-5555', 'Rua dos Cravos, 78', 'Ativo'),
('Ricardo Mendes', '654.321.789-00', '(61) 94444-6666', 'Av. Brasil, 300', 'Inativo'),
('Juliana Rocha', '159.753.486-00', '(61) 93333-7777', 'Rua do Sol, 10', 'Ativo'),
('Eduardo Martins', '258.369.147-00', '(61) 92222-8888', 'Rua das Acácias, 56', 'Inativo'),
('Patrícia Almeida', '369.258.147-00', '(61) 91111-9999', 'Rua dos Ipês, 101', 'Ativo'),
('Bruno Ferreira', '741.852.963-00', '(61) 90000-0000', 'Av. Goiás, 200', 'Inativo');

INSERT INTO cadastro_clientes (
  nome_cliente, 
  cpf, 
  telefone, 
  endereco, 
  status_cliente
) VALUES
('João Silva', '123.456.789-00', '(61) 99999-1111', 'Rua das Palmeiras, 45', 'Ativo'),
('Maria Oliveira', '987.654.321-00', '(61) 98888-2222', 'Av. Central, 120', 'Inativo'),
('Carlos Souza', '456.789.123-00', '(61) 97777-3333', 'Rua do Comércio, 89', 'Ativo'),
('Ana Paula Lima', '321.654.987-00', '(61) 96666-4444', 'Travessa das Flores, 12', 'Inativo'),
('Fernanda Costa', '789.123.456-00', '(61) 95555-5555', 'Rua dos Cravos, 78', 'Ativo'),
('Ricardo Mendes', '654.321.789-00', '(61) 94444-6666', 'Av. Brasil, 300', 'Inativo'),
('Juliana Rocha', '159.753.486-00', '(61) 93333-7777', 'Rua do Sol, 10', 'Ativo'),
('Eduardo Martins', '258.369.147-00', '(61) 92222-8888', 'Rua das Acácias, 56', 'Inativo'),
('Patrícia Almeida', '369.258.147-00', '(61) 91111-9999', 'Rua dos Ipês, 101', 'Ativo'),
('Bruno Ferreira', '741.852.963-00', '(61) 90000-0000', 'Av. Goiás, 200', 'Inativo');

-- Deletando os dados nulos da tabela cadastro_clientes:
DELETE FROM cadastro_clientes WHERE status_cliente IS NULL;

-- Deletando linhas especificas da tabela cadastro_clientes:
DELETE FROM funcionarios WHERE id_funcionario = 15;
DELETE FROM funcionarios WHERE id_funcionario = 16;
DELETE FROM funcionarios WHERE id_funcionario = 17;
DELETE FROM funcionarios WHERE id_funcionario = 20;


