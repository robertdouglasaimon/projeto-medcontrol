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
        <span class="produtos-total total-produtos-valor"></span>
      </div>

      <div class="card-produtos produto-mais-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produtos ➕ Vendidos
        </p>
        <span class="valores-produtos-mais-vendidos valor-mais-vendido"></span>
      </div>

      <div class="card-produtos produto-menos-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produtos ➖ Vendidos
        </p>
        <span class="valores-produtos-menos-vendidos valor-menos-vendido"></span>
      </div>

      <div class="card-produtos valor-estoque">
        <p>
          <i class="fas fa-money-bill"></i>
          Valor do Estoque
        </p>
        <span class="valores-produtos-estoque valor-estoque-valor"></span>
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
            <th>Descrição</th>
            <th>Fabricante</th>
            <th>Quantidade</th>
            <th>Lote</th>
            <th>Validade</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        <!-- Inserir aqui os produtos pelo banco de dados -->
        <td>
          <button class="btn btn-primary btn-editar-produto">Editar</button>
          <button class="btn btn-danger btn-excluir-produto">Excluir</button>
        </td>
        </tbody>
      </table>
    </section>
    
  `;

  // Scrip para inserir os dados especificos puxados do banco de dados nos dashboards:
  setTimeout(() => {

    // Total de produtos:  -------------------------------------------------------//
    const totalProdutos = div.querySelector(".total-produtos-valor");
    fetch("http://localhost:3001/dashboard_produtos")
    .then((response) => {
      if(response.ok) {
        console.log("Dados puxados com sucesso!")
        return response.json();
        
      } else {
        res.status(500).json({ mensagem: "Erro ao buscar o total de produtos." });
      }
    })
    .then((totalProduto) => {
      totalProdutos.textContent = totalProduto.total_produtos;
    }) 
    .catch ((err) => {
      console.error("❌ Erro ao buscar o total de produtos:", err.message);
      res.status(500).json({ mensagem: "Erro ao buscar o total de produtos." });
    });
    //------------------------------------------------------------------------------//
    







  },0);

  // Puxando os produtos do banco de dados e inserindo na tabela de produtos:
  setTimeout(() => {
    const tbody = div.querySelector("tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3001/cadastro_produtos")
    .then(response => {
      if(response.ok) {
        return response.json();
      }
    })
    .then(produtos => {
      produtos.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nome_produto}</td>
          <td>${item.descricao}</td>
          <td>${item.fabricante}</td>
          <td>${item.qtd_estoque}</td>
          <td>${item.lote}</td>
          <td>${item.data_validade}</td>
          <td>${item.preco_venda}</td>
          <td>
            <button class="btn btn-primary btn-editar-produto">Editar</button>
            <button class="btn btn-danger btn-excluir-produto">Excluir</button>
          </td>
        `;
         tbody.appendChild(row);
     
      })
    })

  },0);

  return div;
}
