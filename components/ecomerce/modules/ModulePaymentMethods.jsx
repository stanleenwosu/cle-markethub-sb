import React, { useState } from 'react';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Form, Input, Modal } from 'antd';
import { PaystackConsumer } from 'react-paystack';
import {
  FlutterWaveButton,
  closePaymentModal,
  useFlutterwave,
} from 'flutterwave-react-v3';

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
    amount: (parseInt(amount) + 0) * 100,
    publicKey: 'pk_test_907c693333478cc0246adbdf28e13d343d1cf18b',
  };

  const flutterwaveConfig = {
    public_key: 'FLWPUBK_TEST-08240e1db88c3643639804ae35bbbcba-X',
    tx_ref: Date.now(),
    amount: parseInt(amount) + 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: auth.user.email,
      // phonenumber: '07064586146',
      // name: 'joel ugwumadu',
    },
    customizations: {
      title: 'CLE Marketplace',
      description: 'Payment for items in cart',
      logo: 'https://markethub.cle.ng/static/img/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

  // const fwConfig = {
  //   ...flutterwaveConfig,
  //   text: 'Pay with Flutterwave!',
  //   callback: (response) => {
  //     console.log(response);
  //     handleSuccess(true);
  //     closePaymentModal(); // this will close the modal programmatically
  //   },
  //   onClose: () => {},
  // };

  function handleChangeMethod(e) {
    setMethod(e.target.value); //e.target.value
  }

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch({
      type: 'CREATE_ORDER_COOP',
      payload: {
        cartId: ecomerce.cartId,
        customerId: auth.user.customer_id,
        delivery,
        tenure: e.tenure,
        amount: (config.amount / 100).toString(),
      },
    });
    clearCart();
    Router.push('/account/payment-success');
  }

  // you can call this function anything
  const handleSuccess = (reference) => {
    dispatch({
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
    // clearCart();
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

  let paymentView;

  if (method === 1) {
    paymentView = Boolean(ecomerce.cartId) ? (
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button
            className="ps-btn ps-btn--fullwidth"
            onClick={() => initializePayment(handleSuccess, handleClose)}>
            Pay using Paystack
          </button>
        )}
      </PaystackConsumer>
    ) : null;
  } else if (method === 2) {
    paymentView = (
      <button
        className="ps-btn ps-btn--fullwidth"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              handleSuccess({ status: true });
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}>
        Pay using Flutterwave
      </button>
    );
  } else {
    paymentView = (
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
    );
  }

  return (
    <>
      <h4>Payment Methods</h4>
      <div className="ps-block--payment-method">
        <div className="ps-block__header">
          <Radio.Group onChange={(e) => handleChangeMethod(e)} value={method}>
            <Radio value={1}>Paystack</Radio>
            <Radio value={2}>Flutterwave</Radio>
            <Radio value={3}>COOP</Radio>
          </Radio.Group>
        </div>
        {paymentView}
        {/* <div className="ps-block__content">
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
        </div> */}
      </div>
    </>
  );
};

export default connect((state) => state)(ModulePaymentMethods);
