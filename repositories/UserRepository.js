import Repository, { basePostUrl, serializeQuery } from './Repository';

class UserRepository {
  constructor(callback) {
    this.callback = callback;
  }

  async getUser(payload) {
    const endPoint = `users/${payload.id}`;
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

export default new UserRepository();
