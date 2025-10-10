from flask import Flask, jsonify
from flask_cors import CORS 
import sqlite3
import os

app = Flask(__name__)
CORS(app)

@app.route('/grafico-estoque')
def grafico_estoque():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, 'D:/ARQUIVOS DOS CURSOS DE PROGRAMACAO CIENCIA DE DADOS E MAIS (NUNCA APAGAR EM HIPOTESE NENHUMA)/projeto-medcontrol/medcontrol-sistema/banco-dados/farmacia.db') 
    
    try:
        db = sqlite3.connect(db_path)
        cursor = db.execute("""
            SELECT 
                SUM(CASE WHEN saida_produto IS NOT NULL THEN 1 ELSE 0 END) AS produtos_saidos, 
                SUM(CASE WHEN perdas_descarte IS NOT NULL THEN 1 ELSE 0 END) AS produtos_perdidos, 
                COUNT(entrada_produto) AS produtos_entrados,
                COUNT(*) AS total_estoque 
            FROM controle_estoque;
        """)
              
        
        row = cursor.fetchone()

        if row is None:
            print("⚠️ Nenhum dado retornado pela consulta.")
            dados_estoque_grafico1 = {
                'produtos_entrados': 0,
                'produtos_saidos': 0,
                'produtos_perdidos': 0,
                'total_estoque': 0
            }
        else:
            print("✅ Resultado da consulta:", row)
            dados_estoque_grafico1 = {
                'produtos_entrados': row[0],
                'produtos_saidos': row[1],
                'produtos_perdidos': row[2],
                'total_estoque': row[3]
            }
            
        return jsonify(dados_estoque_grafico1)


    except Exception as e:
        print("❌ Erro ao acessar o banco:", e)
        return jsonify({"erro": str(e)})
    

if __name__ == '__main__':
    app.run(debug=True)

