import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const auth = useSelector((state) => state.auth);
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Login',
    },
  ];
  return (
    <>
      <PageContainer title="Login">
        <div className="ps-page--my-account">
          {/* {!auth.token ? '' : Router.push('/?qcrt=1')} */}
          <BreadCrumb breacrumb={breadCrumb} />
          <Login />
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default LoginPage;
