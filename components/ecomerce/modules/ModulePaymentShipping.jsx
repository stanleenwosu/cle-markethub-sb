import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const ModulePaymentShipping = () => {
  const state = useSelector((state) => state);

  const store = require('store');
  const order = store.get('delivery');
  return (
    <>
      <div className="ps-block__panel">
        <figure>
          <small>Contact</small>
          <p>{state.auth.user.email}</p>
        </figure>
        <figure>
          <small>Ship to</small>
          <p>{`${order?.address}, ${order?.city},${order?.state}`}</p>
          <Link href="/account/checkout">
            <a>Change</a>
          </Link>
        </figure>
      </div>
      <h4>Shipping Method</h4>
      <div className="ps-block__panel">
        <figure>
          <small>International Shipping</small>
          <strong>Free</strong>
        </figure>
      </div>
    </>
  );
};

export default ModulePaymentShipping;
