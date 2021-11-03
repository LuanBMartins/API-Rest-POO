const express = require('express')
const app = express()
const config = require('config')

app.use(express.json())

app.use((req, res, next) => {
    const accept = ['application/json', '*/*']
    const formato = req.header('Accept')
    if(!accept.includes(formato)){
        res.status(406).end()
    }else{
        const content_type = (formato === '*/*') ? 'application/json' : formato
        res.setHeader('Content-Type', content_type)
        next()
    }

})

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, req, res, next) => {
    if(erro.message === 'Fornecedor não encontrado') {
        res.status(404).send({ mensagem: erro.message })    
    }
    else if(erro.message === 'Formato não suportado!') {
        res.status(406).send({ message: erro.message })
    }
    res.status(400).send({ mensagem: erro.message })
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))