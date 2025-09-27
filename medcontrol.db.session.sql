SELECT* FROM cadastro_clientes;
SELECT* FROM cadastro_produtos;
SELECT* FROM vendas;
SELECT* FROM controle_estoque;
SELECT* FROM cadastro_fornecedores;
SELECT * FROM historico_fornecimento;


-- Renomeando a coluna historico_compra para endereco
ALTER TABLE cadastro_clientes RENAME COLUMN historico_compra TO endereco;

-- Fazendo a inserção dos dados manualmente na tabela cadastro_clientes :D
INSERT INTO cadastro_clientes (
    id_cliente, 
    nome_cliente, 
    cpf, 
    telefone, 
    endereco
) 
VALUES
(1, 'Ana Beatriz Silva', '123.456.789-00', '(61) 99876-4321', 'Rua das Acácias, 120 - Valparaíso de Goiás'),
(2, 'Carlos Eduardo Lima', '987.654.321-11', '(61) 99654-3210', 'Av. Central, 45 - Jardim Céu Azul'),
(3, 'Fernanda Oliveira', '111.222.333-44', '(61) 99555-6677', 'Rua 5, Qd 10 Lt 20 - Parque Esplanada'),
(4, 'João Pedro Martins', '555.666.777-88', '(61) 99444-8899', 'Rua das Palmeiras, 300 - Etapa A'),
(5, 'Mariana Costa', '999.888.777-66', '(61) 99333-1122', 'Av. Independência, 200 - Etapa B'),
(6, 'Rafael Souza', '444.333.222-11', '(61) 99222-3344', 'Rua das Mangueiras, 87 - Jardim Oriente'),
(7, 'Juliana Mendes', '321.654.987-00', '(61) 99111-5566', 'Rua 12, Lt 15 - Morada Nobre'),
(8, 'Lucas Henrique Rocha', '888.777.666-55', '(61) 99000-7788', 'Rua dos Cravos, 210 - Etapa C'),
(9, 'Patrícia Almeida', '222.333.444-55', '(61) 98989-8989', 'Rua das Rosas, 99 - Jardim Ipanema'),
(10, 'Thiago Ribeiro', '666.555.444-33', '(61) 98888-7766', 'Av. Goiás, 150 - Centro');


-- Adicionando mais uma coluna na tabela cadastro_clientes:
ALTER TABLE cadastro_clientes ADD COLUMN status_cliente VARCHAR(15); 