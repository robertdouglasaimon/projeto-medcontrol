export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-produtos");
  div.innerHTML = `
    <section class="produtos-cards"> 

      <div class="card-produtos total-produtos">
        <p>
          <i class="fas fa-box"></i>
          Total de Produtos
        </p>
        <span class="produtos-total total-clientes-valor">30</span>
      </div>

      <div class="card-produtos produto-mais-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produtos ➕ Vendidos
        </p>
        <span class="valores-produtos-mais-vendidos valor-mais-vendido">30</span>
      </div>

      <div class="card-produtos produto-menos-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produtos ➖ Vendidos
        </p>
        <span class="valores-produtos-menos-vendidos valor-menos-vendido">10</span>
      </div>

      <div class="card-produtos valor-estoque">
        <p>
          <i class="fas fa-money-bill"></i>
          Valor do Estoque
        </p>
        <span class="valores-produtos-estoque valor-estoque-valor">R$ 250,00</span>
      </div>

    </section>

    <section class="produtos-header">
      <h2> <i class="fas fa-box"></i> Buscar produto </h2>

      <div class="produto-pesquisa">
        <div class="input-wrapper">
          <input type="text" placeholder="Buscar por produto" class="buscar-input" />
          <button class="btn-novo-cliente" id="btnNovoCliente">+ Novo Produto</button>
        </div>
      </div>

    </section>

    <section class="produtos-lista">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        <!-- Inserir aqui os produtos pelo banco de dados -->
        <td>Produto 1</td>
        <td>10</td>
        <td>R$ 50,00</td>
        <td>
          <button class="btn btn-primary btn-editar-produto">Editar</button>
          <button class="btn btn-danger btn-excluir-produto">Excluir</button>
        </td>
        </tbody>
      </table>
    </section>
    
  `;
  return div;
}
