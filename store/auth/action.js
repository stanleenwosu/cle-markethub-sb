export const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  USER_SUCCESS: 'USER_SUCCESS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function login(payload) {
  return { type: actionTypes.LOGIN_REQUEST, payload };
}

export function register(payload) {
  return { type: actionTypes.REGISTER_REQUEST, payload };
}

export function userSuccess(payload) {
  return { type: actionTypes.USER_SUCCESS, payload };
}

export function loginSuccess(payload) {
  return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function registerSuccess(payload) {
  return { type: actionTypes.REGISTER_SUCCESS, payload };
}

export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}
