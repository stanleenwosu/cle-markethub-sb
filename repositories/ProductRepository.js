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

  async searchProducts(params) {
    const endPoint = `search/products?${serializeQuery(params)}`;
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

  async getCategories() {
    const endPoint = `product_categories`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async getCategoryProducts(category_id) {
    const params = { filter: true, category_id, limit: 10, offset: 0 };
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

  async getPromo() {
    const params = { limit: 10, offset: 0 };
    const endPoint = `promos/promotions?${serializeQuery(params)}`;
    try {
      const response = await Repository.get(`${basePostUrl}/${endPoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
