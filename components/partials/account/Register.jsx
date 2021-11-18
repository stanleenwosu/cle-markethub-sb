import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { register } from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

class Register extends Component {
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

  handleSubmit = (e) => {
    this.props.dispatch(register({ account_type: 'customer', ...e }));
    Router.push('/account/login');

    // e.preventDefault();
    // console.log('here');
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     this.props.dispatch(register());
    //     Router.push('/account/login');
    //   } else {
    //     console.error(`validate error`, err);
    //   }
    // });
  };

  render() {
    return (
      <div className="ps-my-account">
        <div className="container">
          <Form
            className="ps-form--account"
            onFinish={this.handleSubmit.bind(this)}>
            <ul className="ps-tab-list">
              <li>
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="active">
                <Link href="/account/register">
                  <a>Register</a>
                </Link>
              </li>
            </ul>
            <div className="ps-tab active" id="register">
              <div className="ps-form__content">
                <h5>Register An Account</h5>
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
                      type="email"
                      placeholder="Email address"
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
                      value={this.state.email}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                      type="password"
                      placeholder="Password..."
                    />
                  </Form.Item>
                </div>
                <div className="form-group submit">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    Register
                  </button>
                </div>
              </div>
              <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
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
export default connect(mapStateToProps)(Register);
