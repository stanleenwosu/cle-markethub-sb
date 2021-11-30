import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';

class HeaderMobileTechnology extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <header className="header header--mobile technology">
        <div className="header__top">
          <div className="header__left">
            <p>Welcome to CLE Marketplace Online Shopping Store !</p>
          </div>
          <div className="header__right">
            <ul className="navigation__extra">
              <li>
                <Link href="/vendor/sell-cle">
                  <a>Sell on CLE Marketplace</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navigation--mobile">
          <div className="navigation__left">
            <Link href="/">
              <a className="ps-logo">
                <img
                  height="30"
                  src="/static/img/logo-white.png"
                  alt="CLE Marketplace"
                />
              </a>
            </Link>
          </div>
          <MobileHeaderActions />
        </div>
        <div className="ps-search--mobile">
          <form className="ps-form--search-mobile" action="/" method="get">
            <div className="form-group--nest">
              <input
                className="form-control"
                type="text"
                placeholder="Search something..."
              />
              <button>
                <i className="icon-magnifier"></i>
              </button>
            </div>
          </form>
        </div>
      </header>
    );
  }
}

export default HeaderMobileTechnology;
