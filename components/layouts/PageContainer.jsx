import React, { useEffect } from 'react';
import Head from 'next/head';
// import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderDefault from '~/components/shared/headers/HeaderMarketPlace2';
import HeaderMobile from '~/components/shared/headers/HeaderMobileTechnology';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import Script from 'next/script';

const initHeaders = (
  <>
    <HeaderDefault />
    <HeaderMobile />
  </>
);
const initFooters = (
  <>
    <FooterFullwidth />
  </>
);

const PageContainer = ({
  header = initHeaders,
  footer = initFooters,
  children,
  title = 'Page',
}) => {
  let titleView;

  if (title !== '') {
    titleView = process.env.title + ' | ' + title;
  } else {
    titleView = process.env.title + ' | ' + process.env.titleDescription;
  }

  return (
    <>
      <Head>
        <title>{titleView}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/nprogress@0.2.0/nprogress.css"></link>
      </Head>
      {header}
      {children}
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "1447397042170248");
      chatbox.setAttribute("attribution", "biz_inbox");
  `,
        }}></Script>
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v12.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  `,
        }}></Script>
    </>
  );
};

export default PageContainer;
