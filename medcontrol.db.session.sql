SELECT* FROM cadastro_clientes;
SELECT* FROM cadastro_produtos;
SELECT* FROM vendas;
SELECT* FROM controle_estoque;
SELECT* FROM cadastro_fornecedores;
SELECT * FROM historico_fornecimento;
SELECT * FROM funcionarios;

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


INSERT INTO cadastro_clientes (
  nome_cliente, 
  cpf, 
  telefone, 
  endereco, 
  status_cliente
) VALUES
('João Silva', '123.456.789-00', '(61) 99999-1111', 'Rua das Palmeiras, 45', 'Ativo'),


-- Deletando os dados nulos da tabela cadastro_clientes:
DELETE FROM cadastro_clientes WHERE status_cliente IS NULL;

-- Deletando linhas especificas da tabela cadastro_clientes 52 ao 64:
DELETE FROM funcionarios WHERE id_funcionario = 65;
DELETE FROM funcionarios WHERE id_funcionario = 66;
DELETE FROM funcionarios WHERE id_funcionario = 68;
DELETE FROM funcionarios WHERE id_funcionario = 69;


-- Criando um index na tabela cadastro_clientes:
CREATE UNIQUE INDEX idx_nome_cliente ON cadastro_clientes(nome_cliente);
CREATE UNIQUE INDEX idx_telefone_cliente ON cadastro_clientes(telefone);
CREATE UNIQUE INDEX idx_endereco_cliente ON cadastro_clientes(endereco);

PRAGMA index_list('cadastro_clientes');

SELECT * FROM funcionarios;

SELECT COUNT(id_cliente) AS total_clientes_ativos FROM cadastro_clientes WHERE status_cliente = "Ativo"


INSERT INTO cadastro_produtos (
  id_produto, nome_produto, descricao, fabricante, lote, data_validade, preco_venda, qtd_estoque, classificacao
) VALUES
(1, 'Dipirona 500mg', 'Analgésico e antitérmico em comprimido', 'EMS', 'DIP2025A', '2026-05-01', 5.99, 120, 'Medicamento');


-- Produto mais vendido
SELECT (SELECT nome_produto FROM cadastro_produtos ORDER BY preco_venda DESC LIMIT 1) AS produtos_mais_vendido;

-- Criando a coluna quantidade_vendida na tabela cadastro_produtos:
ALTER TABLE cadastro_produtos ADD COLUMN quantidade_vendida INTEGER DEFAULT 0;

-- Inserindo 61 valores na nova coluna quantidade_vendida:



UPDATE cadastro_produtos SET quantidade_vendida = 90 WHERE id_produto = 61;

SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido FROM cadastro_produtos GROUP BY nome_produto ORDER BY total_vendido DESC LIMIT 1;

SELECT CONCAT('R$', FORMAT((SELECT SUM(preco_venda) AS total_estoque FROM cadastro_produtos), 'f2')) AS total_estoque;


-- Adicionando a coluna "lote_estoque" na tabela "controle_estoque":
ALTER TABLE controle_estoque ADD COLUMN lote_estoque VARCHAR(100) NOT NULL;

-- Inserindo dados de lote na tabela controle_estoque:
INSERT INTO controle_estoque (
  id_controle_estoque,
  entrada_produto,
  saida_produto,
  produto_validade,
  perdas_descarte,
  lote_estoque
) VALUES
(1, 'Dipirona 500mg', '10 caixas', '2026-03-15', '1 caixa', 'DIP500A25'),
(2, 'Paracetamol 750mg', '15 caixas', '2025-12-01', '0', 'PARA750B25'),

INSERT INTO controle_estoque (
  id_controle_estoque,
  entrada_produto,
  saida_produto,
  produto_validade,
  perdas_descarte,
  lote_estoque
) VALUES
(31, 'Clonazepam 2mg', '12 caixas', '2026-12-10', '1 caixa', 'CLONA2A26'),
(32, 'Prednisona 20mg', '18 caixas', '2027-01-05', '2 caixas', 'PRED20B26'),



-- Adicionando coluna na tabela controle_estoque:
ALTER TABLE controle_estoque ADD COLUMN ;


