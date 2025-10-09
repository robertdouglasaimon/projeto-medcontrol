export function render() {
  const div = document.createElement("div");
  div.classList.add("tela-produtos");
  div.innerHTML = `
    <section class="produtos-cards"> 

      <div class="card-produtos total-produtos">
        <p>
          <i class="fas fa-box"></i>
          Total de Produtos
        </p>
        <span class="produtos-total total-produtos-valor"></span>
      </div>

      <div class="card-produtos produto-mais-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produto ➕ Vendido
        </p>
        <span class="valores-produtos-mais-vendidos  valor-mais-vendido"></span>
      </div>

      <div class="card-produtos produto-menos-vendido">
        <p>
          <i class="fas fa-chart-line"></i>
          Produto ➖ Vendido
        </p>
        <span class="valores-produtos-menos-vendidos valor-menos-vendido"></span>
      </div>

      <div class="card-produtos valor-estoque">
        <p>
          <i class="fas fa-money-bill"></i>
          Valor do Estoque
        </p>
        <span class="valores-produtos-estoque valor-estoque-valor"></span>
      </div>

    </section>

    <section class="produtos-header">
      <h2> <i class="fas fa-box"></i> Buscar produto </h2>

      <div class="produto-pesquisa">
        <div class="input-wrapper">
          <input type="text" placeholder="Buscar por produto" class="buscar-input" />
          <button class="btn-novo-produto" id="btnNovoProduto">+ Novo Produto</button>
        </div>
      </div>
    </section>

    <!-- Modal do botão 'Novo Produto' -->
    <div id="modalNovoProduto" class="modal hidden">  
      <div class="modal-content">
        <span class="fechar-modal" id="fecharModal">&times;</span>
        <h3>Cadastrar Novo Produto</h3>

        <!-- Formulário de cadastro aqui -->
        <form class="cadastro-produto-modal">
          <input type="text" name="nome_produto" placeholder="Nome do produto" required />
          <input type="text" name="descricao" placeholder="Descrição do produto" required />
          <input type="text" name="fabricante" placeholder="Fabricante do produto" required />
          <input type="text" name="qtd_estoque" placeholder="Quantidade em estoque" required />
          <input type="text" name="lote" placeholder="Código do lote" required />
          <input type="date" name="data_validade" required />
          <input type="text" name="preco_venda" placeholder="Valor da unidade" required />
          <input type="text" name="quantidade_vendida" placeholder="Quantidade vendida" required />

          <button type="submit">Salvar</button>
          <button type="button" class="cancelar">Cancelar</button>
        </form>
      </div>
    </div>




    <section class="produtos-lista">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Fabricante</th>
            <th>Quantidade</th>
            <th>Lote</th>
            <th>Validade</th>
            <th>Valor</th>
            <th>Quantidade Vendida</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        <!-- Inserir aqui os produtos pelo banco de dados -->
        <td>
          <button class="btn btn-primary btn-editar-produto">Editar</button>
          <button class="btn btn-danger btn-excluir-produto">Excluir</button>
        </td>
        </tbody>
      </table>
    </section>
    
  `;

  // Scrip para inserir os dados especificos puxados do banco de dados nos dashboards:
  setTimeout(() => {

    // Total de produtos:  -------------------------------------------------------//
    const totalProdutos = div.querySelector(".total-produtos-valor");
    fetch("http://localhost:3001/dashboard_produtos")
    .then((response) => {
      if(response.ok) {
        console.log("Dados puxados com sucesso!")
        return response.json();
        
      } else {
        res.status(500).json({ mensagem: "Erro ao buscar o total de produtos." });
      }
    })
    .then((totalProduto) => {
      totalProdutos.textContent = totalProduto.total_produtos;
    }) 
    .catch ((err) => {
      console.error("❌ Erro ao buscar o total de produtos:", err.message);
      res.status(500).json({ mensagem: "Erro ao buscar o total de produtos." });
    });
    //------------------------------------------------------------------------------//
    
    // Total de produtos vendidos:  ------------------------------------------------//
    const totalProdutosVendidos = div.querySelector(".valor-mais-vendido");
    fetch("http://localhost:3001/dashboard_produtos_mais_vendidos")
    .then((response) => {
      if(response.ok) {
        console.log("Dados puxados com sucesso!")
        return response.json();
        
      } else {
        res.status(500).json({ mensagem: "Erro ao buscar o total de produtos vendidos." });
      }
    })
    .then((totalVendido) => {
      // totalProdutosVendidos.textContent = totalVendido.total_vendido;
      totalProdutosVendidos.textContent = totalVendido.nome_produto;
    }) 
    .catch ((err) => {
      console.error("❌ Erro ao buscar o total de produtos vendidos:", err.message);
      res.status(500).json({ mensagem: "Erro ao buscar o total de produtos vendidos." });
    });
    //------------------------------------------------------------------------------//

    //------------------------------------------------------------------------------//
    // Total de produtos menos vendidos:  -------------------------------------------//
    const totalProdutosMenosVendidos = div.querySelector(".valor-menos-vendido");
    fetch("http://localhost:3001/dashboard_produtos_menos_vendidos")
    .then((response) => {
      if(response.ok) {
        console.log("Dados puxados com sucesso!")
        return response.json();
        
      } else {
        res.status(500).json({ mensagem: "Erro ao buscar o total de produtos menos vendidos." });
      }
    })
    .then((MenosVendido) => {
      totalProdutosMenosVendidos.textContent = MenosVendido.nome_produto;
    }) 
    .catch ((err) => {
      console.error("❌ Erro ao buscar o total de produtos menos vendidos:", err.message);
      res.status(500).json({ mensagem: "Erro ao buscar o total de produtos menos vendidos." });
    });
    //------------------------------------------------------------------------------//
   
    //------------------------------------------------------------------------------//
    // Total do Estoque de produtos ------------------------------------------------//
    const totalEstoque = div.querySelector(".valor-estoque-valor");
    fetch("http://localhost:3001/dashboard_total_estoque")
    .then((response) => {
      if(response.ok) {
        console.log("Dados puxados com sucesso!")
        return response.json();
        
      } else {
        res.status(500).json({ mensagem: "Erro ao buscar o total do estoque." });
      }
    })
    .then((totalValor) => {
      totalEstoque.textContent = totalValor.total_estoque;
    }) 
    .catch ((err) => {
      console.error("❌ Erro ao buscar o total do estoque:", err.message);
      res.status(500).json({ mensagem: "Erro ao buscar o total do estoque." });
    });
    //------------------------------------------------------------------------------//






  },0);

  // Scrip relacionado a barra de buscar produtos (Por nome, fabricante ou lote):
  setTimeout(() => {
    const input = div.querySelector(".buscar-input");
    const table = div.querySelector(".produtos-lista table tbody");

    input.addEventListener("input", () => {
      const itemQueSeraBuscado = input.value.toLowerCase();
      const rows = table.querySelectorAll("tr");

      rows.forEach((row) => {
        const nome = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        if (nome.includes(itemQueSeraBuscado)) {
          row.style.display = "";
        } else {
          row.style.display = "none";      
        };
      });    
    });
  },0);

  // Script para cadastrar um novo cliente pelo botão e modal "+ Novo Produto":
    setTimeout(() => {
      const form = div.querySelector(".cadastro-produto-modal");
      const table = div.querySelector(".produtos-lista table tbody");
      const modal = div.querySelector("#modalNovoProduto");

      const btnNovoProduto = div.querySelector("#btnNovoProduto");
      const fecharModal = div.querySelector("#fecharModal");
      const btnCancelar = div.querySelector(".cancelar");

      // Abrir o modal
      if (btnNovoProduto && modal) {
        btnNovoProduto.addEventListener("click", () => {
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


      // Se clicar fora do modal, ele fecha
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.classList.add("hidden");
        }
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nome_produto = form.querySelector("input[name='nome_produto']").value.trim();
        const descricao = form.querySelector("input[name='descricao']").value.trim();
        const fabricante = form.querySelector("input[name='fabricante']").value.trim();
        const qtd_estoque = form.querySelector("input[name='qtd_estoque']").value.trim();
        const lote = form.querySelector("input[name='lote']").value.trim();
        const data_validade = form.querySelector("input[name='data_validade']").value.trim();
        const preco_venda = form.querySelector("input[name='preco_venda']").value.trim();
        const quantidade_vendida = form.querySelector("input[name='quantidade_vendida']").value.trim();

        // ✅ Validações

        // Verifica se todos os campos foram preenchidos:
        if (!nome_produto || !descricao || !fabricante || !qtd_estoque || !lote || !data_validade || !preco_venda || !quantidade_vendida) {
          alert("Por favor, preencha todos os campos.");
          return;
        }

        // Verifica se o campo da data de validade foi preenchido corretamente:
        if (data_validade && !/^\d{4}-\d{2}-\d{2}$/.test(data_validade)) {
          alert("Por favor, insira a data de validade no formato AAAA-MM-DD.");
          return;
        }


        try {
          const response = await fetch('http://localhost:3001/novo_produto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome_produto,
              descricao,
              fabricante,
              qtd_estoque,
              lote,
              data_validade,
              preco_venda,
              quantidade_vendida
            })
          });

          const data = await response.json();

          // Verifica se a resposta foi negativa
          if (!response.ok) {
            throw new Error(data.mensagem || "Erro ao cadastrar o produto.");
          }

          alert(`✅ ${data.mensagem}`);
          form.reset();
          form.querySelector("input[name='nome_produto']").focus(); // foca no primeiro campo após reset
          modal.classList.add("hidden");

          // ✅ Só adiciona na tabela se deu certo
          const novaLinha = document.createElement("tr");
          novaLinha.innerHTML = `
            <td>${nome_produto}</td>
            <td>${descricao}</td>
            <td>${fabricante}</td>
            <td>${qtd_estoque}</td>
            <td>${lote}</td>
            <td>${data_validade}</td>
            <td>${preco_venda}</td>
            <td>${quantidade_vendida}</td>
            <td>
              <button class="btn btn-warning btn-editar-produto">Editar</button>
              <button class="btn btn-danger btn-excluir-produto">Excluir</button>
            </td>
          `;
          table.appendChild(novaLinha);

        } catch (error) {
          console.error('❌ Erro ao cadastrar o produto:', error.message);
          alert(`❌ ${error.message}`);
        }
      });
    }, 0);

  // Puxando os produtos do banco de dados e inserindo na tabela de produtos:
  setTimeout(() => {
    const tbody = div.querySelector("tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3001/cadastro_produtos")
    .then(response => {
      if(response.ok) {
        return response.json();
      }
    })
    .then(produtos => {
      produtos.forEach((item) => {
        const row = document.createElement("tr");
        row.setAttribute("nome_produto", item.nome_produto);
        row.setAttribute("data-id_produto", item.id_produto); // ✅ necessário para editar e excluir.
        row.innerHTML = `
          <td>${item.nome_produto}</td>
          <td>${item.descricao}</td>
          <td>${item.fabricante}</td>
          <td>${item.qtd_estoque}</td>
          <td>${item.lote}</td>
          <td>${item.data_validade}</td>
          <td>${item.preco_venda}</td>
          <td>${item.quantidade_vendida}</td>
          <td>
            <button class="btn btn-primary btn-editar-produto">Editar</button>
            <button class="btn btn-danger btn-excluir-produto">Excluir</button>
          </td>
        `;
         tbody.appendChild(row);
     
      })
    })

  },0);


  // Excluindo os itens da tabela pelo front através do botão excluir (modificando no banco de dados as informações do produto):
  setTimeout(() => {
      const tbody = div.querySelector("tbody");

    // Script para excluir um produto:
    tbody.addEventListener("click", async (event) => {
      const btn = event.target;
      if (!btn.classList.contains("btn-excluir-produto")) return;

      const row = btn.closest("tr");
      const nome_produto = row.getAttribute("nome_produto");
      console.log("Nome do produto:", nome_produto);

      const confirmar = confirm("Tem certeza que deseja excluir esse produto?");
      if (!confirmar) return;

      try {
        const res = await fetch(`http://localhost:3001/deletar_produto/${nome_produto}`, {
          method: "DELETE"
        });
        console.log("Status da resposta:", res.status);

        if (!res.ok) {
          throw new Error("Erro ao excluir o produto!");
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
  },0);

  // Editando os itens da tabela pelo front através do botão editar (modificando no banco de dados as informações do produto):
  setTimeout(() => {
    const tbody = div.querySelector("tbody");

    tbody.addEventListener("click", async (event) => {
      const btn = event.target;
      if (!btn.classList.contains("btn-editar-produto")) {
        return;
      } else {
        btn.classList.add("hidden");
      }

      const row = btn.closest("tr");
      const id_produto = row.getAttribute("data-id_produto");
      console.log("ID capturado:", id_produto);

      const nome_produto = row.querySelector("td:nth-child(1)").textContent;
      const descricao = row.querySelector("td:nth-child(2)").textContent;
      const fabricante = row.querySelector("td:nth-child(3)").textContent;
      const qtd_estoque = row.querySelector("td:nth-child(4)").textContent;
      const lote = row.querySelector("td:nth-child(5)").textContent;
      const data_validade = row.querySelector("td:nth-child(6)").textContent;
      const preco_venda = row.querySelector("td:nth-child(7)").textContent;
      const quantidade_vendida = row.querySelector("td:nth-child(8)").textContent;

      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <h3>Editar Produto</h3>
          <form class="cadastro-produto-modal" id="cadastro-produto-modal">
            <label for="nome_produto">Nome do Produto:</label>
            <input type="text" id="nome_produto" value="${nome_produto}" required>
            <label for="descricao">Descrição:</label>
            <input type="text" id="descricao" value="${descricao}" required>
            <label for="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" value="${fabricante}" required>
            <label for="qtd_estoque">Quantidade em Estoque:</label>
            <input type="number" id="qtd_estoque" value="${qtd_estoque}" required>
            <label for="lote">Lote:</label>
            <input type="text" id="lote" value="${lote}" required>
            <label for="data_validade">Data de Validade:</label>
            <input type="date" id="data_validade" value="${data_validade}" required>
            <label for="preco_venda">Preço de Venda:</label>
            <input type="number" id="preco_venda" value="${preco_venda}" required>
            <label for="quantidade_vendida">Quantidade Vendida:</label>
            <input type="number" id="quantidade_vendida" value="${quantidade_vendida}" required>
            <button type="submit">Salvar</button>
            <button type="button" class="cancelar">Cancelar</button>
          </form>
        </div>
      `;

      document.body.appendChild(modal); // ✅ modal agora está no DOM! Agora vai brasil porra!

      modal.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal") || event.target.classList.contains("cancelar")) {
          modal.remove();
        }
      });

      // Script para salvar o produto:
      const form = modal.querySelector(".cadastro-produto-modal");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("🧪 Submit disparado"); // ✅ Testando

        const nome_produto = form.querySelector("#nome_produto").value.trim();
        const descricao = form.querySelector("#descricao").value.trim();
        const fabricante = form.querySelector("#fabricante").value.trim();
        const qtd_estoque = form.querySelector("#qtd_estoque").value.trim();
        const lote = form.querySelector("#lote").value.trim();
        const data_validade = form.querySelector("#data_validade").value.trim();
        const preco_venda = form.querySelector("#preco_venda").value.trim();
        const quantidade_vendida = form.querySelector("#quantidade_vendida").value.trim();

        // Verifica se todos os campos foram preenchidos:
        if (!nome_produto || !descricao || !fabricante || !qtd_estoque || !lote || !data_validade || !preco_venda || !quantidade_vendida) {
          alert("Todos os campos devem ser preenchidos!");
          return;
        }

        try {
          const res = await fetch(`http://localhost:3001/editar_produto/${id_produto}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_produto, descricao, fabricante, qtd_estoque, lote, data_validade, preco_venda, quantidade_vendida })
          });

          if (!res.ok) throw new Error("Erro ao editar o produto!");

          const data = await res.json();
          row.querySelector("td:nth-child(1)").textContent = nome_produto;
          row.querySelector("td:nth-child(2)").textContent = descricao;
          row.querySelector("td:nth-child(3)").textContent = fabricante;
          row.querySelector("td:nth-child(4)").textContent = qtd_estoque;
          row.querySelector("td:nth-child(5)").textContent = lote;
          row.querySelector("td:nth-child(6)").textContent = data_validade;
          row.querySelector("td:nth-child(7)").textContent = preco_venda;
          row.querySelector("td:nth-child(8)").textContent = quantidade_vendida;

          alert(`✅ ${data.mensagem}`);
          modal.remove();
        } catch (error) {
          console.error("❌ Erro ao editar o produto:", error.message);
          alert(`❌ ${error.message}`);
        }
      });
    });
  }, 0);

  return div;
}
