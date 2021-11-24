module.exports = {
  listar () {
    return []
  },
  async inserir (fornecedor) {
    return {
      id: 0,
      dataCriacao: '10/10/2022',
      dataAtualizacao: '10/10/2022',
      versao: 1
    }
  },
  async pegarPorId (id) {
    return {
      id: 0,
      dataCriacao: '10/10/2022',
      dataAtualizacao: '10/10/2022',
      versao: 1
    }
  },
  async atualizar (id, dadosParaAtualizar) {
    return true
  },
  async remover (id) {
    return true
  }
}
