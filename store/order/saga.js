import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, saveDeliverySuccess } from './action';

function* saveDeliverySaga({ payload }) {
  try {
    yield put(saveDeliverySuccess(payload));
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.SAVE_DELIVERY, saveDeliverySaga)]);
}