-- Querry que faz a contagem dos produtos que sairam (saida_produto), os produtos perdidos (perdas_descarte), e a quantidade total do estoque (id_controle_estoque):
SELECT 
  COUNT(entrada_produto) AS produtos_entrados,
  SUM(CASE WHEN saida_produto IS NOT NULL THEN 1 ELSE 0 END) AS produtos_saidos, 
  SUM(CASE WHEN perdas_descarte IS NOT NULL THEN 1 ELSE 0 END) AS produtos_perdidos, 
  SUM (CASE WHEN qtd_estoque IS NOT NULL THEN qtd_estoque ELSE 0 END) AS total_estoque
  
FROM controle_estoque;


-- Adicionando coluna na tabela controle_estoque:
ALTER TABLE controle_estoque ADD COLUMN qtd_estoque VARCHAR(100);

ALTER TABLE controle_estoque DROP COLUMN qtd_estoque;

-- Gerando 60 itens para coluna qtd_estoque (valores aleatórios):
UPDATE controle_estoque SET qtd_estoque = 500 WHERE id_controle_estoque = 1;


-- Preciso de uma consulta que converta um valor de uma soma em uma porcentagem.
-- Preciso que esse total seja convertido em porcetagem para virar um gráfico:
SELECT SUM(qtd_estoque) AS total_estoque FROM cadastro_produtos;

SELECT 
  SUM(qtd_estoque) AS total_estoque,
  ROUND((SUM(qtd_estoque) * 100.0) / 100, 2) AS nivel_estoque
FROM cadastro_produtos;

SELECT SUM(qtd_estoque) AS total_estoque FROM cadastro_produtos;



-- Explicando a consulta abaixo porque ela é complexa e vou precisar dela para extrair e calcular os valores da coluna lá de perdas_descarte:

SELECT 
  SUM(CAST(SUBSTR(perdas_descarte, 1, INSTR(perdas_descarte, ' ') - 1) AS INTEGER)) AS total_perdido
FROM controle_estoque
WHERE perdas_descarte IS NOT NULL;

-- 🧠 Explicação passo a passo:
-- INSTR(perdas_descarte, ' '): encontra a posição do primeiro espaço na string.
-- SUBSTR(perdas_descarte, 1, ...): pega tudo antes do espaço → ou seja, o número.
-- CAST(... AS INTEGER): converte o trecho extraído em número.
-- SUM(...): soma todos os valores extraídos.
-- AS total_perdido: apelido da coluna com o total somado.

SELECT  
  SUM(CAST(SUBSTR(saida_produto, 1, INSTR(saida_produto, ' ') - 1) AS INTEGER)) AS total_saida_produto
FROM controle_estoque
WHERE saida_produto IS NOT NULL;


SELECT SUM(saida_produto) AS total_saida_produto FROM controle_estoque;
SELECT SUM(qtd_estoque) AS total_estoque FROM cadastro_produtos;

DELETE FROM controle_estoque WHERE id_controle_estoque = 61;DELETE FROM controle_estoque WHERE id_controle_estoque = 61;

SELECT * FROM controle_estoque;

SELECT SUM(perdas_descarte) AS total_perdas_descarte FROM controle_estoque;

SELECT * FROM vendas;

CREATE TABLE vendas (
    id_vendas INTEGER PRIMARY KEY AUTOINCREMENT,
    produtos_vendidos VARCHAR(100) NOT NULL,
    data_venda DATE NOT NULL,
    registro_receita_medica VARCHAR(100) NOT NULL,
    cupom_fiscal VARCHAR(100) NOT NULL,
    id_cliente INTEGER NOT NULL,
    id_controle_estoque INTEGER NOT NULL,
    
    FOREIGN KEY (id_cliente) REFERENCES cadastro_clientes(id_cliente),
    FOREIGN KEY (id_controle_estoque) REFERENCES controle_estoque(id_controle_estoque)
);

