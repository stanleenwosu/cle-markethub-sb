import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { baseUrl } from '~/repositories/Repository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeDefaultBanner = () => {
  const [bannerItems, setBannerItems] = useState(null);
  const [promotion1, setPromotion1] = useState(null);
  const [promotion2, setPromotion2] = useState(null);

  async function getBannerItems() {
    const responseData = await MediaRepository.getBannersBySlug(
      'banner-home-fullwidth'
    );
    if (responseData) {
      setBannerItems(responseData);
    }
  }

  async function getPromotions() {
    const responseData = await MediaRepository.getPromotionsBySlug(
      'home_fullwidth_promotions'
    );
    if (responseData) {
      setPromotion1(getItemBySlug(responseData, 'main_1'));
      setPromotion2(getItemBySlug(responseData, 'main_2'));
    }
  }

  useEffect(() => {
    getBannerItems();
    getPromotions();
  }, []);

  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 750,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Views
  let mainCarouselView;
  if (bannerItems) {
    const carouseItems = bannerItems.map((item) => (
      <div className="slide-item" key={item.id}>
        <Link href="/shop">
          <a
            className="ps-banner-item--default bg--cover"
            style={{
              backgroundImage: `url(${baseUrl}${item.image.url})`,
            }}
          />
        </Link>
      </div>
    ));
    mainCarouselView = (
      <Slider {...carouselSetting} className="ps-carousel">
        {carouseItems}
      </Slider>
    );
  }
  return (
    <div className="ps-home-banner ps-home-banner--1">
      <div className="ps-container">
        <div className="ps-section__left">
          {/* <img
            src="/static/img/mine/image-1.jpg"
            class="img-fluid"
            alt="img"></img> */}
          <div
            className="p-5 container-fluid d-flex align-items-center"
            style={{
              backgroundImage: `url('/static/img/mine/image-1.jpg')`,
              backgroundPosition: 'top right',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: `100%`,
            }}>
            <div className="row ">
              <div className="col-md-6">
                <h3>
                  One stop platform for online shopping and cooperative
                  management
                </h3>
                <button className="ps-btn">Launching Soon</button>
              </div>
            </div>
            {/* <Link href="/shop">
              <a className="ps-banner-item--default bg--cover" />
            </Link> */}
          </div>
        </div>
        <div className="ps-section__right">
          <Link href="">
            <a className="ps-collection">
              <img src="static/img/mine/image-2.jpg" alt="martfury" />
            </a>
          </Link>
          <Link href="https://app.cle.ng/auth/login">
            <a className="ps-collection">
              <img src="static/img/mine/image-3.jpg" alt="martfury" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeDefaultBanner;
