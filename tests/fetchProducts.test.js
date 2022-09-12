require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1.1 Verifique se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('1.2 Verifique se a função fetch foi chamada.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1)
  });

    it('1.3 Verifique se a função fetch foi chamada com o endpoint correto', async () => {
      await fetchProducts('computador');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    });

    // it('1.4 Teste se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    //   await fetchProducts('computador');
    //   expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    // });

    it('1.5 Verifica se retorna erro ao executar a função sem parâmetro', async () => {
      const failRequest = await fetchProducts();
  
      expect(failRequest).toEqual(new Error('You must provide an url'));
    });

});
