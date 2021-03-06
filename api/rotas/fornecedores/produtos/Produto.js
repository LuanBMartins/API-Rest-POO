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

    async buscaProduto(){
        const res = await Tabela.buscaProduto(this.id, this.fornecedor)
        if(!res){
            throw new Error('Produto não encontrado!')
        }

        this.titulo = res.titulo
        this.preco = res.preco
        this.estoque = res.estoque
        this.dataCriacao = res.dataCriacao
        this.dataAtualizacao = res.dataAtualizacao
        this.versao = res.versao
    }

    async atualizar(){
        
        const dadosAtualizar = {}

        if(typeof this.titulo === 'string' && this.titulo.length > 0){
            dadosAtualizar.titulo = this.titulo
        } 

        if(typeof this.preco === 'number' && this.preco > 0){
            dadosAtualizar.preco = this.preco
        } 
        
        if(typeof this.estoque === 'number' && this.estoque >= 0){
            dadosAtualizar.estoque = this.estoque
        } 
        if(Object.keys(dadosAtualizar).length <= 0){
            throw new Error('Não foram fornecidos dados para atualizar')
        }

        return Tabela.atualizar({id: this.id, fornecedor: this.fornecedor}, dadosAtualizar)
    }
}

module.exports = Produto