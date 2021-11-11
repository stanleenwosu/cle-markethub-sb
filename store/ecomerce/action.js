export const actionTypes = {
  // Cart
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  DELETE_CART_ITEM: 'DELETE_CART_ITEM',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  SET_CART_ID: 'SET_CART_ID',
  SET_CART_ITEMS_SUCCESS: 'SET_CART_ITEMS_SUCCESS',

  // Wishlist
  GET_WISHLIST_ITEMS: 'GET_WISHLIST_ITEMS',
  DELETE_WISHLIST_ITEM: 'DELETE_WISHLIST_ITEM',
  ADD_WISHLIST_ITEM: 'ADD_WISHLIST_ITEM',
  SET_WISHLIST_ID: 'SET_WISHLIST_ID',
  SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

  // SET_WISHLIST_ITEMS: 'SET_WISHLIST_ITEMS',
  // SET_WISHLIST_ITEMS_SUCCESS: 'SET_WISHLIST_ITEMS_SUCCESS',

  // SET_CART_ITEMS: 'SET_CART_ITEMS',

  // SET_COMPARE_ITEMS: 'SET_COMPARE_ITEMS',
  // SET_COMPARE_ITEMS_SUCCESS: 'SET_COMPARE_ITEMS_SUCCESS',
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

export function setCartItemsSuccess(payload) {
  return { type: actionTypes.SET_CART_ITEMS_SUCCESS, payload };
}

export function setCartId(payload) {
  return { type: actionTypes.SET_CART_ID, payload };
}

export function getWishlistItems(payload) {
  return { type: actionTypes.GET_WISHLIST_ITEMS, payload };
}

export function deleteWishlistItem(payload) {
  return { type: actionTypes.DELETE_WISHLIST_ITEM, payload };
}

export function addWishlistItem(payload) {
  return { type: actionTypes.ADD_WISHLIST_ITEM, payload };
}

export function setWishlistId(payload) {
  return { type: actionTypes.SET_WISHLIST_ID, payload };
}

export function setWishlistItemsSuccess(payload) {
  return { type: actionTypes.SET_WISHLIST_ITEMS_SUCCESS, payload };
}
