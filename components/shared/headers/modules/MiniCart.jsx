import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import {
  getCartItems,
  deleteCartItem,
} from '../../../../store/ecomerce/action';

const MiniCart = ({ ecomerce, auth, dispatch, ...rest }) => {
  // console.log('🚀 ~ MiniCart ~ rest', rest);
  const { removeItem, removeItems, getProducts, removeItemFromCart } =
    useEcomerce();

  function handleRemoveItem(e, itemId, cartId) {
    e.preventDefault();
    removeItemFromCart({ itemId, cartId, userId: auth.user.id });
    // dispatch(deleteCartItem({ itemId, cartId }));
    // dispatch(getCartItems(auth.user.id));
    // removeItemFromCart(id);
  }

  const [cookie] = useCookies(['cart']);

  useEffect(() => {
    dispatch(getCartItems(auth.user.id));
  }, [auth]);

  //   useEffect(() => {
  //     getCartItems();
  //   }, [ecomerce]);

  let cartItemsView;
  if (ecomerce.cartItems && ecomerce.cartItems.length > 0) {
    const amount = calculateAmount(ecomerce.cartItems);
    const productItems = ecomerce.cartItems.map((item) => {
      return (
        <ProductOnCart product={item} key={item.id}>
          <a
            className="ps-product__remove"
            onClick={(e) => handleRemoveItem(e, item.id, item.cart_id)}>
            <i className="icon-cross"></i>
          </a>
        </ProductOnCart>
      );
    });
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">{productItems}</div>
        <div className="ps-cart__footer">
          <h3>
            Sub Total:
            <strong>${amount ? amount : 0}</strong>
          </h3>
          <figure>
            <Link href="/account/shopping-cart">
              <a className="ps-btn">View Cart</a>
            </Link>
            <Link href="/account/checkout">
              <a className="ps-btn">Checkout</a>
            </Link>
          </figure>
        </div>
      </div>
    );
  } else {
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">
          <span>No products in cart</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-cart--mini">
      <a className="header__extra" href="#">
        <i className="icon-bag2"></i>
        <span>
          <i>{ecomerce.cartItems ? ecomerce.cartItems.length : 0}</i>
        </span>
      </a>
      {cartItemsView}
    </div>
  );
};

export default connect((state) => state)(MiniCart);
