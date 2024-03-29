import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import OrderRepository from '~/repositories/OrderRepository';
import { formatCurrency } from '~/utils/helpers.ts';

const Shipping = ({ auth, ecomerce }) => {
  const [shippingFee, setshippingFee] = useState(0);
  const store = require('store');
  const order = store.get('delivery');

  useEffect(async () => {
    if (ecomerce.cartItems[0]?.shop_id) {
      const response = await OrderRepository.getLogistics({
        shopId: ecomerce.cartItems[0].shop_id,
      });
      setshippingFee(response.data.locations[0].amount);
      console.log('🚀 ~ useEffect ~ response', response);
    }
  }, [ecomerce.cartItems]);

  return (
    <div className="ps-checkout ps-section--shopping">
      <div className="container">
        <div className="ps-section__header">
          <h1>Shipping Information</h1>
        </div>
        <div className="ps-section__content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="ps-block--shipping">
                <div className="ps-block__panel">
                  <figure>
                    <small>Contact</small>
                    <p>{auth.user.email}</p>
                    {/* <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link> */}
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
                    <small> Shipping</small>
                    <strong>{formatCurrency(shippingFee)}</strong>
                  </figure>
                </div>
                <div className="ps-block__footer">
                  <Link href="/account/checkout">
                    <a>
                      <i className="icon-arrow-left mr-2"></i>
                      Return to information
                    </a>
                  </Link>
                  <Link href="/account/payment">
                    <a className="ps-btn">Continue to payment</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
              <div className="ps-form__orders">
                <ModulePaymentOrderSummary fee={shippingFee} shipping={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state)(Shipping);
