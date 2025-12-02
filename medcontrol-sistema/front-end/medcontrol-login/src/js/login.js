// login.js (Configurações da tela de login)
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    login_funcionario: document.getElementById("username").value.trim(),
    senha_funcionario: document.getElementById("password").value.trim()
  };

  try {
    const res = await fetch("https://medcontrol-backend.onrender.com/login_funcionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
    window.location.href = "/front-end/medcontrol-sistema/sistema.html#home";
    
  } catch (error) {
    console.error("🔥 Erro no login:", error);
    alert("Erro ao tentar login.");
  }
});
