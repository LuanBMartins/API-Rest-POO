const Tabela = require('./TabelaProduto')

class Produto {
    constructor({id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    validar () {
        const itens = ['titulo', 'preco', 'estoque']
        const validacao = {
            titulo: {
                valido: typeof this.titulo !== 'string'|| this.titulo === 0 ? false : true,
                erro: 'Campo titulo é inválido!'
            },
            preco: {
                valido: typeof this.preco !== 'number' || this.preco === 0 ? false : true,
                erro: 'Campo preço é inválido!'
            },
            estoque: {
                valido: typeof this.estoque !== 'number' ? false : true,
                erro: 'Campo estoque é inválido!'
            }
        }

        let mensagemErro = ''
        itens.forEach(item => {
            !validacao[item].valido ? mensagemErro = mensagemErro + validacao[item].erro + ' ' : false
        })

        if(mensagemErro.length >= 1) {
            throw new Error(mensagemErro)
        }
    }

    async criar() {
        try {
            
        } catch (error) {
            
        }
        this.validar()
        const res = await Tabela.criar({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = res.id
        this.dataCriacao = res.dataCriacao
        this.dataAtualizacao = res.dataAtualizacao
        this.versao = res.versao
    }

    async remover() {
        await Tabela.remove(this.id, this.fornecedor)
    }
}

module.exports = Produto