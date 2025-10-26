export function render() {
    const div = document.createElement("div");
    div.classList.add("tela-funcionarios");
    div.innerHTML = `
    <!-- Seção de Cards - Funcionários -->
    <section class="funcionarios-cards">
      <div class="card-funcionarios">

        <div class="total-funcionarios">
          <p>
            <i class="fas fa-users"></i>
            Total de Funcionários
          </p>
          <span class="valores-funcionarios total-funcionarios-valor">
            <!-- Inserir aqui o total de funcionários pelo banco de dados -->
          </span>
        </div>

        <div class="funcionario-ativo">
          <p>
            <i class="fas fa-user-check"></i>
            Funcionários Ativos
          </p>
          <span class="valores-funcionarios funcionario-ativo-valor">
            <!-- Inserir aqui o total de funcionários ativos -->
          </span>
        </div>

        <div class="funcionario-desligado">
          <p>
            <i class="fas fa-user-times"></i>
            Funcionários Desligados
          </p>
          <span class="valores-funcionarios funcionario-desligado-valor">
            <!-- Inserir aqui o total de funcionários desligados -->
          </span>
        </div>
        </section>

        <section class="funcionarios-header">
          <h2>
            <i class="fas fa-user-tie"></i> Buscar funcionário
          </h2>

          <div class="funcionarios-pesquisa">
            <div class="input-wrapper">
              <input type="text" placeholder="Buscar por nome" class="buscar-input-funcionario"/>
              <button class="btn-novo-funcionario" id="btnNovoFuncionario">
                + Novo Funcionário
              </button>
            </div>
          </div>
        </section>

    <section class="funcionarios-tabela">
          <h2> <i class="fas fa-table"></i> Quadro de Funcionários </h2>
          <table>

            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Admissão</th>
                <th>Desligamento</th>
                <th>Salário</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody> 
        
            <!-- Dados da tabela do banco de dados serão inseridos aqui -->
            <td>Carregando...</td>
            </tbody>

          </table>
        </section>
    `;

      // Script relacionado aos valores dos dashboard de funcionários:------------------------------------------------------
      setTimeout(() => {

      // Total de fornecedores:
       const funcionariosTotal = document.querySelector(".total-funcionarios-valor");
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

       // Funcionários ativos:
       const funcionariosAtivos = document.querySelector(".funcionario-ativo-valor");
       fetch('http://localhost:3001/dashboard_funcionarios_ativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de funcionários ativos');
         }
       })
       .then((data) => {
          funcionariosAtivos.textContent = data.total_funcionario_ativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários ativos:", error);
          funcionariosAtivos.textContent = "Erro ao buscar total de funcionários ativos";
       })

       // Funcionários inativos:
       const funcionariosInativos = document.querySelector(".funcionario-desligado-valor");
       fetch('http://localhost:3001/dashboard_funcionarios_inativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de funcionários inativos');
         }
       })
       .then((data) => {
          funcionariosInativos.textContent = data.total_funcionario_inativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários inativos:", error);
          funcionariosInativos.textContent = "Erro ao buscar total de funcionários inativos";
       })

      }, 0)

      // Script para barra de busca por nome do funcionário:-----------------------------------------------------------------
      setTimeout(() => {
        const input = div.querySelector(".buscar-input-funcionario");
        const table = div.querySelector(".funcionarios-tabela table tbody");

        input.addEventListener("input", () => {
          const itemQueSeraBuscado = input.value.toLowerCase();
          const linhas = table.querySelectorAll("tr");

          linhas.forEach((linha) => {
            const nomeFuncionario = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
            if (nomeFuncionario.includes(itemQueSeraBuscado)) {
              linha.style.display = "table-row";
            } else {
              linha.style.display = "none";
            }
          });
        });
      })

      // Script para inserir os dados do banco de dados na tabela de funcionários:------------------------------------------------------------------
      setTimeout(() => {
        const tbody = div.querySelector("tbody");
        tbody.innerHTML = "";
        
        fetch('http://localhost:3001/tabela_funcionarios')  
        .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        }
          throw new Error('Erro ao buscar funcionários');
        })
        .then((data) => {
          data.forEach((item) => {
            const linha = document.createElement("tr");
            linha.setAttribute("data-id_funcionario", item.id_funcionario); 
            linha.innerHTML = `
              <td>${item.nome_funcionario}</td>
              <td>${item.cargo_funcionario}</td>
              <td>${item.admissao}</td>
              <td>${item.demissao}</td>
              <td>${item.salario}</td>
              <td>${item.status}</td>
              <td>
                <button class="btn btn-warning  btn-funcionarios-editar">Editar</button>
                <button class="btn btn-danger  btn-funcionarios-excluir">Excluir</button>
              </td>
            `;
            tbody.appendChild(linha);
          })
        })
        .then((data) => {
          data.forEach((item) => {
            const linha = document.createElement("tr");
            linha.setAttribute("data-id_fornecedor", item.id_fornecedor); 
            linha.innerHTML = `
              <td>${item.nome_fornecedor}</td>
              <td>${item.cnpj}</td>
              <td>${item.contato}</td>
              <td>${item.status}</td>
              <td>
                <button class="btn btn-warning  btn-fornecedores-editar">Editar</button>
                <button class="btn btn-danger  btn-fornecedores-excluir">Excluir</button>
              </td>
            `;
            tbody.appendChild(linha);
          })
        })    
      }, 0)

    return div
}