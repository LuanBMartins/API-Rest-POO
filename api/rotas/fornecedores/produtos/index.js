const roteador = require('express').Router({mergeParams: true})
const Tabela = require('./TabelaProduto')

roteador.get('/', async (req, res) => {
    const id = req.params.idFornecedor
    const produtos = await Tabela.listar(id)
    res.send(produtos)
})

roteador.post('/', async (req, res) => {
    const id = req.params.idFornecedor
    const atributos = req.body
    const dados = {
        ...id,
        ...atributos
    }
})

module.exports = roteador