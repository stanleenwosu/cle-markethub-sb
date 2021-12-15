import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { formatCurrency } from '~/utils/helpers.ts';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { format } from 'prettier';

const ModulePaymentOrderSummary = ({ ecomerce, shipping, fee }) => {
  const { products, getProducts } = useEcomerce();
  // const [amount, setamount] = useState(0);

  // view
  let listItemsView, shippingView, totalView;
  // let amount;
  const amount = useMemo(() => {
    return (
      parseFloat(calculateAmount(ecomerce.cartItems)) -
      (ecomerce.coupon?.total_discount || 0) +
      parseFloat(fee)
    );
  }, [ecomerce]);

  if (ecomerce.cartItems && ecomerce.cartItems.length > 0) {
    listItemsView = ecomerce.cartItems.map((item) => (
      <Link href="/" key={item.id}>
        <a>
          <strong>
            {item.name}
            <span>x{item.quantity}</span>
          </strong>
          <small>
            {formatCurrency(
              (item.discount_price || item.price) * item.quantity
            )}
          </small>
        </a>
      </Link>
    ));
  } else {
    listItemsView = <p>No Product.</p>;
  }
  if (shipping === true) {
    shippingView = (
      <figure>
        <figcaption>
          <strong>Shipping Fee</strong>
          <small>{formatCurrency(fee)}</small>
        </figcaption>
      </figure>
    );
    totalView = (
      <>
        {ecomerce.coupon.total_discount ? (
          <figure className="ps-block__total">
            <h3>
              Discount
              <strong>-{formatCurrency(ecomerce.coupon.total_discount)}</strong>
            </h3>
          </figure>
        ) : null}

        <figure className="ps-block__total">
          <h3>
            Total
            <strong>{formatCurrency(amount)}</strong>
          </h3>
        </figure>
      </>
    );
  } else {
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>{formatCurrency(amount)}</strong>
        </h3>
      </figure>
    );
  }
  return (
    <div className="ps-block--checkout-order">
      <div className="ps-block__content">
        <figure>
          <figcaption>
            <strong>Product</strong>
            <strong>total</strong>
          </figcaption>
        </figure>
        <figure className="ps-block__items">{listItemsView}</figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>{formatCurrency(amount)}</small>
          </figcaption>
        </figure>
        {shippingView}
        {totalView}
      </div>
    </div>
  );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
