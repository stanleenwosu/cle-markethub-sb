import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import {
  getCartItems,
  deleteCartItem,
  addCartItem,
} from '~/store/ecomerce/action';

import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import CartRepository from '~/repositories/CartRepository';
// import useEcomerce from '~/hooks/useEcomerce';
// const { addItem, addItemToCart, addItemToCartLocal } = useEcomerce();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  static getDerivedStateFromProps(props) {
    // console.log('props.cookies :>> ', props.allCookies);
    if (props.auth.isLoggedIn === true) {
      Router.push('/');
    }
    return false;
  }

  handleFeatureWillUpdate(e) {
    e.preventDefault();
    notification.open({
      message: 'Opp! Something went wrong.',
      description: 'This feature has been updated later!',
      duration: 500,
    });
  }

  handleLoginSubmit = async (e) => {
    await this.props.dispatch(login(e));
    setTimeout(() => {
      this.handleCookies();
    }, 5000);
    // Router.push('/');
  };

  handleCookies = () => {
    this.props.allCookies.cart.forEach(async (element) => {
      const data = await CartRepository.getUserCartId({
        customerId: this.props.auth.user.customer_id,
      });
      this.props.dispatch(
        addCartItem({
          itemId: element.id,
          cartId: data.data.id,
          quantity: element.quantity,
        })
      );
    });
    this.props.dispatch(
      getCartItems({
        userId: this.props.auth.user.id,
        customerId: this.props.auth.user.customer_id,
      })
    );
  };

  render() {
    return (
      <div className="ps-my-account">
        <div className="container">
          <Form
            className="ps-form--account"
            onFinish={this.handleLoginSubmit.bind(this)}>
            <ul className="ps-tab-list">
              <li className="active">
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/account/register">
                  <a>Register</a>
                </Link>
              </li>
            </ul>
            <div className="ps-tab active" id="sign-in">
              <div className="ps-form__content">
                <h5>Log In Your Account</h5>
                <div className="form-group">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}>
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Username or email address"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Item>
                </div>
                <div className="form-group form-forgot">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}>
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Password..."
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                    />
                    <label htmlFor="remember-me">Rememeber me</label>
                  </div>
                </div>
                <div className="form-group submit">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    Login
                  </button>
                </div>
              </div>
              <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <a
                      className="facebook"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="google"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}>
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withCookies(connect(mapStateToProps)(Login));
