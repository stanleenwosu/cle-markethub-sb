import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal } from 'antd';
import useProduct from '~/hooks/useProduct';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleProductWideActions = ({ ecomerce, product }) => {
  const { price } = useProduct();
  const { addItem, addItemToCart, addItemToCartLocal, addItemToWishlist } =
    useEcomerce();
  const auth = useSelector((state) => state.auth);

  function handleAddItemToCart(e) {
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
    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This item has been added to your Cart`,
    });
    modal.update;
  }

  function handleAddItemToWishlist(e) {
    e.preventDefault();
    addItemToWishlist({
      itemId: product.id,
      wishId: ecomerce.wishId,
      userId: auth.user.id,
      customerId: auth.user.customer_id,
    });

    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This item has been added to your Wishlist`,
    });
    modal.update;
  }

  // function handleAddItemToCompare(e) {
  //   e.preventDefault();
  //   addItem({ id: product.id }, ecomerce.compareItems, 'compare');
  //   const modal = Modal.success({
  //     centered: true,
  //     title: 'Success!',
  //     content: `This product has been added to your compare listing!`,
  //   });
  //   modal.update;
  // }

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
