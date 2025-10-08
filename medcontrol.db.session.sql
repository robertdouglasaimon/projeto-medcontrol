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
(1, 'Dipirona 500mg', 'Analgésico e antitérmico em comprimido', 'EMS', 'DIP2025A', '2026-05-01', 5.99, 120, 'Medicamento'),
(2, 'Paracetamol 750mg', 'Alívio de dores e febre', 'Medley', 'PARA750B', '2026-03-15', 7.49, 80, 'Medicamento'),
(3, 'Ibuprofeno 400mg', 'Anti-inflamatório e analgésico', 'Neo Química', 'IBU400C', '2026-08-10', 9.99, 60, 'Medicamento'),
(4, 'Omeprazol 20mg', 'Tratamento de refluxo e gastrite', 'Teuto', 'OME20D', '2027-01-20', 12.90, 50, 'Medicamento'),
(5, 'Loratadina 10mg', 'Antialérgico em comprimido', 'EMS', 'LORA10E', '2026-11-30', 8.50, 70, 'Medicamento'),
(6, 'Neosaldina', 'Alívio de dor de cabeça e enxaqueca', 'Takeda', 'NEO2025F', '2026-07-01', 14.99, 40, 'Medicamento'),
(7, 'Dorflex', 'Relaxante muscular e analgésico', 'Sanofi', 'DORFLEXG', '2026-09-15', 11.90, 100, 'Medicamento'),
(8, 'Buscopan Composto', 'Alívio de cólicas e dores abdominais', 'Boehringer', 'BUSCOH', '2026-12-01', 13.50, 90, 'Medicamento'),
(9, 'Torsilax', 'Anti-inflamatório com relaxante muscular', 'Cristália', 'TORSI2025I', '2026-10-10', 16.90, 30, 'Medicamento'),
(10, 'Cetoconazol Shampoo', 'Tratamento de caspa e dermatite', 'Medley', 'CETOJ2025J', '2027-02-01', 22.90, 25, 'Dermocosmético'),
(11, 'Protetor Solar FPS 50', 'Proteção solar para pele sensível', 'La Roche-Posay', 'SOLAR50K', '2026-12-31', 89.90, 15, 'Dermocosmético'),
(12, 'Sabonete Líquido Facial', 'Limpeza profunda para pele oleosa', 'Vichy', 'SABFAC2025L', '2026-08-01', 39.90, 20, 'Dermocosmético'),
(13, 'Creme Cicatricure', 'Redução de marcas e cicatrizes', 'Genomma Lab', 'CICAT2025M', '2027-01-01', 49.90, 18, 'Dermocosmético'),
(14, 'Shampoo Anticaspa Head & Shoulders', 'Controle da caspa e oleosidade', 'P&G', 'HEAD2025N', '2026-09-01', 19.90, 35, 'Higiene'),
(15, 'Desodorante Rexona Aerosol', 'Proteção 48h contra suor', 'Unilever', 'REX2025O', '2026-06-01', 14.90, 50, 'Higiene'),
(16, 'Creme Dental Colgate Total 12', 'Proteção completa para os dentes', 'Colgate-Palmolive', 'COLG2025P', '2027-03-01', 8.99, 60, 'Higiene'),
(17, 'Fralda Pampers M', 'Fraldas para bebês até 9kg', 'P&G', 'PAMP2025Q', '2026-12-01', 59.90, 20, 'Infantil'),
(18, 'Leite Ninho Fases 1+', 'Leite em pó para crianças acima de 1 ano', 'Nestlé', 'NINHO2025R', '2026-11-01', 39.90, 25, 'Infantil'),
(19, 'Centrum Homem', 'Suplemento vitamínico para homens', 'Pfizer', 'CENTH2025S', '2027-04-01', 69.90, 15, 'Suplemento'),
(20, 'Ômega 3 1000mg', 'Suplemento para saúde cardiovascular', 'Vitafor', 'OMEGA2025T', '2027-05-01', 49.90, 20, 'Suplemento'),
(21, 'Vitamina C 500mg', 'Fortalecimento do sistema imunológico', 'Sanofi', 'VITC2025U', '2026-10-01', 24.90, 40, 'Suplemento'),
(22, 'Glicopan Pet 30ml', 'Suplemento vitamínico para pets', 'Vetnil', 'GLICOPET2025V', '2027-01-01', 29.90, 10, 'Pet'),
(23, 'Termômetro Digital', 'Medição de temperatura corporal', 'G-Tech', 'TERM2025W', '2028-01-01', 39.90, 12, 'Acessório'),
(24, 'Máscara Cirúrgica c/ 50 unid.', 'Proteção facial descartável', 'Descarpack', 'MASK2025X', '2026-12-01', 19.90, 100, 'Acessório'),
(25, 'Álcool em Gel 70%', 'Higienização das mãos', 'Asseptgel', 'ALC2025Y', '2026-09-01', 12.90, 80, 'Higiene');

