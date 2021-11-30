import React, { useEffect } from 'react';
import { makeStore, wrapper, store2, persistedStore2 } from '~/store/store';
import { CookiesProvider, useCookies } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/home-default.scss';
import '~/scss/market-place-1.scss';
import '~/scss/market-place-2.scss';
import '~/scss/market-place-3.scss';
import '~/scss/market-place-4.scss';
// import '~/scss/electronic.scss';
// import '~/scss/furniture.scss';
// import '~/scss/organic.scss';
// import '~/scss/technology.scss';
// import '~/scss/autopart.scss';
// import '~/scss/electronic.scss';

// MINE
// import 'bootstrap/dist/css/bootstrap.min.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useDispatch, useStore } from 'react-redux';
import { loginSuccess, userSuccess } from '../store/auth/action';
import axiosClient from '../repositories/Repository';
// import withRedux from 'next-redux-wrapper';

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  useEffect(() => {
    setTimeout(function () {
      document.getElementById('__next').classList.add('loaded');
    }, 100);
  });

  useEffect(() => {
    // check for auth cookie
    if (cookies.auth?.isLoggedIn) {
      // if exists, dispatch auth USER_SUCCESS
      dispatch(loginSuccess({ token: cookies.auth.token }));
      dispatch(userSuccess(cookies.auth.user));
    }
  }, []);
  return (
    <CookiesProvider>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(App);
// export default withRedux(makeStore)(App);
