import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import ModulePaymentShipping from '~/components/ecomerce/modules/ModulePaymentShipping';
import ModulePaymentMethods from '~/components/ecomerce/modules/ModulePaymentMethods';
import ModulePaymentCoupons from '~/components/ecomerce/modules/ModulePaymentCoupons';
import OrderRepository from '~/repositories/OrderRepository';

const Payment = ({ ecomerce, order }) => {
  const [shippingFee, setshippingFee] = useState(0);

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
          <h1>Payment</h1>
        </div>
        <div className="ps-section__content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="ps-block--shipping">
                <ModulePaymentShipping />
                <ModulePaymentCoupons />
                <ModulePaymentMethods fee={shippingFee} />
                <div className="ps-block__footer">
                  <Link href="/account/shipping">
                    <a>
                      <i className="icon-arrow-left mr-2"></i>
                      Return to shipping
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
              <div className="ps-form__orders">
                <ModulePaymentOrderSummary shipping fee={shippingFee} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state)(Payment);
