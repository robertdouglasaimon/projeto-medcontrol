import sqlite3

conexao = sqlite3.connect('medcontrol-sistema/banco-dados/farmacia.db')

cursor = conexao.cursor()

# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS cadastro_produtos (
#         id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
#         descricao VARCHAR(100) NOT NULL,
#         fabricante VARCAR(100) NOT NULL,
#         lote VARCHAR(100) NOT NULL,
#         data_validade DATE NOT NULL,
#         preco_venda DECIMAL(10, 2),
#         qtd_estoque INTEGER,
#         classificacao VARCHAR(100),
#         nome_produto  VARCHAR(100)
#     )
# ''')

# conexao.commit()



# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS controle_estoque (
#         id_controle_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
#         entrada_produto VARCHAR(100) NOT NULL,  
#         saida_produto VARCHAR(100) NOT NULL,
#         produto_validade DATE NOT NULL,
#         perdas_descarte VARCHAR(100)
#     )
# ''')

# conexao.commit()



# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS cadastro_clientes (    
#         id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
#         nome_cliente VARCHAR(100) NOT NULL,
#         cpf VARCHAR(11) NOT NULL,
#         telefone VARCHAR(20) NOT NULL,
#         historico_compra VARCHAR(100) 
#     )
# ''')

# conexao.commit()

# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS vendas (
#         id_vendas INTEGER PRIMARY KEY AUTOINCREMENT,
#         produtos_vendidos VARCHAR(100) NOT NULL,
#         data_venda DATE NOT NULL, 
#         registro_receita_medica VARCHAR(100) NOT NULL,
#         cupom_fiscal VARCHAR(100) NOT NULL, 
#         id_cliente INTEGER,
#         id_produto_estoque INTEGER,
                  
#         foreign key (id_cliente) references cadastro_clientes(id_cliente),
#         foreign key (id_produto_estoque) references controle_estoque(id_controle_estoque)
#     )
# ''')

# conexao.commit()

# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS cadastro_fornecedores (
#         id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
#         nome_fornecedor VARCHAR(100) NOT NULL,
#         cnpj VARCHAR(14) NOT NULL,
#         contato VARCHAR(20) NOT NULL
#     )
# ''')

# conexao.commit()

# cursor.execute (''' 
#     CREATE TABLE IF NOT EXISTS historico_fornecimento (
#         id_historico INTEGER PRIMARY KEY AUTOINCREMENT,
#         data_fornecimento DATE NOT NULL,
#         produto VARCHAR(100) NOT NULL,
#         quantidade INTEGER NOT NULL,
#         observacao VARCHAR(255),
                      
#         id_fornecedor INTEGER,
        
#         foreign key (id_fornecedor) references cadastro_fornecedores(id_fornecedor)                   
#     )
# ''')

# conexao.commit()




# Consulta para verificar se a tabela foi criada corretamente.
# cursor.execute('SELECT * FROM cadastro_clientes;')
# resultados = cursor.fetchall()
# print(resultados)


conexao.close()
