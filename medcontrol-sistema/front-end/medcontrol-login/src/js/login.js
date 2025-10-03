// login.js (Configurações da tela de login)
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    login_funcionario: document.getElementById("username").value.trim(),
    senha_funcionario: document.getElementById("password").value.trim()
  };

  try {
    const res = await fetch("http://localhost:3001/login_funcionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const raw = await res.text();
    const data = JSON.parse(raw);

    // Verifica se login foi bem-sucedido
    if (!res.ok || !data.autenticado) {
      alert(data.mensagem || "Erro desconhecido.");
      return;
    }

    // Salva os dados do funcionário no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(data.funcionario));

    alert("✅ Login bem-sucedido!");
    console.log("🔐 Dados do funcionário:", data.funcionario);

    // Redireciona para o sistema
    window.location.href = "/medcontrol-sistema/front-end/medcontrol-sistema/sistema.html";

  } catch (error) {
    console.error("🔥 Erro no login:", error);
    alert("Erro ao tentar login.");
  }
});
