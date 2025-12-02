// logout.js
export async function logoutUsuario() {
  try {
    // Chama o back-end para destruir a sessão
    const res = await fetch("https://medcontrol-backend.onrender.com/logout", {
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
    window.location.href = "https://projeto-medcontrol.vercel.app";

  } catch (error) {
    console.error("🔥 Erro no logout:", error);
    alert("Erro ao sair do sistema.");
  }
}
