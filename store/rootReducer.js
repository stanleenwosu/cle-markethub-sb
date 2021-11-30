import { combineReducers } from 'redux';
import auth from './auth/reducer';
import setting from './setting/reducer';
import app from './app/reducer';
import ecomerce from './ecomerce/reducer';
import order from './order/reducer';

export default combineReducers({
  auth,
  setting,
  app,
  ecomerce,
  order,
});
