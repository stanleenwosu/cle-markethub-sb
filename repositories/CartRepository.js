import Repository, { basePostUrl, serializeQuery } from './Repository';

class CartRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getUserCartId(payload) {
    const endPoint = `${payload.userId}/cart`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async getUserCart(payload) {
    const endPoint = `${payload.userId}/cart`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async deleteCart(payload) {
    const endPoint = `carts/${payload.cartId}/items`;
    const response = await Repository.delete(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async deleteItem(payload) {
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

  async addItem(payload) {
    const endPoint = `carts/${payload.cartId}/items`;
    const response = await Repository.put(`${basePostUrl}/${endPoint}`, {
      product_id: payload.itemId,
      cart_id: payload.cartId,
      quantity: payload.quantity ? payload.quantity : 1,
    })
      .then(() => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(error),
      }));
    return response;
  }

  async editCart(payload) {
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
