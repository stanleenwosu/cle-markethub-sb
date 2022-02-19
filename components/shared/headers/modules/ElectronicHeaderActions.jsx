import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { getWishlistItems } from '~/store/ecomerce/action';

const ElectronicHeaderActions = ({ auth, ecomerce, dispatch }) => {
  // console.log('🚀 ~ ElectronicHeaderActions ~ auth', auth);
  useEffect(() => {
    if (auth.user.customer_id) {
      dispatch(
        getWishlistItems({
          userId: auth.user.id,
          customerId: auth.user.customer_id,
        })
      );
    }
  }, [auth]);

  return (
    <div className="header__actions">
      {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
        <Link href="/account/wishlist" style={{ color: 'white' }}>
          <a className="header__extra">
            <i className="icon-heart" style={{ color: 'white' }}></i>
            <span style={{ backgroundColor: 'white' }}>
              <i>{ecomerce.wishlistItems.length}</i>
            </span>
          </a>
        </Link>
      ) : null}

      <MiniCart />

      {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
        <AccountQuickLinks isLoggedIn={true} />
      ) : (
        <AccountQuickLinks isLoggedIn={false} />
      )}
    </div>
  );
};

export default connect((state) => state)(ElectronicHeaderActions);
