import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utils/helpers.ts';

const ProductOnCart = ({ product, children }) => {
  const { thumbnailImage, title } = useProduct();

  return (
    <div className="ps-product--cart-mobile">
      <div className="ps-product__thumbnail">
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a>{thumbnailImage(product, true)}</a>
        </Link>
      </div>
      <div className="ps-product__content">
        {title(product)}
        <p>
          <small>
            {formatCurrency(
              (product.discount_price || product.price) * product.quantity
            )}
          </small>
        </p>{' '}
        {children}
      </div>
    </div>
  );
};

export default ProductOnCart;
