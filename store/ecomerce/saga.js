import {
  call,
  all,
  take,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import CartRepository from '~/repositories/CartRepository';
import WishlistRepository from '~/repositories/WishlistRepository';
import { actionTypes } from './action';

import NProgress from 'nprogress';

import { notification } from 'antd';

import {
  updateCartSuccess,
  updateCartError,
  setCartItemsSuccess,
  setCartId,
  setWishlistItemsSuccess,
  setWishlistId,
  setCoupon,
} from './action';

const createNotification = (action, text) => {
  notification.success({
    message: 'Success!',
    description: `This item has been ${action} to your ${text}`,
  });
};

// CART
function* getCartItems({ payload }) {
  try {
    const { data } = yield call(CartRepository.getUserCart, {
      userId: payload.userId,
    });
    const { data: cart } = yield call(CartRepository.getUserCartId, {
      customerId: payload.customerId,
    });
    yield put(setCartItemsSuccess(data));
    yield put(setCartId(cart.id));
    return cart;
  } catch (err) {
    console.log(err);
  }
}

function* deleteCartItem({ payload }) {
  NProgress.start();
  try {
    const { data } = yield call(CartRepository.deleteItem, {
      cartId: payload.cartId,
      itemId: payload.itemId,
    });
    yield call(getCartItems, {
      payload: { userId: payload.userId, customerId: payload.customerId },
    });
    NProgress.done();
    createNotification('deleted', 'Cart');
  } catch (error) {
    NProgress.done();
    console.log('🚀 ~ function*deleteCartItem ~ error', error);
  }
}

function* reduceQuantity({ payload }) {
  NProgress.start();
  try {
    yield call(CartRepository.addItem, {
      itemId: payload.itemId,
      cartId: payload.cartId,
      quantity: payload.quantity,
      type: 'SUB',
    });
    yield call(getCartItems, {
      payload: { userId: payload.userId, customerId: payload.customerId },
    });
    createNotification('reduced', 'Cart');
    NProgress.done();
  } catch (error) {
    NProgress.done();
    console.log('🚀 ~ function*reduceQuantity ~ error', error);
  }
}

export function* addCartItem({ payload }) {
  NProgress.start();
  try {
    yield call(CartRepository.addItem, {
      itemId: payload.itemId,
      cartId: payload.cartId,
      quantity: payload.quantity,
      type: 'ADD',
    });
    yield call(getCartItems, {
      payload: { userId: payload.userId, customerId: payload.customerId },
    });
    createNotification('added', 'Cart');
    NProgress.done();
  } catch (error) {
    NProgress.done();
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
    yield put(setWishlistId(wishlist.id));
    const { data } = yield call(WishlistRepository.getUserWishlist, {
      wishId: wishlist.id,
    });
    yield put(setWishlistItemsSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteWishlistItem({ payload }) {
  NProgress.start();
  try {
    const { data } = yield call(WishlistRepository.deleteItem, {
      wishId: payload.wishId,
      itemId: payload.itemId,
    });
    yield call(getWishlistItems, {
      payload: { userId: payload.userId, customerId: payload.customerId },
    });
    createNotification('removed', 'Wishlist');
    NProgress.done();
  } catch (error) {
    NProgress.done();
    console.log('🚀 ~ function*deleteCartItem ~ error', error);
  }
}

function* addWishlistItem({ payload }) {
  NProgress.start();

  try {
    const { data } = yield call(WishlistRepository.addItem, payload);
    yield call(getWishlistItems, {
      payload: { userId: payload.userId, customerId: payload.customerId },
    });
    createNotification('added', 'Wishlist');
    NProgress.done();
  } catch (error) {
    NProgress.done();
    console.log('🚀 ~ function*addWishlistItem ~ error', error);
  }
}

function* applyCoupon({ payload }) {
  NProgress.start();

  try {
    const data = yield call(CartRepository.applyCoupon, payload);
    console.log('🚀 ~ function*applyCoupon ~ data', data);
    NProgress.done();
    notification.success({
      message: 'Success',
      description: data.message,
    });
    yield put(setCoupon(data.data));
  } catch (error) {
    NProgress.done();
    console.log('🚀 ~ function*applyCoupon ~ error', error);
    notification.error({
      message: 'Error',
      description: `Invalid Coupon code ${payload.code}`,
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_CART_ITEMS, getCartItems);
  yield takeLatest(actionTypes.DELETE_CART_ITEM, deleteCartItem);
  yield takeLatest(actionTypes.REDUCE_QUANTITY, reduceQuantity);
  yield takeLatest(actionTypes.ADD_CART_ITEM, addCartItem);
  yield takeLatest(actionTypes.GET_WISHLIST_ITEMS, getWishlistItems);
  yield takeLatest(actionTypes.DELETE_WISHLIST_ITEM, deleteWishlistItem);
  yield takeLatest(actionTypes.ADD_WISHLIST_ITEM, addWishlistItem);
  yield takeLatest(actionTypes.APPLY_COUPON, applyCoupon);
}
