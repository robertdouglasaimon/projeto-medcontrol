export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-fornecedores");
  div.innerHTML = `
      <section class="fornecedores-cards">
        <div class="card-fornecedores">

          <div class="total-de-fornecedores">
            <p>
              <i class="fa fa-building"></i>
              Total de Fornecedores
            <p>
            <span class="valores-fornecedores fornecedores-total-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

          <div class="fornecedores-ativos">
            <p>
              <i class="fa fa-handshake"></i>
              Ativos
            </p>
            <span class="valores-fornecedores fornecedores-ativos-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

          <div class="fornecedores-inativos">
            <p>
              <i class="fa fa-times-circle"></i>
              Inativos
            </p>
            <span class="valores-fornecedores fornecedores-inativos-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

        </div>
      </section>

      <section class="fornecedores-header">
        <h2> <i class="fas fa-star"></i> Buscar fornecedor</h2>
      
        <div class="fornecedor-pesquisa">
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
            <input type="text" name="data-entrega" placeholder="Insira a data de entrega" required />
            <input type="text" name="produto" placeholder="Insira o nome do produto" required />
            <input type="text" name="quantidade" placeholder="Insira a quantidade do produto" required />
            <input type="text" name="Observação" placeholder="Insira uma observação" required />

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
              <th>Data de entrega</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Observação</th>
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
