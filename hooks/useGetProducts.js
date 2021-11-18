import { useState } from 'react';
import {
  getProductsByCategoriesHelper,
  getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';

export default function useGetProducts() {
  const [loading, setLoading] = useState(false);
  const [productItems, setProductItems] = useState(null);
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState(null);
  return {
    loading,
    productItems,
    product,
    categories,
    setProductItems: (payload) => {
      setProductItems(payload);
    },
    setCategories: (payload) => {
      setCategories(payload);
    },

    setLoading: (payload) => {
      setLoading(payload);
    },

    getAllCategories: async () => {
      setLoading(true);
      const responseData = await ProductRepository.getCategories();
      setCategories(responseData.data);
      setLoading(false);
    },

    getProductsByCategory: async (id) => {
      setLoading(true);
      const responseData = await ProductRepository.getCategoryProducts(id);
      setProductItems(responseData.data);
      setLoading(false);
    },

    getProducts: async (payload) => {
      setLoading(true);
      let responseData;
      if (payload) {
        responseData = await ProductRepository.getProducts(payload);
      } else {
        const queries = {
          limit: 12,
        };
        responseData = await ProductRepository.getProducts(queries);
      }
      if (responseData) {
        setProductItems(responseData.data);
        setLoading(false);
      }
    },

    searchProducts: async (payload) => {
      setLoading(true);
      let responseData;
      responseData = await ProductRepository.searchProducts(payload);
      if (responseData) {
        setProductItems(responseData.data);
        setLoading(false);
      }
    },

    getProductById: async (payload) => {
      setLoading(true);
      const responseData = await ProductRepository.getProductsById(payload);
      if (responseData) {
        setProduct(responseData);
        setLoading(false);

        // setTimeout(
        //   function () {
        //     setLoading(false);
        //   }.bind(this),
        //   250
        // );
      }
    },
  };
}
