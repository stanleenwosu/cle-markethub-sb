import React, { Component } from 'react';
import Slider from 'react-slick';
import product_data, { relatedProduct } from '~/public/static/data/product';
import VendorProducts from './modules/VendorProducts';
import { carouselStandard } from '~/utilities/carousel-helpers';
import Rating from '~/components/elements/Rating';
import Product from '~/components/elements/products/Product';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (shopName) =>
  axios
    .get(
      `https://api.cle.ng:26623/shop/${shopName}/products?limit=100&offset=0`
    )
    .then((res) => res.data.data);

const VendorStore = ({ store }) => {
  const {
    data: products,
    error,
    isValidating,
  } = useSWR(store.unique_name, fetcher);
  console.log('🚀 ~ VendorStore ~ products', products);

  if (!products) return <div>loading...</div>;
  return (
    <div className="ps-vendor-store">
      <div className="container">
        <div className="ps-section__container">
          <div className="ps-section__left">
            <div className="ps-block--vendor">
              {/* <div className="ps-block__thumbnail">
                                    <img
                                        src="/static/img/vendor/vendor-store.jpg"
                                        alt="cle-marketplace"
                                    />
                                </div> */}
              <div className="ps-block__container">
                <div className="ps-block__header">
                  <h4>{store.name}</h4>
                  {/* <Rating />
                  <p>
                    <strong>85% Positive</strong> (562 rating)
                  </p> */}
                </div>
                <div className="ps-block__divider"></div>
                <div className="ps-block__content">
                  <p>{store.description}</p>
                  <span className="ps-block__divider"></span>
                  {/* <p>
                    <strong>Address</strong> 325 Orchard Str, New York, NY 10002
                  </p> */}
                  {/* <figure>
                    <figcaption>Foloow us on social</figcaption>
                    <ul className="ps-list--social-color">
                      <li>
                        <a className="facebook" href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a className="twitter" href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a className="linkedin" href="#">
                          <i className="fa fa-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a className="feed" href="#">
                          <i className="fa fa-feed"></i>
                        </a>
                      </li>
                    </ul>
                  </figure> */}
                </div>
                {/* <div className="ps-block__footer">
                  <p>
                    Call us directly
                    <strong>(+053) 77-637-3300</strong>
                  </p>
                  <p>or Or if you have any question</p>
                  <a className="ps-btn ps-btn--fullwidth" href="">
                    Contact Seller
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* ===========right */}
          <div className="ps-section__right">
            {/* <div className="ps-block--vendor-filter">
              <div className="ps-block__left">
                <ul>
                  <li className="active">
                    <a href="#">Products</a>
                  </li>
                  <li>
                    <a href="#">Reviews</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                </ul>
              </div>
              <div className="ps-block__right">
                <form className="ps-form--search" action="/" method="get">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search in this shop"
                  />
                  <button>
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div> */}
            <div className="ps-vendor-best-seller">
              <div className="ps-section__header">
                <h3>Best Seller items</h3>
                <div className="ps-section__nav">
                  <a className="ps-carousel__prev" href="#vendor-bestseller">
                    <i className="icon-chevron-left"></i>
                  </a>
                  <a className="ps-carousel__next" href="#vendor-bestseller">
                    <i className="icon-chevron-right"></i>
                  </a>
                </div>
              </div>
              <div className="ps-section__content">
                <Slider
                  {...carouselStandard}
                  slidesToShow="4"
                  className="ps-carousel">
                  {products.map((product) => (
                    <Product product={product} key={product.id} />
                  ))}
                </Slider>
              </div>
            </div>
            {/* <VendorProducts /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorStore;
