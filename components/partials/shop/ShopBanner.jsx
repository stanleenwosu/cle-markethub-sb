import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const ShopBanner = () => {
  const carouselSetting = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="mb-5">
      <Slider {...carouselSetting} fade={true} className="ps-carousel">
        <img src="/static/img/mine/slide-1.png" alt="CLE" />
        <img src="/static/img/mine/slide-2.png" alt="CLE" />
        <img src="/static/img/mine/slide-3.png" alt="CLE" />
        <img src="/static/img/mine/slide-4.jpg" alt="CLE" />
        <img src="/static/img/mine/slide-5.jpg" alt="CLE" />
        <img src="/static/img/mine/slide-6.jpg" alt="CLE" />
        <img src="/static/img/mine/slide-7.jpg" alt="CLE" />
        <img src="/static/img/mine/slide-8.jpg" alt="CLE" />
      </Slider>
    </div>
  );
};

export default ShopBanner;
