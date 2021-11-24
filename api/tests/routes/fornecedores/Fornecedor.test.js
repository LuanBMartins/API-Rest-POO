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
})
