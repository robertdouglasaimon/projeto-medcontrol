export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-home");
  div.innerHTML = `
    <section class="home-boas-vindas">
      <h1>Bem-vindo(a) ao MedControl</h1>
      <p>Seu sistema de gestão inteligente para controle eficiente de vendas, estoque, clientes e mais.</p>
    </section>

    <section class="home-cards">
      <a href="#produtos">
          <div class="card-dashboard">
            <i class="fas fa-box fa-2x"></i>
            <p>Produtos</p>
          </div>
      </a>

      <a href="#vendas">
          <div class="card-dashboard">
            <i class="fas fa-shopping-cart fa-2x"></i>
            <p>Vendas</p>
          </div>
      </a>

      <a href="#clientes">
          <div class="card-dashboard">
            <i class="fas fa-user fa-2x"></i>
            <p>Clientes</p>
          </div>
      </a>
    </section>

    <section class="home-recursos">
      <h2>Explorar Recursos</h2>


        <div class="recursos-botoes">
        <a href="#estoque"">
            <div class="card-dashboard">
              <i class="fas fa-chart-line fa-2x"></i>
              <p>Gráficos Visuais</p>  
            </div>
        </a>

        <a href="#relatorios">
            <div class="card-dashboard">
              <i class="fas fa-file-alt fa-2x"></i>
              <p>Relatórios e Análises</p>
            </div>
        </a>

        <!-- FALTA IMPLEMENTAR O ALERTA - sem link -->
        <a href="#">
          <div class="card-dashboard">
            <i class="fas fa-exclamation-triangle fa-2x"></i>
            <p>Alertas</p>
          </div>
        </a>
        
      </div>
    </section>
  `;
  return div;
}
