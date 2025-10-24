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

        <!-- Modal do botão 'Novo Registro' -->>
        <div id="modalNovoVenda" class="modal hidden">
            <div class="modal-content">
                <span class="fechar-modal" id="fecharModal">&times;</span>

                <h3>Cadastrar Nova Venda</h3>

                <!-- Formulário de cadastro aqui -->
                <form class="cadastro-venda-modal">
                    <input type="text" name="produtos_vendidos" placeholder="Produto vendido" required />
                    <input type="text" name="vendas_medias" placeholder="Valor da venda" required />
                    <input type="date" name="data_venda" required />
                    <input type="text" name="registro_receita_medica" placeholder="Receita médica para a venda" required />
                    <input type="text" name="valor_venda" placeholder="Valor médio da venda" required />                                      
                    <input type="text" name="cupom_fiscal" placeholder="Cupom fiscal" required />

                    <button type="submit" class="salvar-modal">Salvar</button>
                    <button type="button" class="cancelar-modal">Cancelar</button>
                </form>

            </div>
        </div>


        <section class="vendas-lista">
            <h2> <i class="fas fa-table"></i> Tabela de Vendas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Produtos Vendidos</th>
                        <th>Valor da Venda</th>
                        <th>Valor Médio da Venda</th>
                        <th>Cumpom Fiscal</th>
                        <th>Data da Venda</th>
                        <th>Ações</th>
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

                    row.innerHTML = `
                        <td>${venda.produtos_vendidos}</td>
                        <td>R$ ${venda.valor_venda}</td>
                        <td>R$ ${venda.vendas_medias}</td>
                        <td>${venda.cupom_fiscal}</td>
                        <td>${venda.data_venda}</td>
                        <td>
                            <button class="btn btn-warning btn-editar-venda">Editar</button>
                            <button 
                                class="btn btn-danger btn-excluir-venda"
                                data-id-venda="${venda.id_vendas}"
                            >Excluir</button>
                        </td>
                    `;

                
                    tbody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error("Erro ao buscar vendas:", error);
            });
    },0);


    // Script para cadastrar um novo cliente pelo botão e modal "+ Nova Venda":
    setTimeout(() => {
        const form = document.querySelector(".cadastro-venda-modal");
        const table = document.querySelector(".vendas-lista table tbody");
        const modal = document.querySelector("#modalNovoVenda");     

        const btnNovoVenda = document.querySelector("#btnNovaVenda");
        const fecharModal = document.querySelector("#fecharModal");
        const btnCancelar = document.querySelector(".cancelar-modal");

        // Abrir o modal
        if (btnNovoVenda && modal) {
            btnNovoVenda.addEventListener("click", () => {
                modal.classList.remove("hidden");
            });
        }

        // Fechar o modal pelo ícone ×
        if (fecharModal && modal) {
            fecharModal.addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        }

        // Fechar o modal pelo botão cancelar
        if (btnCancelar && modal) {
            btnCancelar.addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        }

        // Fechar o modal ao clicar fora dele
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.add("hidden");
            }
        });

    // ESQUEMA para pegar os IDs automaticamente de cliente e estoque para não dar conflito no UPDATE lá no front. 
    // Os ids de cliente e estoque devem ser pegos automaticamente no back-end e passados para o front-end só que 
    // sem aparecer na tela de cadastro de vendas. Tudo vai acontecer pelo back-end, mas os ids serao passados pelo 
    // front-end:
        let id_cliente = null;
        let id_controle_estoque = null;

        btnNovoVenda.addEventListener("click", async () => {
        modal.classList.remove("hidden");

        // Busca os IDs automaticamente
            try {
                const clienteRes = await fetch("http://localhost:3001/cliente-ultimo");
                const clienteData = await clienteRes.json();
                id_cliente = clienteData.id_cliente;

                const estoqueRes = await fetch("http://localhost:3001/estoque-ultimo");
                const estoqueData = await estoqueRes.json();
                id_controle_estoque = estoqueData.id_controle_estoque;
            } catch (err) {
                console.error("Erro ao buscar IDs automáticos:", err);
            }
        });
    // Fim do ESQUEMA --------------------------------------------------------------------------------------------//

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const produtos_vendidos = form.querySelector("input[name='produtos_vendidos']").value.trim();
            const vendas_medias = form.querySelector("input[name='vendas_medias']").value.trim();
            const data_venda = form.querySelector("input[name='data_venda']").value.trim();
            const registro_receita_medica = form.querySelector("input[name='registro_receita_medica']").value.trim();
            const valor_venda = form.querySelector("input[name='valor_venda']").value.trim();
            const cupom_fiscal = form.querySelector("input[name='cupom_fiscal']").value.trim();

             // ✅ Validações:
             if (!produtos_vendidos || !vendas_medias || !data_venda || !registro_receita_medica || !valor_venda || !cupom_fiscal) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            // Verifica se o campo da data de validade foi preenchido corretamente:
            if (data_venda && !/^\d{4}-\d{2}-\d{2}$/.test(data_venda)) {
            alert("Por favor, insira a data de validade no formato AAAA-MM-DD.");
            return;
            }

            try {
                const resposta = await fetch("http://localhost:3001/cadastrar_venda", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        produtos_vendidos,
                        vendas_medias,
                        data_venda,
                        registro_receita_medica,
                        valor_venda,
                        cupom_fiscal,

                        id_cliente,
                        id_controle_estoque
                    })
                });

                const data = await resposta.json();
                console.log("Resposta do backend:", resposta);
                console.log("Dados recebidos:", data);

                
                // Verifica se a resposta foi negativa
                if (!resposta.ok) {
                    throw new Error(data.message || data.response || "Erro ao cadastrar venda.");
                }

                alert(`✅ ${data.mensagem}`);
                form.reset();
                modal.classList.add("hidden");
                location.reload();

                // ✅ Só adiciona na tabela se deu certo
                const novaLinha = document.createElement("tr");
                novaLinha.innerHTML = `
                <td>${produtos_vendidos}</td>
                <td>R$ ${valor_venda}</td>
                <td>R$ ${vendas_medias}</td>
                <td>${data_venda}</td>
                <td>
                    <button class="btn btn-warning  btn-editar-venda">Editar</button>
                    <button class="btn btn-danger  btn-excluir-venda">Excluir</button>
                </td>
                `;
                table.appendChild(novaLinha);

            } catch (error) {
                console.error("Erro ao cadastrar venda:", error);
            }         
        });
    }, 0);


    // Excluindo os itens da tabela pelo front através do botão excluir (modificando no banco de dados as informações das vendas):
    setTimeout(() => {
        const tbody = document.querySelector("tbody");

        tbody.addEventListener("click", async (event) => {
            const btn = event.target;

            if (!btn.classList.contains("btn-excluir-venda")) {
                console.log("Não clicou no botão de excluir");
                return;
            }

            console.log("Clicou no botão de excluir, iniciando processo de exclusão...");

            // ✅ Pega o ID direto do botão
            const id_vendas = btn.getAttribute("data-id-venda");
            console.log("ID da venda a excluir:", id_vendas);

            if (!id_vendas) {
                console.error("❌ ID da venda está undefined ou vazio");
                return;
            }

            const confirmacao = confirm("Tem certeza que deseja excluir esse registro?");
            if (!confirmacao) return;

            try {
                const resposta = await fetch(`http://localhost:3001/deletar_venda/${id_vendas}`, {
                    method: "DELETE"
                });

                console.log("Status da resposta:", resposta.status);

                if (!resposta.ok) {
                    throw new Error("Erro ao excluir venda.");
                }

                const data = await resposta.json();
                console.log("Resposta do servidor:", data);

                // ✅ Remove a linha da tabela
                const row = btn.closest("tr");
                row.remove();
                alert(`✅ ${data.mensagem}`);
            } catch (error) {
                console.error("❌ Erro ao excluir venda:", error);
                alert(`❌ ${error.message}`);
            }
        });
    }, 0);



    return div;
}