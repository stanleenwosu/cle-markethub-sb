import React, { Component, useEffect } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import { getWishlistItems } from '~/store/ecomerce/action';
import { formatCurrency } from '~/utils/helpers.ts';

const Wishlist = ({ ecomerce, dispatch, auth }) => {
  const { addItemToCart, loading } = useEcomerce();
  const { addItem, removeItemFromWishlist } = useEcomerce();

  function handleAddItemToCart(e, product) {
    e.preventDefault();
    addItemToCart({
      itemId: product.product_id,
      cartId: ecomerce.cartId,
      userId: auth.user.id,
      customerId: auth.user.customer_id,
    });
    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This item has been added to your Cart`,
    });
    modal.update;
  }

  function handleRemoveWishlistItem(e, product) {
    e.preventDefault();
    removeItemFromWishlist({
      itemId: product.id,
      wishId: ecomerce.wishId,
      userId: auth.user.id,
      customerId: auth.user.customer_id,
    });
  }

  useEffect(() => {
    if (auth.user.customer_id) {
      dispatch(
        getWishlistItems({
          userId: auth.user.id,
          customerId: auth.user.customer_id,
        })
      );
    }
  }, [auth]);

  // views
  let wishlistItemsView;
  if (ecomerce.wishlistItems && ecomerce.wishlistItems.length > 0) {
    wishlistItemsView = (
      <div className="table-responsive">
        <table className="table ps-table--whishlist">
          <thead>
            <tr>
              <th></th>
              <th>Product name</th>
              <th align="left">Unit Price</th>
              {/* <th>Vendor</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ecomerce.wishlistItems.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <a
                    href="#"
                    onClick={(e) => handleRemoveWishlistItem(e, product)}>
                    <i className="icon-cross"></i>
                  </a>
                </td>
                <td>
                  <ProductCart product={product} />
                </td>
                <td className="price">
                  {formatCurrency(product.discount_price || product.price)}
                </td>
                {/* <td>{product.shop}</td> */}
                <td>
                  <a
                    className="ps-btn"
                    href=""
                    onClick={(e) => handleAddItemToCart(e, product)}>
                    Add to cart
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    if (!loading) {
      wishlistItemsView = (
        <div className="alert alert-danger" role="alert">
          Wishlist is empty!
        </div>
      );
    }
  }
  return (
    <div className="ps-section--shopping ps-whishlist">
      <div className="container">
        <div className="ps-section__header">
          <h1>Wishlist</h1>
        </div>
        <div className="ps-section__content">{wishlistItemsView}</div>
      </div>
    </div>
  );
};
export default connect((state) => state)(Wishlist);
