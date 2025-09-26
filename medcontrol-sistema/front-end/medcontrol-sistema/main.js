function carregarTela() {
    // 1. Captura o hash atual da URL:
    const hash = window.location.hash.replace('#', '') || 'clientes';

    // 1.1 Atualiza o span que mostra o guia atual e deixa a primeira letra maiúscula:
    document.getElementById("guia-atual").textContent = hash.charAt(0).toUpperCase() + hash.slice(1);


    // 2. Seleciona o container onde o conteúdo será renderizado:
    const app = document.getElementById('app');

    // 3. Limpa o conteúdo anterior do container:
    app.innerHTML = '';

    // 4. Importa dinamicamente o módulo da tela correspondente:
    import(`./telas/${hash}.js`)
        .then((modulo) => {
        // 5. Executa a função "render()" do módulo:
        const conteudo = modulo.render();
        // 5.1. Adiciona o conteúdo renderizado ao container:
        app.appendChild(conteudo);

        // 6. Atualiza o menu lateral para marcar a aba ativa:
        setTimeout(() => { // 6.1. Aguarda um pouco para garantir que o DOM seja atualizado.
                document.querySelectorAll("aside nav a").forEach(link => {
                link.classList.remove('active');
                if (link.hash === `#${hash}`) {
                    link.classList.add('inactive');
                }
                });

            }, 0); // 6.2. Execute após o render ser concluido.
        })
        .catch(erro => {
            // 7. Se a tela não existir, mostra uma mensagem de erro:
            const erroDiv = document.createElement("div");
            erroDiv.innerHTML = `
                                    <h2>Erro 404</h2>
                                    <p>Tela "${hash}" não encontrada.</p>
                                `;
            app.appendChild(erroDiv);

        });
}

// 8. Carrega a primeira tela ao carregar o site:
window.addEventListener("DOMContentLoaded", carregarTela);

// 9. Executa a função "carregarTela()" quando o hash da URL mudar:
window.addEventListener("hashchange", carregarTela);