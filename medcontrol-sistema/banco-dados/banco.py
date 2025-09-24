import sqlite3

conexao = sqlite3.connect('banco-dados/farmacia.db')

cursor = conexao.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS cadastro_produtos (
        id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao VARCHAR(100) NOT NULL,
        fabricante VARCAR(100) NOT NULL,
        lote VARCHAR(100) NOT NULL,
        data_validade DATE NOT NULL,
        preco_venda DECIMAL(10, 2),
        qtd_estoque INTEGER,
        classificacao VARCHAR(100),
        nome_produto  VARCHAR(100)
    )
''')

conexao.commit()



cursor.execute('''
    CREATE TABLE IF NOT EXISTS controle_estoque (
        id_controle_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
        entrada_produto VARCHAR(100) NOT NULL,  
        saida_produto VARCHAR(100) NOT NULL,
        produto_validade DATE NOT NULL,
        perdas_descarte VARCHAR(100)
    )
''')

conexao.commit()



cursor.execute('''
    CREATE TABLE IF NOT EXISTS cadastro_clientes (    
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente VARCHAR(100) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        historico_compra VARCHAR(100) 
    )
''')

conexao.commit()




conexao.close()
