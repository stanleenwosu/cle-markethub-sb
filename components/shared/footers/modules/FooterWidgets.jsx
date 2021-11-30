import React from 'react';
import Link from 'next/link';

const FooterWidgets = () => (
  <div className="ps-footer__widgets">
    <aside className="widget widget_footer widget_contact-us">
      <h4 className="widget-title">Contact us</h4>
      <div className="widget_content">
        <p>Call us 24/7</p>
        <h3>1800 97 97 69</h3>
        <p>
          502 New Design Str, Melbourne, Australia <br />
          <a href="mailto:contact@marketplace.com">contact@marketplace.com</a>
        </p>
        <ul className="ps-list--social">
          <li>
            <a className="facebook" href="#">
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a className="twitter" href="https://www.twitter.com/cle_nigeria">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a className="linkedin" href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              className="instagram"
              href="https://www.instagram.com/clenigeria/">
              <i className="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <aside className="widget widget_footer">
      <h4 className="widget-title">Quick links</h4>
      <ul className="ps-list--link">
        <li>
          <Link href="/page/blank">
            <a>Policy</a>
          </Link>
        </li>

        <li>
          <Link href="/page/blank">
            <a>Term & Condition</a>
          </Link>
        </li>
        <li>
          <Link href="/vendor/sell-cle">
            <a>Sell on CLE</a>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <a>Return</a>
          </Link>
        </li>
        <li>
          <Link href="/page/faqs">
            <a>FAQs</a>
          </Link>
        </li>
      </ul>
    </aside>
    {/* <aside className="widget widget_footer">
      <h4 className="widget-title">Company</h4>
      <ul className="ps-list--link">
        <li>
          <Link href="/page/about-us">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <a>Affilate</a>
          </Link>
        </li>
        <li>
          <Link href="/page/blank">
            <a>Career</a>
          </Link>
        </li>
        <li>
          <Link href="/page/contact-us">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </aside> */}
    {/* <aside className="widget widget_footer">
      <h4 className="widget-title">Bussiness</h4>
      <ul className="ps-list--link">
        <li>
          <Link href="/page/about-us">
            <a>Our Press</a>
          </Link>
        </li>
        <li>
          <Link href="/account/checkout">
            <a>Checkout</a>
          </Link>
        </li>
        <li>
          <Link href="/account/user-information">
            <a>My account</a>
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <a>Shop</a>
          </Link>
        </li>
      </ul>
    </aside> */}
  </div>
);

export default FooterWidgets;
