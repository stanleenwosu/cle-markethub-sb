import React, { useState } from 'react';
import ProductRepository from '~/repositories/ProductRepositoryOld';
import CartRepository from '~/repositories/CartRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  deleteCartItem,
  addCartItem,
} from '~/store/ecomerce/action';

export default function useEcomerce() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cartItemsOnCookie] = useState(null);
  const [cookies, setCookie] = useCookies(['cart']);
  const [products, setProducts] = useState(null);
  // const [cart, setCart] = useState(null);
  return {
    loading,
    cookies,
    products,
    removeItemFromCart: async ({ itemId, cartId, userId, customerId }) => {
      await dispatch(deleteCartItem({ itemId, cartId }));
      await dispatch(getCartItems({ userId, customerId }));
    },

    addItemToCart: async ({ itemId, cartId, quantity, userId, customerId }) => {
      await dispatch(addCartItem({ itemId, cartId, quantity }));
      await dispatch(getCartItems({ userId, customerId }));
    },

    addItemToCartLocal: (newItem, group = 'cart') => {
      let cartItems = cookies.cart || [];
      const existItem = cartItems.find((x) => x.id === newItem.id);

      // if item exist to increase quantity else add to local cart
      if (existItem) {
        const index = cartItems.findIndex((item) => (item.id = existItem.id));
        cartItems[index].quantity += existItem.quantity;
      } else {
        cartItems.push(newItem);
      }

      // push to cookies
      if (group === 'cart') {
        setCookie('cart', cartItems, { path: '/' });
      }
    },

    removeItemCartLocal: (id) => {
      let cartItems = cookies.cart;
      const existItemIndex = cartItems.findIndex((x) => x.id === id);
      cartItems.splice(existItemIndex, 1);
      setCookie('cart', cartItems, { path: '/' });

      // if (group === 'wishlist') {
      //   setCookie('wishlist', currentItems, { path: '/' });
      //   dispatch(setWishlistTtems(currentItems));
      // }

      // if (group === 'compare') {
      //   setCookie('compare', currentItems, { path: '/' });
      // }
    },

    // getCartItemsLocal: () => {
    //   setCart(cookies.cart);
    // },

    getProducts: async (payload, group = '') => {
      setLoading(true);
      if (payload && payload.length > 0) {
        let queries = '';
        payload.forEach((item) => {
          if (queries === '') {
            queries = `id_in=${item.id}`;
          } else {
            queries = queries + `&id_in=${item.id}`;
          }
        });
        const responseData = await ProductRepository.getProductsByIds(queries);
        if (responseData && responseData.length > 0) {
          if (group === 'cart') {
            let cartItems = responseData;
            payload.forEach((item) => {
              let existItem = cartItems.find((val) => val.id === item.id);
              if (existItem) {
                existItem.quantity = item.quantity;
              }
            });

            setProducts(cartItems);
          } else {
            setProducts(responseData);
          }
          setTimeout(
            function () {
              setLoading(false);
            }.bind(this),
            250
          );
        }
      } else {
        setLoading(false);
        setProducts([]);
      }
    },

    increaseQty: (payload, currentCart) => {
      let cart = [];
      if (currentCart) {
        cart = currentCart;
        const existItem = cart.find((item) => item.id === payload.id);
        if (existItem) {
          existItem.quantity = existItem.quantity + 1;
        }
        setCookie('cart', cart, { path: '/' });
        dispatch(setCartItems(cart));
      }
      return cart;
    },

    decreaseQty: (payload, currentCart) => {
      let cart = [];
      if (currentCart) {
        cart = currentCart;
        const existItem = cart.find((item) => item.id === payload.id);
        if (existItem) {
          if (existItem.quantity > 1) {
            existItem.quantity = existItem.quantity - 1;
          }
        }
        setCookie('cart', cart, { path: '/' });
        dispatch(setCartItems(cart));
      }
      return cart;
    },

    addItem: (newItem, items, group) => {
      let newItems = [];
      if (items) {
        newItems = items;
        const existItem = items.find((item) => item.id === newItem.id);
        if (existItem) {
          if (group === 'cart') {
            existItem.quantity += newItem.quantity;
          }
        } else {
          newItems.push(newItem);
        }
      } else {
        newItems.push(newItem);
      }
      if (group === 'cart') {
        setCookie('cart', newItems, { path: '/' });
        dispatch(setCartItems(newItems));
      }
      if (group === 'wishlist') {
        setCookie('wishlist', newItems, { path: '/' });

        dispatch(setWishlistTtems(newItems));
      }

      if (group === 'compare') {
        setCookie('compare', newItems, { path: '/' });
        dispatch(setCompareItems(newItems));
      }
      return newItems;
    },

    removeItems: (group) => {
      if (group === 'wishlist') {
        setCookie('wishlist', [], { path: '/' });
        dispatch(setWishlistTtems([]));
      }
      if (group === 'compare') {
        setCookie('compare', [], { path: '/' });
        dispatch(setCompareItems([]));
      }
      if (group === 'cart') {
        setCookie('cart', [], { path: '/' });
        dispatch(setCartItems([]));
      }
    },
  };
}
