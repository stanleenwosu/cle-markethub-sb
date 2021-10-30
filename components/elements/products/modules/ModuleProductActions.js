import React, { useState } from 'react';
import { Modal } from 'antd';
import { connect, useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleProductActions = ({ product, ecomerce }) => {
  const auth = useSelector((state) => state.auth);
  const [isQuickView, setIsQuickView] = useState(false);
  const { addItem, addItemToCart } = useEcomerce();

  function handleAddItemToCart(e) {
    e.preventDefault();
    addItemToCart({ quantity: 1, ...product }, 'cart');
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

  //   function handleAddItemToCompare(e) {
  //     e.preventDefault();
  //     addItem({ id: product.id }, ecomerce.compareItems, 'compare');
  //     const modal = Modal.success({
  //       centered: true,
  //       title: 'Success!',
  //       content: `This product has been added to your compare listing!`,
  //     });
  //     modal.update;
  //   }

  const handleShowQuickView = (e) => {
    e.preventDefault();
    setIsQuickView(true);
  };

  const handleHideQuickView = (e) => {
    e.preventDefault();
    setIsQuickView(false);
  };
  return (
    <ul className="ps-product__actions">
      {auth.isLoggedIn ? (
        <li>
          <a
            href="#"
            data-toggle="tooltip"
            data-placement="top"
            title="Add To Cart"
            onClick={handleAddItemToCart}>
            <i className="icon-bag2"></i>
          </a>
        </li>
      ) : (
        'Login to Add to Cart'
      )}
      <li>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Quick View"
          onClick={handleShowQuickView}>
          <i className="icon-eye"></i>
        </a>
      </li>
      {auth.isLoggedIn ? (
        <li>
          <a
            href="#"
            data-toggle="tooltip"
            data-placement="top"
            title="Add to wishlist"
            onClick={handleAddItemToWishlist}>
            <i className="icon-heart"></i>
          </a>
        </li>
      ) : null}

      {/* <li>
                <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    onClick={handleAddItemToCompare}>
                    <i className="icon-chart-bars"></i>
                </a>
            </li> */}
      <Modal
        centered
        footer={null}
        width={1024}
        onCancel={(e) => handleHideQuickView(e)}
        visible={isQuickView}
        closeIcon={<i className="icon icon-cross2"></i>}>
        <h3>Quickview</h3>
        <ProductDetailQuickView product={product} />
      </Modal>
    </ul>
  );
};

export default connect((state) => state)(ModuleProductActions);
