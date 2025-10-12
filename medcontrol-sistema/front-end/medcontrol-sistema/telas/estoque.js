export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-estoque");
    div.innerHTML = `
        <section class="estoque-cards">

            <div class="card-estoque total-estoque">
                <p>
                    <i class="fas fa-warehouse"></i>
                    Total de Estoque
                </p>
                <span class="estoque-total total-estoque-valor"></span>
            </div>

            <div class="card-estoque perdas-descarte">
                <p>
                    <i class="fas fa-box-open"></i>
                    Perdas e Descarte
                </p>
                <span class="descarte-perdas perdas-descarte-valor"></span>
            </div>

            <div class="card-estoque nivel-estoque">
                <p>
                    <i class="fas fa-boxes"></i>
                    Nivel de Estoque
                </p>
                <span class="estoque-nivel nivel-estoque-valor"></span>
            </div>

        </section>

        <section class="estoque-header">
            <h2> <i class="fas fa-chart-line"></i> Gráfico de Estoque </h2>
            <canvas id="graficoEstoque" width="120" height="50"></canvas>
        </section>
    `;

    // Alterador de estilo do dashboard de Nivel de Estoque de acordo com a criticidade do estoque (Se for menor que o 50, fica vermelho, se for maior ou igual fica verde):
    setTimeout(() => {
        const card = document.querySelector('.nivel-estoque'); // direto no DOM
        const valorSpan = card.querySelector('.nivel-estoque-valor');
        const valorEstoque = parseFloat(valorSpan.textContent);

        const limiteCritico = 50.00;

        card.classList.remove('seguro', 'critico'); // limpa antes de aplicar

        if (!isNaN(valorEstoque)) {
            if (valorEstoque <= limiteCritico) {
                card.classList.add('critico');
            } else {
                card.classList.add('seguro');
            }
        } else {
            console.warn("⚠️ valorEstoque inválido:", valorSpan.textContent);
        }
    }, 500); // pequeno delay pra garantir que DOM atualizou

    // Scripts relativos aos valores dos dashboards -------------------------------------------//
    // Total de Estoque:
    setTimeout(() => {
        const totalEstoqueSpan = div.querySelector('.total-estoque-valor');

        fetch('http://localhost:3001/dashboard_estoque')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao obter o total de estoque.');
            }
        })
        .then((data) => {
            totalEstoqueSpan.textContent = data.total_estoque;
        })
        .catch((error) => {
            console.error(error, "❌ Erro ao obter o total de estoque.");
        });

    }, 0);

    // Perdas e Descarte:
    setTimeout(() => {
        const perdasDescarteSpan = div.querySelector('.perdas-descarte-valor');

        fetch('http://localhost:3001/dashboard_perdas_descarte')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao obter o total de perdas e descarte.');
            }
        })
        .then((data) => {
            perdasDescarteSpan.textContent = data.total_perdas_descarte;
        })
        .catch((error) => {
            console.error(error, "❌ Erro ao obter o total de perdas e descarte.");
        });

    }, 0);

    // Nivel de Estoque:
    setTimeout(() => {
        const nivelEstoqueSpan = div.querySelector('.nivel-estoque-valor');

        fetch('http://localhost:3001/nivel_estoque')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao obter o nivel de estoque.');
            }
        })
        .then((data) => {
            nivelEstoqueSpan.textContent = data.nivel_estoque  + " %";
        })
        .catch((error) => {
            console.error(error, "❌ Erro ao obter o nivel de estoque.");
        });

    }, 0);
    //-----------------------------------------------------------------------------------------//

    // Grafico de Estoque que está sendo atualizado em tempo real lá pelo back-end com a API do Flask (Python: app.py)
    setTimeout(() => {
    /*
    ===============================================================
    📄 Arquivo: estoque.js
    🎯 Finalidade: Consumir a API Flask que retorna múltiplos conjuntos
                de dados de estoque e renderizar um gráfico com Chart.js
    ===============================================================

    🧠 Visão geral:
    - A API agora retorna um JSON com dois blocos:
    - grafico_geral: dados agregados de entradas, saídas, perdas e total
    - grafico_perdas_detalhado: soma dos valores numéricos extraídos da coluna perdas_descarte
    - Este script acessa os dados de grafico_geral e renderiza o gráfico principal.
    ===============================================================
    */
    fetch('http://localhost:5000/grafico-estoque')
        .then(res => res.json()) // Converte a resposta em JSON
        .then(data => {
        /*
        ===============================================================
        🎯 Seleção do elemento <canvas> onde o gráfico será desenhado
        ---------------------------------------------------------------
        ctx: contexto 2D do canvas com id "graficoEstoque"
        Esse elemento deve existir no HTML:
        <canvas id="graficoEstoque"></canvas>
        ===============================================================
        */
        const ctx = document.getElementById('graficoEstoque').getContext('2d');

        /*
        ===============================================================
        📊 Criação do gráfico com Chart.js
        ---------------------------------------------------------------
        type: 'bar' → gráfico de barras verticais
        labels: categorias que aparecem no eixo X
        data: valores numéricos para cada categoria, extraídos de data.grafico_geral
        backgroundColor: cores das barras
        ===============================================================
        */
        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['Entradas', 'Saídas', 'Perdas', 'Total'],
            datasets: [{
                label: 'Estoque',
                data: [
                data.grafico_geral.produtos_entrada,
                data.grafico_saidas_detalhado.total_unidades_saidas,
                data.grafico_perdas_detalhado.total_unidades_perdidas,
                data.grafico_geral.total_estoque
                ],
                backgroundColor: ['#3498db','#f39c12', '#e74c3c', '#2ecc71']
            }]
            },
            options: {
            responsive: true, // adapta o gráfico ao tamanho da tela
            scales: {
                y: {
                beginAtZero: true,
                max: 5000 // 👈 Limita o eixo Y até 100 para que valores menores fiquem visíveis
                }
            }
            }
        });
        });
    }, 0); // Executa imediatamente após o carregamento



    return div;
}