import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const ShopBanner = () => {
  const carouselSetting = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="mb-5">
      <Slider {...carouselSetting} fade={true} className="ps-carousel">
        <img src="/static/img/mine/insurance.png" alt="CLE Insurance Services" />
        <img src="/static/img/mine/hospitality-services.png" alt="CLE Hospitality Services" />
        <img src="/static/img/mine/handyman-services.png" alt="CLE Handyman Services" />
        <img src="/static/img/mine/automobile.png" alt="CLE Automobile" />
      </Slider>
    </div>
  );
};

export default ShopBanner;
