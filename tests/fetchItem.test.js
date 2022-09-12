require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('1.1 Verifique se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('1.2 Verifique se a função fetch foi chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1)
  });

    it('1.3 Verifique se a função fetch foi chamada com o endpoint correto', async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
    });

    // it('1.4 Teste se o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    //   await fetchProducts('computador');
    //   expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    // });

    it('1.5 Verifica se retorna erro ao executar a função sem parâmetro', async () => {
      const failRequest = await fetchItem();
  
      expect(failRequest).toEqual(new Error('You must provide an url'));
    });

});
