import { call, all, put, takeEvery } from 'redux-saga/effects';
import CartRepository from '~/repositories/CartRepository';
import { actionTypes } from './action';

import {
  updateCartSuccess,
  updateCartError,
  setCartItemsSuccess,
  setWishlistTtemsSuccess,
  setCompareItemsSuccess,
} from './action';

// new
function* getCartItems({ payload }) {
  try {
    const { data } = yield call(CartRepository.getUserCart, {
      userId: payload,
    });
    console.log('🚀 ~ function*getCartItems ~ data', data);

    yield put(setCartItemsSuccess(data));
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
    console.log('🚀 ~ function*deleteCartItem ~ data', data);
  } catch (error) {
    console.log('🚀 ~ function*deleteCartItem ~ error', error);
  }
}

function* getWishlistItems({ payload }) {
  try {
    yield put(setWishlistTtemsSuccess(payload));
  } catch (err) {
    console.log(err);
  }
}

function* getCompareItems({ payload }) {
  try {
    yield put(setCompareItemsSuccess(payload));
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  // new
  yield all([takeEvery(actionTypes.GET_CART_ITEMS, getCartItems)]);
  yield all([takeEvery(actionTypes.DELETE_CART_ITEM, deleteCartItem)]);
  yield all([takeEvery(actionTypes.SET_WISHLIST_ITEMS, getWishlistItems)]);
  yield all([takeEvery(actionTypes.SET_COMPARE_ITEMS, getCompareItems)]);
}
