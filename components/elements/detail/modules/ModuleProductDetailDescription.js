import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
  <div className="ps-product__desc">
    <p>
      Sold By:
      <Link href={`/vendor/${encodeURIComponent(product.shop_id)}`}>
        <a>
          <strong> {product.shop_name}</strong>
        </a>
      </Link>
    </p>
    <div className="ps-list--dot">
      {product.long_description || product.short_description}
    </div>
  </div>
);

export default ModuleProductDetailDescription;
