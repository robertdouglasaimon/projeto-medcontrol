export function render() {
    const div = document.createElement("div");
    div.classList.add("tela-funcionarios");
    div.innerHTML = `
    <!-- Seção de Cards - Funcionários -->
    <section class="funcionarios-cards">
      <div class="card-funcionarios">

        <div class="total-funcionarios">
          <p>
            <i class="fas fa-users"></i>
            Total de Funcionários
          </p>
          <span class="valores-funcionarios total-funcionarios-valor">
            <!-- Inserir aqui o total de funcionários pelo banco de dados -->
          </span>
        </div>

        <div class="funcionario-ativo">
          <p>
            <i class="fas fa-user-check"></i>
            Funcionários Ativos
          </p>
          <span class="valores-funcionarios funcionario-ativo-valor">
            <!-- Inserir aqui o total de funcionários ativos -->
          </span>
        </div>

        <div class="funcionario-desligado">
          <p>
            <i class="fas fa-user-times"></i>
            Funcionários Desligados
          </p>
          <span class="valores-funcionarios funcionario-desligado-valor">
            <!-- Inserir aqui o total de funcionários desligados -->
          </span>
        </div>
        </section>

        <section class="funcionarios-header">
          <h2>
            <i class="fas fa-user-tie"></i> Buscar funcionário
          </h2>

          <div class="funcionarios-pesquisa">
            <div class="input-wrapper">
              <input type="text" placeholder="Buscar por nome" class="buscar-input-funcionario"/>
              <button class="btn-novo-funcionario" id="btnNovoFuncionario">
                + Novo Funcionário
              </button>
            </div>
          </div>
        </section>

        <!-- Modal do botão 'Novo Funcionário'-->
        <div id="NovoFuncionario" class="modal hidden">
          
          <div class="modal-content">
            <span class="fechar-modal" id="fecharModal">&times;</span>
            <h3>Cadastrar Novo Funcionário</h3>
            
            <!-- Formulário de cadastro aqui -->
            <form class="cadastro-funcionario-modal">
              <label for="nome_funcionario">Nome do Funcionário</label>
              <input type="text" name="nome_funcionario" placeholder="Insira o nome do funcionário" required />

              <label for="cargo_funcionario">Cargo do Funcionário</label>
              <input type="text" name="cargo_funcionario" placeholder="Insira o cargo do funcionário" required />

              <label for="salario_funcionario">Salário do Funcionário</label>
              <input type="number" name="salario_funcionario" placeholder="Insira o salário do funcionário" required />

              <label for="tel_funcionario">Telefone do Funcionário</label>
              <input type="tel" name="tel_funcionario" placeholder="Insira o telefone do funcionário, ex: (99) 99999-9999" required />

              <label for="email_funcionario">E-mail do Funcionário</label>
              <input type="email" name="email_funcionario" placeholder="Insira o e-mail do funcionário, ex: ZB0k9@example.com" required />

              <label for="login_funcionario">Login do Funcionário</label>
              <input type="text" name="login_funcionario" placeholder="Insira o login do funcionário" required />

              <label for="senha_funcionario">Senha do Funcionário</label>
              <input type="text" name="senha_funcionario" placeholder="Insira a senha do funcionário" required />

              <label for="admissao">Data de Admissão</label>
              <input type="date" name="admissao" placeholder=" Insira a data de admissão" required />

              <label for="admissao">Data da Demissão</label>
              <input type="date" name="demissao" placeholder=" Insira a data de admissão" required />
  
              <label for="status">Status</label>
              <select name="status">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              
              <button type="submit" class="salvar">Salvar</button>
              <button type="button" class="cancelar">Cancelar</button>
            </form>
          </div>
        </div>


        <section class="funcionarios-tabela">
              <h2> <i class="fas fa-table"></i> Quadro de Funcionários </h2>
              <table>

                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Admissão</th>
                    <th>Desligamento</th>
                    <th>Salário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody> 
            
                <!-- Dados da tabela do banco de dados serão inseridos aqui -->
                <td>Carregando...</td>
                </tbody>

              </table>
            </section>
    `;

      // Script relacionado aos valores dos dashboard de funcionários:------------------------------------------------------
      setTimeout(() => {

      // Total de fornecedores:
       const funcionariosTotal = document.querySelector(".total-funcionarios-valor");
       fetch('http://localhost:3001/dashboard_funcionarios')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de funcionários');
         }
       })
       .then((data) => {
          funcionariosTotal.textContent = data.total_funcionario;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários:", error);
          funcionariosTotal.textContent = "Erro ao buscar total de funcionários";
       })

       // Funcionários ativos:
       const funcionariosAtivos = document.querySelector(".funcionario-ativo-valor");
       fetch('http://localhost:3001/dashboard_funcionarios_ativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de funcionários ativos');
         }
       })
       .then((data) => {
          funcionariosAtivos.textContent = data.total_funcionario_ativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários ativos:", error);
          funcionariosAtivos.textContent = "Erro ao buscar total de funcionários ativos";
       })

       // Funcionários inativos:
       const funcionariosInativos = document.querySelector(".funcionario-desligado-valor");
       fetch('http://localhost:3001/dashboard_funcionarios_inativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de funcionários inativos');
         }
       })
       .then((data) => {
          funcionariosInativos.textContent = data.total_funcionario_inativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de funcionários inativos:", error);
          funcionariosInativos.textContent = "Erro ao buscar total de funcionários inativos";
       })

      }, 0)

      // Script para barra de busca por nome do funcionário:-----------------------------------------------------------------
      setTimeout(() => {
        const input = div.querySelector(".buscar-input-funcionario");
        const table = div.querySelector(".funcionarios-tabela table tbody");

        input.addEventListener("input", () => {
          const itemQueSeraBuscado = input.value.toLowerCase();
          const linhas = table.querySelectorAll("tr");

          linhas.forEach((linha) => {
            const nomeFuncionario = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
            if (nomeFuncionario.includes(itemQueSeraBuscado)) {
              linha.style.display = "table-row";
            } else {
              linha.style.display = "none";
            }
          });
        });
      })

      // Script para abrir a tela de cadastro de funcionários pelo botão "+ Novo Funcionário":-------------------------------------------------------------
      setTimeout(() => {
      const form = div.querySelector(".cadastro-funcionario-modal");
      const table = div.querySelector(".funcionarios-tabela table tbody");
      const modal = div.querySelector("#NovoFuncionario");

      const btnNovoFornecedor = document.querySelector("#btnNovoFuncionario");
      const fecharModal = document.querySelector("#fecharModal");
      const btnCancelar = document.querySelector(".cancelar");


        // Abrir o modal
        if (btnNovoFornecedor && modal) {
            btnNovoFornecedor.addEventListener("click", () => {
                modal.classList.remove("hidden");
            });
        }

        // Fechar o modal pelo ícone ×
        if (fecharModal && modal) {
            fecharModal.addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        }

        // Fechar o modal pelo botão cancelar
        if (btnCancelar && modal) {
            btnCancelar.addEventListener("click", () => {
                modal.classList.add("hidden");
            });
        }

        // Fechar o modal ao clicar fora dele
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.add("hidden");
            }
        });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nome_funcionario = form.querySelector("input[name='nome_funcionario']").value.trim();
        const cargo_funcionario = form.querySelector("input[name='cargo_funcionario']").value.trim();
        const salario_funcionario = form.querySelector("input[name='salario_funcionario']").value.trim();
        const tel_funcionario = form.querySelector("input[name='tel_funcionario']").value.trim();
        const email_funcionario = form.querySelector("input[name='email_funcionario']").value.trim();
        const login_funcionario = form.querySelector("input[name='login_funcionario']").value.trim();
        const senha_funcionario = form.querySelector("input[name='senha_funcionario']").value.trim();
        const admissao = form.querySelector("input[name='admissao']").value.trim();
        const demissao = form.querySelector("input[name='demissao']").value.trim();
        const status = form.querySelector("select[name='status']").value;


        // ✅ Validações

        // Verifica se todos os campos foram preenchidos:
        if (
          !nome_funcionario ||
          !cargo_funcionario ||
          !salario_funcionario ||
          !tel_funcionario ||
          !email_funcionario ||
          !login_funcionario ||
          !senha_funcionario ||
          !admissao ||
          !demissao ||
          !status
        ) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
        
        // Verifica se o contato é um número de telefone fixo ou celular válido (apenas números):
        if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(tel_funcionario)) {
          alert("Por favor, insira um contato válido. Modelos aceitos: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX");
          return;
        }

        try {
          const resposta = await fetch("http://localhost:3001/cadastro_funcionarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_funcionario, cargo_funcionario, salario_funcionario, tel_funcionario, email_funcionario, login_funcionario, senha_funcionario, admissao, demissao, status }),
          })

          if (!resposta.ok) {
            const errorText = await resposta.text();
            console.error("❌ Status da resposta:", resposta.status);
            console.error("❌ Texto do erro:", errorText);
            throw new Error(errorText || "Erro ao cadastrar funcionario.");
          }

          const data = await resposta.json();
          alert(`✅ ${data.mensagem}`);
          form.reset();
          modal.classList.add("hidden");

          // ✅ Só adiciona na tabela se deu certo:
          const novaLinha = document.createElement("tr");
          novaLinha.innerHTML = `
            <td>${nome_funcionario}</td>
            <td>${cargo_funcionario}</td>
            <td>${admissao}</td>
            <td>${demissao}</td>
            <td>${salario_funcionario}</td>
            <td>${status}</td>
            <td>
              <button class="btn btn-warning  btn-funcionarios-editar">Editar</button>
              <button class="btn btn-danger  btn-funcionarios-excluir">Excluir</button>
            </td>
          `;

          alert("✅ Funcionario cadastrado com sucesso!");
          table.appendChild(novaLinha);

        } catch (error) {
          console.error("❌ Erro ao cadastrar funcionario:", error);
          return;
        }

      })

      }, 0);

      // Script para inserir os dados do banco de dados na tabela de funcionários:------------------------------------------------------------------
      setTimeout(() => {
        const tbody = div.querySelector("tbody");
        tbody.innerHTML = "";
        
        fetch('http://localhost:3001/tabela_funcionarios')  
        .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        }
          throw new Error('Erro ao buscar funcionários');
        })
        .then((data) => {
          data.forEach((item) => {
            const linha = document.createElement("tr");
            linha.setAttribute("data-id_funcionario", item.id_funcionario); 

            // Aqui é os dados que eu NÃO QUERO que apareçam na tabela mas que sejam usados no modal e
            // via botão editar:
            linha.setAttribute("data-tel_funcionario", item.tel_funcionario);
            linha.setAttribute("data-email_funcionario", item.email_funcionario);
            linha.setAttribute("data-login_funcionario", item.login_funcionario);
            linha.setAttribute("data-senha_funcionario", item.senha_funcionario);

            // Aqui é os dados que eu QUERO que apareçam na tabela:
            linha.innerHTML = `
              <td>${item.nome_funcionario}</td>
              <td>${item.cargo_funcionario}</td>
              <td>${item.admissao}</td>
              <td>${item.demissao}</td>
              <td>${item.salario_funcionario}</td>
              <td>${item.status}</td>
              <td>
                <button class="btn btn-warning  btn-funcionarios-editar">Editar</button>
                <button class="btn btn-danger  btn-funcionarios-excluir">Excluir</button>
              </td>
            `;
            tbody.appendChild(linha);
          })
        })
        .catch((error) => {
          console.error("❌ Erro ao buscar funcionarios:", error);
        });
   
      }, 100)

      // Script para editar a linha da tabela funcionários:------------------------------------:
      setTimeout(() => {
        const tbody = document.querySelector('tbody');

        tbody.addEventListener("click", async (event) => {
          const btn = event.target;
          if (!btn.classList.contains("btn-funcionarios-editar")) return;

          const linha = btn.closest("tr");
          const id_funcionario = linha.getAttribute("data-id_funcionario");

          // Dados visíveis na tabela
          const nome_funcionario = linha.querySelector("td:nth-child(1)").textContent;
          const cargo_funcionario = linha.querySelector("td:nth-child(2)").textContent;
          const admissao = linha.querySelector("td:nth-child(3)").textContent;
          const demissao = linha.querySelector("td:nth-child(4)").textContent;
          const salario_funcionario = linha.querySelector("td:nth-child(5)").textContent;
          const status = linha.querySelector("td:nth-child(6)").textContent;

          // Dados invisíveis armazenados como atributos:
          const tel_funcionario = linha.getAttribute("data-tel_funcionario");
          const email_funcionario = linha.getAttribute("data-email_funcionario");
          const login_funcionario = linha.getAttribute("data-login_funcionario");
          const senha_funcionario = linha.getAttribute("data-senha_funcionario");

          // Modal do botão editar:
          const modal = document.createElement("div");
          modal.classList.add("modal");
          modal.innerHTML = `
            <div class="modal-content">
              <h3>Editar Funcionário</h3>
              <form id="form-editar-funcionario">
                <label>Nome:</label>
                <input type="text" id="nome_funcionario" value="${nome_funcionario}" required>

                <label>Cargo:</label>
                <input type="text" id="cargo_funcionario" value="${cargo_funcionario}" required>

                <label>Admissão:</label>
                <input type="date" id="admissao" value="${admissao}" required>

                <label>Demissão:</label>
                <input type="date" id="demissao" value="${demissao}" required>

                <label>Salário:</label>
                <input type="number" id="salario_funcionario" value="${salario_funcionario}" required>

                <label>Status:</label>
                <select id="status" required>
                  <option value="Ativo" ${status === "Ativo" ? "selected" : ""}>Ativo</option>
                  <option value="Inativo" ${status === "Inativo" ? "selected" : ""}>Inativo</option>
                </select>

                <label>Telefone:</label>
                <input type="text" id="tel_funcionario" value="${tel_funcionario}" required>

                <label>Email:</label>
                <input type="email" id="email_funcionario" value="${email_funcionario}" required>

                <label>Login:</label>
                <input type="text" id="login_funcionario" value="${login_funcionario}" required>

                <label>Senha:</label>
                <input type="password" id="senha_funcionario" value="${senha_funcionario}" required>

                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn btn-secondary">Fechar</button>
              </form>
            </div>
          `;
          document.body.appendChild(modal);

          // Fecha o modal
          modal.addEventListener("click", (event) => {
            if (
              event.target.classList.contains("modal") ||
              event.target.classList.contains("btn-secondary")
            ) {
              modal.remove();
            }
          });

          // Salva os dados editados
          const form = document.querySelector("#form-editar-funcionario");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nome_funcionario = document.getElementById("nome_funcionario").value.trim();
            const cargo_funcionario = document.getElementById("cargo_funcionario").value.trim();
            const admissao = document.getElementById("admissao").value.trim();
            const demissao = document.getElementById("demissao").value.trim();
            const salario_funcionario = document.getElementById("salario_funcionario").value.trim();
            const status = document.getElementById("status").value;
            
            const tel_funcionario = document.getElementById("tel_funcionario").value.trim();
            const email_funcionario = document.getElementById("email_funcionario").value.trim();
            const login_funcionario = document.getElementById("login_funcionario").value.trim();
            const senha_funcionario = document.getElementById("senha_funcionario").value.trim();

            // Validações
            if (!nome_funcionario || !cargo_funcionario || !admissao || !demissao || !salario_funcionario || !status || !tel_funcionario || !email_funcionario || !login_funcionario || !senha_funcionario) {
              alert("Por favor, preencha todos os campos.");
              return;
            }

            if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(tel_funcionario)) {
              alert("Telefone inválido. Use (XX) XXXX-XXXX ou (XX) XXXXX-XXXX");
              return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_funcionario)) {
              alert("E-mail inválido.");
              return;
            }

            try {
              const resposta = await fetch(`http://localhost:3001/editar_funcionario/${id_funcionario}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  nome_funcionario,
                  cargo_funcionario,
                  admissao,
                  demissao,
                  salario_funcionario,
                  status,
                  tel_funcionario,
                  email_funcionario,
                  login_funcionario,
                  senha_funcionario
                })
              });

              if (!resposta.ok) {
                throw new Error("Erro ao editar o funcionário.");
              }

              const data = await resposta.json();

              // Atualiza os dados que vão aparecer na tabela:
              linha.querySelector("td:nth-child(1)").textContent = nome_funcionario;
              linha.querySelector("td:nth-child(2)").textContent = cargo_funcionario;
              linha.querySelector("td:nth-child(3)").textContent = admissao;
              linha.querySelector("td:nth-child(4)").textContent = demissao;
              linha.querySelector("td:nth-child(5)").textContent = salario_funcionario;
              linha.querySelector("td:nth-child(6)").textContent = status;

              // Atualiza os que NÃO VÃO APARECER NA TABELA:
              linha.setAttribute("data-tel_funcionario", tel_funcionario);
              linha.setAttribute("data-email_funcionario", email_funcionario);
              linha.setAttribute("data-login_funcionario", login_funcionario);
              linha.setAttribute("data-senha_funcionario", senha_funcionario);

              alert(`✅ ${data.mensagem}`);
              modal.remove();
            } catch (error) {
              console.error("❌ Erro ao editar o funcionário:", error);
              alert(`❌ ${error.message}`);
            }
          });
        });
      }, 0);

      // Script para excluir o funcionário:
      setTimeout(() => {
        const table = document.querySelector('table');

        table.addEventListener('click', async (event) => {
            if (event.target.classList.contains('btn-funcionarios-excluir')) {
              
            const linha = event.target.closest('tr');
            console.log('Linha para excluir seleciodanada:', linha);
            const id_funcionario = linha.getAttribute('data-id_funcionario');

                if (!id_funcionario) {
                    alert('❌ ID do funcionario não encontrado.');
                    return;
                }

                const confirmar = confirm('❓ Tem certeza de que deseja excluir o funcionário?');
                if (!confirmar) return;

                try {
                    const resposta = await fetch(`http://localhost:3001/deletar_funcionario/${id_funcionario}`, {
                    method: 'DELETE'
                    });

                    if (resposta.ok) {
                    alert('✅ Funcionário excluído com sucesso!');
                    linha.remove();
                    } else {
                    throw new Error('Erro ao excluir o lote.');
                    }
                } catch (error) {
                    console.error('❌ Erro ao excluir o funcionário:', error.message);
                    alert(`❌ Erro ao excluir o funcionário: ${error.message}`);

                }
            }
        });
      },0);
    

    return div
}