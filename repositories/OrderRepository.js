import Repository, { basePostUrl, serializeQuery } from './Repository';

class AuthRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getOrders(customerId, params) {
    const endPoint = `customers/${customerId}/orders?${serializeQuery(params)}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async getPayments(customerId, params) {
    const endPoint = `${customerId}/payments?${serializeQuery(params)}`;
    const response = await Repository.get(`${basePostUrl}/${endPoint}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async createOrder({ customerId, cartId }) {
    const endPoint = `customers/${customerId}/orders`;
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

  async updateOrder({ customerId, orderId, status }) {
    const endPoint = `customers/${customerId}/orders/${orderId}`;
    const response = await Repository.put(`${basePostUrl}/${endPoint}`, {
      status,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async createDelivery({ orderId, customerId, ...rest }) {
    const endPoint = `orders/${orderId}/delivery`;
    const response = await Repository.post(`${basePostUrl}/${endPoint}`, {
      customer_id: customerId,
      ...rest,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async createPaystack({ orderId, customerId, status, amount, detail }) {
    const endPoint = `orders/${orderId}/payments/card`;
    const response = await Repository.post(`${basePostUrl}/${endPoint}`, {
      customer_id: customerId,
      amount,
      status,
      detail,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async createCoop({ orderId, customerId, amount, tenure }) {
    const endPoint = `orders/${orderId}/payments/coop`;
    try {
      const response = await Repository.post(`${basePostUrl}/${endPoint}`, {
        customer_id: customerId,
        amount,
        tenure,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCoop({ orderId, customerId, amount, tenure }) {
    const endPoint = `orders/${orderId}/payments/coop?${serializeQuery({
      customer_id: customerId,
      amount,
      tenure,
    })}`;
    try {
      const response = await Repository.get(`${basePostUrl}/${endPoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getLogistics({ shopId }) {
    const endPoint = `logistics/${shopId}`;
    try {
      const response = await Repository.get(`${basePostUrl}/${endPoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthRepository();
