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

      <div class="card-produtos valor-estoque">
        <p>
          <i class="fas fa-money-bill"></i>
          Valor do Estoque
        </p>
        <span class="valores-produtos-estoque valor-estoque-valor">R$ 250,00</span>
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

    </section>

    
  `;
  return div;
}
