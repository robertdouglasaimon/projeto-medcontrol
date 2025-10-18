export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-fornecedores");
  div.innerHTML = `
    <section class="fornecedores-cards">
      <div class="card-fornecedores">
        <div class="total-de-fornecedores">
           <p>
              <i class="fa fa-building"></i>
              Total de fornecedores
           <p>
        </div>

        <div class="ativos-no-mês">
          <p>
            <i class="fa fa-handshake-o"></i>
            Ativos no mês
          </p>
        </div>

        <div class="melhor-avaliados">
          <p>
            <i class="fa fa-star-o"></i>
            Melhor avaliados
          </p>
        </div>

        <div class="compras-pendentes">
          <p>
            <i class="fa fa-money"></i>
            Compras Pendentes
          </p>
        </div>

      </div>
    <section class="fornecedores-header">
      <h2> <i class="fas fa-star"></i> Buscar fornecedor</h2>
    
      <div class="forncedor-pesquisa">
        <div class="input-wrapper">
          <input type="text" placeholder="Buscar por nome" class="buscar-input" />
          <button class="btn-novo-fornecedor" id="btnNovoFornecedor">+ Novo Forncedor</button>
        </div>
      </div>
    </section>

     <!-- Modal do botão 'Novo Fornecedor'-->
    <div id="NovoFornecedor" class="modal hidden">
      
      <div class="modal-content">
        <span class="fechar-modal" id="fecharModal">&times;</span>
        <h3>Cadastrar Novo Fornecedor</h3>
        
        <!-- Formulário de cadastro aqui -->
        <form class="cadastro-fornecedor-modal">
          <input type="text" name="nome_fornecedor" placeholder="Nome da empresa" required />
          <input type="text" name="cnpj" placeholder="Insira o CNPJ" required />
          <input type="text" name="endereco" placeholder="Insira o endereço comercial" required />
          <input type="text" name="categoria-fornecimento" placeholder="Categoria de fornecimento(ex:matéria-prima, transporte, tecnologia)" required />
          <input type="text" name="telefone" placeholder="Insira o telefone comercial" required />
          <select name="status_fornecedor">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <button type="submit">Salvar</button>
          <button type="button" class="cancelar">Cancelar</button>
        </form>
      </div>
    </div>
    
    <section class="fornecedores-tabela">
      <h2> <i class="fas fa-table"></i> Tabela de Fornecedores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome de Empresa</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CNPJ</th>
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

  return div;    
}
