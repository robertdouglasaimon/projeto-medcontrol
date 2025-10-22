export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-vendas");
    div.innerHTML = `
        <section class="vendas-cards">
            <div class="card-vendas  receita-total-dia">
                <p>
                    <i class="fas fa-box"></i>
                    Receita Total do Dia
                </p>
                <span class="total-receita-dia  valor-total-dia">R$ 20</span>
            </div>

            <div class="card-vendas vendas-realizadas">
                <p>
                    <i class="fas fa-box"></i>
                    Total Realizadas
                </p>
                <span class="total-vendas-realizadas  valor-vendas-realizadas">R$ 100</span>
            </div>

            <div class="card-vendas vendas-medias">
                <p>
                    <i class="fas fa-box"></i>
                    Médias  por Vendas 
                </p>
                <span class="total-vendas-medias  valor-vendas-medias">R$ 100</span>
            </div>
        </section>

        <section class="vendas-header">
            <h2> <i class="fas fa-money-check"></i> Vendas Realizadas </h2>

            <div class="vendas-pesquisa">
                <div class="input-wrapper">
                    <input type="text" id="busca-vendas" placeholder="Buscar Vendas" class="buscar-input-vendas">
                    
                    <button class="btn-novo-venda" id="btnNovaVenda">
                        + Novo Registro
                    </button>
                </div>
        </section>

        <section class="vendas-lista">
            <h2> <i class="fas fa-table"></i> Tabela de Vendas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Açoes</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Inserir aqui as vendas realizadas pelo banco de dados -->
                </tbody>
            </table>
        </section>
        
    

    `;

    // Script relacionado aos valores dos dashboard de vendas:
    setTimeout(() => {
        
    
    }, 0);

    return div;
}