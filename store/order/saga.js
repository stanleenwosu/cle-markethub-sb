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

function* createOrderPaystackSaga({ payload }) {
  try {
    const orderData = yield call(OrderRepository.createOrder, {
      cartId: payload.cartId,
      customerId: payload.customerId,
    });

    yield all([
      put({ type: 'SAVE_ORDER_SUCCESS', payload: orderData.data }),
      put({
        type: 'CREATE_DELIVERY',
        payload: {
          orderId: orderData.data.id,
          customerId: payload.customerId,
          ...payload.delivery,
        },
      }),
      put({
        type: 'CREATE_PAYSTACK',
        payload: {
          orderId: orderData.data.id,
          customerId: payload.customerId,
          status: payload.status,
          detail: payload.detail,
          amount: payload.amount,
        },
      }),
    ]);
  } catch (err) {
    console.error(err);
  }
}

function* createOrderCoopSaga({ payload }) {
  try {
    const orderData = yield call(OrderRepository.createOrder, {
      cartId: payload.cartId,
      customerId: payload.customerId,
    });

    yield all([
      put({ type: 'SAVE_ORDER_SUCCESS', payload: orderData.data }),
      put({
        type: 'CREATE_DELIVERY',
        payload: {
          orderId: orderData.data.id,
          customerId: payload.customerId,
          ...payload.delivery,
        },
      }),
      put({
        type: 'CREATE_COOP',
        payload: {
          orderId: orderData.data.id,
          customerId: payload.customerId,
          tenure: payload.tenure,
          amount: payload.amount,
        },
      }),
    ]);
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

function* createCoopSaga({ payload }) {
  try {
    const data = yield call(OrderRepository.createCoop, payload);
    // yield put({ type: 'SAVE_ORDER_SUCCESS', payload: data });
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.SAVE_DELIVERY, saveDeliverySaga);
  yield takeEvery('CREATE_ORDER_PAYSTACK', createOrderPaystackSaga);
  yield takeEvery('CREATE_ORDER_COOP', createOrderCoopSaga);
  yield takeEvery('CREATE_DELIVERY', createDeliverySaga);
  yield takeEvery('CREATE_PAYSTACK', createPaystackSaga);
  yield takeEvery('CREATE_COOP', createCoopSaga);
}
