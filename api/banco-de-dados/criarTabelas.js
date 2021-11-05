const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

function criarTabela() {
    modelos.forEach(item => item.sync())
}

criarTabela()