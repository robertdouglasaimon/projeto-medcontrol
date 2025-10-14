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

        <section class="lote-header">
            <h2> <i class="fas fa-barcode"></i> Buscar por Lote </h2>

            <div class="lote-pesquisa">
                <div class="input-wrapper">
                    <input type="text" id="busca-lote" placeholder="Buscar por numero de lote" class="buscar-input-lote">
                    <button class="btn-novo-lote" id="btnNovoLote">+ Novo Registro</i></button>
                </div>
            </div>
        </section>

    <!-- Modal do botão 'Novo Lote'-->
    <div id="modalNovoLote" class="modal hidden">
      
      <div class="modal-content">
        <span class="fechar-modal" id="fecharModal">&times;</span>
        <h3>Cadastrar novo registro de estoque</h3>

        <!-- Formulário de cadastro aqui -->
        <form class="cadastro-lote-modal">
            <input type="text" name="lote_estoque" placeholder="Lote" required />
            <input type="text" name="qtd_entrada" placeholder="Entrada" required />
            <input type="text" name="saida_produto" placeholder="Saída" required />
            <input type="text" name="qtd_estoque" placeholder="Estoque" required />
            <input type="date" name="produto_validade" placeholder="Validade" required />
            <input type="text" name="perdas_descarte" placeholder="Perdas" required />


          <button type="submit">Salvar</button>
          <button type="button" class="cancelar">Cancelar</button>
        </form>
      </div>
    </div>

        <section class="lote-tabela">
            <h2> <i class="fas fa-table"></i> Tabela de Registro e Lotes do Estoque </h2>
            <table>
                <thead>
                    <tr>
                        <th>Lote do Produto</th>
                        <th>Quantidade de Entrada</th>
                        <th>Quatidade de Saida</th>
                        <th>Quantidade em Estoque</th>
                        <th>Validade do Lote</th>
                        <th>Perda ou Descarte</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody class="tabela-estoque">
                    <!-- Dados da tabela do banco de dados serão inseridos aqui -->
                    <td>Carregando...</td>
                 </tbody>
            </table>
        </section>



    `;

    // Alterador de estilo do dashboard de Nivel de Estoque de acordo com a criticidade do estoque (Se for menor que o 50.00 fica vermelho, se for maior ou igual fica verde):
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
    }, 100); // pequeno delay pra garantir que DOM atualizou

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
    🎯 Finalidade: Consumir a API Flask lá do "app.py" que retorna múltiplos conjuntos
        de dados de estoque e renderiza um gráfico com Chart.js
    ===============================================================

    🧠 Visão geral:
    - A API agora retorna um JSON com dois blocos:
    - grafico_geral: dados agregados de entradas, saídas, perdas e total
    - grafico_perdas_detalhado: soma dos valores numéricos extraídos da coluna perdas_descarte
    - Este script acessa os dados de grafico_geral e renderiza o gráfico principal.
    - Pode vir mais blocos de dados, vai dependendo da API Flask e de como ela retorna os dados de lá, só seguir as etapas no comentário abaixo e no back-end: app.py que dá bom.
    ===============================================================
    */
    fetch('http://localhost:5000/grafico-estoque')
        .then(res => res.json()) // Converte a resposta em JSON
        .then(data => {
        /*
        ===============================================================
        🎯 Seleção do elemento <canvas> onde o gráfico vai ser desenhado:
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
    }, 0);
   //-----------------------------------------------------------------------------------------//

  // Script relacionado a barra de busca da tela de estoque:
    setTimeout(() => {
        const input = div.querySelector('.buscar-input-lote');
        const table = div.querySelector('.lote-tabela table tbody');

        input.addEventListener('input', () => {
            const itemQueSeraBuscado = input.value.toLowerCase();
            const rows = table.querySelectorAll('tr');

            rows.forEach((row) => {
                const lote = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
                if (lote.includes(itemQueSeraBuscado)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    },0);


    // Script relacionado ao modal do botão "+ Novo Produto":
    setTimeout(() => {
    const div = document; // usa document direto
    const form = div.querySelector('.cadastro-lote-modal');
    const table = div.querySelector('.lote-tabela table tbody');
    const modal = div.querySelector('#modalNovoLote');
    const btnNovoLote = div.querySelector('#btnNovoLote');
    const fecharModal = div.querySelector('#fecharModal');
    const cancelar = div.querySelector('.cancelar');

    // Abrir modal
    btnNovoLote.addEventListener('click', () => {
    modal.classList.remove('hidden');
    });

    // Fechar modal no X ou botão cancelar
    fecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    });

    cancelar.addEventListener('click', () => {
    modal.classList.add('hidden');
    });

    // Fechar ao clicar fora
    window.addEventListener('click', (event) => {
    if (event.target === modal) {
    modal.classList.add('hidden');
    }
    });

    // Submissão do formulário (Enviar dados para o back-end e atualizar a tabela)
    form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const lote_estoque = form.querySelector('input[name="lote_estoque"]').value;
    const qtd_entrada = form.querySelector('input[name="qtd_entrada"]').value;
    const saida_produto = form.querySelector('input[name="saida_produto"]').value;
    const qtd_estoque = form.querySelector('input[name="qtd_estoque"]').value;
    const produto_validade = form.querySelector('input[name="produto_validade"]').value;
    const perdas_descarte = form.querySelector('input[name="perdas_descarte"]').value;

    // Verifica se todos os campos foram preenchidos:
    if (!lote_estoque || !qtd_entrada || !saida_produto || !qtd_estoque || !produto_validade || !perdas_descarte) {
    alert('Todos os campos devem ser preenchidos.');
    return;
    }
 
    try {
    const response = await fetch('http://localhost:3001/cadastro_lote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        lote_estoque,
        qtd_entrada,
        saida_produto,
        qtd_estoque,
        produto_validade,
        perdas_descarte
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao cadastrar lote.');
    }

    const data = await response.json();
    alert(`✅ ${data.mensagem}`);
    form.reset();
    modal.classList.add('hidden');

    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${lote_estoque}</td>
        <td>${qtd_entrada}</td>
        <td>${saida_produto}</td>
        <td>${qtd_estoque}</td>
        <td>${produto_validade}</td>
        <td>${perdas_descarte}</td>
        <td>
        <button class="btn-editar-lote editar-lote">Editar</button>
        <button class="btn-excluir-lote excluir-lote">Excluir</button>
        </td>
    `;
    table.appendChild(novaLinha);

    } catch (error) {
    console.error('❌ Erro ao cadastrar lote:', error.message);
    alert(`❌ Erro ao cadastrar lote: ${error.message}`);
    }
    });
    }, 50);


    // Script para a tabela de estoque:
    setTimeout(() => {
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = "";

            fetch('http://localhost:3001/tabela_estoque')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro ao obter os dados da tabela de estoque.');
                }
            })
            .then((data) => {
                data.forEach(item => {
                const row = document.createElement('tr');
                row.setAttribute("data-id_controle_estoque", item.id_controle_estoque); 
                row.innerHTML = `
                    <td>${item.lote_estoque}</td>
                    <td>${item.qtd_entrada}</td>
                    <td>${item.saida_produto}</td>
                    <td>${item.qtd_estoque}</td>
                    <td>${item.produto_validade}</td>
                    <td>${item.perdas_descarte}</td>
                    <td>
                        <button class="btn btn-warning editar-lote btn-estoque-editar">Editar</button>
                        <button class="btn btn-danger  excluir-lote  btn-estoque-excluir">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
                });            
            });
    }, 10);


    // Script para editar a linha da tabela:
    setTimeout(() => {
        const tbody = document.querySelector('tbody');

        tbody.addEventListener("click", async (event) => {
                const btn = event.target;
                if(!btn.classList.contains("editar-lote")) return;


                const row = btn.closest("tr");
                const id_controle_estoque = row.getAttribute("data-id_controle_estoque");

                const lote_estoque = row.querySelector('td:nth-child(1)').textContent;
                const qtd_entrada = row.querySelector('td:nth-child(2)').textContent;
                const saida_produto = row.querySelector('td:nth-child(3)').textContent;
                const qtd_estoque = row.querySelector('td:nth-child(4)').textContent;
                const produto_validade = row.querySelector('td:nth-child(5)').textContent;
                const perdas_descarte = row.querySelector('td:nth-child(6)').textContent;

                console.log("Dados do lote: ", {id_controle_estoque, lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte});

                const modal = document.createElement("div");
                modal.classList.add("modal");
                modal.innerHTML = `
                    <div class="modal-content">
                        <h3>Editar Lote</h3>
                        <form id="form-editar-lote">
                            <label for="lote_estoque">Lote:</label>
                            <input type="text" id="lote_estoque" value="${lote_estoque}" required>

                            <label for="qtd_entrada">Quantidade de Entrada:</label>
                            <input type="number" id="qtd_entrada" value="${qtd_entrada}" required>

                            <label for="saida_produto">Saida de Produto:</label>
                            <input type="text" id="saida_produto" value="${saida_produto}" required>

                            <label for="qtd_estoque">Quantidade no Estoque:</label>
                            <input type="number" id="qtd_estoque" value="${qtd_estoque}" required>

                            <label for="produto_validade">Validade do Produto:</label>
                            <input type="date" id="produto_validade" value="${produto_validade}" required>

                            <label for="perdas_descarte">Perdas e Descarte:</label>
                            <input type="text" id="perdas_descarte" value="${perdas_descarte}" required>

                            <button type="submit" class="btn btn-primary">Salvar</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </form>
                    </div>
                `;
                document.body.appendChild(modal);

    // Fecha o modal ao clicar no botão "fechar" ou clicar "fora do modal": ---------------------
            modal.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("close-modal") || 
                event.target.classList.contains("modal") || 
                event.target.classList.contains("btn-secondary")) {
                modal.remove();
            }
            });

    // Script para salvar os dados editados:------------------------------------------------------ 
                const form = document.querySelector("#form-editar-lote");
                form.addEventListener("submit", async (event) => {
                    event.preventDefault();

                    const lote_estoque = form.querySelector("#lote_estoque").value;
                    const qtd_entrada = form.querySelector("#qtd_entrada").value;
                    const saida_produto = form.querySelector("#saida_produto").value;
                    const qtd_estoque = form.querySelector("#qtd_estoque").value;
                    const produto_validade = form.querySelector("#produto_validade").value;
                    const perdas_descarte = form.querySelector("#perdas_descarte").value;

                    // Validação dos dados:
                    if (!lote_estoque || !qtd_entrada || !saida_produto || !qtd_estoque || !produto_validade || !perdas_descarte) {
                        alert("Todos os campos devem ser preenchidos.");
                        return;
                    }	

                    // Envia os dados para o back-end:
                    try {
                        console.log("Dados do lote: ", {id_controle_estoque, lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte});
                        const response = await fetch(`http://localhost:3001/editar_lote/${id_controle_estoque}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ lote_estoque, qtd_entrada, saida_produto, qtd_estoque, produto_validade, perdas_descarte })
                        });

                        if (!res.ok) {
                            alert("❌ Erro ao editar o lote.");
                            throw new Error("Erro ao editar o lote.");
                        } else {
                            const data = await response.json();

                            console.log("✅ Lote editado com sucesso:", data);
                            row.querySelector("td:nth-child(2)").textContent = lote_estoque;
                            row.querySelector("td:nth-child(3)").textContent = qtd_entrada;
                            row.querySelector("td:nth-child(4)").textContent = saida_produto;
                            row.querySelector("td:nth-child(5)").textContent = qtd_estoque;
                            row.querySelector("td:nth-child(6)").textContent = produto_validade;
                            row.querySelector("td:nth-child(7)").textContent = perdas_descarte;

                            alert(`✅ ${data.mensagem} Lote editado com sucesso!`);
                            window.location.reload();
                            return;
                        }
                    } catch (error) {
                        console.error("❌ Erro ao editar o lote:", error);
                        alert(`❌ ${error.message}`)
                    }
                    modal.remove();
            });
        });

    },0);

    // Script para apagar da tabela e do bando um registro pelo front-end atraves do botão excluir:
    setTimeout(() => {
    const table = document.querySelector('table');

    table.addEventListener('click', async (event) => {
        if (event.target.classList.contains('excluir-lote')) {
          
        const row = event.target.closest('tr');
        const id = row.getAttribute('data-id_controle_estoque');

            if (!id) {
                alert('❌ ID do lote não encontrado.');
                return;
            }

            const confirmar = confirm('Tem certeza de que deseja excluir o lote?');
            if (!confirmar) return;

            try {
                const response = await fetch(`http://localhost:3001/deletar_lote/${id}`, {
                method: 'DELETE'
                });

                if (response.ok) {
                alert('✅ Lote excluído com sucesso!');
                row.remove();
                } else {
                throw new Error('Erro ao excluir o lote.');
                }
            } catch (error) {
                console.error('❌ Erro ao excluir o lote:', error.message);
                alert(`❌ Erro ao excluir o lote: ${error.message}`);
            }
        }
    });
    },0);

    return div;
}