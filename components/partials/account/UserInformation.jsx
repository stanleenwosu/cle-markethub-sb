import React, { Component } from 'react';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';
import { useRouter } from 'next/router';
import { logOut } from '~/store/auth/action';
import { useDispatch, useSelector } from 'react-redux';

const UserInformation = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Router = useRouter();
  const accountLinks = [
    {
      text: 'Account Information',
      url: '/account/user-information',
      icon: 'icon-user',
      active: true,
    },
    // {
    //   text: 'Notifications',
    //   url: '/account/notifications',
    //   icon: 'icon-alarm-ringing',
    // },
    {
      text: 'Orders',
      url: '/account/orders',
      icon: 'icon-papers',
    },
    // {
    //   text: 'Address',
    //   url: '/account/addresses',
    //   icon: 'icon-map-marker',
    // },
    // {
    //   text: 'Recent Viewed Product',
    //   url: '/account/recent-viewed-product',
    //   icon: 'icon-store',
    // },
    {
      text: 'Wishlist',
      url: '/account/wishlist',
      icon: 'icon-heart',
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    Router.push('/');
  };

  //Views
  const accountLinkView = accountLinks.map((item) => (
    <li key={item.text} className={item.active ? 'active' : ''}>
      <Link href={item.url}>
        <a>
          <i className={item.icon}></i>
          {item.text}
        </a>
      </Link>
    </li>
  ));

  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <aside className="ps-widget--account-dashboard">
                <div className="ps-widget__header">
                  <img src="/static/img/users/avi.jpg" />
                  <figure>
                    <figcaption>Hello</figcaption>
                    <p>{user.firstname}</p>
                  </figure>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--user-links">
                    {accountLinks.map((link) => (
                      <li
                        key={link.text}
                        className={link.active ? 'active' : ''}>
                        <Link href={link.url}>
                          <a>
                            <i className={link.icon}></i>
                            {link.text}
                          </a>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <a onClick={(e) => handleLogout(e)}>
                        <i className="icon-power-switch"></i>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <FormChangeUserInformation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
