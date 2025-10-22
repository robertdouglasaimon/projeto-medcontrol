export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-vendas");
    div.innerHTML = `
        <section class="vendas-cards">
            <div class="card-vendas  receita-total-dia">
                <p>
                    <i class="fas fa-box"></i>
                    Total de Vendas
                </p>
                <span class="total-receita-dia  valor-total-dia"></span>
            </div>

            <div class="card-vendas vendas-realizadas">
                <p>
                    <i class="fas fa-box"></i>
                    Total Vendas Realizadas
                </p>
                <span class="total-vendas-realizadas  valor-vendas-realizadas"></span>
            </div>

            <div class="card-vendas vendas-medias">
                <p>
                    <i class="fas fa-box"></i>
                    Médias por Vendas 
                </p>
                <span class="total-vendas-medias  valor-vendas-medias"></span>
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
                        <th>Produtos Vendidos</th>
                        <th>Valor da Venda</th>
                        <th>Valor Médio da Venda</th>
                        <th>Data da Venda</th>
                        <th>Açoes</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Inserir aqui as vendas realizadas pelo banco de dados -->
                </tbody>
            </table>
        </section>
        
    

    `;

    // Script relacionado aos valores dos dashboard de vendas------------------------------------------------------
    setTimeout(() => {

        // Total de vendas realizadas:
        const totalReceitaDia = document.querySelector(".valor-total-dia");
        fetch("http://localhost:3001/dashboard_vendas")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar vendas.");
            }
        })
        .then((data) => {
            totalReceitaDia.textContent = data.total_vendas;
        })
        .catch((error) => {
            console.error("Erro ao buscar vendas:", error);
            totalReceitaDia.textContent = "Erro ao buscar vendas.";
        })  

        // Total de vendas realizadas:
        const totalVendasRealizadas = document.querySelector(".valor-vendas-realizadas");
        fetch("http://localhost:3001/dashboard_vendas")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar vendas.");
            }
        })
        .then((data) => {
            totalVendasRealizadas.textContent = data.vendas_realizadas;
        })
        .catch((error) => {
            console.error("Erro ao buscar vendas:", error);
            totalVendasRealizadas.textContent = "Erro ao buscar vendas.";
        })  

        // Médias por vendas:
        const totalVendasMedias = document.querySelector(".valor-vendas-medias");
        fetch("http://localhost:3001/dashboard_vendas")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar vendas.");
            }
        })
        .then((data) => {
            totalVendasMedias.textContent = data.vendas_medias;
        })
        .catch((error) => {
            console.error("Erro ao buscar vendas:", error);
            totalVendasMedias.textContent = "Erro ao buscar vendas.";
        })

    
    }, 0);


    // Script relacionado a barra de busca por nome do produto vendido ou pelo valor da venda:
    setTimeout(() => {
        const inputBusca = document.querySelector(".buscar-input-vendas");
        inputBusca.addEventListener("input", () => {
            const filtro = inputBusca.value.toLowerCase();
            const linhas = document.querySelectorAll(".vendas-lista table tbody tr");
            linhas.forEach((linha) => {
                const produtosVendidos = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
                const valorVenda = linha.querySelector("td:nth-child(2)").textContent.toLowerCase();
                const valorMedio = linha.querySelector("td:nth-child(3)").textContent.toLowerCase();
                if (produtosVendidos.includes(filtro) || valorVenda.includes(filtro) || valorMedio.includes(filtro)) {
                    linha.style.display = "";
                } else {
                    linha.style.display = "none";
                }
            })
        })  
    }, 0);


    // Script para inserir os dados do banco de dados na tabela de vendas :
    setTimeout(() => {
        fetch("http://localhost:3001/tabela_vendas")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar vendas.");
            }
        })
        .then((data) => {
            const tbody = document.querySelector(".vendas-lista table tbody");
            data.forEach((venda) => {
                const row = document.createElement("tr");
                const id = venda.id_vendas;
                row.innerHTML = `
                    <td>${venda.produtos_vendidos}</td>
                    <td>R$ ${venda.valor_venda}</td>
                    <td>R$ ${venda.vendas_medias}</td>
                    <td>${venda.data_venda}</td>
                    <td>
                        <button class="btn btn-warning  btn-editar-venda" data-id="${id}">Editar</button>
                        <button class="btn btn-danger  btn-excluir-venda" data-id="${id}">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Erro ao buscar vendas:", error);
        })
    })


    return div;
}