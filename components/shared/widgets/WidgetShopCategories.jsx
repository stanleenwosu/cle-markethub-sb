import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepositoryOld';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useGetProducts from '~/hooks/useGetProducts';

const WidgetShopCategories = () => {
  const Router = useRouter();
  const { categories, getAllCategories, loading } = useGetProducts();

  const { slug } = Router.query;

  useEffect(() => {
    getAllCategories();
  }, []);

  // Views
  let categoriesView;
  if (!loading) {
    if (categories && categories.length > 0) {
      const items = categories.map((item) => (
        <li key={item.slug} className={item.slug === slug ? 'active' : ''}>
          <Link href={`/category/${item.id}`}>{item.name}</Link>
        </li>
      ));
      categoriesView = <ul className="ps-list--categories">{items}</ul>;
    } else {
    }
  } else {
    categoriesView = <p>Loading...</p>;
  }

  return (
    <aside className="widget widget_shop">
      <h4 className="widget-title">Categories</h4>
      {categoriesView}
    </aside>
  );
};

export default WidgetShopCategories;
