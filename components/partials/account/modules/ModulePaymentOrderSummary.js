import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { formatCurrency } from '~/utils/helpers.ts';
import { calculateAmount } from '~/utilities/ecomerce-helpers';

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
  const { products, getProducts } = useEcomerce();

  // view
  let listItemsView, shippingView, totalView;
  let amount;
  if (ecomerce.cartItems && ecomerce.cartItems.length > 0) {
    amount = calculateAmount(ecomerce.cartItems);
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
          <small>Free</small>
        </figcaption>
      </figure>
    );
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>{formatCurrency(amount)}</strong>
        </h3>
      </figure>
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
