export function render() {
  const div = document.createElement("div-clientes");
  div.classList.add("div-clientes");
  div.innerHTML = `
    <div class="card-clientes">

      <div class="total-clientes">
        <p>Total de Clientes</p>
        <span class="valores-clientes">35</span>
      </div>

      <div class="cliente-ativo">
        <p>Clientes Ativos</p>
        <span class="valores-clientes">20</span>
      </div>

      <div class="cliente-inativo">
        <p>Clientes Inativos</p>
        <span class="valores-clientes">15</span>
      </div>

      <div class="cliente-receita">
        <p>Receita em Aberto</p>
        <span class="valores-clientes">5</span>
      </div>


    </div>    
  `;
  return div;
}
