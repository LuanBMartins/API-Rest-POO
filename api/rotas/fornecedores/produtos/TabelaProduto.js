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
    }
}