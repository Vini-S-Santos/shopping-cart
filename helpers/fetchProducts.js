const fetchProducts = async (id) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
    const promiseFetch = await fetch(URL);
    const results = await promiseFetch.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
