import Repository, { basePostUrl, serializeQuery } from './Repository';

class WishlistRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getUserWishlistId(payload) {
    const endPoint = `wishlists/${payload.customerId}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async getUserWishlist(payload) {
    const endPoint = `wishlists/${payload.wishId}/items`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async deleteWishlist(payload) {
    const endPoint = `wishlists/${payload.cartId}/items`;
    const response = await Repository.delete(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((e) => ({
        error: JSON.stringify(e),
      }));
    return response;
  }

  async addToWishlist({ wishId, ...cartItems }) {
    const endPoint = `wishlists/${payload.wishId}/items`;
    const response = await Repository.post(
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

  async deleteItem(payload) {
    const endPoint = `wishlist/${payload.cartId}/items/${payload.itemId}`;
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
    const endPoint = `wishlists/${payload.cartId}/items`;
    const response = await Repository.post(`${basePostUrl}/${endPoint}`, {
      product_id: payload.itemId,
      wish_id: payload.wishId,
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
    const endPoint = `wishlists/${payload.cartId}/items/${payload.itemId}`;
    const response = await Repository.delete(`${basePostUrl}/${endPoint}`)
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

export default new WishlistRepository();
