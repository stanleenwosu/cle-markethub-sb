import React, { useEffect, useState } from 'react';
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
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Router, { useRouter } from 'next/router';

const ShopDefaultPage = ({ ecomerce }) => {
  // await ProductRepository.getCategories()
  const { categories, getAllCategories, loading } = useGetProducts();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { query } = useRouter();

  useEffect(() => {
    getAllCategories();
    if (query.qcrt && ecomerce.cartItems.length !== 0) {
      setIsModalVisible(true);
      Router.replace('/', {}, { shallow: true });
    }
    // else {
    // setIsModalVisible(false);
    // }
  }, [ecomerce.cartItems]);

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shop',
    },
  ];

  const handleOk = () => {
    Router.push('account/checkout');
  };

  const productItems = ecomerce.cartItems.map((item) => {
    return (
      <ProductOnCart product={item} key={item.id}>
        {/* <a
          className="ps-product__remove"
          onClick={(e) => handleRemoveItem(e, item.id, item.cart_id)}>
          <i className="icon-cross"></i>
        </a> */}
      </ProductOnCart>
    );
  });

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
                  <ProductGroupByCarousel
                    category={categories[2]}
                    title={categories[2].name}
                  />
                  <ProductGroupByCarousel
                    category={categories[3]}
                    title={categories[3].name}
                  />
                </>
              ) : null}

              <ShopItems columns={6} pageSize={18} />
            </div>
          </div>

          <Modal
            title="You have items in your cart"
            visible={isModalVisible}
            okText="Check Out"
            onOk={handleOk}
            cancelText="Continue Shopping"
            onCancel={() => setIsModalVisible(false)}
            okButtonProps={{ size: 'large' }}
            cancelButtonProps={{ size: 'large' }}>
            {productItems}
          </Modal>
        </div>
      </div>
      <Newletters />
    </PageContainer>
  );
};
export default connect((state) => state)(ShopDefaultPage);
