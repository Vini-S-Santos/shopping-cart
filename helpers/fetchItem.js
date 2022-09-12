const fetchItem = async (id) => {
  try {
    const URL = `https://api.mercadolibre.com/items/${id}`;
    const promiseFetch = await fetch(URL);
    const results = await promiseFetch.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
