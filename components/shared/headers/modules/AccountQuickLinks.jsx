import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '~/store/auth/action';
import MiniCart from './MiniCart';
import { useRouter } from 'next/router';
import router from 'next/router';

const AccountQuickLinks = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    Router.push('/');
  };
  const accountLinks = [
    {
      text: 'Account Information',
      url: '/account/user-information',
    },
    // {
    //   text: 'Notifications',
    //   url: '/account/notifications',
    // },
    {
      text: 'Orders',
      url: '/account/orders',
    },
    // {
    //   text: 'Address',
    //   url: '/account/addresses',
    // },
    // {
    //   text: 'Recent Viewed Product',
    //   url: '/account/recent-viewed-product',
    // },
    // {
    //   text: 'Wishlist',
    //   url: '/account/wishlist',
    // },
  ];
  const { isLoggedIn } = props;

  // View
  const linksView = accountLinks.map((item) => (
    <li key={item.text}>
      <Link href={item.url}>
        <a>{item.text}</a>
      </Link>
    </li>
  ));

  if (isLoggedIn === true) {
    return (
      <div className="ps-block--user-account text-center ">
        <i className="icon-user mb-0"></i> <br />
        <small className="mt-n1">{user.firstname + ' ' + user.lastname}</small>
        <div className="ps-block__content">
          <ul className="ps-list--arrow">
            {linksView}
            <li className="ps-block__footer">
              <a href="#" onClick={(e) => handleLogout(e)}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ps-block--user-header">
        <div className="ps-block__left">
          <i className="icon-user"></i>
        </div>
        <div className="ps-block__right">
          <Link href="/account/login">
            <a>Login</a>
          </Link>
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </div>
      </div>
    );
  }
};

export default connect((state) => state)(AccountQuickLinks);
