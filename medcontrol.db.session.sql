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
(3, 'Ibuprofeno 400mg', '20 caixas', '2026-06-10', '2 caixas', 'IBU400C25'),
(4, 'Omeprazol 20mg', '12 caixas', '2027-01-20', '0', 'OME20D25'),
(5, 'Loratadina 10mg', '8 caixas', '2026-09-30', '1 caixa', 'LORA10E25'),
(6, 'Neosaldina', '25 caixas', '2025-11-15', '3 caixas', 'NEOX25'),
(7, 'Dorflex', '30 caixas', '2026-04-05', '2 caixas', 'DORFLEXF25'),
(8, 'Buscopan Composto', '18 caixas', '2026-07-22', '1 caixa', 'BUSCOG25'),
(9, 'Torsilax', '10 caixas', '2025-10-10', '0', 'TORSIH25'),
(10, 'Cetoconazol Shampoo', '14 frascos', '2026-12-31', '2 frascos', 'CETOXSH25'),
(11, 'Protetor Solar FPS 50', '40 unidades', '2027-02-28', '5 unidades', 'PROTSOL50J25'),
(12, 'Sabonete Líquido Facial', '50 frascos', '2026-08-18', '4 frascos', 'SABLIQK25'),
(13, 'Creme Cicatricure', '22 unidades', '2026-05-12', '2 unidades', 'CICATRICL25'),
(14, 'Amoxicilina 500mg', '16 caixas', '2026-11-01', '1 caixa', 'AMOX500M25'),
(15, 'Losartana 50mg', '19 caixas', '2027-03-10', '0', 'LOSA50N25'),
(16, 'Metformina 850mg', '21 caixas', '2026-10-05', '2 caixas', 'METF850P25'),
(17, 'Ranitidina 150mg', '13 caixas', '2025-12-20', '1 caixa', 'RANI150Q25'),
(18, 'Azitromicina 500mg', '17 caixas', '2026-01-15', '0', 'AZIT500R25'),
(19, 'Cetirizina 10mg', '11 caixas', '2026-09-01', '1 caixa', 'CETI10S25'),
(20, 'Fluconazol 150mg', '9 caixas', '2026-06-30', '0', 'FLUC150T25'),
(21, 'Pantoprazol 40mg', '14 caixas', '2027-04-01', '1 caixa', 'PANTO40U25'),
(22, 'Cloridrato de Sertralina 50mg', '10 caixas', '2026-12-15', '0', 'SERT50V25'),
(23, 'Ácido Acetilsalicílico 100mg', '18 caixas', '2026-11-30', '2 caixas', 'AAS100W25'),
(24, 'Sinvastatina 20mg', '12 caixas', '2027-01-10', '1 caixa', 'SINVA20X25'),
(25, 'Enalapril 10mg', '15 caixas', '2026-08-25', '0', 'ENALA10Y25'),
(26, 'Hidroclorotiazida 25mg', '13 caixas', '2026-10-20', '1 caixa', 'HCTZ25Z25'),
(27, 'Cetoconazol Creme', '20 bisnagas', '2026-07-15', '2 bisnagas', 'CETOCRM25'),
(28, 'Protetor Labial FPS 30', '35 unidades', '2026-12-01', '3 unidades', 'PROTLAB30A26'),
(29, 'Sabonete Íntimo Feminino', '40 frascos', '2027-03-05', '4 frascos', 'SABINTF26'),
(30, 'Creme Hidratante Corporal', '50 unidades', '2026-09-10', '5 unidades', 'CREMHID26');

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
(33, 'Dipirona 1g', '20 caixas', '2026-11-30', '0', 'DIP1G26'),
(34, 'Paracetamol Infantil 200mg', '25 frascos', '2026-08-15', '3 frascos', 'PARAINF200C26'),
(35, 'Ibuprofeno Suspensão 100mg', '30 frascos', '2027-02-20', '2 frascos', 'IBUSUSP100D26'),
(36, 'Omeprazol 10mg', '10 caixas', '2026-09-01', '0', 'OME10E26'),
(37, 'Loratadina Xarope', '15 frascos', '2026-10-10', '1 frasco', 'LORAXF26'),
(38, 'Neosaldina Gotas', '20 frascos', '2026-12-25', '2 frascos', 'NEOGOTG26'),
(39, 'Dorflex Comprimido', '35 caixas', '2027-03-01', '3 caixas', 'DORFCOMP26'),
(40, 'Buscopan Gotas', '22 frascos', '2026-07-30', '1 frasco', 'BUSGOTG26'),
(41, 'Torsilax Gel', '18 bisnagas', '2026-11-10', '2 bisnagas', 'TORSGELH26'),
(42, 'Cetoconazol Sabonete', '25 unidades', '2026-09-20', '0', 'CETOSABSH26'),
(43, 'Protetor Solar FPS 30', '45 unidades', '2027-04-15', '4 unidades', 'PROTSOL30J26'),
(44, 'Sabonete Líquido Corporal', '50 frascos', '2026-10-05', '5 frascos', 'SABLIQCORPK26'),
(45, 'Creme Cicatricure Noite', '20 unidades', '2026-12-01', '1 unidade', 'CICATNOITEL26'),
(46, 'Amoxicilina Suspensão 250mg', '15 frascos', '2026-08-20', '2 frascos', 'AMOXSUSP250M26'),
(47, 'Losartana Potássica 100mg', '17 caixas', '2027-01-25', '0', 'LOSAPOT100N26'),
(48, 'Metformina XR 500mg', '20 caixas', '2026-09-30', '1 caixa', 'METFXR500P26'),
(49, 'Ranitidina Xarope', '12 frascos', '2026-12-10', '1 frasco', 'RANIXQ26'),
(50, 'Azitromicina Infantil 200mg', '14 frascos', '2026-07-01', '0', 'AZITINF200R26'),
(51, 'Cetirizina Gotas', '16 frascos', '2026-10-20', '2 frascos', 'CETIGOTS26'),
(52, 'Fluconazol Creme', '10 bisnagas', '2026-08-05', '1 bisnaga', 'FLUCCRM26'),
(53, 'Pantoprazol 20mg', '13 caixas', '2027-02-10', '0', 'PANTO20U26'),
(54, 'Sertralina 100mg', '11 caixas', '2026-11-15', '1 caixa', 'SERT100V26'),
(55, 'AAS Infantil 100mg', '19 frascos', '2026-09-25', '2 frascos', 'AASINF100W26'),
(56, 'Sinvastatina 40mg', '15 caixas', '2027-03-20', '0', 'SINVA40X26'),
(57, 'Enalapril 20mg', '14 caixas', '2026-10-30', '1 caixa', 'ENALA20Y26'),
(58, 'Hidroclorotiazida 50mg', '12 caixas', '2026-12-05', '0', 'HCTZ50Z26'),
(59, 'Creme Anti-idade FPS 60', '30 unidades', '2027-01-01', '3 unidades', 'CREMANTIFPS60A27'),
(60, 'Sabonete Esfoliante Facial', '40 unidades', '2026-09-15', '4 unidades', 'SABESFOLB27');


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


