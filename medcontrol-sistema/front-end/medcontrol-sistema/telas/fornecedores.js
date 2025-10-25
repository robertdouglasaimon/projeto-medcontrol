export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-fornecedores");
  div.innerHTML = `
      <section class="fornecedores-cards">

        <div class="card-fornecedores">

          <div class="total-de-fornecedores">
            <p>
              <i class="fa fa-building"></i>
              Total de Fornecedores
            <p>
            <span class="valores-fornecedores fornecedores-total-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

          <div class="fornecedores-ativos">
            <p>
              <i class="fa fa-handshake"></i>
              Ativos
            </p>
            <span class="valores-fornecedores  fornecedores-ativos-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

          <div class="fornecedores-inativos">
            <p>
              <i class="fa fa-times-circle"></i>
              Inativos
            </p>
            <span class="valores-fornecedores  fornecedores-inativos-valor">
              <!-- Inserir aqui o total de clientes pelo banco de dados -->
            </span>
          </div>

        </div>
      </section>

      <section class="fornecedores-header">
        <h2> <i class="fas fa-star"></i> Buscar fornecedor</h2>
      
        <div class="fornecedor-pesquisa">
          <div class="input-wrapper">

            <input type="text" placeholder="Buscar por nome" class="buscar-input" />
            <button class="btn-novo-fornecedor" id="btnNovoFornecedor">+ Novo Fornecedor</button>
          </div>
        </div>
      </section>

     <!-- Modal do botão 'Novo Fornecedor'-->
      <div id="NovoFornecedor" class="modal hidden">
        
        <div class="modal-content">
          <span class="fechar-modal" id="fecharModal">&times;</span>
          <h3>Cadastrar Novo Fornecedor</h3>
          
          <!-- Formulário de cadastro aqui -->
          <form class="cadastro-fornecedor-modal">
            <input type="text" name="nome_fornecedor" placeholder="Nome da empresa" required />
            <input type="text" name="cnpj" placeholder="Insira o CNPJ" required />
            <input type="text" name="contato" placeholder="Insira o contato" required />

            <select name="status">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
            
            <button type="submit">Salvar</button>
            <button type="button" class="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    
      <section class="fornecedores-tabela">
        <h2> <i class="fas fa-table"></i> Tabela de Fornecedores</h2>

        <table>
          <thead>
            <tr>
              <th>Nome de Empresa</th>
              <th>CNPJ</th>
              <th>Contato</th>
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

    // Script relacionado aos valores dos dashboard de fornecedores:------------------------------------------------------
    setTimeout(() => {

       // Total de fornecedores:
       const fornecedoresTotal = document.querySelector(".fornecedores-total-valor");
       fetch('http://localhost:3001/dashboard_fornecedores_total')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de fornecedores');
         }
       })
       .then((data) => {
          fornecedoresTotal.textContent = data.total_fornecedores;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de fornecedores:", error);
          fornecedoresTotal.textContent = "Erro ao buscar total de fornecedores";
       })

      // Total de fornecedores ativos:
       const fornecedoresAtivos = document.querySelector(".fornecedores-ativos-valor");
       fetch('http://localhost:3001/dashboard_fornecedores_ativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de fornecedores');
         }
       })
       .then((data) => {
          fornecedoresAtivos.textContent = data.total_fornecedores_ativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de fornecedores:", error);
          fornecedoresAtivos.textContent = "Erro ao buscar total de fornecedores";
       })

      // Total de fornecedores inativos:
       const fornecedoresInativos = document.querySelector(".fornecedores-inativos-valor");
       fetch('http://localhost:3001/dashboard_fornecedores_inativos')
       .then((resposta) => {
         if (resposta.ok) {
            return resposta.json();
         } else {
            throw new Error('Erro ao buscar total de fornecedores');
         }
       })
       .then((data) => {
          fornecedoresInativos.textContent = data.total_fornecedores_inativos;
       })
       .catch((error) => {
          console.error("❌ Erro ao buscar total de fornecedores:", error);
          fornecedoresInativos.textContent = "Erro ao buscar total de fornecedores";
       })





    }, 0)

    // Script para barra de busca por nome do fornecedor:-----------------------------------------------------------------
    setTimeout(() => {
      const input = div.querySelector(".buscar-input");
      const table = div.querySelector(".fornecedores-tabela table tbody");

      input.addEventListener("input", () => {
        const itemQueSeraBuscado = input.value.toLowerCase();
        const linhas = table.querySelectorAll("tr");

        linhas.forEach((linha) => {
          const nomeFornecedor = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
          if (nomeFornecedor.includes(itemQueSeraBuscado)) {
            linha.style.display = "table-row";
          } else {
            linha.style.display = "none";
          }
        });
      });
    }, 0);

    // Script para cadastrar um novo fornecedor pelo botão e modal "+ Novo Fornecedor":--------------------------------------
    setTimeout(() => {
      const form = div.querySelector(".cadastro-fornecedor-modal");
      const table = div.querySelector(".fornecedores-tabela table tbody");
      const modal = div.querySelector("#NovoFornecedor");

      const btnNovoFornecedor = document.querySelector("#btnNovoFornecedor");
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
        
        const nome_fornecedor = form.querySelector('input[name="nome_fornecedor"]').value;
        const cnpj = form.querySelector('input[name="cnpj"]').value;
        const contato = form.querySelector('input[name="contato"]').value;
        const status = form.querySelector('select[name="status"]').value;

        // ✅ Validações

        // Verifica se todos os campos foram preenchidos:
        if (!nome_fornecedor || !cnpj || !contato || !status) {
          alert("Por favor, preencha todos os campos.");
          return;
        }
        
        // Verifica se o CNPJ é válido:
        if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj)) {
          alert("Por favor, insira um CNPJ válido. Modelo: XX.XXX.XXX/XXXX-XX");
          return;
        }

        // Verifica se o contato é um número de telefone fixo ou celular válido:
        if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(contato)) {
          alert("Por favor, insira um contato válido. Modelos aceitos: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX");
          return;
        }

        try {
          const resposta = await fetch("http://localhost:3001/cadastro_fornecedores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_fornecedor, cnpj, contato, status })
          })

          if (!resposta.ok) {
            const errorText = await resposta.text();
            throw new Error(errorText || "Erro ao cadastrar fornecedor");
          }

          const data = await resposta.json();
          alert(`✅ ${data.mensagem}`);
          form.reset();
          modal.classList.add("hidden");

          // ✅ Só adiciona na tabela se deu certo:
          const novaLinha = document.createElement("tr");
          
          novaLinha.innerHTML = `
            <td>${nome_fornecedor}</td>
            <td>${cnpj}</td>
            <td>${contato}</td>
            <td>${status}</td>
            <td>
              <button class="btn btn-warning  btn-fornecedores-editar">Editar</button>
              <button class="btn btn-danger  btn-fornecedores-excluir">Excluir</button>
            </td>
          `;
          table.appendChild(novaLinha);

        } catch (error) {
          console.error("❌ Erro ao cadastrar fornecedor:", error);
          return;
        }

      })

    }, 0);

    // Script para inserir os dados do banco de dados na tabela de fornecedores------------------------------------
    setTimeout(() => {
      const tbody = div.querySelector("tbody");
      tbody.innerHTML = "";
      
      fetch('http://localhost:3001/tabela_fornecedores')  
      .then((response) => {
      if (response.ok) {
        return response.json();
      }
        throw new Error('Erro ao buscar fornecedores');
      })
      .then((data) => {
        data.forEach((item) => {
          const linha = document.createElement("tr");
          linha.setAttribute("data-id_fornecedor", item.id_fornecedor); 
          linha.innerHTML = `
            <td>${item.nome_fornecedor}</td>
            <td>${item.cnpj}</td>
            <td>${item.contato}</td>
            <td>${item.status}</td>
            <td>
              <button class="btn btn-warning  btn-fornecedores-editar">Editar</button>
              <button class="btn btn-danger  btn-fornecedores-excluir">Excluir</button>
            </td>
          `;
          tbody.appendChild(linha);
        })
      })    
    }, 0);




  return div;    
}
