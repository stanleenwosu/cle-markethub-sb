import React from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = ({ product }) => (
  <div className="ps-product__specification">
    <Link href="/page/blank">
      <a className="report">Report Abuse</a>
    </Link>
    {/* <p>
            <strong>SKU:</strong> SF1133569600-1
        </p> */}
    <p className="categories">
      <strong> Categories:</strong>
      <Link href="#">
        <a>{product.category_name}</a>
      </Link>
    </p>
    {/* <p className="tags">
      <strong> Tags</strong>
      <Link href="/shop">
        <a>sofa</a>
      </Link>
      <Link href="/shop">
        <a>technologies</a>
      </Link>
      <Link href="/shop">
        <a>wireless</a>
      </Link>
    </p> */}
  </div>
);

export default ModuleProductDetailSpecification;
