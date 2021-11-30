import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { connect, useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleProductActions = ({ product, ecomerce, dispatch }) => {
  const auth = useSelector((state) => state.auth);
  const [isQuickView, setIsQuickView] = useState(false);
  const { addItem, addItemToCart, addItemToCartLocal, addItemToWishlist } =
    useEcomerce();

  function handleAddItemToCart(e) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      // console.log(`ecommerce`, ecomerce);
      addItemToCart({
        itemId: product.id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      addItemToCartLocal({ ...product, quantity: 1 });
    }
    // const modal = Modal.success({
    //   centered: true,
    //   title: 'Success!',
    //   content: `This item has been added to your Cart`,
    // });
    // modal.update;
  }

  function handleAddItemToWishlist(e) {
    e.preventDefault();
    addItemToWishlist({
      itemId: product.id,
      wishId: ecomerce.wishId,
      userId: auth.user.id,
      customerId: auth.user.customer_id,
    });

    // const modal = Modal.success({
    //   centered: true,
    //   title: 'Success!',
    //   content: `This item has been added to your Wishlist`,
    // });
    // modal.update;
  }

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
