import { call, all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import {
  actionTypes,
  login,
  loginSuccess,
  logOutSuccess,
  userSuccess,
} from './action';
import AuthRepository from '~/repositories/AuthRepository';
import UserRepository from '~/repositories/UserRepository';

const modalSuccess = (type) => {
  notification[type]({
    message: 'Welcome back',
    description: 'You are login successful!',
  });
};

const modalWarning = (type) => {
  notification[type]({
    message: 'Good bye!',
    description: 'Your account has been logged out!',
  });
};

function* loginSaga(action) {
  try {
    const auth = yield call(AuthRepository.login, action.payload);
    const { data: user } = yield call(UserRepository.getUser, {
      id: auth.data.id,
    });

    yield put(loginSuccess(auth.data));
    const fullUser = { ...user, ...auth.data };
    yield put(userSuccess(fullUser));
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

function* registerSaga(action) {
  try {
    yield call(AuthRepository.register, action.payload);
    notification.success({
      message: 'Registration Success',
      description: 'Your account has been registered successfully! Log in',
    });
  } catch (err) {
    // console.log('err: ', err.response);
    notification.warning({
      message: 'Error!',
      description: err.response.data.message,
    });
  }
}

function* logOutSaga() {
  try {
    yield put(logOutSuccess());
    modalWarning('warning');
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.REGISTER_REQUEST, registerSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
