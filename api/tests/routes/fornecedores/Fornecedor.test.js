jest.mock('../../../rotas/fornecedores/TabelaFornecedor')
const Fornecedor = require('../../../rotas/fornecedores/Fornecedor')

describe('Class Fornecedor', () => {
  it('Método Validar() retorna true', () => {
    const mock_dados = {
      empresa: 'Jujuba',
      email: 'jujuba@gmail.com',
      categoria: 'alimentos'
    }
    const fornecedor = new Fornecedor(mock_dados)
    const response = fornecedor.validar()
    expect(response).toBe(true)
  })
  it('Metodo criar() com sucesso', async () => {
    const mock_dados = {
      empresa: 'Jujuba',
      email: 'jujuba@gmail.com',
      categoria: 'alimentos'
    }
    const fornecedor = new Fornecedor(mock_dados)
    await fornecedor.criar()
    expect(fornecedor).toEqual({
      ...mock_dados,
      id: 0,
      dataCriacao: '10/10/2022',
      dataAtualizacao: '10/10/2022',
      versao: 1
    })
  })
})
