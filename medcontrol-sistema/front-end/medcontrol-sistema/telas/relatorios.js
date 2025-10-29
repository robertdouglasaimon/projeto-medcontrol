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
                    234.859.663
                    <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>

            <div class="card-relatorio usuarios-ativos">
                <p>
                    <i class="fas fa-user"></i>
                    Usuarios Ativos
                </p>
                <span class="valores-relatorio valor-usuarios-ativos">
                    2000
                    <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>    

            <div class="card-relatorio usuarios-novos">
                <p>
                    <i class="fas fa-user-plus"></i>
                    Usuarios Novos
                </p>
                <span class="valores-relatorio valor-usuarios-novos">
                    55
                     <!-- Inserir aqui pelo banco de dados -->
                </span>
            </div>  

            <div class="card-relatorio mentores-total">
                <p>
                    <i class="fas fa-users"></i>
                    Total de mentores
                </p>
                <span class="valores-relatorio valor-mentores-total">
                    55
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
                        Receita Total
                    </p>
                </div>
                <!---- Grafico ---->
                <div id="estatisticas">
                    <!-- Inserir aqui power bi -->
                </div>
            </div>

            
            <!-- Calentario de pagamentos -->
            <div class="calendario-pagamento">
                <div class="titulo-calendario">
                    <p>
                        <i class="fas fa-usd"></i>
                        Calendário de Pagamentos
                    </p>
                </div>
                <!---- Calendario ---->
                <div id="datas">
                    <!-- Inserir aqui power bi -->
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
                    <!-- Inserir aqui power bi -->
                </div>
            </div>
        </section> 

        
        <section class="tabela-geral">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Total de clientes</th>
                        <th>Total de produtos</th>
                        <th>Total de vendas</th>
                        <th>Total de produtos entregues</th>
                        <th>Total de fornecedores</th>
                        <th>Gastos totais</th>
                    </tr>
                </thead>
                <tbody>
                <!-- Inserir aqui os produtos pelo banco de dados -->
                <td>
                    <button class="btn btn-primary btn-emitir-relatorio">Emitir relatorio</button>
                </td>
                </tbody>
            </table>
        </section>
        
    `
    return div
}
    