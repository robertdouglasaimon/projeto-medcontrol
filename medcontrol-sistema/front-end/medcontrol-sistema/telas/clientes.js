export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-clientes");
  div.innerHTML = `
    <section class="clientes-cards">
      <div class="card-clientes">

        <div class="total-clientes">
          <p>
              <i class="fas fa-users"></i>
              Total de Clientes
          </p>
          <span class="valores-clientes total-clientes-valor">
            <!-- Inserir aqui o total de clientes pelo banco de dados -->
          </span>
        </div>

        <div class="cliente-ativo">
          <p>
              <i class="fas fa-thumbs-up"></i>
              Clientes Ativos
          </p>
          <span class="valores-clientes cliente-ativo-valor">
            <!-- Inserir aqui o total de clientes pelo banco de dados -->
          </span>
        </div>

        <div class="cliente-inativo">
          <p>
              <i class="fas fa-thumbs-down"></i>
              Clientes Inativos
          </p>
          <span class="valores-clientes cliente-inativo-valor">
            <!-- Inserir aqui o total de clientes pelo banco de dados -->
          </span>
        </div>

        <!--  <div class="cliente-receita">
          <p>
            <i class="fas fa-receipt"></i>
            Receita em Aberto
          </p>
          <span class="valores-clientes cliente-receita-valor">
            <!-- Inserir aqui o total de clientes pelo banco de dados -->
          </span>
        </div> -->
    
      </div>
    </section>

    <section class="clientes-header">
      <h2> <i class="fas fa-star"></i> Buscar cliente </h2>
    
      <div class="clientes-pesquisa">
        <div class="input-wrapper">
          <input type="text" placeholder="Buscar por nome" class="buscar-input" />
          <button class="btn-novo-cliente" id="btnNovoCliente">+ Novo Cliente</button>
        </div>
      </div>
    </section>

    <!-- Modal do botão 'Novo Cliente'-->
    <div id="modalNovoCliente" class="modal hidden">
      
      <div class="modal-content">
        <span class="fechar-modal" id="fecharModal">&times;</span>
        <h3>Cadastrar Novo Cliente</h3>
        <!-- Formulário de cadastro aqui -->
        <form class="cadastro-cliente-modal">
          <input type="text" name="nome_cliente" placeholder="Nome do cliente" required />
          <input type="text" name="telefone" placeholder="Insira o telefone" required />
          <input type="text" name="endereco" placeholder="Insira o endereço" required />
          <input type="text" name="cpf" placeholder="Insira o CPF" required />
          <select name="status_cliente">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <button type="submit">Salvar</button>
          <button type="button" class="cancelar">Cancelar</button>
        </form>
        
        <script>
          alert("Atenção: Atualize sempre todos os campos antes de salvar.  Mesmo que nenhuma alteração seja feita.");
        </script>
      </div>
    </div>

    <section class="clientes-tabela">
      <h2> <i class="fas fa-table"></i> Tabela de Clientes </h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dados da tabela do banco de dados serão inseridos aqui -->
        </tbody>
      </table>
    </section>

  `;

  // Script para barra de busca por nome de cliente:
  setTimeout(() => {
    const input = div.querySelector(".buscar-input");
    const table = div.querySelector(".clientes-tabela table tbody");

    input.addEventListener("input", () => {
      const itemQueSeraBuscado = input.value.toLowerCase();
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        const nome = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        if (nome.includes(itemQueSeraBuscado)) {
          row.style.display = "";
        } else {
          row.style.display = "none";      
        }

        /** Dicionário de expressões:
         * const nome = row.querySelector("td:nth-child(1)").textContent.toLowerCase() = Pega o nome do cliente na tabela e transforma em minusculos.
         * 
         * if (nome.includes(itemQueSeraBuscado)) = Se o nome do cliente contiver o item que será buscado, ele mostra o cliente.
         * 
         * row.style.display = ""; = Se o nome do cliente contiver o item que será buscado, ele mostra o cliente.
         * 
         * row.style.display = "none"; = Se o nome do cliente nao contiver o item que sera buscado, ele nao mostra o cliente.
         */
      });
    });
  }, 0);

  // Script para cadastrar um novo cliente pelo botão e modal "+ Novo Cliente":
  setTimeout(() => {
    const form = div.querySelector(".cadastro-cliente-modal");
    const table = div.querySelector(".clientes-tabela table tbody");
    const modal = div.querySelector("#modalNovoCliente");


  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = form.querySelector("input[name='nome_cliente']").value;
    const telefone = form.querySelector("input[name='telefone']").value;
    const endereco = form.querySelector("input[name='endereco']").value;
    const cpf = form.querySelector("input[name='cpf']").value;
    const status = form.querySelector("select[name='status_cliente']").value;

    // ✅ Validações

    // Verifica se todos os campos foram preenchidos:
    if (!nome || !telefone || !endereco || !cpf || !status) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    // Verifica se o CPF possui 11 dígitos:
    if (cpf.length !== 14) {
      alert("O CPF deve conter 14 caracteres (Considerando o formato XXX.XXX.XXX-XX).");
      return;
    }

    // Verificando se o CPF ta sendo escrito de forma correta:
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      alert("O CPF deve estar no formato 000.000.000-00.");
      return;
    }

    // Verifica se o telefone possui 14 dígitos:
    if (telefone.length !== 11) {
      alert("O telefone deve conter 11 caracteres.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/novo_cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome_cliente: nome,
          telefone,
          endereco,
          cpf,
          status_cliente: status
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao cadastrar cliente.");
      }

      const data = await response.json();
      alert(`✅ ${data.mensagem}`);
      form.reset();
      modal.classList.add("hidden");

      // ✅ Só adiciona na tabela se deu certo
      const novaLinha = document.createElement("tr");
      novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${telefone}</td>
        <td>${endereco}</td>
        <td>${cpf}</td>
        <td>${status}</td>
        <td>
          <button class="btn btn-warning editar-cliente">Editar</button>
          <button class="btn btn-danger excluir-cliente">Excluir</button>
        </td>
      `;
      table.appendChild(novaLinha);

    } catch (error) {
      console.error('❌ Erro ao cadastrar cliente:', error.message);
      alert(`❌ ${error.message}`);
    }
  });


  }, 0);

  // Script para abrir e fechar o modal:
  setTimeout(() => {
    const btn = div.querySelector("#btnNovoCliente");
    const modal = div.querySelector("#modalNovoCliente");
    const close = div.querySelector("#fecharModal");
    const cancelar = div.querySelector(".cancelar");

    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    close.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    cancelar.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Script para fechar o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }, 0);

  // Scrip para inserir os dados especificos puxados do banco de dados nos dashboards:
  setTimeout(() => {


    // Inserindo o total de clientes no dashboard
    const totalClientes = div.querySelector(".total-clientes-valor");
    fetch("http://localhost:3000/total_clientes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Erro ao buscar clientes:", error);
      }
    })
    .then((data) => {
      totalClientes.textContent = data[0].total_clientes;
    })
    .catch((error) => {
      console.error("Erro ao buscar clientes:", error);
    });


    // Inserindo o total de clientes ativos no dashboard
    const totalClientesAtivos = div.querySelector(".cliente-ativo-valor");
    fetch("http://localhost:3000/total_clientes_ativos")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Erro ao buscar clientes:", error);
      }
    })
    .then((data) => {
      totalClientesAtivos.textContent = data[0].total_clientes_ativos;
    })
    .catch((error) => {
      console.error("Erro ao buscar clientes:", error);
    });


    // Inserindo o total de clientes inativos no dashboard
    const totalClientesInativos = div.querySelector(".cliente-inativo-valor");
    fetch("http://localhost:3000/total_clientes_inativos")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Erro ao buscar clientes:", error);
      }
    })
    .then((data) => {
      totalClientesInativos.textContent = data[0].total_clientes_inativos;
    })
    .catch((error) => {
      console.error("Erro ao buscar clientes:", error);
    });


  }, 0);


  // Script para inserir os dados do banco de dados na tabela:
  setTimeout(() => {
    // Inserindo os dados do banco na tabela de clientes:
    const tbody = div.querySelector("tbody");
    tbody.innerHTML = ""; // Limpa o conteúdo anterior

    // Criando a função para receber os dados do banco de dados via fetch no na tabela
    fetch("http://localhost:3000/tabela_clientes") 
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", item.id_cliente);
        row.innerHTML = `
          <td>${item.nome_cliente}</td>
          <td>${item.telefone}</td>
          <td>${item.endereco}</td>
          <td>${item.cpf}</td>
          <td>${item.status_cliente}</td>
          <td>
            <button class="btn btn-warning  editar-cliente">Editar</button>
            <button class="btn btn-danger  excluir-cliente">Excluir</button>
          </td>
        `;
        tbody.appendChild(row);
    })
    })
  }, 0);


  // Editando os itens da tabela pelo front através do botão editar e excluindo pelo botão excluir:
  setTimeout(() => {
    const tbody = div.querySelector("tbody");

    // Script para excluir um cliente:
    tbody.addEventListener("click", async (event) => {
      const btn = event.target;
      if (!btn.classList.contains("excluir-cliente")) return;

      const row = btn.closest("tr");
      const id_cliente = row.getAttribute("data-id");
      console.log("ID do cliente:", id_cliente);

      const confirmar = confirm("Tem certeza que deseja excluir esse cliente?");
      if (!confirmar) return;

      try {
        const res = await fetch(`http://localhost:3000/deletar_cliente/${id_cliente}`, {
          method: "DELETE"
        });
        console.log("Status da resposta:", res.status);

        if (!res.ok) {
          throw new Error("Erro ao excluir cliente!");
        }

        const data = await res.json();
        console.log("Resposta do servidor:", data);

        row.remove();
        alert(`✅ ${data.mensagem}`);
      } catch (error) {
        console.error("❌ Erro ao excluir cliente:", error.message);
        alert(`❌ ${error.message}`);
      }

    });

