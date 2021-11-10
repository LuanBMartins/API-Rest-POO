const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar(id) {
        return Modelo.findAll({where: {fornecedor: id}, raw: true})
    },
    criar(produto){
        return Modelo.create(produto)
    },
    remove(id, fornecedor){
        return Modelo.destroy({
            where: {
                id: id,
                fornecedor: fornecedor
            }
        })
    },
    buscaProduto(id, fornecedor){
        return Modelo.findOne({
            where: {
                id: id,
                fornecedor: fornecedor
            }, 
            raw: true
        })
    },
    atualizar(identificacao, novoProduto){
        return Modelo.update(novoProduto, {where: identificacao})
    }
}