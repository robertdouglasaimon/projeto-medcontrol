// Função para verificar se o usuário está logado. Isso evita retomar sessão apertando em "voltar" no navegador. Vai exigir sempre autenticação para acessar o sistema.
export function verificarLogin() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("⚠️ Você precisa estar logado para acessar o sistema.");
    window.location.href = "/medcontrol-sistema/front-end/medcontrol-login/index.html";
  }
}


// Nota: Precisa sempre ser chamada via "import { verificarLogin } from 'destino' " para funcionar e manter a seguraça da sessão e do sistema.

//------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------//
function carregarTela() {
  // 1. Captura o hash atual da URL:
  const hash = window.location.hash.replace('#', '') || 'clientes';

  // 2. Verifica se o usuário está logado (exceto se estiver na tela de login)
  if (hash !== 'login') {
    const usuario = localStorage.getItem("usuarioLogado");
    if (!usuario) {
      alert("⚠️ Você precisa estar logado para acessar o sistema.");
      window.location.href = "/medcontrol-sistema/front-end/medcontrol-login/index.html";
      return; // Interrompe o carregamento da tela protegida
    }
  }

  // 3. Atualiza o span que mostra o guia atual e deixa a primeira letra maiúscula:
  const guiaSpan = document.getElementById("guia-atual");
  if (guiaSpan) {
    guiaSpan.textContent = hash.charAt(0).toUpperCase() + hash.slice(1);
  }

  // 4. Seleciona o container onde o conteúdo será renderizado:
  const app = document.getElementById('app');
  if (!app) return;

  // 5. Limpa o conteúdo anterior do container:
  app.innerHTML = '';

  // 6. Importa dinamicamente o módulo da tela correspondente:
  import(`./telas/componentes/${hash}.js`)
    .then((modulo) => {
      const conteudo = modulo.render();
      app.appendChild(conteudo);

      // 7. Atualiza o menu lateral para marcar a aba ativa:
      setTimeout(() => {
        document.querySelectorAll("aside nav a").forEach(link => {
          link.classList.remove('active');
          if (link.hash === `#${hash}`) {
            link.classList.add('inactive');
          }
        });
      }, 0);
    })
    .catch(erro => {
      // 8. Se a tela não existir, mostra uma mensagem de erro:
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


//------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------//
// Preenchendo o nome e cargo do usuário no cabeçalho do sistema:
const usuario = JSON.parse(localStorage.getItem("usuarioLogado")); // Obtenha os dados do usuário do localStorage.

if (usuario) { // Verifique se o usuário foi encontrado no localStorage.
  const nomeSpan = document.getElementById("nome-texto");
  const cargoSpan = document.getElementById("cargo-texto");

  if (nomeSpan) nomeSpan.textContent = usuario.nome;
  if (cargoSpan) cargoSpan.textContent = usuario.cargo;
}

//------------------------------------------------------------------------------------------//

// Preenchendo o nome e cargo do usuário no cabeçalho do hamburguer do sistema:
const usuario_hamburguer = JSON.parse(localStorage.getItem("usuarioLogado")); // Obtenha os dados do usuário do localStorage.

if (usuario_hamburguer) { // Verifique se o usuário foi encontrado no localStorage.
  const nomeSpan = document.getElementById("cargo-texto-hamburger");
  const cargoSpan = document.getElementById("nome-texto-hamburguer");

  if (nomeSpan) nomeSpan.textContent = usuario.nome;
  if (cargoSpan) cargoSpan.textContent = usuario.cargo;
}


//------------------------------------------------------------------------------------------//
// Destruindo a sessão quando o usuário fechar a aba ou fechar o navegador (sair):
document.getElementById("btn-sair").addEventListener("click", window.logoutUsuario);
document.getElementById("sair").addEventListener("click", window.logoutUsuario);

//------------------------------------------------------------------------------------------//

// Função para alternar a visibilidade do menu lateral ao clicar no botão (Tem que começar oculto o botão):
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("btn-toggle-menu");
  const menu = document.querySelector(".menu-lateral");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("inativo");
  });


});
//------------------------------------------------------------------------------------------//

// Funcão para ao clicar no botão hamburguer mobile ele abrir e fechar
document.addEventListener("DOMContentLoaded", function () {

  const botao = document.getElementById("btnHamburguer");
  const menu = document.getElementById("navbarToggleExternalContent10");
  const icone = document.querySelector(".animated-icon2");

  // Função para fechar o menu
  function fecharMenu() {
    menu.classList.remove("show");
    icone.classList.remove("open");
  }

  // Clique no botão hamburguer
  botao.addEventListener("click", function (event) {
    event.stopPropagation(); // impede que o clique chegue no document

    menu.classList.toggle("show");
    icone.classList.toggle("open");
  });

  // Impede clique dentro do menu de fechar ele
  menu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Clique fora do botão e do menu
  document.addEventListener("click", function () {
    fecharMenu();
  });

});