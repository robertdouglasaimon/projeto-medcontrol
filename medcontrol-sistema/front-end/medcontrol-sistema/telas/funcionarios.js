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
      <input 
        type="text" 
        placeholder="Buscar por nome" 
        class="buscar-input-funcionario"
      />
      <button 
        class="btn-novo-funcionario" 
        id="btnNovoFuncionario"
      >
        + Novo Funcionário
      </button>
    </div>
  </div>
</section>

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



    return div
}