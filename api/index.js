const express = require('express')
const app = express()
const config = require('config')

app.use(express.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, req, res, next) => {
    if(erro.message === 'Fornecedor não encontrado') {
        res.status(404).send({ mensagem: erro.message })    
    }
    res.status(400).send({ mensagem: erro.message })
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))