export function render () {
    const div = document.createElement("div");
    div.classList.add("tela-estoque");
    div.innerHTML = `
        <section class="estoque-cards">

            <div class="card-estoque total-estoque">
                <p>
                    <i class="fas fa-warehouse"></i>
                    Total de Estoque
                </p>
                <span class="estoque-total total-estoque-valor">100</span>
            </div>

        </section>
    `;
    return div;
}