import React, { useEffect } from 'react';
import Link from 'next/link';
import menuData from '~/public/static/data/menu';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderMarketPlace2 = ({ isReady = true }) => {
  useEffect(() => {
    if (process.browser) {
      window.addEventListener('scroll', stickyHeader);
    }
  }, []);

  let headerActions, searchHeader;

  if (isReady) {
    headerActions = <ElectronicHeaderActions />;
    searchHeader = <SearchHeader />;
  }

  return (
    <header
      className="header header--standard header--market-place-3"
      id="headerSticky">
      <div className="header__top">
        <div className="container">
          <div className="header__left">
            <p>Welcome to CLE Marketplace!</p>
          </div>
          <div className="header__right">
            <ul className="header__top-links">
              {/* <li>
                <Link href="/vendor/store-list">
                  <a>Store Location</a>
                </Link>
              </li>
              <li>
                <Link href="/page/blank">
                  <a>Track Your Order</a>
                </Link>
              </li> */}
              {/* <li>
                <CurrencyDropdown />
              </li>
              <li>
                <LanguageSwicher />
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="header__content" style={{ backgroundColor: '#0d1c52' }}>
        <div className="container">
          <div className="header__content-left">
            <Link href="/">
              <a className="ps-logo">
                <img height="60" src="/static/img/logo-white.png" alt="CLE" />
              </a>
            </Link>
            {/* <div className="menu--product-categories">
              <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span> Shop by Category</span>
              </div>
              <div className="menu__content">
                <Menu
                  source={menuData.product_categories}
                  className="menu--dropdown"
                />
              </div>
            </div> */}
          </div>
          <div className="header__content-center">
            {searchHeader}
            {/* <p>
              <Link href="/shop">
                <a>iphone x</a>
              </Link>
              <Link href="/shop">
                <a>virtual</a>
              </Link>
              <Link href="/shop">
                <a>apple</a>
              </Link>
              <Link href="/shop">
                <a>wireless</a>
              </Link>
              <Link href="/shop">
                <a>simple chair</a>
              </Link>
              <Link href="/shop">
                <a>classic watch</a>
              </Link>
              <Link href="/shop">
                <a>macbook</a>
              </Link>
            </p> */}
          </div>
          <div className="header__content-right">{headerActions}</div>
        </div>
      </div>
      {/* <nav className="navigation">
        <div className="container">
          <Menu source={menuMarket2} className="menu menu--market-2" />
        </div>
      </nav> */}
    </header>
  );
};

export default HeaderMarketPlace2;
