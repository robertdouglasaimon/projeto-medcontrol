//------------------------------------------------------------------------------------------//
// cadastro_efetuado.js (Configurações da tela de cadastro efetuado)
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault(); // 🔒 Impede reload

  const dados = {
    nome_funcionario: document.getElementById("nome").value.trim(),
    cargo_funcionario: document.getElementById("cargo").value.trim(),
    tel_funcionario: document.getElementById("telefone").value.trim(),
    email_funcionario: document.getElementById("email").value.trim(),
    login_funcionario: document.getElementById("username").value.trim(),
    senha_funcionario: document.getElementById("senha").value.trim()
  };

  try {
    const res = await fetch("http://localhost:3001/cadastrar_funcionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    console.log("📡 Status da resposta:", res.status);
    console.log("📦 Tipo de conteúdo:", res.headers.get("content-type"));

    let data;
    try {
      const raw = await res.text(); // pega resposta bruta
      console.log("📄 Resposta bruta:", raw);
      data = JSON.parse(raw); // tenta converter manualmente
    } catch (jsonError) {
      console.error("❌ Erro ao converter resposta em JSON:", jsonError);
      alert("Erro inesperado ao processar resposta do servidor.");
      return;
    }

    if (!res.ok) {
      console.warn("⚠️ Resposta com erro:", data.mensagem);
      alert(data.mensagem || "Erro desconhecido.");
      return;
    }

    console.log("✅ Cadastro efetuado com sucesso:", data);
    alert("✅ Cadastro efetuado com sucesso!");

    // Redirecionamento para página de sucesso
    console.log("🔁 Redirecionando para página de sucesso...");
    window.location.href = "cadastro_efetuado.html";

  } catch (error) {
    console.error("🔥 Erro no fetch:", error);
    alert("Erro ao cadastrar funcionário. Detalhes no console.");
  }
});

//------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------//
