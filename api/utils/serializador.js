const jsontoxml = require('jsontoxml')

class Serializador {
  serializar (dados) {
    dados = this.filtrar(dados)
    if (this.contentType === 'application/json') {
      return this.json(dados)
    }

    if (this.contentType === 'application/xml') {
      return this.xml(dados)
    }

    throw new Error(`Content-type:${this.contentType}`)
  }

  json (dados) {
    return JSON.stringify(dados)
  }

  xml (dados) {
    let tag = this.tagSingular

    if (Array.isArray(dados)) {
      tag = this.tagPlurar
      dados = dados.map(item => {
        return {
          [this.tagSingular]: item
        }
      })
    }

    return jsontoxml({ [tag]: dados })
  }

  filtrarObjeto (dados) {
    const novoObjeto = {}
    this.camposPublicos.forEach((campo) => {
      if (Reflect.has(dados, campo)) {
        novoObjeto[campo] = dados[campo]
      }
    })
    return novoObjeto
  }

  filtrar (dados) {
    if (Array.isArray(dados)) {
      dados = dados.map(item => {
        return this.filtrarObjeto(item)
      })
    } else {
      dados = this.filtrarObjeto(dados)
    }
    return dados
  }
}

class SerializadorFornecedor extends Serializador {
  constructor (contentType, camposextras) {
    super()
    this.contentType = contentType
    this.camposPublicos = [
      'id',
      'empresa',
      'categoria',
      ...camposextras || []
    ]
    this.tagSingular = 'fornecedor'
    this.tagPlurar = 'fornecedores'
  }
}

class SerializadorError extends Serializador {
  constructor (contentType, camposextras) {
    super()
    this.contentType = contentType
    this.camposPublicos = ['message', ...camposextras || []]
    this.tagSingular = 'erro'
    this.tagPlurar = 'erros'
  }
}

module.exports = {
  SerializadorFornecedor,
  SerializadorError
}
