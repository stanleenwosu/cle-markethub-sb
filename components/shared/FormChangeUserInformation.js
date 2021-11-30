import React from 'react';
import { DatePicker, Form, Input, Radio } from 'antd';
import { useSelector } from 'react-redux';

const FormChangeUserInformation = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <form className="ps-form--account-setting">
      <div className="ps-form__header">
        <h3>Account Information</h3>
      </div>
      <div className="ps-form__content">
        {/* <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Username or email address"
            value={user.email}
          />
        </div> */}
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={user.firstname}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                value={user.lastname}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Phone Number"
                value={user.phone}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Email Address"
                disabled
                value={user.email}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input className="form-control" type="text" placeholder="City" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        <div className="form-group submit">
          <button className="ps-btn">Update profile</button>
        </div>
      </div>
    </form>
  );
};

export default FormChangeUserInformation;
