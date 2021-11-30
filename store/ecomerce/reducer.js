import { actionTypes } from './action';

export const initalState = {
  wishlistItems: [],
  cartItems: [],
  cartId: '',
  wishId: '',
};

function reducer(state = initalState, action) {
  switch (action.type) {
    // new
    case actionTypes.SET_WISHLIST_ID:
      return {
        ...state,
        wishId: action.payload,
      };
    case actionTypes.SET_WISHLIST_ITEMS_SUCCESS:
      return {
        ...state,
        wishlistItems: [...action.payload],
      };
    case actionTypes.SET_CART_ID:
      return {
        ...state,
        cartId: action.payload,
      };
    case actionTypes.SET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: [...action.payload],
      };
    default:
      return state;
  }
}

export default reducer;
