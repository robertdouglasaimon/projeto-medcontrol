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

    return div;
}