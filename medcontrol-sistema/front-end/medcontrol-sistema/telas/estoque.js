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
                <span class="estoque-total total-estoque-valor">100</span>
            </div>

            <div class="card-estoque perdas-descarte">
                <p>
                    <i class="fas fa-box-open"></i>
                    Perdas e Descarte
                </p>
                <span class="descarte-perdas perdas-descarte-valor">300 caixas</span>
            </div>

            <div class="card-estoque nivel-estoque">
                <p>
                    <i class="fas fa-boxes"></i>
                    Nivel de Estoque
                </p>
                <span class="estoque-nivel nivel-estoque-valor">70</span>
            </div>

        </section>

        <section class="estoque-header">
            <h2> <i class="fas fa-chart-line"></i> Gráfico de Estoque </h2>
            <canvas id="graficoEstoque" width="120" height="50"></canvas>
        </section>
    `;

    // Alterador de estilo do dashboard de Nivel de Estoque de acordo com a criticidade do estoque (Se for menor que o 50, fica vermelho, se for maior ou igual fica verde):
    setTimeout(() => {
        const card = div.querySelector('.nivel-estoque');
        const valorSpan = div.querySelector('.nivel-estoque-valor');
        const valorEstoque = parseInt(valorSpan.textContent);

        const limiteCritico = 50;

        if (valorEstoque <= limiteCritico) {
            card.classList.add('critico');
        } else {
            card.classList.add('seguro');
        }
    }, 0);

    // Grafico de Estoque que está sendo atualizado em tempo real lá pelo back-end com a API do Flask (Python: app.py):
    setTimeout(() => {
    fetch('http://localhost:5000/grafico-estoque')
        .then(res => res.json())
        .then(data => {
        const ctx = document.getElementById('graficoEstoque').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['Entradas', 'Saídas', 'Perdas', 'Total'],
            datasets: [{
                label: 'Estoque',
                data: [data.produtos_entrados, data.produtos_saidos, data.produtos_perdidos, data.total_estoque],
                backgroundColor: ['#3498db','#f39c12', '#e74c3c', '#2ecc71']
            }]
            },
            options: {
            responsive: true,
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
    });





    }, 0);


    return div;
}