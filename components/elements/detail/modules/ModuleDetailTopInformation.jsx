import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '~/utilities/product-helper';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
  // Views
  let priceView;

  if (product.discount_price) {
    priceView = (
      <h4 className="ps-product__price sale">
        <del className="mr-2">₦{product.price}</del>₦{product.discount_price}
      </h4>
    );
  } else {
    priceView = <h4 className="ps-product__price">₦{product.price}</h4>;
  }
  return (
    <header>
      <h1>{product.name}</h1>
      <div className="ps-product__meta">
        <p>
          Category:
          <Link href="/shop">
            <a className="ml-2 text-capitalize">{product.category_name}</a>
          </Link>
        </p>
        <div className="ps-product__rating">
          <Rating />
          {/* <span>(1 review)</span> */}
        </div>
      </div>
      {priceView}
    </header>
  );
};

export default ModuleDetailTopInformation;
