export const actionTypes = {
  // new
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  DELETE_CART_ITEM: 'DELETE_CART_ITEM',
  ADD_CART_ITEM: 'ADD_CART_ITEM',

  SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',
  SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_ITEMS_SUCCESS: 'SET_CART_ITEMS_SUCCESS',

  SET_COMPARE_ITEMS: 'SET_COMPARE_ITEMS',
  SET_COMPARE_ITEMS_SUCCESS: 'SET_COMPARE_ITEMS_SUCCESS',
};

// new
export function getCartItems(payload) {
  return { type: actionTypes.GET_CART_ITEMS, payload };
}

export function deleteCartItem(payload) {
  return { type: actionTypes.DELETE_CART_ITEM, payload };
}

export function addCartItem(payload) {
  return { type: actionTypes.ADD_CART_ITEM, payload };
}

export function setWishlistTtems(payload) {
  return { type: actionTypes.SET_WISHLIST_ITEMS, payload };
}

export function setWishlistTtemsSuccess(payload) {
  return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}

export function setCartItems(payload) {
  return { type: actionTypes.SET_CART_ITEMS, payload };
}

export function setCartItemsSuccess(payload) {
  return { type: actionTypes.SET_CART_ITEMS_SUCCESS, payload };
}

export function setCompareItems(payload) {
  return { type: actionTypes.SET_COMPARE_ITEMS, payload };
}

export function setCompareItemsSuccess(payload) {
  return { type: actionTypes.SET_COMPARE_ITEMS_SUCCESS, payload };
}
