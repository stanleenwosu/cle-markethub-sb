import React, { useState } from 'react';
import { Radio } from 'antd';
import { useRouter } from 'next/router';
import { Form, Input, Modal } from 'antd';

const ModulePaymentMethods = () => {
  const Router = useRouter();
  const [method, setMethod] = useState(1);

  function handleChangeMethod(e) {
    setMethod(e.target.value); //e.target.value
  }

  function handleSubmit(e) {
    e.preventDefault();
    Router.push('/account/payment-success');
  }

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
            <div className="ps-block__tab">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Card Holders</label>
                <input type="text" className="form-control" />
              </div>
              <div className="row">
                <div className="col-sm-4 col-4">
                  <div className="form-group">
                    <label>Expiration Date (MM/YY)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="01/21"
                    />
                  </div>
                </div>
                <div className=" col-sm-4 col-4">
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button
                  className="ps-btn ps-btn--fullwidth"
                  onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="ps-block__tab">
              <Form className="ps-form--account" onFinish={handleSubmit}>
                <div className="form-group">
                  <Form.Item
                    name="tenure"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your tenure!',
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

export default ModulePaymentMethods;
