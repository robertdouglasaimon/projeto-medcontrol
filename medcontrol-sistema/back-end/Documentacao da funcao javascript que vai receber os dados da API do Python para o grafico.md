 ```bash
 ===============================================================
📄 Arquivo: estoque.js
🎯 Finalidade: Consumir a API Flask que retorna dados de estoque
              e renderizar um gráfico de barras com Chart.js
===============================================================

🧠 Visão geral:
- A função é executada com `setTimeout` para garantir que o DOM esteja carregado.
- Faz uma requisição HTTP para a rota `/grafico-estoque` do back-end.
- Recebe os dados em formato JSON: saídas, perdas e total de estoque.
- Usa a biblioteca Chart.js para desenhar um gráfico de barras com esses dados.

===============================================================
🔁 setTimeout(() => { ... }, 0);
---------------------------------------------------------------
Executa a função imediatamente após o carregamento da página.
Usado aqui para garantir que o elemento <canvas> já esteja disponível
no momento em que o gráfico será desenhado.
===============================================================
*/

setTimeout(() => {

  /*
  ===============================================================
  🔗 fetch('http://localhost:5000/grafico-estoque')
  ---------------------------------------------------------------
  Faz uma requisição GET para a API Flask que retorna os dados
  agregados do estoque em formato JSON.
  Exemplo de resposta esperada:
  {
    "produtos_saidos": 42,
    "produtos_perdidos": 15,
    "total_estoque": 100
  }
  ===============================================================
  */
  fetch('http://localhost:5000/grafico-estoque')
    .then(res => res.json()) // Converte a resposta em JSON
    .then(data => {

      /*
      ===============================================================
      🎯 Seleção do elemento <canvas> onde o gráfico será desenhado
      ---------------------------------------------------------------
      ctx: contexto 2D do canvas com id "graficoEstoque"
      Esse elemento deve existir no HTML:
      <canvas id="graficoEstoque"></canvas>
      ===============================================================
      */
      const ctx = document.getElementById('graficoEstoque').getContext('2d');

      /*
      ===============================================================
      📊 Criação do gráfico com Chart.js
      ---------------------------------------------------------------
      type: 'bar' → gráfico de barras verticais
      labels: categorias que aparecem no eixo X
      data: valores numéricos para cada categoria
      backgroundColor: cores das barras
      ===============================================================
      */
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Saídas', 'Perdas', 'Total'],
          datasets: [{
            label: 'Estoque',
            data: [
              data.produtos_saidos,
              data.produtos_perdidos,
              data.total_estoque
            ],
            backgroundColor: ['#f39c12', '#e74c3c', '#2ecc71'] // cores das barras
          }]
        },
        options: {
          responsive: true, // adapta o gráfico ao tamanho da tela
          scales: {
            y: {
              beginAtZero: true // eixo Y começa do zero
            }
          }
        }
      });
    });

}, 0); // Executa imediatamente após o carregamento



  E por fim, lá no sistema.html, chamamos <canvas id="graficoEstoque" width="120" height="50"></canvas> que é onde será desenhado o gráfico.

 ``` 