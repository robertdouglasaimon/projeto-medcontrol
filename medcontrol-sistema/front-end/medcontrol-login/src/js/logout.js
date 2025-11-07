// logout.js
export async function logoutUsuario() {
  try {
    // Chama o back-end para destruir a sessão
    const res = await fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok) {
      alert("Erro ao encerrar sessão.");
      return;
    }

    // Limpa o localStorage
    localStorage.removeItem("usuarioLogado");

    // Redireciona para a tela de login
    window.location.href = "/medcontrol-sistema/front-end/medcontrol-login/index.html";

  } catch (error) {
    console.error("🔥 Erro no logout:", error);
    alert("Erro ao sair do sistema.");
  }
}
