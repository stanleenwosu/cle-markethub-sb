import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepositoryOld';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import useGetProducts from '~/hooks/useGetProducts';

const ProductCategoryScreen = () => {
  const Router = useRouter();
  const [categoryName, setcategoryName] = useState('');
  const { slug } = Router.query;
  const {
    categories,
    getAllCategories,
    productItems,
    loading,
    getProductsByCategory,
  } = useGetProducts();

  useEffect(async () => {
    await getProductsByCategory(slug);
    await getAllCategories();
    console.log('🚀 ~ useEffect ~ categories', categories);
    let category;
    if (categories) {
      category = categories.find((element) => element.id === slug);
      setcategoryName(category.name);
    }
  }, [slug]);

  const breadCrumb = [
    {
      text: 'Shop',
      url: '/',
    },
    {
      text: categoryName ? categoryName : 'Product category',
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (productItems && productItems?.length > 0) {
      productItemsViews = <ProductItems columns={4} products={productItems} />;
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={categoryName ? categoryName : 'Category'}
      boxed={true}>
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="container">
          <div className="ps-layout--shop ps-shop--category">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              {/* <WidgetShopBrands /> */}
              {/* <WidgetShopFilterByPriceRange /> */}
            </div>
            <div className="ps-layout__right">
              <h3 className="ps-shop__heading">{categoryName}</h3>
              {productItemsViews}
            </div>
          </div>
        </div>
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};
export default ProductCategoryScreen;
