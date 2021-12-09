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
      {footer}
      {/* <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          !function(e,t,a){var c=e.head||e.getElementsByTagName("head")[0],n=e.createElement("script");n.async=!0,n.defer=!0, n.type="text/javascript",n.src=t+"/static/js/chat_widget.js?config="+JSON.stringify(a),c.appendChild(n)}(document,"https://app.engati.com",{bot_key:"719c117e6a7c4f6d",welcome_msg:true,branding_key:"default",server:"https://app.engati.com",e:"p" });
  `,
        }}></Script> */}
    </>
  );
};

export default PageContainer;
