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

  // useEffect(() => {
  //   const script = document.createElement('script');

  //   script.src = 'https://use.typekit.net/foobar.js';
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>{titleView}</title>
      </Head>
      {header}
      {children}
      {footer}
      <Script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          window.__be = window.__be || {};
    window.__be.id = "619dda7101350500076d4a55";
    (function() {
        var be = document.createElement('script'); be.type = 'text/javascript'; be.async = true;
        be.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(be, s);
    })()
  `,
        }}></Script>
    </>
  );
};

export default PageContainer;