INSERT INTO cadastro_produtos (
  id_produto, nome_produto, descricao, fabricante, lote, data_validade, preco_venda, qtd_estoque, classificacao
) VALUES
(26, 'Amoxicilina 500mg', 'Antibiótico para infecções bacterianas', 'EMS', 'AMOX2025A', '2026-12-01', 18.90, 40, 'Medicamento'),
(27, 'Azitromicina 500mg', 'Antibiótico de amplo espectro', 'Medley', 'AZIT2025B', '2026-11-01', 24.90, 30, 'Medicamento'),
(28, 'Losartana 50mg', 'Controle da pressão arterial', 'Teuto', 'LOSAR2025C', '2027-01-01', 15.90, 50, 'Medicamento'),
(29, 'Sinvastatina 20mg', 'Controle do colesterol', 'EMS', 'SINVA2025D', '2026-10-01', 19.90, 45, 'Medicamento'),
(30, 'Metformina 850mg', 'Controle da glicemia em diabéticos', 'Medley', 'METF2025E', '2026-09-01', 12.90, 60, 'Medicamento'),
(31, 'AirFlu Infantil', 'Descongestionante nasal infantil', 'Aché', 'AIRFLU2025F', '2026-08-01', 17.90, 20, 'Infantil'),
(32, 'Tylenol Bebê', 'Alívio de febre e dor em crianças', 'J&J', 'TYLB2025G', '2026-07-01', 22.90, 25, 'Infantil'),
(33, 'Xarope Vick 120ml', 'Alívio da tosse e congestão', 'P&G', 'VICK2025H', '2026-06-01', 19.90, 30, 'Medicamento'),
(34, 'Creme Nivea Soft', 'Hidratação leve para rosto e corpo', 'Beiersdorf', 'NIVEA2025I', '2027-01-01', 16.90, 40, 'Dermocosmético'),
(35, 'Sabonete Dove', 'Sabonete hidratante para pele sensível', 'Unilever', 'DOVE2025J', '2026-12-01', 7.90, 60, 'Higiene'),
(36, 'Shampoo Pantene Liso Extremo', 'Controle de frizz e brilho', 'P&G', 'PANTENE2025K', '2026-11-01', 21.90, 35, 'Higiene'),
(37, 'Creme Dental Sensodyne', 'Alívio da sensibilidade dental', 'GSK', 'SENSO2025L', '2027-02-01', 18.90, 30, 'Higiene'),
(38, 'Sabonete Protex', 'Proteção antibacteriana para pele', 'Colgate-Palmolive', 'PROTEX2025M', '2026-10-01', 6.90, 50, 'Higiene'),
(39, 'Repelente Off Spray', 'Proteção contra mosquitos', 'SC Johnson', 'OFF2025N', '2026-09-01', 23.90, 20, 'Acessório'),
(40, 'Curativo Band-Aid', 'Curativos adesivos para ferimentos', 'J&J', 'BANDAID2025O', '2027-01-01', 12.90, 40, 'Acessório'),
(41, 'Água Micelar L’Oréal', 'Limpeza facial sem enxágue', 'L’Oréal', 'MICELAR2025P', '2026-12-01', 29.90, 25, 'Dermocosmético'),
(42, 'Creme Antissinais Renew', 'Redução de rugas e linhas finas', 'Avon', 'RENEW2025Q', '2027-03-01', 59.90, 15, 'Dermocosmético'),
(43, 'Colágeno Hidrolisado 120 cáps.', 'Suplemento para pele e articulações', 'Sanavita', 'COLAG2025R', '2027-04-01', 79.90, 20, 'Suplemento'),
(44, 'Multivitamínico Lavitan', 'Suplemento diário de vitaminas e minerais', 'Cimed', 'LAVITAN2025S', '2027-05-01', 34.90, 30, 'Suplemento'),
(45, 'Pomada Nebacetin', 'Cicatrizante e antibiótico tópico', 'Takeda', 'NEBAC2025T', '2026-08-01', 14.90, 25, 'Medicamento'),
(46, 'Pomada Bepantol Baby', 'Proteção contra assaduras', 'Bayer', 'BEPAN2025U', '2026-07-01', 22.90, 30, 'Infantil'),
(47, 'Pomada Hipoglós', 'Tratamento de assaduras e irritações', 'GSK', 'HIPO2025V', '2026-06-01', 19.90, 20, 'Infantil'),
(48, 'Antisséptico Bucal Listerine', 'Higiene bucal completa', 'J&J', 'LIST2025W', '2027-01-01', 17.90, 30, 'Higiene'),
(49, 'Escova Dental Oral-B', 'Escova com cerdas macias', 'P&G', 'ORALB2025X', '2026-12-01', 9.90, 40, 'Higiene'),
(50, 'Lenço Umedecido Huggies', 'Higiene infantil com aloe vera', 'Kimberly-Clark', 'HUGG2025Y', '2026-11-01', 15.90, 25, 'Infantil'),
(51, 'Antisséptico Spray Asseptgel', 'Desinfecção de superfícies e mãos', 'Asseptgel', 'ASEPT2025Z', '2026-10-01', 18.90, 30, 'Higiene'),
(52, 'Glicose 50% 10ml', 'Uso hospitalar para hipoglicemia', 'Cristália', 'GLIC2025AA', '2026-09-01', 6.90, 10, 'Medicamento'),
(53, 'Soro Fisiológico 500ml', 'Hidratação e limpeza nasal', 'JP Farma', 'SORO2025AB', '2026-08-01', 9.90, 20, 'Medicamento'),
(54, 'Esparadrapo 10m', 'Fixação de curativos e sondas', 'Cremer', 'ESP2025AC', '2027-01-01', 7.90, 15, 'Acessório'),
(55, 'Gaze Estéril 7,5x7,5cm', 'Curativos e procedimentos', 'Cremer', 'GAZE2025AD', '2026-12-01', 5.90, 50, 'Acessório'),
(56, 'Seringa 5ml sem agulha', 'Aplicação de medicamentos', 'BD', 'SERINGA2025AE', '2027-02-01', 2.90, 100, 'Acessório'),
(57, 'Lanceta para Glicemia', 'Coleta de sangue para teste', 'Accu-Chek', 'LANCETA2025AF', '2026-11-01', 0.90, 200, 'Acessório'),
(58, 'Aparelho de Pressão Digital', 'Monitoramento da pressão arterial', 'G-Tech', 'PRESS2025AG', '2028-01-01', 129.90, 10, 'Acessório'),
(59, 'Inalador Nebulizador Compact', 'Tratamento de doenças respiratórias', 'Omron', 'NEBU2025AH', '2028-01-01', 199.90, 5, 'Acessório'),
(60, 'Teste de Gravidez Clearblue', 'Detecção rápida de gravidez', 'Clearblue', 'TEST2025AI', '2027-01-01', 24.90, 15, 'Acessório'),
(61, 'Creme para Pés Baruel', 'Hidratação e controle de odores', 'Baruel', 'PES2025AJ', '2026-12-01', 13.90, 20, 'Dermocosmético');

-- Produto mais vendido
SELECT (SELECT nome_produto FROM cadastro_produtos ORDER BY preco_venda DESC LIMIT 1) AS produtos_mais_vendido;

-- Criando a coluna quantidade_vendida na tabela cadastro_produtos:
ALTER TABLE cadastro_produtos ADD COLUMN quantidade_vendida INTEGER DEFAULT 0;

-- Inserindo 61 valores na nova coluna quantidade_vendida:



UPDATE cadastro_produtos SET quantidade_vendida = 90 WHERE id_produto = 61;

SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido FROM cadastro_produtos GROUP BY nome_produto ORDER BY total_vendido DESC LIMIT 1;

SELECT CONCAT('R$', FORMAT((SELECT SUM(preco_venda) AS total_estoque FROM cadastro_produtos), 'f2')) AS total_estoque;