import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal } from 'antd';
import useProduct from '~/hooks/useProduct';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleProductWideActions = ({ ecomerce, product }) => {
  const { price } = useProduct();
  const { addItem, addItemToCart } = useEcomerce();
  const auth = useSelector((state) => state.auth);

  function handleAddItemToCart(e) {
    e.preventDefault();
    addItemToCart({ quantity: 1, ...product }, 'cart');
    Modal.success({
      centered: true,
      title: 'Success!',
      content: `${product.name} has been added to your cart`,
    });
  }

  function handleAddItemToWishlist(e) {
    e.preventDefault();
    addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This item has been added to your wishlist`,
    });
    modal.update;
  }

  function handleAddItemToCompare(e) {
    e.preventDefault();
    addItem({ id: product.id }, ecomerce.compareItems, 'compare');
    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This product has been added to your compare listing!`,
    });
    modal.update;
  }

  return (
    <div className="ps-product__shopping">
      {price(product)}
      {auth.isLoggedIn ? (
        <a className="ps-btn" href="#" onClick={(e) => handleAddItemToCart(e)}>
          Add to cart
        </a>
      ) : (
        'Login to Add to Cart'
      )}
      <ul className="ps-product__actions">
        <li>
          <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
            <i className="icon-heart"></i> Wishlist
          </a>
        </li>
        {/* <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li> */}
      </ul>
    </div>
  );
};

export default connect((state) => state)(ModuleProductWideActions);
