from flask import Flask, jsonify
from flask_cors import CORS 
import sqlite3
import os

app = Flask(__name__)
CORS(app)

@app.route('/grafico-estoque')
def grafico_estoque():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, '../../medcontrol-sistema/banco-dados/farmacia.db') 
    
    print("E:\PROJETO DO GITHUB DESKTOP - NUNCA APAGAR\projeto-medcontrol\medcontrol-sistema\banco-dados\farmacia.db", db_path)


    try:
        db = sqlite3.connect(db_path)

        # -------------------------------
        # 📊 Consulta 1 — Dados gerais de estoque
        # -------------------------------
        cursor1 = db.execute("""
            SELECT 
                SUM(qtd_entrada) AS total_entrada,
                SUM(saida_produto) AS produtos_saida, 
                SUM(perdas_descarte) AS produtos_perdidos, 
                SUM(qtd_estoque) AS total_estoque
            FROM controle_estoque;
        """)
        row1 = cursor1.fetchone()

        dados_estoque_grafico1 = {
            'produtos_entrada': row1[0] if row1 else 0,
            'produtos_saida': row1[1] if row1 else 0,
            'produtos_perdidos': row1[2] if row1 else 0,
            'total_estoque': row1[3] if row1 else 0
        }

        # -------------------------------
        # 📊 Consulta 2 — Soma dos valores numéricos em perdas_descarte
        # -------------------------------
        cursor2 = db.execute("""
            SELECT 
                SUM(
                    CAST(
                        CASE 
                            WHEN INSTR(perdas_descarte, ' ') > 0 
                            THEN SUBSTR(perdas_descarte, 1, INSTR(perdas_descarte, ' ') - 1)
                            ELSE perdas_descarte
                        END AS INTEGER
                    )
                ) AS total_unidades_perdidas
            FROM controle_estoque
            WHERE perdas_descarte IS NOT NULL;
        """)
        row2 = cursor2.fetchone()

        dados_estoque_grafico2 = {
            'total_unidades_perdidas': row2[0] if row2 and row2[0] is not None else 0
        }
        
        # -------------------------------
        # 📊 Consulta 3 — Soma dos valores numéricos em saida_produto
        # -------------------------------
        cursor3 = db.execute("""
            SELECT 
                SUM(
                    CAST(
                        SUBSTR(saida_produto, 1, INSTR(saida_produto, ' ') - 1)
                        AS INTEGER
                    )
                ) AS total_unidades_saidas
            FROM controle_estoque
            WHERE saida_produto IS NOT NULL;
        """)
        row3 = cursor3.fetchone()

        dados_estoque_grafico3 = {
            'total_unidades_saidas': row3[0] if row3 and row3[0] is not None else 0
        }   
        
        # -------------------------------
        # 📊 Consulta 4 — total de Estoque — Soma dos valores da coluna qtd_estoque 
        # -------------------------------
        cursor4 = db.execute("""
            SELECT 
                SUM(qtd_estoque) AS total_estoque
            FROM controle_estoque;
        """)
        row4 = cursor4.fetchone()

        dados_estoque_grafico4 = {
            'total_estoque': row4[0] if row4 else 0
        }

        # -------------------------------
        # 📊 Consulta 5 — #  5 mais vendidos
        # -------------------------------
        cursor5 = db.execute("""
            SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido 
                FROM cadastro_produtos 
                GROUP BY nome_produto 
                ORDER BY total_vendido DESC 
            LIMIT 5
        """)
        row5 = cursor5.fetchall()

        dados_estoque_grafico5 = {
            'labels': [row[0] for row in row5],
            'valores': [row[1] for row in row5]
        }

        # -------------------------------
        # 📊 Consulta 6 —  5 menos vendidos
        # -------------------------------
        cursor6 = db.execute("""
            SELECT nome_produto, SUM(quantidade_vendida) AS total_vendido 
                FROM cadastro_produtos 
                GROUP BY nome_produto 
                ORDER BY total_vendido ASC 
            LIMIT 5
        """)
        row6 = cursor6.fetchall()

        dados_estoque_grafico6 = {
            'labels': [row[0] for row in row6],
            'valores': [row[1] for row in row6]
        }


        # -------------------------------
        # 📊 Consulta 7 —  Lista de lote e validade dos produtos mais próximos de vencer:
        # -------------------------------
        cursor7 = db.execute("""
            SELECT lote, data_validade, nome_produto FROM cadastro_produtos
            WHERE JULIANDAY(data_validade) - JULIANDAY('now') <= 30
            ORDER BY data_validade ASC;
        """)
        row7 = cursor7.fetchall()

        dados_estoque_grafico7 = {
            'lote': [row[0] for row in row7],
            'validade': [row[1] for row in row7],
            'nome_produto': [row[2] for row in row7]
        }




        # -------------------------------
        # 🔗 Chamando as consultas na resposta final (É obrigatoria essa chamada, sem ela não roda as consultas)
        # -------------------------------
        resposta_final = {
            # Relacionados a tela de controle de estoque:
            'grafico_geral': dados_estoque_grafico1,
            'grafico_perdas_detalhado': dados_estoque_grafico2,
            'grafico_saidas_detalhado': dados_estoque_grafico3,
            'grafico_nivel_estoque': dados_estoque_grafico4,
            
            # Relacionados a tela de relatórios:
            'produto_mais_vendido': dados_estoque_grafico5,
            'produto_menos_vendido': dados_estoque_grafico6,
            'lote_validade': dados_estoque_grafico7
        }

        return jsonify(resposta_final)

    except Exception as e:
        print("❌ Erro ao acessar o banco:", e)
        return jsonify({"erro": str(e)})

if __name__ == '__main__':
    app.run(debug=True)

