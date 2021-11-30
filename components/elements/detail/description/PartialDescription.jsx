import React from 'react';

const PartialDescription = ({ product }) => (
  <div className="ps-document">
    <p>{product.long_description}</p>
  </div>
);

export default PartialDescription;