INSERT INTO vendas (
    produtos_vendidos,
    data_venda,
    registro_receita_medica,
    cupom_fiscal,
    id_cliente,
    id_controle_estoque
)
VALUES
('Clonazepam 2mg', '2025-10-14', 'RX20251014N', 'CF000014', 114, 214),
('Ácido Fólico 5mg', '2025-10-15', 'RX20251015O', 'CF000015', 115, 215);
(


-- Adicionando a coluna valor_venda na tabela vendas:
ALTER TABLE vendas ADD COLUMN vendas_medias DECIMAL(10, 2) DEFAULT 1.500;


UPDATE vendas SET vendas_medias = 2.500 WHERE id_vendas = 1;
UPDATE vendas SET vendas_medias = 1.200 WHERE id_vendas = 2;


SELECT 
    COUNT(id_vendas) AS total_vendas, 
    SUM(valor_venda) AS vendas_realizadas, 
    ROUND(AVG(valor_venda), 2) AS vendas_medias 
FROM vendas;

INSERT INTO vendas (
    id_vendas, 
    produtos_vendidos, 
    vendas_medias, 
    data_venda, 
    registro_receita_medica, 
    valor_venda, 
    cupom_fiscal,

    id_cliente,
    id_controle_estoque
)
VALUES
(31, 'Paracetamol 500mg', '2025-10-31', 'RX20251031AE', 'CF000031', 131, 231, 1, 1);


SELECT id_controle_estoque FROM controle_estoque ORDER BY id_controle_estoque DESC LIMIT 1;
SELECT id_cliente FROM cadastro_clientes ORDER BY id_cliente DESC LIMIT 1;

DELETE FROM vendas WHERE id_vendas = 31;

ALTER TABLE vendas DROP COLUMN registro_receita_medica;

INSERT INTO cadastro_fornecedores (
  id_fornecedor, 
  nome_fornecedor, 
  cnpj, 
  contato
) VALUES
(1, 'EMS S/A', '57.507.378/0001-94', '(19) 3867-7000'),
(2, 'Eurofarma Laboratórios S/A', '61.190.096/0001-92', '(11) 5090-8700'),
(3, 'Laboratório Farmacêutico do Estado de Pernambuco', '10.842.993/0001-00', '(81) 3183-4700');

ALTER TABLE cadastro_fornecedores ADD COLUMN status VARCHAR(20);

SELECT COUNT(id_fornecedor) AS total_fornecedores FROM cadastro_fornecedores;
SELECT COUNT(status) AS total_fornecedores_ativos FROM cadastro_fornecedores WHERE status = "Ativo";
SELECT COUNT(status) AS total_inativos FROM cadastro_fornecedores WHERE status = "Inativo";

SELECT * FROM cadastro_fornecedores;


ALTER TABLE funcionarios ADD COLUMN admissao DATE;
ALTER TABLE funcionarios ADD COLUMN demissao DATE;
ALTER TABLE funcionarios ADD COLUMN salario DECIMAL(10, 2) DEFAULT 1.500;
ALTER TABLE funcionarios ADD COLUMN status VARCHAR(20);

-- Inserindo novo usuario em funcionarios
INSERT INTO funcionarios (
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
) VALUES
('Geovana', 'Q.A', 1500.00, '(61)98317618', 'geovana@medcontrol', 'geovana', '123456789', '2025-10-26', NULL, 'Inativo');

-- Modificando o status das coluna status de funcionarios:
UPDATE funcionarios SET demissao = "Funcionário Ativo" WHERE id_funcionario = 67;
UPDATE funcionarios SET demissao = "Funcionário Ativo" WHERE id_funcionario = 70;
UPDATE funcionarios SET demissao = "Funcionário Ativo" WHERE id_funcionario = 71;
UPDATE funcionarios SET demissao = "Funcionário Ativo" WHERE id_funcionario = 72;

ALTER TABLE funcionarios DROP COLUMN salario;

SELECT lote, data_validade, nome_produto FROM cadastro_produtos
WHERE JULIANDAY(data_validade) - JULIANDAY('now') <= 30
ORDER BY data_validade ASC;

INSERT INTO cadastro_produtos (
  id_produto,
  descricao,
  fabricante,
  lote,
  data_validade,
  preco_venda,
  qtd_estoque,
  classificacao,
  nome_produto,
  quantidade_vendida
) VALUES (
  101, -- id_produto
  'Analgésico para dor leve', -- descricao
  'Farmacêutica XYZ', -- fabricante
  'L123', -- lote
  '2025-11-15', -- data_validade
  19.90, -- preco_venda
  50, -- qtd_estoque
  'Medicamento', -- classificacao
  'Dipirona 500mg', -- nome_produto
  0 -- quantidade_vendida
);

SELECT 
  lote, nome_produto, data_validade,
  ROUND(JULIANDAY(data_validade) - JULIANDAY('now')) AS dias_para_vencer
FROM cadastro_produtos
WHERE JULIANDAY(data_validade) - JULIANDAY('now') <= 30
  AND JULIANDAY(data_validade) - JULIANDAY('now') >= 0
ORDER BY dias_para_vencer ASC;

SELECT SUM(valor_venda) FROM vendas;


