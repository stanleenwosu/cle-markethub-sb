import { call, all, put, takeEvery } from 'redux-saga/effects';
import CartRepository from '~/repositories/CartRepository';
import WishlistRepository from '~/repositories/WishlistRepository';
import { actionTypes } from './action';

import {
  updateCartSuccess,
  updateCartError,
  setCartItemsSuccess,
  setCartId,
  setWishlistItemsSuccess,
  setCompareItemsSuccess,
  setWishlistId,
} from './action';

// CART
function* getCartItems({ payload }) {
  try {
    const { data } = yield call(CartRepository.getUserCart, {
      userId: payload.userId,
    });
    const { data: cart } = yield call(CartRepository.getUserCartId, {
      customerId: payload.customerId,
    });
    // console.log('🚀 ~ function*getCartItems ~ cart', cart);
    // console.log('🚀 ~ function*getCartItems ~ data', data);
    yield put(setCartItemsSuccess(data));
    yield put(setCartId(cart.id));
  } catch (err) {
    console.log(err);
  }
}

function* deleteCartItem({ payload }) {
  try {
    const { data } = yield call(CartRepository.deleteItem, {
      cartId: payload.cartId,
      itemId: payload.itemId,
    });
    // console.log('🚀 ~ function*deleteCartItem ~ data', data);
  } catch (error) {
    console.log('🚀 ~ function*deleteCartItem ~ error', error);
  }
}

function* addCartItem({ payload }) {
  try {
    const { data } = yield call(CartRepository.addItem, payload);
    console.log('🚀 ~ function*addCartItem ~ data', data);
  } catch (error) {
    console.log('🚀 ~ function*addCartItem ~ error', error);
  }
}

// WISHLIST
function* getWishlistItems({ payload }) {
  try {
    const { data: wishlist } = yield call(
      WishlistRepository.getUserWishlistId,
      {
        customerId: payload.customerId,
      }
    );
    const { data } = yield call(WishlistRepository.getUserWishlist, {
      wishId: wishlist.id,
    });
    // console.log('🚀 ~ function*getCartItems ~ cart', cart);
    // console.log('🚀 ~ function*getCartItems ~ data', data);
    yield put(setWishlistId(wishlist.id));
    yield put(setWishlistItemsSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteWishlistItem({ payload }) {
  try {
    const { data } = yield call(WishlistRepository.deleteItem, {
      cartId: payload.cartId,
      itemId: payload.itemId,
    });
    // console.log('🚀 ~ function*deleteCartItem ~ data', data);
  } catch (error) {
    console.log('🚀 ~ function*deleteCartItem ~ error', error);
  }
}

function* addWishlistItem({ payload }) {
  try {
    const { data } = yield call(WishlistRepository.addItem, payload);
    console.log('🚀 ~ function*addCartItem ~ data', data);
  } catch (error) {
    console.log('🚀 ~ function*addCartItem ~ error', error);
  }
}

export default function* rootSaga() {
  // new
  yield all([takeEvery(actionTypes.GET_CART_ITEMS, getCartItems)]);
  yield all([takeEvery(actionTypes.DELETE_CART_ITEM, deleteCartItem)]);
  yield all([takeEvery(actionTypes.ADD_CART_ITEM, addCartItem)]);
  yield all([takeEvery(actionTypes.GET_WISHLIST_ITEMS, getWishlistItems)]);
  yield all([takeEvery(actionTypes.DELETE_WISHLIST_ITEM, deleteWishlistItem)]);
  yield all([takeEvery(actionTypes.ADD_WISHLIST_ITEM, addWishlistItem)]);
}
