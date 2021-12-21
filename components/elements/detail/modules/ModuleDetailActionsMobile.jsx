import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleDetailActionsMobile = ({ ecomerce, product, auth }) => {
  const { addItem, addItemToCart, addItemToCartLocal, addItemToWishlist } =
    useEcomerce();
  const handleAddItemToCart = (e) => {
    e.preventDefault();
    if (auth.isLoggedIn) {
      console.log(`ecommerce`, ecomerce);
      addItemToCart({
        itemId: product.id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      addItemToCartLocal({ ...product, quantity: 1 });
    }
  };

  const handleAddItemToWishlist = (e) => {
    e.preventDefault();
    addItemToWishlist({
      itemId: product.id,
      wishId: ecomerce.wishId,
      userId: auth.user.id,
      customerId: auth.user.customer_id,
    });
  };

  return (
    <div className="ps-product__actions-mobile">
      <a
        className="ps-btn ps-btn--black"
        href="#"
        onClick={(e) => handleAddItemToCart(e)}>
        Add to cart
      </a>
      <a className="ps-btn" href="#" onClick={(e) => handleAddItemToCart(e)}>
        Buy Now
      </a>
    </div>
  );
};

export default connect((state) => state)(ModuleDetailActionsMobile);
