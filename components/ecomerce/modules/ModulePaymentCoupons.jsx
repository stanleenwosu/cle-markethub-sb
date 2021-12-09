import React, { useState } from 'react';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Form, Input, Modal } from 'antd';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import CartRepository from '~/repositories/CartRepository';
import { applyCoupon } from '~/store/ecomerce/action';

const ModulePaymentMethods = ({ auth, dispatch, ecomerce, order }) => {
  let amount;
  const Router = useRouter();
  const [method, setMethod] = useState(1);
  // const auth = useSelector((state) => state.auth);
  // const ecomerce = useSelector((state) => state.ecomerce);

  const handleSubmit = (e) => {
    dispatch(applyCoupon({ cartId: ecomerce.cartId, code: e.code }));
    // CartRepository.applyCoupon({ cartId: ecomerce.cartId, code: e.code });
  };
  if (!ecomerce.coupon.total_discount) {
    return (
      <>
        <h4>Discount Coupon</h4>
        <div className="ps-block--payment-method">
          <Form className="ps-form__billing-info" onFinish={handleSubmit}>
            <div className="form-group">
              <Form.Item name="code">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Coupon code"
                />
              </Form.Item>
              <div className="ps-block__footer">
                <button type="submit" className="ps-btn">
                  Get Coupon
                </button>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default connect((state) => state)(ModulePaymentMethods);
