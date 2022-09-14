const saveCartItems = (item) => {
  // seu código aqui
  localStorage.setItem('cartItems', item); // json.stringify
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
