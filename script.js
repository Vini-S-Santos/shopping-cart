const totalCart = document.querySelector('.cart__items');
// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const loading = () => {
  const html = document.querySelector('.header');
  const elementCreate = document.createElement('p');
  elementCreate.innerText = 'Carregando...';
  elementCreate.className = 'loading';
  html.appendChild(elementCreate);
};

const removeLoad = () => {
  const e = document.querySelector('.loading');
  e.remove();
};

const callFetchProducts = async () => {
  loading();
  const products = await fetchProducts('computador');
  const getItemsAll = document.querySelector('.items');
  products.results.forEach((element) => {
    const productsObj = {
      id: element.id,
      title: element.title,
      thumbnail: element.thumbnail,
    };
    const createItemElement = createProductItemElement(productsObj);
    getItemsAll.appendChild(createItemElement);
  });
  removeLoad();
};
callFetchProducts();

const totalPrice = async () => {
  const totalItem = document.querySelectorAll('.cart__item');
  const totalPriceDom = document.querySelector('.total-price');
  let total = 0;
  for (i = 0; i < totalItem.length; i += 1) {
    const convertPriceString = Number(totalItem[i].innerText.split('$')[1]);
    total += convertPriceString;
  }
  totalPriceDom.innerText = `Valor Total: $ ${(Math.round(total * 100) / 100)}`;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

 function removeCartItem(event) {
  const eventTarget = event.target;
  if (eventTarget.className === 'cart__item') {
    eventTarget.remove();
    localStorage.removeItem('cartItems');
    totalPrice();
    saveCartItems(totalCart.innerHTML);
  }
}

const clickAfterReload = () => totalCart.addEventListener('click', removeCartItem);
clickAfterReload();

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<img class="" src='${thumbnail}'>`;
  li.innerHTML += `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', removeCartItem);
  return li;
};

const addCart = async (event) => {
  const parameter = event.target.parentNode.firstChild.innerText;
  const awaitParameter = await fetchItem(parameter);

  const cartItem = {
    id: awaitParameter.id,
    title: awaitParameter.title,
    price: awaitParameter.price,
    thumbnail: awaitParameter.thumbnail,
  };

  const element = createCartItemElement(cartItem);
  totalCart.appendChild(element);
  totalPrice();
  saveCartItems(totalCart.innerHTML);
};

const callFetchItems = async () => {
  await fetchItem('MLB1405519561');
  const addToCartButtons = document.querySelectorAll('.item__add');
  addToCartButtons.forEach((element) => {
    element.addEventListener('click', addCart);
  });
};
callFetchItems();

const buttomRemoveAll = () => {
  const buttonRemove = document.querySelector('.empty-cart');

  buttonRemove.addEventListener('click', () => {
    const allCartItems = document.querySelectorAll('.cart__item');
    allCartItems.forEach((element) => element.remove());
    saveCartItems(totalCart.innerHTML);
    totalPrice();
    localStorage.removeItem('cartItems');
  });
};
buttomRemoveAll();

window.onload = async () => {
  const carr = getSavedCartItems();
  const list = document.querySelector('.cart__items');
  list.innerHTML = carr;
};