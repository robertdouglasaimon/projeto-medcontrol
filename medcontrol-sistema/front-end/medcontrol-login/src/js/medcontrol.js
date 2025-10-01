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
    const res = await fetch("http://localhost:3000/cadastrar_funcionario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const data = await res.json();

    if (res.ok) {
      // Redirecionar para a tela de cadastro efetuado:
      window.location.href = "cadastro_efetuado.html";
    } else {
      alert(data.mensagem);
    }
  } catch (error) {
    alert("Erro ao cadastrar funcionário.");
    console.error(error);
  }
});
