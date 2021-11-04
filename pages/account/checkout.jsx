import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';

import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const CheckoutPage = () => {
  const auth = useSelector((state) => state.auth);
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shopping Cart',
      url: '/account/shopping-cart',
    },
    {
      text: 'Checkout Information',
    },
  ];

  useEffect(() => {
    // console.log('props.cookies :>> ', props.allCookies);
    console.log('🚀 ~ useEffect ~ auth.isLoggedIn', auth.isLoggedIn);
    if (auth.isLoggedIn === false) {
      Router.push('/account/login');
    }
  }, []);

  return (
    <PageContainer footer={<FooterDefault />} title="Checkout">
      <div className="ps-page--simple">
        <BreadCrumb breacrumb={breadCrumb} />
        <Checkout />
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};

export default CheckoutPage;
