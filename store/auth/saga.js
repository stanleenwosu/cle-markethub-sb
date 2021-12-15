import {
  call,
  all,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { notification } from 'antd';
import {
  actionTypes,
  login,
  loginSuccess,
  logOutSuccess,
  userSuccess,
} from './action';
import { addCartItem } from '~/store/ecomerce/saga';
import AuthRepository from '~/repositories/AuthRepository';
import UserRepository from '~/repositories/UserRepository';
import CartRepository from '~/repositories/CartRepository';
import Cookies from 'js-cookie';

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

const isServer = typeof window === 'undefined';
let cookiesCart;
if (!isServer && Cookies.get('cart')) {
  cookiesCart = JSON.parse(Cookies.get('cart'));
}
console.log(`cookiesCart`, cookiesCart);

// function* handleCart(action) {
//   if (cookiesCart) {
//     cookiesCart.forEach(async (element) => {
//       const data = await CartRepository.getUserCartId({
//         customerId: action.user.customer_id,
//       });
//       this.props.dispatch(
//         addCartItem({
//           itemId: element.id,
//           cartId: data.data.id,
//           quantity: element.quantity,
//         })
//       );
//     });
//     this.props.dispatch(
//       getCartItems({
//         userId: action.user.id,
//         customerId: action.user.customer_id,
//       })
//     );
//   }
// }

function* loginSaga(action) {
  const auth = yield select((state) => state.auth);
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
        description: err.response.data.message,
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
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga);
  yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga);
  yield takeLatest(actionTypes.LOGOUT, logOutSaga);
}
