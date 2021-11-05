const Modelo = require('./ModeloTabelaProduto')

module.exports = {
    listar(id) {
        return Modelo.findAll({where: {fornecedor: id}, raw: true})
    }
}