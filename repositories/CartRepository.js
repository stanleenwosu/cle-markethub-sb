import Repository, { basePostUrl, serializeQuery } from './Repository';

class CartRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getUserCart(payload) {
    const endPoint = `carts/${payload.userId}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then(() => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(error),
      }));
    return response;
  }

  async addToCart({ userId, ...cartItems }) {
    const endPoint = `carts/${payload.userId}/items`;
    const response = await Repository.put(
      `${basePostUrl}/${endPoint}`,
      cartItems
    )
      .then(() => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(error),
      }));
    return response;
  }

  async emptyCart(payload) {
    const endPoint = `carts/${payload.cartId}/items`;
    const response = await Repository.delete(`${basePostUrl}/${endPoint}`)
      .then(() => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(error),
      }));
    return response;
  }

  async removeCartItem(payload) {
    const endPoint = `carts/${payload.cartId}/items/${payload.itemId}`;
    const response = await Repository.delete(`${basePostUrl}/${endPoint}`)
      .then(() => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(error),
      }));
    return response;
  }
}

export default new CartRepository();
