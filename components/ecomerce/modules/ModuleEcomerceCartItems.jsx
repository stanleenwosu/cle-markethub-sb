import React from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { Result } from 'antd';
import ProductCart from '~/components/elements/products/ProductCart';
import { formatCurrency } from '~/utils/helpers.ts';

const ModuleEcomerceCartItems = ({ ecomerce, cartItems, auth }) => {
  const {
    addItemToCart,
    addItemToCartLocal,
    decreaseCartItemQty,
    decreaseCartItemQtyLocal,
    removeItemCartLocal,
    removeItemFromCart,
  } = useEcomerce();

  function handleRemoveItem(e, itemId, cartId) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      removeItemFromCart({
        itemId,
        cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      removeItemCartLocal(itemId);
    }
  }

  function handleIncreaseItemQty(e, product) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      addItemToCart({
        itemId: product.product_id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      addItemToCartLocal({ ...product, quantity: 1 });
    }
  }

  function handleDecreaseItemQty(e, product) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      decreaseCartItemQty({
        itemId: product.product_id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      decreaseCartItemQtyLocal({ ...product, quantity: 1 });
    }
  }

  // View
  let cartItemsViews;
  if (cartItems && cartItems.length > 0) {
    const items = cartItems.map((item) => (
      <tr key={item.id}>
        <td>
          <ProductCart product={item} />
        </td>
        <td data-label="price" className="price">
          {formatCurrency(item.discount_price || item.price)}
        </td>
        <td data-label="quantity">
          <div className="form-group--number">
            <button
              className="up"
              onClick={(e) => handleIncreaseItemQty(e, item)}>
              +
            </button>
            {auth.isLoggedIn ? null : (
              <button
                className="down"
                onClick={(e) => handleDecreaseItemQty(e, item)}>
                -
              </button>
            )}
            <input
              className="form-control"
              type="text"
              placeholder={item.quantity}
              disabled={true}
            />
          </div>
        </td>
        <td data-label="total">
          <strong>
            {formatCurrency(item.discount_price || item.price * item.quantity)}
          </strong>
        </td>
        <td>
          <a
            href="#"
            onClick={(e) => handleRemoveItem(e, item.id, item.cart_id)}>
            <i className="icon-cross"></i>
          </a>
        </td>
      </tr>
    ));

    cartItemsViews = (
      <>
        <table className="table  ps-table--shopping-cart ps-table--responsive">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </>
    );
  } else {
    cartItemsViews = <Result status="warning" title="No product in cart." />;
  }
  return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
