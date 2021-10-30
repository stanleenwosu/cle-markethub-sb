import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import SiteFeatures from '~/components/partials/homepage/autopart/SiteFeatures';
import useGetProducts from '~/hooks/useGetProducts';

const ShopDefaultPage = () => {
  // await ProductRepository.getCategories()
  const { categories, getAllCategories, loading } = useGetProducts();
  // console.log('🚀 ~ ShopDefaultPage ~ categories', categories);

  useEffect(() => {
    getAllCategories();
  }, []);

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
    <PageContainer title="Shop">
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <div className="ps-container">
          <ShopBanner />
          <SiteFeatures className="mb-5" />
          {/* <ShopBrands /> */}
          {/* <ShopCategories /> */}
          <div className="ps-layout--shop">
            {/* <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div> */}
            <div className="">
              {categories ? (
                <>
                  <ProductGroupByCarousel
                    category={categories[0]}
                    title={categories[0].name}
                  />
                  <ProductGroupByCarousel
                    category={categories[1]}
                    title={categories[1].name}
                  />
                </>
              ) : null}

              <ShopItems columns={6} pageSize={18} />
            </div>
          </div>
        </div>
      </div>
      <Newletters />
    </PageContainer>
  );
};
export default ShopDefaultPage;
