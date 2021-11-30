import { actionTypes } from './action';

export const initState = {
  user: {},
};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.USER_SUCCESS:
      return {
        ...state,
        user: { ...actions.payload },
      };
    default:
      return state;
  }
}

export default reducer;
