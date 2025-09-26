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
        <form>
          <input type="text" placeholder="Nome do cliente" required />
          <input type="text" placeholder="Inserir aqui as opções" required />
          <input type="text" placeholder="Inserir aqui as opções" required />
          <input type="text" placeholder="Inserir aqui as opções" required />
          <button type="submit">Salvar</button>
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
            <th>Ativo</th>
            <th>Receita</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome do Cliente</td>
            <td>Telefone do Cliente</td>
            <td>Endereço do Cliente</td>
            <td>Ativo</td>
            <td>Receita</td>
            <td>
              <button class="btn btn-primary editar-cliente">Editar</button>
              <button class="btn btn-primary excluir-cliente">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

  `;

  // Script para abrir e fechar o modal
  setTimeout(() => {
    const btn = div.querySelector("#btnNovoCliente");
    const modal = div.querySelector("#modalNovoCliente");
    const close = div.querySelector("#fecharModal");

    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    close.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }, 0);

  return div;
}
