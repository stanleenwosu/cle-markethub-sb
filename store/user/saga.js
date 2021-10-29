import { call, all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import { actionTypes, getUser, getUserSucess } from './action';
import AuthRepository from '~/repositories/AuthRepository';
import UserRepository from '~/repositories/UserRepository';

function* userSaga(action) {
  try {
    const auth = yield call(AuthRepository.login, action.payload);
    const { data: user } = yield call(UserRepository.getUser, {
      id: auth.data.id,
    });
    yield put(loginSuccess(auth.data));
    modalSuccess('success');
  } catch (err) {
    console.log('err: ', err);
    if (err.response) {
      notification.warning({
        message: 'Error!',
        //   description: err.response.data.message,
      });
    }
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.USER_REQUEST, userSaga)]);
}
