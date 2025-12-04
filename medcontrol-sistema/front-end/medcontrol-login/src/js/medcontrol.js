//----------------------------- cadastro_efetuado.js (Configurações da tela de cadastro efetuado) -----------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");
  if (!form) {
    console.warn("⚠️ Formulário #form-cadastro não encontrado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔒 Impede reload

    const nomeInput = document.getElementById("nome");
    if (!nomeInput) return; // ✅ ignora se não estiver na página certa

    const dados = {
      nome_funcionario: nomeInput.value.trim(),
      cargo_funcionario: document.getElementById("cargo").value.trim(),
      tel_funcionario: document.getElementById("telefone").value.trim(),
      email_funcionario: document.getElementById("email").value.trim(),
      login_funcionario: document.getElementById("username").value.trim(),
      senha_funcionario: document.getElementById("senha").value.trim()
    };

    // Online com VERCEL e RENDER:
    try {
        const cadastroRes = await fetch("https://medcontrol-backend.onrender.com/cadastrar_funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados)
      });

      console.log("📡 Status da resposta:", cadastroRes.status);
      console.log("📦 Tipo de conteúdo:", cadastroRes.headers.get("content-type"));

      let data;
      try {
        const raw = await cadastroRes.text();
        console.log("📄 Resposta bruta:", raw);
        data = JSON.parse(raw);
      } catch (jsonError) {
        console.error("❌ Erro ao converter resposta em JSON:", jsonError);
        alert("Erro inesperado ao processar resposta do servidor.");
        return;
      }

      if (!cadastroRes.ok) {
        console.warn("⚠️ Resposta com erro:", data.mensagem);
        alert(data.mensagem || "Erro desconhecido.");
        return;
      }

      console.log("✅ Cadastro efetuado com sucesso:", data);
      alert("✅ Cadastro efetuado com sucesso!");
      window.location.href = "cadastro_efetuado.html";

    } catch (error) {
      console.error("🔥 Erro no fetch:", error);
      alert("Erro ao cadastrar funcionário. Detalhes no console.");
    }

    // Offline com LOCALHOST:
    try {
        const cadastroRes = await fetch("http://localhost:3001/cadastrar_funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dados)
      });

      console.log("📡 Status da resposta:", cadastroRes.status);
      console.log("📦 Tipo de conteúdo:", cadastroRes.headers.get("content-type"));

      let data;
      try {
        const raw = await cadastroRes.text();
        console.log("📄 Resposta bruta:", raw);
        data = JSON.parse(raw);
      } catch (jsonError) {
        console.error("❌ Erro ao converter resposta em JSON:", jsonError);
        alert("Erro inesperado ao processar resposta do servidor.");
        return;
      }

      if (!cadastroRes.ok) {
        console.warn("⚠️ Resposta com erro:", data.mensagem);
        alert(data.mensagem || "Erro desconhecido.");
        return;
      }

      console.log("✅ Cadastro efetuado com sucesso:", data);
      alert("✅ Cadastro efetuado com sucesso!");
      window.location.href = "cadastro_efetuado.html";

    } catch (error) {
      console.error("🔥 Erro no fetch:", error);
      alert("Erro ao cadastrar funcionário. Detalhes no console.");
    }

  });
});
