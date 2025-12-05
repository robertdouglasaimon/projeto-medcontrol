export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-vendas");
    div.innerHTML = `
        <section class="vendas-cards">
            <div class="card-vendas  receita-total-dia">
                <i class="fas fa-box"></i>
                <p>
                    Total de Vendas
                </p>
                <span class="total-receita-dia  valor-total-dia"></span>
            </div>

            <div class="card-vendas vendas-realizadas">
                 <i class="fas fa-box"></i>
                <p>
                    Total Vendas Realizadas
                </p>
                <span class="total-vendas-realizadas  valor-vendas-realizadas"></span>
            </div>

            <div class="card-vendas vendas-medias">
                <i class="fas fa-box"></i>
                <p>

                    Médias por Vendas 
                </p>
                <span class="total-vendas-medias  valor-vendas-medias"></span>
            </div>
        </section>

        <section class="vendas-header">
            <div class="vendas-pesquisa">
                <div class="input-wrapper">
                    <input type="text" id="busca-vendas" placeholder="Buscar Vendas" class="buscar-input-vendas">
                    <button class="btn-novo-venda" id="btnNovaVenda">
                        + Novo Registro
                    </button>
                </div>
        </section>

        <!-- Modal do botão 'Novo Registro' -->
        <div id="modalNovoVenda" class="modal hidden">
            <div class="modal-content">
                <span class="fechar-modal" id="fecharModal">&times;</span>

                <h3>Cadastrar Nova Venda</h3>

                <!-- Formulário de cadastro aqui -->
                <form class="cadastro-venda-modal">
                    <input type="text" name="produtos_vendidos" placeholder="Produto vendido" required />
                    <input type="text" name="vendas_medias" placeholder="Valor da venda" required />
                    <input type="text" name="valor_venda" placeholder="Valor médio da venda" required />
                    <input type="text" name="cupom_fiscal" placeholder="Cupom fiscal" required />
                    <input type="date" name="data_venda" required />  

                    <button type="submit" class="salvar-modal">Salvar</button>
                    <button type="button" class="cancelar-modal">Cancelar</button>
                </form>
            </div>
        </div>

        <section class="vendas-lista">
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
    // Elementos do dashboard
    const totalReceitaDia = document.querySelector(".valor-total-dia");
    const totalVendasRealizadas = document.querySelector(".valor-vendas-realizadas");
    const totalVendasMedias = document.querySelector(".valor-vendas-medias");


    // Total de receita do dia
    const endpointsReceita = [
        "https://medcontrol-backend.onrender.com/dashboard_vendas",
        "http://localhost:3001/dashboard_vendas"
    ];

    async function buscarReceitaDia() {
        for (const url of endpointsReceita) {
        try {
            const resposta = await fetch(url);
            if (resposta.ok) {
            const data = await resposta.json();
            totalReceitaDia.textContent = data.total_vendas;
            return;
            } else {
            console.warn(`⚠️ Falha em ${url}`);
            }
        } catch (error) {
            console.error(`❌ Erro em ${url}:`, error.message);
        }
        }
        totalReceitaDia.textContent = "Erro ao buscar vendas.";
    }
    buscarReceitaDia();


    // Total de vendas realizadas
    const endpointsRealizadas = [
        "https://medcontrol-backend.onrender.com/dashboard_vendas",
        "http://localhost:3001/dashboard_vendas"
    ];

    async function buscarVendasRealizadas() {
        for (const url of endpointsRealizadas) {
        try {
            const resposta = await fetch(url);
            if (resposta.ok) {
            const data = await resposta.json();
            totalVendasRealizadas.textContent = data.vendas_realizadas;
            return;
            } else {
            console.warn(`⚠️ Falha em ${url}`);
            }
        } catch (error) {
            console.error(`❌ Erro em ${url}:`, error.message);
        }
        }
        totalVendasRealizadas.textContent = "Erro ao buscar vendas realizadas.";
    }
    buscarVendasRealizadas();

    // Vendas médias
    const endpointsMedias = [
        "https://medcontrol-backend.onrender.com/dashboard_vendas",
        "http://localhost:3001/dashboard_vendas"
    ];

    async function buscarVendasMedias() {
        for (const url of endpointsMedias) {
        try {
            const resposta = await fetch(url);
            if (resposta.ok) {
            const data = await resposta.json();
            totalVendasMedias.textContent = data.vendas_medias;
            return;
            } else {
            console.warn(`⚠️ Falha em ${url}`);
            }
        } catch (error) {
            console.error(`❌ Erro em ${url}:`, error.message);
        }
        }
        totalVendasMedias.textContent = "Erro ao buscar vendas médias.";
    }
    buscarVendasMedias();
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
        // Lista de possíveis endpoints (online primeiro, depois local)
        const endpoints = [
            "https://medcontrol-backend.onrender.com/tabela_vendas", // online
            "http://localhost:3001/tabela_vendas"                    // local
        ];

        let sucesso = false;

        for (const url of endpoints) {
            try {
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            console.warn(`⚠️ Falha em ${url}`);
                        }
                    })
                    .then((data) => {
                        if (data) {
                            const tbody = document.querySelector(".vendas-lista table tbody");

                            data.forEach((venda) => {
                                const row = document.createElement("tr");
                                row.setAttribute("data-id-venda", venda.id_vendas); 
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
                            sucesso = true;
                        }
                    })
                    .catch((error) => {
                        console.error(`❌ Erro em ${url}:`, error.message);
                    });
                if (sucesso) break; // não precisa tentar os outros
            } catch (error) {
                console.error("❌ Erro ao buscar vendas:", error.message);
            }
        }

        if (!sucesso) {
            console.error("❌ Nenhum servidor respondeu para tabela_vendas.");
        }
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

        // ESQUEMA para pegar os IDs automaticamente de cliente e estoque
        let id_cliente = null;
        let id_controle_estoque = null;

        btnNovoVenda.addEventListener("click", async () => {
            modal.classList.remove("hidden");

            // Lista de endpoints para buscar IDs
            const clienteEndpoints = [
                "https://medcontrol-backend.onrender.com/cliente-ultimo",
                "http://localhost:3001/cliente-ultimo"
            ];
            const estoqueEndpoints = [
                "https://medcontrol-backend.onrender.com/estoque-ultimo",
                "http://localhost:3001/estoque-ultimo"
            ];

            try {
                for (const url of clienteEndpoints) {
                    try {
                        const clienteRes = await fetch(url);
                        if (clienteRes.ok) {
                            const clienteData = await clienteRes.json();
                            id_cliente = clienteData.id_cliente;
                            break;
                        }
                    } catch (err) {
                        console.warn(`⚠️ Falha ao buscar cliente em ${url}`);
                    }
                }

                for (const url of estoqueEndpoints) {
                    try {
                        const estoqueRes = await fetch(url);
                        if (estoqueRes.ok) {
                            const estoqueData = await estoqueRes.json();
                            id_controle_estoque = estoqueData.id_controle_estoque;
                            break;
                        }
                    } catch (err) {
                        console.warn(`⚠️ Falha ao buscar estoque em ${url}`);
                    }
                }
            } catch (err) {
                console.error("❌ Erro ao buscar IDs automáticos:", err);
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
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            if (data_venda && !/^\d{4}-\d{2}-\d{2}$/.test(data_venda)) {
                alert("Por favor, insira a data de validade no formato AAAA-MM-DD.");
                return;
            }

            // Lista de endpoints para cadastrar venda
            const endpoints = [
                "https://medcontrol-backend.onrender.com/cadastrar_venda",
                "http://localhost:3001/cadastrar_venda"
            ];

            let sucesso = false;

            for (const url of endpoints) {
                try {
                    const resposta = await fetch(url, {
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

                    if (!resposta.ok) {
                        console.warn(`⚠️ Falha em ${url}`);
                        continue; // tenta o próximo endpoint
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
                            <button class="btn btn-warning btn-editar-venda">Editar</button>
                            <button class="btn btn-danger btn-excluir-venda">Excluir</button>
                        </td>
                    `;
                    table.appendChild(novaLinha);

                    sucesso = true;
                    break; // não precisa tentar os outros
                } catch (error) {
                    console.error(`❌ Erro ao cadastrar venda em ${url}:`, error.message);
                }
            }

            if (!sucesso) {
                alert("❌ Erro ao cadastrar venda (nenhum servidor respondeu).");
            }
        });
    }, 0);

    // Editar itens da tabela pelo front：
    setTimeout(() => {
        const tbody = document.querySelector("tbody");

        tbody.addEventListener("click", async (event) => {
            const btn = event.target;

            if (!btn.classList.contains("btn-editar-venda")) {
                console.log("Não clicou no botão de editar");
                return;
            } else {
                console.log("Clicou no botão de editar");
                btn.classList.add("hidden");
            }

            const row = btn.closest("tr");
            const id_vendas = row.getAttribute("data-id-venda");
            console.log("ID da venda a editar:", id_vendas);

            const produtos_vendidos = row.querySelector("td:nth-child(1)").textContent;
            const valor_venda = row.querySelector("td:nth-child(2)").textContent.replace("R$ ", "");
            const vendas_medias = row.querySelector("td:nth-child(3)").textContent.replace("R$ ", "");
            const cupom_fiscal = row.querySelector("td:nth-child(4)").textContent;
            const data_venda = row.querySelector("td:nth-child(5)").textContent;

            const modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
              <div class="modal-editar-content">
                    <h2>Editar Venda</h2>
                    <form class="cadastro-venda-modal-editar">
                        <label for="produtos_vendidos">Produtos Vendidos:</label>
                        <input type="text" name="produtos_vendidos" value="${produtos_vendidos}" required>
                        <label for="valor_venda">Valor da Venda:</label>
                        <input type="text" name="valor_venda" value="${valor_venda}" required>
                        <label for="vendas_medias">Vendas Médias:</label>
                        <input type="text" name="vendas_medias" value="${vendas_medias}" required>
                        <label for="cupom_fiscal">Cupom Fiscal:</label>
                        <input type="text" name="cupom_fiscal" value="${cupom_fiscal}" required>
                        <label for="data_venda">Data da Venda:</label>
                        <input type="date" name="data_venda" value="${data_venda}" required>

                        <button type="submit" class="btn salvar-modal">Salvar</button>
                        <button class="btn close-modal">Fechar</button>
                    </form>
              </div> 
            `;

            document.body.appendChild(modal); // ✅ modal agora está no DOM!
            modal.addEventListener("click", (event) => {
                if (event.target.classList.contains("modal") || event.target.classList.contains("close-modal")) {
                    modal.remove();
                    btn.classList.remove("hidden");
                }
            });

            // Script para salvar a edição da venda:
            const form = modal.querySelector(".cadastro-venda-modal-editar");
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                console.log("🧪 Salvando edição da venda...");

                const produtos_vendidos = form.querySelector("input[name='produtos_vendidos']").value.trim();
                const valor_venda = form.querySelector("input[name='valor_venda']").value.trim();
                const vendas_medias = form.querySelector("input[name='vendas_medias']").value.trim();
                const cupom_fiscal = form.querySelector("input[name='cupom_fiscal']").value.trim();
                const data_venda = form.querySelector("input[name='data_venda']").value.trim();

                if (!produtos_vendidos || !valor_venda || !vendas_medias || !cupom_fiscal || !data_venda) {
                    alert("Todos os campos devem ser preenchidos!");
                    return;
                }

                try {
                    // Busca IDs automáticos para evitar erro de chave estrangeira
                    const clienteEndpoints = [
                        "https://medcontrol-backend.onrender.com/cliente-ultimo",
                        "http://localhost:3001/cliente-ultimo"
                    ];
                    const estoqueEndpoints = [
                        "https://medcontrol-backend.onrender.com/estoque-ultimo",
                        "http://localhost:3001/estoque-ultimo"
                    ];

                    let id_cliente = null;
                    let id_controle_estoque = null;

                    for (const url of clienteEndpoints) {
                        try {
                            const clienteRes = await fetch(url);
                            if (clienteRes.ok) {
                                const clienteData = await clienteRes.json();
                                id_cliente = clienteData.id_cliente;
                                break;
                            }
                        } catch (err) {
                            console.warn(`⚠️ Falha ao buscar cliente em ${url}`);
                        }
                    }

                    for (const url of estoqueEndpoints) {
                        try {
                            const estoqueRes = await fetch(url);
                            if (estoqueRes.ok) {
                                const estoqueData = await estoqueRes.json();
                                id_controle_estoque = estoqueData.id_controle_estoque;
                                break;
                            }
                        } catch (err) {
                            console.warn(`⚠️ Falha ao buscar estoque em ${url}`);
                        }
                    }

                    // Lista de endpoints para editar venda
                    const endpoints = [
                        `https://medcontrol-backend.onrender.com/editar_venda/${id_vendas}`,
                        `http://localhost:3001/editar_venda/${id_vendas}`
                    ];

                    let sucesso = false;

                    for (const url of endpoints) {
                        try {
                            const resposta = await fetch(url, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    produtos_vendidos,
                                    valor_venda,
                                    vendas_medias,
                                    cupom_fiscal,
                                    data_venda,
                                    id_vendas,
                                    id_cliente,
                                    id_controle_estoque
                                })
                            });

                            if (!resposta.ok) {
                                console.warn(`⚠️ Falha em ${url}`);
                                continue;
                            }

                            const data = await resposta.json();
                            row.querySelector("td:nth-child(1)").textContent = data.produtos_vendidos;
                            row.querySelector("td:nth-child(2)").textContent = `R$ ${valor_venda}`;
                            row.querySelector("td:nth-child(3)").textContent = `R$ ${vendas_medias}`;
                            row.querySelector("td:nth-child(4)").textContent = data.cupom_fiscal;
                            row.querySelector("td:nth-child(5)").textContent = data.data_venda;

                            alert(`✅ ${data.mensagem}`);
                            sucesso = true;
                            break;
                        } catch (error) {
                            console.error(`❌ Erro ao editar venda em ${url}:`, error.message);
                        }
                    }

                    if (!sucesso) {
                        alert("❌ Erro ao editar venda (nenhum servidor respondeu).");
                    }

                    modal.remove();
                } catch (error) {
                    console.error("❌ Erro ao editar venda:", error);
                    alert(`❌ ${error.message}`);
                }
            });
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

            // Lista de possíveis endpoints (online primeiro, depois local)
            const endpoints = [
                `https://medcontrol-backend.onrender.com/deletar_venda/${id_vendas}`, // online
                `http://localhost:3001/deletar_venda/${id_vendas}`                    // local
            ];

            let sucesso = false;

            for (const url of endpoints) {
                try {
                    const resposta = await fetch(url, { method: "DELETE" });

                    console.log("Status da resposta:", resposta.status);

                    if (!resposta.ok) {
                        console.warn(`⚠️ Falha em ${url}`);
                        continue; // tenta o próximo endpoint
                    }

                    const data = await resposta.json();
                    console.log("Resposta do servidor:", data);

                    // ✅ Remove a linha da tabela
                    const row = btn.closest("tr");
                    row.remove();
                    alert(`✅ ${data.mensagem}`);
                    sucesso = true;
                    break; // não precisa tentar os outros
                } catch (error) {
                    console.error(`❌ Erro ao excluir venda em ${url}:`, error.message);
                }
            }

            if (!sucesso) {
                alert("❌ Erro ao excluir venda (nenhum servidor respondeu).");
            }
        });
    }, 0);

    return div;

}