import { call, all, put, takeEvery } from 'redux-saga/effects';
import OrderRepository from '~/repositories/OrderRepository';
import { actionTypes, saveDeliverySuccess, saveOrderSuccess } from './action';

function* saveDeliverySaga({ payload }) {
  try {
    yield put(saveDeliverySuccess(payload));
    const store = require('store');
    store.set('delivery', payload);
  } catch (err) {
    console.error(err);
  }
}

function* createOrderSaga({ payload }) {
  try {
    const orderData = yield call(OrderRepository.createOrder, {
      cartId: payload.cartId,
      customerId: payload.customerId,
    });
    yield put({ type: 'SAVE_ORDER_SUCCESS', payload: orderData.data });
  } catch (err) {
    console.error(err);
  }
}

function* createDeliverySaga({ payload }) {
  try {
    const data = yield call(OrderRepository.createDelivery, payload);
    // yield put({ type: 'SAVE_ORDER_SUCCESS', payload: data });
  } catch (err) {
    console.error(err);
  }
}

function* createPaystackSaga({ payload }) {
  try {
    const data = yield call(OrderRepository.createPaystack, payload);
    // yield put({ type: 'SAVE_ORDER_SUCCESS', payload: data });
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.SAVE_DELIVERY, saveDeliverySaga)]);
  yield all([takeEvery(actionTypes.CREATE_ORDER, createOrderSaga)]);
  yield all([takeEvery('CREATE_DELIVERY', createDeliverySaga)]);
  yield all([takeEvery('CREATE_PAYSTACK', createPaystackSaga)]);
}
