import { call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import OrderRepository from '~/repositories/OrderRepository';
import CartRepository from '~/repositories/CartRepository';
import { actionTypes, saveDeliverySuccess, saveOrderSuccess } from './action';
import { notification, Modal } from 'antd';
import { formatCurrency } from '~/utilities/product-helper';

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
    yield put({ type: 'SAVE_ORDER_SUCCESS', payload: orderData.data });
    yield call(createDeliverySaga, {
      payload: {
        orderId: orderData.data.id,
        customerId: payload.customerId,
        ...payload.delivery,
      },
    });
    yield call(createPaystackSaga, {
      payload: {
        orderId: orderData.data.id,
        customerId: payload.customerId,
        status: payload.status,
        detail: payload.detail,
        amount: payload.amount,
      },
    });
    yield call(CartRepository.deleteCart, {
      cartId: payload.cartId,
    });
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
    yield put({ type: 'SAVE_ORDER_SUCCESS', payload: orderData.data });
    yield call(createDeliverySaga, {
      payload: {
        orderId: orderData.data.id,
        customerId: payload.customerId,
        ...payload.delivery,
      },
    });
    yield call(createCoopSaga, {
      payload: {
        orderId: orderData.data.id,
        customerId: payload.customerId,
        tenure: payload.tenure,
        amount: payload.amount,
      },
    });
    /* yield call(CartRepository.deleteCart, {
      cartId: payload.cartId,
    }); */
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
    const data = yield call(OrderRepository.getCoop, payload);
    console.log('🚀 ~ function*createCoopSaga ~ data', data);
    Modal.info().update({
      title: data.message,
      okText: 'Complete Payment',
      onOk() {
        return new Promise((resolve, reject) => {
          resolve(
            OrderRepository.createCoop({
              ...payload,
              tenure: parseFloat(payload.tenure),
              amount: parseFloat(payload.amount),
            })
          );
        }).catch(() => {
          reject(false);
          console.log('Oops errors!');
        });
      },
      content: (
        <>
          <img
            className="mt-4"
            height="25"
            src={data.data.cooperative.cooperative_logo}></img>
          <p>Cooperative Name: {data.data.cooperative.cooperative_name}</p>
          <p>
            Cooperative Address: {data.data.cooperative.cooperative_address}
          </p>
          <p>Cooperative Code: {data.data.cooperative.cooperative_code}</p>
          <hr></hr>
          <p>Principal: {data.data.principal}</p>
          <p>Interest: {data.data.interest}</p>
          <p>Monthly Due: {data.data.monthly_due}</p>
          <p>Total Due: {data.data.total_due}</p>
          <p>Tenure: {data.data.tenure}</p>
        </>
      ),
    });
    // const data2 = yield call(OrderRepository.createCoop, payload);
    // console.log('🚀 ~ function*createCoopSaga ~ data2', data2);

    // yield put({ type: 'SAVE_ORDER_SUCCESS', payload: data });
  } catch (err) {
    console.error(err.response);
    notification.error({ message: err.response.data.message });
  }
}

export default function* rootSaga() {
  yield takeLatest(actionTypes.SAVE_DELIVERY, saveDeliverySaga);
  yield takeLatest('CREATE_ORDER_PAYSTACK', createOrderPaystackSaga);
  yield takeLatest('CREATE_ORDER_COOP', createOrderCoopSaga);
  yield takeLatest('CREATE_DELIVERY', createDeliverySaga);
  yield takeLatest('CREATE_PAYSTACK', createPaystackSaga);
  yield takeLatest('CREATE_COOP', createCoopSaga);
  // yield takeLatest('TEST', testSaga);
}
