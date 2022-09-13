const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const item = '<ol><li>Item</li></ol>'

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  beforeEach(() => saveCartItems(item));

  it('3.1 Verifique se fetchItem é uma função.', () => {
    expect(typeof saveCartItems).toEqual('function');
  });

  it('3.2 Testa se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    expect(localStorage.setItem).toHaveBeenCalled()
  });

  it('3.3 Testa se ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item)
  });
});

