import React from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { formatCurrency } from '~/utils/helpers.ts';

const ModuleCartSummary = ({ source }) => {
  // View
  let productItemsView, amount;
  if (source && source.length > 0) {
    amount = calculateAmount(source);
    productItemsView = source.map((item) => (
      <li key={item.id}>
        <span className="ps-block__estimate d-flex justify-content-between">
          <Link href="/product/[pid]" as={`/product/${item.product_id}`}>
            <a className="ps-product__title text-primary">
              {item.name} x {item.quantity}
            </a>
          </Link>
          <p>
            {formatCurrency(item.discount_price || item.price * item.quantity)}
          </p>
        </span>
      </li>
    ));
  }

  return (
    <>
      <div className="ps-block--shopping-total">
        <div className="ps-block__header">
          <p>
            Subtotal <span> {formatCurrency(amount)}</span>
          </p>
        </div>
        <div className="ps-block__content">
          <ul className="ps-block__product">{productItemsView}</ul>
          <h3>
            Total <span>{formatCurrency(amount)}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default ModuleCartSummary;
