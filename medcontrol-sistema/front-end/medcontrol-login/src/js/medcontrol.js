// Funcionalidade de Cadastro:
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome_funcionario: document.getElementById("nome").value.trim(),
    cargo_funcionario: document.getElementById("cargo").value.trim(),
    tel_funcionario: document.getElementById("telefone").value.trim(),
    email_funcionario: document.getElementById("email").value.trim(),
    login_funcionario: document.getElementById("login").value.trim(),
    senha_funcionario: document.getElementById("senha").value.trim()
  };

  try {
    const res = await fetch("http://127.0.0.1:3000/cadastrar_funcionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    console.log("Status da resposta:", res.status);
    console.log("Tipo de conteúdo:", res.headers.get("content-type"));

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      console.error("Erro ao converter resposta em JSON:", jsonError);
      alert("Erro inesperado ao processar resposta do servidor.");
      return;
    }

    if (res.ok) {
      window.location.href = "/medcontrol-sistema/front-end/medcontrol-login/src/pages/cadastro_efetuado.html";
    } else {
      alert(data.mensagem || "Erro desconhecido.");
    }
  } catch (error) {
    console.error("Erro no fetch:", error);
    alert("Erro ao cadastrar funcionário. Detalhes no console.");
  }


});
