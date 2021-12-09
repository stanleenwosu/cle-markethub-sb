import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import { carouselStandard } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import useGetProducts from '~/hooks/useGetProducts';
import Product from '~/components/elements/products/Product';
import moment from 'moment';

const MarketPlaceDealOfDay = ({ collectionSlug }) => {
  const { productItems, loading, getPromoProducts } = useGetProducts();

  //   console.log(`moment`, moment().endOf('day').format('MM DD YYYY, h:mm a'));

  useEffect(() => {
    getPromoProducts(collectionSlug);
  }, [collectionSlug]);

  // Views
  let productItemsView;
  if (!loading) {
    if (productItems && productItems.length > 0) {
      const slideItems = productItems.map((item) => (
        <Product product={item} key={item.id} />
      ));
      productItemsView = (
        <Slider {...carouselStandard} className="ps-carousel outside">
          {slideItems}
        </Slider>
      );
    } else {
      productItemsView = <p>No product(s) found.</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-deal-of-day my-5">
      <div className="ps-container">
        <div className="ps-section__header">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>Deals</h3>
            </div>
            <div className="ps-block__right">
              <figure>
                <figcaption>End in:</figcaption>
                <CountDownSimple
                  timeTillDate={moment()
                    .endOf('day')
                    .format('MM DD YYYY, h:mm a')}
                  timeFormat="MM DD YYYY, h:mm a"
                />
              </figure>
            </div>
          </div>
          {/* <Link href="/shop">
            <a>View all</a>
          </Link> */}
        </div>
        <div className="ps-section__content">{productItemsView}</div>
      </div>
    </div>
  );
};

export default MarketPlaceDealOfDay;
