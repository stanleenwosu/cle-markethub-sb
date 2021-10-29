export const actionTypes = {
  USER_REQUEST: 'USER_REQUEST',
  USER_SUCCESS: 'USER_SUCCESS',
};

export function getUser(payload) {
  return { type: actionTypes.USER_REQUEST, payload };
}

export function getUserSucess(payload) {
  return { type: actionTypes.USER_SUCCESS, payload };
}
