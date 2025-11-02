export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-relatorio");
    div.innerHTML = `
        <section class="dashboard-cards">

            <div class="card-relatorio receita-total">
                <p>
                    <i class="fas fa-usd"></i>
                    Receita Total
                </p>
                <span class="valores-relatorio valor-receita">
                    
                    <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>

            <div class="card-relatorio usuarios-ativos">
                <p>
                    <i class="fas fa-o"></i>
                    Usuarios Ativos
                </p>
                <span class="valores-relatorio valor-usuarios-ativos">
                    
                    <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>    

            <div class="card-relatorio total-clientes-relatorio">
                <p>
                    <i class="fas fa-user-plus"></i>
                    Total de Clientes
                </p>
                <span class="valores-relatorio valor-clientes-relatorio">
                     <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>  

            <div class="card-relatorio relatorio-vendas-total">
                <p>
                    <i class="fas fa-box"></i>
                    Total de Vendas
                </p>
                <span class="valores-relatorio valor-relatorio-vendas-total">
                     <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>  
        </section>


        <section class="container-relatorios"> 
            <!-- Grafico relatorio -->
            <div class="grafico-relatorio">
                <div class="titulo-grafico">
                    <p>
                        <i class="fas fa-line-chart"></i>
                        'Comparativo de Produtos Vendidos'
                    </p>
                </div>

                <!---- Grafico ---->
                <div id="estatisticas">
                    <canvas id="graficoDeLinhas" width="120" height="50"></canvas>
                </div>
            </div>

            
            <!-- Calentario de pagamentos -->
            <div class="calendario-pagamento">
                <div class="titulo-calendario">
                    <p>
                        <i class="fas fa-calendar"></i>
                        Acompanhamento da válidade dos <br>
                        lotes
                    </p>
                </div>
                <!---- Calendario ---->
                <div id="datas">
                    <div id="calendarioDeValidadeDosLotes"></div>
                </div>
            </div>

            
            <!-- nivel de estoque -->
            <div class="nivel-do-estoque">
                <div class="titulo-nivel-estoque">
                    <p>
                        <i class="fas fa-pie-chart"></i>
                        Nivel de Estoque
                    </p>
                </div>
                <!---- Pizza ---->
                <div id="nivel-estoque">
                    <canvas id="graficoPizzaNivelEstoque" width="120" height="50"></canvas>
                </div>
            </div>
        </section> 

        
        <section class="tabela-relatorio">
            <table>
                <thead>
                    <tr>
                        <th>Total de clientes</th>
                        <th>Total de produtos</th>
                        <th>Total de vendas</th>
                        <th>Total de fornecedores</th>
                        <th>Receita total</th>
                        <th>Gerar relatorio</th>
                    </tr>
                </thead>

                <tbody class="corpo-tabela-relatorio">
                <!-- Inserir aqui os produtos pelo banco de dados -->
                    <td>
                        <button class="btn btn-primary btn-emitir-relatorio">Emitir relatorio</button>
                    </td>
                </tbody>
            </table>
        </section>
    `

    // Scripts relativos aos valores dos dashboards -------------------------------------------//
    setTimeout(() => {
    // Total do Estoque de produtos ------------------------------------------------//
        const totalEstoque = div.querySelector(".valor-receita");
        fetch("http://localhost:3001/dashboard_total_estoque")
        .then((response) => {
        if(response.ok) {
            console.log("Dados puxados com sucesso!")
            return response.json();
            
        } else {
            res.status(500).json({ mensagem: "Erro ao buscar o total do estoque." });
        }
        })
        .then((totalValor) => {
            totalEstoque.textContent = totalValor.total_estoque;
        }) 
        .catch ((err) => {
            console.error("❌ Erro ao buscar o total do estoque:", err.message);
            res.status(500).json({ mensagem: "Erro ao buscar o total do estoque." });
        });


    // Total de fornecedores -------------------------------------------------------//
       const funcionariosTotal = document.querySelector(".valor-usuarios-ativos");
       fetch('http://localhost:3001/dashboard_funcionarios')
       .then((resposta) => {
        if (resposta.ok) {
        return resposta.json();
        } else {
        throw new Error('Erro ao buscar total de funcionários');
        }
       })
       .then((data) => {
          funcionariosTotal.textContent = data.total_funcionario;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários:", error);
          funcionariosTotal.textContent = "Erro ao buscar total de funcionários";
       })


    // Inserindo o total de clientes no dashboard ------------------------------------//
        const totalClientes = div.querySelector(".valor-clientes-relatorio");
        fetch("http://localhost:3001/total_clientes")
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.error("Erro ao buscar clientes:", error);
        }
        })
        .then((data) => {
        totalClientes.textContent = data.total_clientes;
        })
        .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        });

    // Total de vendas realizadas ---------------------------------------------------//
        const totalReceitaDia = document.querySelector(".valor-relatorio-vendas-total");
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

    }, 0)
    
    // Grafico de Relatório que está sendo atualizado em tempo real lá pelo back-end com a API do Flask (Python: app.py)
    setTimeout(() => {
    fetch("http://localhost:5000/grafico-estoque")
        .then(response => response.json())
        .then(data => {
        const ctx = document.getElementById('graficoPizzaNivelEstoque').getContext('2d');

        const entrada = data.grafico_geral.produtos_entrada;
        const saida = data.grafico_saidas_detalhado.total_unidades_saidas;
        const perdas = data.grafico_perdas_detalhado.total_unidades_perdidas;
        const total = data.grafico_geral.total_estoque;

        new Chart(ctx, {
            type: 'pie',
            data: {
            labels: ['Entradas', 'Saídas', 'Perdas', 'Total'],
            datasets: [{
                data: [entrada, saida, perdas, total],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
            },
            options: {
            responsive: true,
            plugins: {
                legend: {
                position: 'right'
                },
                title: {
                display: true,
                // text: '📊 Nível de Estoque'
                }
            }
            }
        });
        })
        .catch(error => console.error("❌ Erro ao carregar gráfico:", error));
    }, 0);

    // Gráfico de Linhas da tela de relatório que mostra o comparativo dos produtos 5 mais vendidos e os 5 menos vendidos:
    setTimeout(() => {
    fetch("http://localhost:5000/grafico-estoque")
        .then(response => response.json())
        .then(data => {
        const ctx = document.getElementById('graficoDeLinhas').getContext('2d');

        const labels = data.produto_mais_vendido.labels;
        const valoresMais = data.produto_mais_vendido.valores;
        const valoresMenos = data.produto_menos_vendido.valores;

        new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
            datasets: [
                {
                label: 'Mais Vendidos',
                data: valoresMais,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.3
                },
                {
                label: 'Menos Vendidos',
                data: valoresMenos,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.3
                }
            ]
            },
            options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                display: true,
                // text: '📈 Comparativo de Produtos Vendidos'
                }
            },
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });
        })
        .catch(error => console.error("❌ Erro ao carregar gráfico:", error));
    }, 0);

    // Calendário de lote e validade dos produtos mais próximos de vencer:
    setTimeout(() => {
        const listaLoteEValidade = document.getElementById("calendarioDeValidadeDosLotes");
        fetch("http://localhost:5000/grafico-estoque")
            .then(response => response.json())
            .then(data => {
            const lotes = data.lote_validade.lote;
            const validades = data.lote_validade.validade;
            const produtos = data.lote_validade.nome_produto;

            if (lotes.length === 0) {
                listaLoteEValidade.innerHTML = "<p>Nenhum lote próximo do vencimento.</p>";
            } else {
                const ul = document.createElement("ul");
                ul.style.listStyle = "none";
                ul.style.padding = "0";
                ul.style.margin = "0";

                for (let i = 0; i < lotes.length; i++) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${produtos[i]}</strong><br>
                    Lote: <span>${lotes[i]}</span><br>
                    Validade: <span>${validades[i]}</span>
                    <hr>
                `;
                ul.appendChild(li);
                }

                listaLoteEValidade.appendChild(ul);
            }
            })
            .catch(error => console.error("❌ Erro ao carregar a lista:", error));
    }, 0)

    // Tabela final de relatorio contendo: Total de clientes, total de produtos, total de vendas, total de produtos, total de fornecedores e a receita total:
    setTimeout(() => {
    const tbody = document.querySelector("table tbody");
    if (!tbody) {
        console.warn("⚠️ Tbody da tabela não encontrado.");
        return;
    }
    tbody.innerHTML = "";

    fetch("http://localhost:3001/tabela_relatorio")
        .then((resposta) => {
            if (!resposta.ok) throw new Error("Resposta inválida da API");
            return resposta.json();
        })
        .then((data) => {
            const relatorio = data.relatorio;
            if (!Array.isArray(relatorio)) {
                console.warn("⚠️ Dados recebidos não são um array:", relatorio);
                return;
            }

            relatorio.forEach((item) => {
                const linha = document.createElement("tr");
                linha.innerHTML = `
                <td>${item.total_clientes}</td>
                <td>${item.total_produtos}</td>
                <td>${item.total_vendas}</td>
                <td>${item.total_fornecedores}</td>
                <td>${item.total_receita}</td>
                <td>
                    <button class="btn btn-primary btn-emitir-relatorio">Emitir relatório</button>
                </td>
                `;
                tbody.appendChild(linha);
            });
        })
            .catch((error) => {
            console.error("❌ Erro ao carregar a tabela:", error);
        });
    }, 100);

    // Script para converter os dados do banco em PDF
    setTimeout(() => {

    // Aguarda até que a biblioteca jsPDF esteja disponível
    const aguardarJsPDF = setInterval(() => {
        if (window.jspdf && window.jspdf.jsPDF) {
        clearInterval(aguardarJsPDF); // Para o loop

        const { jsPDF } = window.jspdf;

        const botao = document.querySelector(".btn-emitir-relatorio");
        if (!botao) return;

        botao.addEventListener("click", async () => {
            try {
            const resposta = await fetch("http://localhost:3001/relatorio-geral");
            const { relatorio } = await resposta.json();
            const dados = relatorio;

            const doc = new jsPDF();

            // Cabeçalho
            doc.setFontSize(18);
            doc.text("Relatório Geral do Sistema MedControl", 20, 20);
            doc.setFontSize(12);
            doc.text(`Gerado em: ${new Date().toLocaleString()}`, 20, 30);

            // Dados
            let y = 40;
            for (const [chave, valor] of Object.entries(dados)) {
                doc.text(`${formatarLabel(chave)}: ${valor}`, 20, y);
                y += 8;
                if (y > 280) {
                doc.addPage();
                y = 20;
                }
            }

            doc.save("relatorio_executivo.pdf");
            } catch (error) {
            console.error("❌ Erro ao gerar PDF:", error);
            }
        });

        function formatarLabel(label) {
            return label
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
        }
        }
    }, 100); // Checa a cada 100ms se jsPDF já está disponível
    }, 100);



    return div
}
    