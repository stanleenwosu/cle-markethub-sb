import React, { useState } from 'react';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Form, Input, Modal } from 'antd';
import { PaystackConsumer } from 'react-paystack';
import { useSelector } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import CartRepository from '~/repositories/CartRepository';

const ModulePaymentMethods = ({ auth, dispatch, ecomerce, order }) => {
  let amount;
  const Router = useRouter();
  const [method, setMethod] = useState(1);
  // const auth = useSelector((state) => state.auth);
  // const ecomerce = useSelector((state) => state.ecomerce);
  const store = require('store');
  const delivery = store.get('delivery');

  amount = calculateAmount(ecomerce.cartItems);

  const config = {
    reference: new Date().getTime().toString(),
    email: auth.user.email,
    amount: (parseInt(amount) + 2000) * 100,
    publicKey: 'pk_test_907c693333478cc0246adbdf28e13d343d1cf18b',
  };

  function handleChangeMethod(e) {
    setMethod(e.target.value); //e.target.value
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    await dispatch({
      type: 'CREATE_ORDER_COOP',
      payload: {
        cartId: ecomerce.cartId,
        customerId: auth.user.customer_id,
        delivery,
        tenure: e.tenure,
        amount: (config.amount / 100).toString(),
      },
    });
    await clearCart();
    Router.push('/account/payment-success');
  }

  // you can call this function anything
  const handleSuccess = async (reference) => {
    await dispatch({
      type: 'CREATE_ORDER_PAYSTACK',
      payload: {
        cartId: ecomerce.cartId,
        customerId: auth.user.customer_id,
        delivery,
        status: reference.status,
        detail: {},
        amount: (config.amount / 100).toString(),
      },
    });
    await clearCart();
    Router.push('/account/payment-success');
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const clearCart = async () => {
    await CartRepository.deleteCart({ cartId: ecomerce.cartId });
  };

  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <>
      <h4>Payment Methods</h4>
      <div className="ps-block--payment-method">
        <div className="ps-block__header">
          <Radio.Group onChange={(e) => handleChangeMethod(e)} value={method}>
            <Radio value={1}>Paystack</Radio>
            <Radio value={2}>COOP</Radio>
          </Radio.Group>
        </div>
        <div className="ps-block__content">
          {method === 1 ? (
            Boolean(ecomerce.cartId) ? (
              <PaystackConsumer {...componentProps}>
                {({ initializePayment }) => (
                  <button
                    className="ps-btn ps-btn--fullwidth"
                    onClick={() =>
                      initializePayment(handleSuccess, handleClose)
                    }>
                    Pay using Paystack
                  </button>
                )}
              </PaystackConsumer>
            ) : null
          ) : (
            <div className="ps-block__content">
              <Form className="" onFinish={handleSubmit}>
                <div className="form-group">
                  <Form.Item
                    name="tenure"
                    rules={[
                      {
                        required: true,
                        message: 'Number of repayment months',
                      },
                    ]}>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Tenure"
                      // onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Item>
                </div>
                <div className="form-group submit">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    Pay using COOP
                  </button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default connect((state) => state)(ModulePaymentMethods);
