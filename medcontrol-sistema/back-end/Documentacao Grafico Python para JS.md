# 🧾 Documentação completa do app.py

### 📦 Arquivo: app.py
### 🔧 Finalidade: Criar uma API com Flask que consulta o banco de dados SQLite
### e retorna dados agregados sobre o estoque da farmácia.

<hr>

# 📚 Importações

### Flask: framework web leve para criar rotas HTTP
### jsonify: transforma dicionários Python em JSON para enviar ao front-end
### CORS: permite que o front-end (JavaScript) acesse a API sem bloqueio de segurança
### sqlite3: biblioteca nativa do Python para conectar e consultar bancos SQLite
### os: usado para montar caminhos absolutos de arquivos no sistema operacional

```bash
from flask import Flask, jsonify
from flask_cors import CORS 
import sqlite3
import os
```

# ------------------------------------------------------------
# 🚀 Inicialização da aplicação Flask
# ------------------------------------------------------------

### Cria uma instância da aplicação Flask
```bash
    app = Flask(__name__)
```

### Ativa o CORS para permitir que o front-end (em outro domínio ou porta)
### consiga fazer requisições para essa API sem ser bloqueado pelo navegador
```bash
CORS(app)
```

# ------------------------------------------------------------
# 🔗 Rota: /grafico-estoque
# ------------------------------------------------------------
### Essa rota é acessada pelo front-end via JavaScript para obter os dados
### que serão usados na renderização do gráfico de estoque.
### Ela consulta o banco de dados SQLite e retorna:
### - produtos_saidos: número de registros com saída registrada
### - produtos_perdidos: número de registros com perdas ou descarte
### - total_estoque: total de registros na tabela controle_estoque

```bash
@app.route('/grafico-estoque')
def grafico_estoque():
```
    
    # --------------------------------------------------------
    # 📁 Montagem do caminho absoluto do banco de dados
    # --------------------------------------------------------
    # BASE_DIR: diretório onde este arquivo (app.py) está localizado
    # db_path: caminho completo até o arquivo .db do SQLite

```bash
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, 'D:/ARQUIVOS DOS CURSOS DE PROGRAMACAO CIENCIA DE DADOS E MAIS (NUNCA APAGAR EM HIPOTESE NENHUMA)/projeto-medcontrol/medcontrol-sistema/banco-dados/farmacia.db')
```
   ```bash 
    try:
        # --------------------------------------------------------
        # 🔌 Conexão com o banco de dados SQLite
        # --------------------------------------------------------
        db = sqlite3.connect(db_path)

        # --------------------------------------------------------
        # 📊 Consulta SQL
        # --------------------------------------------------------
        # A consulta faz agregações condicionais:
        # - Conta quantos registros têm saída registrada (saida_produto não nulo)
        # - Conta quantos registros têm perdas/descarte (perdas_descarte não nulo)
        # - Conta o total de registros na tabela (COUNT(*))
        # COALESCE é usado para garantir que, se o resultado for NULL, ele vire 0
        cursor = db.execute("""
            SELECT 
                COALESCE(SUM(CASE WHEN saida_produto IS NOT NULL THEN 1 ELSE 0 END), 0) AS produtos_saidos,
                COALESCE(SUM(CASE WHEN perdas_descarte IS NOT NULL THEN 1 ELSE 0 END), 0) AS produtos_perdidos,
                COUNT(*) AS total_estoque 
            FROM controle_estoque;
        """)

        # --------------------------------------------------------
        # 📥 Captura do resultado da consulta
        # --------------------------------------------------------
        # fetchone(): pega a primeira (e única) linha do resultado
        row = cursor.fetchone()

        # --------------------------------------------------------
        # 🧠 Verificação de retorno
        # --------------------------------------------------------
        # Se a consulta não retornar nada (row = None), cria um dicionário com zeros
        # Caso contrário, extrai os valores da tupla e monta o dicionário de resposta
        if row is None:
            print("⚠️ Nenhum dado retornado pela consulta.")
            dados = {
                'produtos_saidos': 0,
                'produtos_perdidos': 0,
                'total_estoque': 0
            }
        else:
            print("✅ Resultado da consulta:", row)
            dados = {
                'produtos_saidos': row[0],
                'produtos_perdidos': row[1],
                'total_estoque': row[2]
            }

        # --------------------------------------------------------
        # 📤 Retorno da resposta em formato JSON
        # --------------------------------------------------------
        # jsonify transforma o dicionário em JSON para ser consumido pelo front-end
        return jsonify(dados)

    # --------------------------------------------------------
    # ❌ Tratamento de erros
    # --------------------------------------------------------
    # Se houver qualquer erro na conexão ou execução da consulta,
    # o erro é impresso no terminal e uma resposta JSON com o erro é enviada
    except Exception as e:
        print("❌ Erro ao acessar o banco:", e)
        return jsonify({"erro": str(e)})

# ------------------------------------------------------------
# 🏁 Execução da aplicação
# ------------------------------------------------------------
### Se este arquivo for executado diretamente, inicia o servidor Flask
### em modo debug (mostra erros no terminal e recarrega automaticamente)
if __name__ == '__main__':
    app.run(debug=True)
