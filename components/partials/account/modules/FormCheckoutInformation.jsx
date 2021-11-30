import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { saveDelivery } from '~/store/order/action';

class FormCheckoutInformation extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    // console.log('🚀 ~ FormCheckoutInformation ~ e', e);
    const { apartment, name, ...form } = e;
    // console.log('🚀 ~ FormCheckoutInformation ~ this.props', this.props);
    this.props.dispatch(saveDelivery(form));
    Router.push('/account/shipping');
  };

  render() {
    return (
      <Form
        className="ps-form__billing-info"
        onFinish={this.handleSubmit.bind(this)}>
        <h3 className="ps-form__heading">Contact information</h3>
        <div className="form-group">
          <Form.Item name="name">
            <Input
              className="form-control"
              type="text"
              placeholder="Email or phone number"
              disabled={true}
              defaultValue={this.props.auth.user.email}
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <div className="ps-checkbox">
            <input className="form-control" type="checkbox" id="keep-update" />
            <label htmlFor="keep-update">
              Keep me up to date on news and exclusive offers?
            </label>
          </div>
        </div>
        <h3 className="ps-form__heading">Shipping address</h3>
        <div className="form-group">
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Enter an address!',
              },
            ]}>
            <Input className="form-control" type="text" placeholder="Address" />
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            name="apartment"
            rules={[
              {
                required: false,
                message: 'Enter an Apartment!',
              },
            ]}>
            <Input
              className="form-control"
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </Form.Item>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Enter a city!',
                  },
                ]}>
                <Input
                  className="form-control"
                  type="city"
                  placeholder="City"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true,
                    message: 'Enter a state!',
                  },
                ]}>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="State"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* <div className="form-group">
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="save-information"
            />
            <label htmlFor="save-information">
              Save this information for next time
            </label>
          </div>
        </div> */}
        <div className="ps-form__submit">
          <Link href="/account/shopping-cart">
            <a>
              <i className="icon-arrow-left mr-2"></i>
              Return to shopping cart
            </a>
          </Link>
          <div className="ps-block__footer">
            <button className="ps-btn">Continue to shipping</button>
          </div>
        </div>
      </Form>
    );
  }
}

export default connect((state) => state)(FormCheckoutInformation);
