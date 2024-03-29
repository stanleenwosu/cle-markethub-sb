import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepositoryOld';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';

const ProductDefaultPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProduct(id) {
    setLoading(true);
    const responseData = await ProductRepository.getProductsById(id);
    if (responseData) {
      setProduct(responseData.data);
      setLoading(false);
      // setTimeout(
      //   function () {
      //   }.bind(this),
      //   250
      // );
    }
  }

  useEffect(() => {
    getProduct(pid);
  }, [pid]);

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shop',
      url: '/shop',
    },
    {
      text: product ? product.name : 'Loading...',
    },
  ];
  // Views
  let productView, headerView;
  if (!loading) {
    if (product) {
      productView = <ProductDetailFullwidth product={product} />;
      headerView = (
        <>
          <HeaderProduct product={product} />
          <HeaderMobileProduct />
        </>
      );
    } else {
      headerView = (
        <>
          <HeaderDefault />
          <HeaderMobileProduct />
        </>
      );
    }
  } else {
    productView = <SkeletonProductDetail />;
  }

  return (
    <PageContainer
      // header={headerView}
      title={product ? product.title : 'Loading...'}>
      <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
      <div className="ps-page--product">
        <div className="ps-container">
          <div className="ps-page__container">
            <div className="ps-page__left">{productView}</div>
            <div className="ps-page__right">
              <ProductWidgets />
            </div>
          </div>

          {/* <CustomerBought layout="fullwidth" collectionSlug="deal-of-the-day" /> */}
          <ProductGroupByCarousel
            category={{ id: product?.category_id }}
            title="Related Products"
          />
        </div>
      </div>
      <Newletters />
    </PageContainer>
  );
};

export default ProductDefaultPage;
