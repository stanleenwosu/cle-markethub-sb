import Repository, { basePostUrl, serializeQuery } from './Repository';

class AuthRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async createOrder({ customerId, cartId }) {
    const endPoint = `${customerId}/orders`;
    const response = await Repository.post(`${basePostUrl}/${endPoint}`, {
      cart_id: cartId,
      customer_id: customerId,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }
}

export default new AuthRepository();
