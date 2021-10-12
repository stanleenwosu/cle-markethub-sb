import Repository, { basePostUrl, serializeQuery } from './Repository';

class ProductRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getProducts(params) {
    const endPoint = `products?${serializeQuery(params)}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async getProductsById(id) {
    const endPoint = `products/${id}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }
}

export default new ProductRepository();
