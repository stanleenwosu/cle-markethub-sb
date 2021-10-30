import { actionTypes } from './action';

export const initState = {
  token: '',
  isLoggedIn: false,
  user: {},
};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: actions.payload.token,
      };
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: { ...actions.payload },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}

export default reducer;
