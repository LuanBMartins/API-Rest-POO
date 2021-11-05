const express = require('express')
const app = express()
const config = require('config')
const {SerializadorError} = require('./utils/serializador')

app.use(express.json())

app.use((req, res, next) => {
    const accept = ['application/json', '*/*', 'application/xml']
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
    const serializador = new SerializadorError(res.getHeader('Content-type'))

    if(erro.message === 'Fornecedor não encontrado') {
        res.status(404).send(serializador.serializar(erro))    
    }else{
        res.status(500).send(serializador.serializar(erro))
    }
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))