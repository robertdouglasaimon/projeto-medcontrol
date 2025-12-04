// login.js (Configurações da tela de login)
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    login_funcionario: document.getElementById("username").value.trim(),
    senha_funcionario: document.getElementById("password").value.trim()
  };

  // Lista de possíveis endpoints (online primeiro, depois local)
  const endpoints = [
    {
      url: "https://medcontrol-backend.onrender.com/login_funcionario",
      redirect: "https://projeto-medcontrol.vercel.app/medcontrol-sistema/sistema.html#home" // página online
    },
    {
      url: "http://localhost:3001/login_funcionario",
      redirect: "http://127.0.0.1:5500/medcontrol-sistema/front-end/medcontrol-sistema/sistema.html#home" // página local
    }
  ];

  let sucesso = false;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados)
      });

      const raw = await res.text();
      const data = JSON.parse(raw);

      // Verifica se login foi bem-sucedido
      if (!res.ok || !data.autenticado) {
        console.warn(`⚠️ Falha no endpoint ${endpoint.url}:`, data.mensagem);
        continue; // tenta o próximo endpoint
      }

      // Se chegou aqui, login deu certo
      localStorage.setItem("usuarioLogado", JSON.stringify(data.funcionario));

      alert("✅ Login bem-sucedido!");
      console.log("🔐 Dados do funcionário:", data.funcionario);

      // Redireciona para a página correspondente (online ou local)
      window.location.href = endpoint.redirect;

      sucesso = true;
      break; // não precisa tentar os outros
    } catch (error) {
      console.error(`❌ Erro ao tentar ${endpoint.url}:`, error);
    }
  }

  if (!sucesso) {
    alert("Erro ao tentar login (nenhum servidor respondeu).");
  }
});
