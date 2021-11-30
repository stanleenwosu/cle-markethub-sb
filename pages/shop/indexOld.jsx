import React from 'react';
import ShopItems from '~/components/partials/shop/ShopItems';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopSidebarBanner from '~/components/partials/shop/ShopSidebarBanner';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

import useSWR, { SWRConfig } from 'swr';
import ProductRepository from '~/repositories/ProductRepository';
import PostRepository from '~/repositories/PostRepository';

const fetcher = (url) => fetch(url).then((res) => res.json());
// const API = '/api/products';

const ShopSidebarPage = ({ products }) => {
  // const { data: products, error } = useSWR(
  //   { limit: 10 },
  //   ProductRepository.getProducts
  // );
  // console.log('🚀 ~ ShopSidebarPage ~ data', products);

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shop',
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="ps-page--shop" id="shop-sidebar">
          <div className="container">
            <div className="ps-layout--shop">
              {/* <div className="ps-layout__left">
                <WidgetShopCategories />
                <WidgetShopBrands />
                <WidgetShopFilterByPriceRange />
              </div> */}
              <div className="">
                <div className="ps-page__header">
                  <h1>Shop</h1>
                  <ShopSidebarBanner />
                </div>
                {/* <ProductGroupByCarousel
                  collectionSlug="shop-best-seller-items"
                  title="Best Sale Items"
                /> */}
                <ShopItems
                  // error={error}
                  // loading={!products}
                  products={products}
                  columns={4}
                  pageSize={12}
                />
              </div>
            </div>
          </div>
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export async function getServerSideProps(context) {
  const { data: products } = await ProductRepository.getProducts({ limit: 10 });
  console.log('🚀 ~ getServerSideProps ~ response', products);

  return {
    props: {
      products,
      fallback: {
        products,
      },
    },
  };
}

export default ShopSidebarPage;
