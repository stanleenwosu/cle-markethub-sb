import { actionTypes } from './action';

export const initState = {
  isLoggedIn: false,
  user: {},
};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, user: actions.payload },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: false, user: {} },
      };
    default:
      return state;
  }
}

export default reducer;
