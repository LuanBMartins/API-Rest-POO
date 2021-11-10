const roteador = require('express').Router({mergeParams: true})
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/', async (req, res) => {
    const produtos = await Tabela.listar(req.fornecedor.id)
    res.send(produtos)
})

roteador.post('/', async (req, res) => {
    try {
        const id = req.fornecedor.id
        const atributos = req.body
        const dados = {
            fornecedor: id,
            ...atributos
        }
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201).send(produto)
    } catch (error) {
        res.send({erro: error.message})
    }
})

roteador.delete('/:id', async (req, res) => {
    try {
        const dados = {
            id : req.params.id,
            fornecedor : req.fornecedor.id
        }
        const produto = new Produto(dados)
        await produto.remover()
        res.status(204).end()
    } catch (erro) {
        res.send({erro: erro.message})
    }
})

roteador.get('/:id', async (req, res, next) => {
    try {        
        const dados = {
            id: req.params.id,
            fornecedor : req.fornecedor.id
        }
        const produto = new Produto(dados)
        await produto.buscaProduto()
        res.status(200).send(produto)
    } catch (error) {
        next(error)
    }
})

roteador.put('/:id', async (req, res, next) => {
    try {
        const dados = {
            id: req.params.id,
            fornecedor : req.fornecedor.id,
            ...req.body
        }
        console.log(dados);

        const produto = new Produto(dados)
        await produto.atualizar()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = roteador