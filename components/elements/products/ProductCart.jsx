import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';

const ProductCart = ({ product }) => {
  const { thumbnailImage, title } = useProduct();
  return (
    <div className="ps-product--cart">
      <div className="ps-product__thumbnail">
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a>{thumbnailImage(product, true)}</a>
        </Link>
      </div>
      <div className="ps-product__content">
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a className="ps-product__title">{product.name}</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
