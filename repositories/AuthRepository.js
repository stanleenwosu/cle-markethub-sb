import Repository, { basePostUrl, serializeQuery } from './Repository';

class AuthRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async login(payload) {
    const endPoint = `login`;
    const response = await Repository.post(
      `${basePostUrl}/${endPoint}`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async register(payload) {
    const endPoint = `signup`;
    const response = await Repository.post(
      `${basePostUrl}/${endPoint}`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  async logout(payload) {
    const endPoint = `logout`;
    const response = await Repository.post(`${basePostUrl}/${endPoint}`)
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
