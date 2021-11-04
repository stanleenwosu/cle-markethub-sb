import { actionTypes } from './action';

export const initialState = {
  delivery: {},
  order: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_DELIVERY_SUCCESS:
      return {
        ...state,
        ...{ delivery: { ...action.payload } },
      };
    default:
      return state;
  }
}

export default reducer;
