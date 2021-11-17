export const actionTypes = {
  CREATE_ORDER: 'CREATE_ORDER',
  CREATE_DELIVERY: 'CREATE_DELIVERY',
  SAVE_DELIVERY: 'SAVE_DELIVERY',
  SAVE_DELIVERY_SUCCESS: 'SAVE_DELIVERY_SUCCESS',
  SAVE_ORDER_SUCCESS: 'SAVE_ORDER_SUCCESS',
};

export function createOrder(payload) {
  return { type: actionTypes.CREATE_ORDER, payload };
}

export function createDelivery(payload) {
  return { type: actionTypes.CREATE_ORDER, payload };
}

export function saveDelivery(payload) {
  return { type: actionTypes.SAVE_DELIVERY, payload };
}
export function saveDeliverySuccess(payload) {
  return { type: actionTypes.SAVE_DELIVERY_SUCCESS, payload };
}
export function saveOrderSuccess(payload) {
  return { type: actionTypes.SAVE_ORDER_SUCCESS, payload };
}