// Script para editar os dados de um cliente (Modal de editar): -------------------------------
    tbody.addEventListener("click", async (event) => {
      const btn = event.target;
      if (!btn.classList.contains("editar-cliente")) return;

      const row = btn.closest("tr");
      const id_cliente = row.getAttribute("data-id");
      console.log("ID do cliente:", id_cliente);

      const nome = row.querySelector("td:nth-child(1)").textContent;
      const telefone = row.querySelector("td:nth-child(2)").textContent;
      const endereco = row.querySelector("td:nth-child(3)").textContent;
      const cpf = row.querySelector("td:nth-child(4)").textContent;
      const status = row.querySelector("td:nth-child(5)").textContent;

      console.log("Dados do cliente:", { id_cliente, nome, telefone, endereco, cpf, status });

      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <h3>Editar Cliente</h3>
          <form id="form-editar-cliente">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input type="text" id="nome" value="${nome}" required>
            </div>
            <div class="form-group">
              <label for="telefone">Telefone:</label>
              <input type="text" id="telefone" value="${telefone}" required>
            </div>
            <div class="form-group">
              <label for="endereco">Endereço:</label>
              <input type="text" id="endereco" value="${endereco}" required>
            </div>
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" value="${cpf}" required>
            </div>

            <label for="status">Status:</label>
            <select name="Status" id="status-cliente">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>

            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-secondary close-modal">Fechar</button>
          </form>
        </div>
      `;

      document.body.appendChild(modal);

// Fecha o modal ao clicar no botão "fechar" ou clicar "fora do modal": ---------------------
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("close-modal") || event.target.classList.contains("modal")) {
        modal.remove();
      }
    });

// Script para salvar os dados editados:------------------------------------------------------
      const form = document.getElementById("form-editar-cliente");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const cpf = document.getElementById("cpf").value;
        const status = document.getElementById("status-cliente").value;

        // Validações

        // Verifica se todos os campos foram preenchidos:
        if (!nome || !telefone || !endereco || !cpf || !status) {
          alert("Todos os campos devem ser preenchidos!");
          return;
        }

        // Verifica se o CPF está no formato correto:
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
          alert("O CPF deve estar no formato XXX.XXX.XXX-XX!");
          return;
        }

        // Verifica se o telefone está no formato correto:
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
          alert("O telefone deve estar no formato (XX) XXXXX-XXXX!");
          return;
        }
 
        try {
          console.log("Dados enviados:", { nome, telefone, endereco, cpf, status });
          const res = await fetch(`http://localhost:3000/editar_cliente/${id_cliente}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome_cliente: nome, telefone, endereco, cpf, status_cliente: status })
          });
          if (!res.ok) {
            throw new Error("Erro ao editar cliente!");
          } else {
            const data = await res.json();
            console.log("Resposta do servidor:", data);
            row.querySelector("td:nth-child(1)").textContent = nome;
            row.querySelector("td:nth-child(2)").textContent = telefone;
            row.querySelector("td:nth-child(3)").textContent = endereco;
            row.querySelector("td:nth-child(4)").textContent = cpf;
            row.querySelector("td:nth-child(5)").textContent = status;
            alert(`✅ ${data.mensagem}`);
          }
        } catch (error) {
          console.error("❌ Erro ao editar cliente:", error.message);
          alert(`❌ ${error.message}`)
        }
        modal.remove();
      });
    });   
  },0);



  return div;
}


