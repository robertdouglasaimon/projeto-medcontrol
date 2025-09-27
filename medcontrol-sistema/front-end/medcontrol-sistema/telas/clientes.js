export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-clientes");
  div.innerHTML = `
    <section class="clientes-cards">
      <div class="card-clientes">

        <div class="total-clientes">
          <p>
              <i class="fas fa-users"></i>
              Total de Clientes
          </p>
          <span class="valores-clientes">35</span>
        </div>

        <div class="cliente-ativo">
          <p>
              <i class="fas fa-thumbs-up"></i>
              Clientes Ativos
          </p>
          <span class="valores-clientes">20</span>
        </div>

        <div class="cliente-inativo">
          <p>
              <i class="fas fa-thumbs-down"></i>
              Clientes Inativos
          </p>
          <span class="valores-clientes">15</span>
        </div>

        <div class="cliente-receita">
          <p>
            <i class="fas fa-receipt"></i>
            Receita em Aberto
          </p>
          <span class="valores-clientes">5</span>
        </div>
    
      </div>
    </section>

    <section class="clientes-header">
      <h2> <i class="fas fa-star"></i> Buscar cliente </h2>
    
      <div class="clientes-pesquisa">
        <div class="input-wrapper">
          <input type="text" placeholder="Buscar por nome" class="buscar-input" />
          <button class="btn-novo-cliente" id="btnNovoCliente">+ Novo Cliente</button>
        </div>
      </div>
    </section>

    <!-- Modal do botão 'Novo Cliente'-->
    <div id="modalNovoCliente" class="modal hidden">
      
      <div class="modal-content">
        <span class="fechar-modal" id="fecharModal">&times;</span>
        <h3>Cadastrar Novo Cliente</h3>
        <!-- Formulário de cadastro aqui -->
        <form class="cadastro-cliente-modal">
          <input type="text" placeholder="Nome do cliente" required />
          <input type="text" placeholder="Insira o telefone" required />
          <input type="text" placeholder="Insira o endereço" required />
          <input type="text" placeholder="Insira o CPF" required />
          <select>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <button type="submit">Salvar</button>
          <button type="button" class="cancelar">Cancelar</button>
        </form>
        
      </div>
    </div>

    <section class="clientes-tabela">
      <h2> <i class="fas fa-table"></i> Tabela de Clientes </h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dados da tabela do banco de dados serão inseridos aqui -->
        </tbody>
      </table>
    </section>

  `;

  // Script para abrir e fechar o modal:
  setTimeout(() => {
    const btn = div.querySelector("#btnNovoCliente");
    const modal = div.querySelector("#modalNovoCliente");
    const close = div.querySelector("#fecharModal");
    const cancelar = div.querySelector(".cancelar");

    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    close.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    cancelar.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Script para fechar o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }, 0);

  // Script para inserir os dados do banco de dados na tabela:
  setTimeout(() => {
    // Inserindo os dados do banco na tabela de clientes:
    const tbody = div.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa o conteúdo anterior

    // Criando a função para receber os dados do banco de dados via fetch no na tabela
    fetch("http://localhost:3000/cadastro_clientes") 
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nome_cliente}</td>
          <td>${item.telefone}</td>
          <td>${item.endereco}</td>
          <td>${item.cpf}</td>
          <td>${item.status_cliente}</td>
          <td>
            <button class="btn btn-warning editar-cliente">Editar</button>
            <button class="btn btn-danger excluir-cliente">Excluir</button>
          </td>
        `;
        tbody.appendChild(row);
    })
    })
  }, 0);

  return div;
}
