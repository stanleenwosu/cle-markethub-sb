import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import useEcomerce from '~/hooks/useEcomerce';

const ModuleDetailShoppingActions = ({
  ecomerce,
  product,
  auth,
  extended = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const Router = useRouter();
  const { addItem, addItemToCart, addItemToCartLocal, addItemToWishlist } =
    useEcomerce();

  function handleAddItemToCart(e, itemId, cartId) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      addItemToCart({
        itemId: product.id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
        quantity,
      });
    } else {
      addItemToCartLocal({ ...product, quantity });
    }
    const modal = Modal.success({
      centered: true,
      title: 'Success!',
      content: `This item has been added to your Cart`,
    });
    modal.update;
  }

  function handleBuynow(e, itemId, cartId) {
    e.preventDefault();
    if (auth.isLoggedIn) {
      addItemToCart({
        itemId: product.id,
        cartId: ecomerce.cartId,
        userId: auth.user.id,
        customerId: auth.user.customer_id,
      });
    } else {
      addItemToCartLocal({ ...product, quantity: 1 });
    }
    setTimeout(function () {
      Router.push('/account/checkout');
    }, 1000);
  }

  // const handleAddItemToCompare = (e) => {
  //   e.preventDefault();
  //   e.preventDefault();
  //   addItem({ id: product.id }, ecomerce.compareItems, 'compare');
  //   const modal = Modal.success({
  //     centered: true,
  //     title: 'Success!',
  //     content: `This product has been added to compare listing!`,
  //   });
  //   modal.update;
  // };

  const handleAddItemToWishlist = (e) => {
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
  };

  function handleIncreaseItemQty(e) {
    e.preventDefault();
    setQuantity(quantity + 1);
  }

  function handleDecreaseItemQty(e) {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  if (!extended) {
    return (
      <div className="ps-product__shopping">
        <figure>
          <figcaption>Quantity</figcaption>
          <div className="form-group--number">
            <button className="up" onClick={(e) => handleIncreaseItemQty(e)}>
              <i className="fa fa-plus"></i>
            </button>
            <button className="down" onClick={(e) => handleDecreaseItemQty(e)}>
              <i className="fa fa-minus"></i>
            </button>
            <input
              className="form-control"
              type="text"
              placeholder={quantity}
              disabled
            />
          </div>
        </figure>
        <a
          className="ps-btn ps-btn--black"
          href="#"
          onClick={(e) => handleAddItemToCart(e, product.id)}>
          Add to cart
        </a>
        <a
          className="ps-btn"
          href="#"
          onClick={(e) => handleBuynow(e, product.id)}>
          Buy Now
        </a>
        <div className="ps-product__actions">
          <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
            <i className="icon-heart"></i>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ps-product__shopping extend">
        <div className="ps-product__btn-group">
          <figure>
            <figcaption>Quantity</figcaption>
            <div className="form-group--number">
              <button className="up" onClick={(e) => handleIncreaseItemQty(e)}>
                <i className="fa fa-plus"></i>
              </button>
              <button
                className="down"
                onClick={(e) => handleDecreaseItemQty(e)}>
                <i className="fa fa-minus"></i>
              </button>
              <input
                className="form-control"
                type="text"
                placeholder={quantity}
                disabled
              />
            </div>
          </figure>
          <a
            className="ps-btn ps-btn--black"
            href="#"
            onClick={(e) => handleAddItemToCart(e)}>
            Add to cart
          </a>
          {!auth.isLoggedIn ? null : (
            <div className="ps-product__actions">
              <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                <i className="icon-heart"></i>
              </a>
              {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
              <i className="icon-chart-bars"></i>
            </a> */}
            </div>
          )}
        </div>
        <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
          Buy Now
        </a>
      </div>
    );
  }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
