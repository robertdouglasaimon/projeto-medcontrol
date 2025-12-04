// logout.js
export async function logoutUsuario() {
  // Lista de possíveis endpoints (online primeiro, depois local)
  const endpoints = [
    {
      url: "https://medcontrol-backend.onrender.com/logout",
      redirect: "https://projeto-medcontrol.vercel.app" // tela de login online
    },
    {
      url: "http://localhost:3001/logout",
      redirect: "/medcontrol-sistema/front-end/index.html" // tela de login local
    }
  ];

  let sucesso = false;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint.url, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        console.warn(`⚠️ Falha no endpoint ${endpoint.url}`);
        continue; // tenta o próximo
      }

      // Limpa o localStorage
      localStorage.removeItem("usuarioLogado");

      alert("✅ Logout realizado com sucesso!");

      // Redireciona para a tela de login correspondente
      window.location.href = endpoint.redirect;

      sucesso = true;
      break; // não precisa tentar os outros
    } catch (error) {
      console.error(`❌ Erro ao tentar ${endpoint.url}:`, error);
    }
  }

  if (!sucesso) {
    alert("Erro ao sair do sistema (nenhum servidor respondeu).");
  }
}
