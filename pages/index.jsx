import React from 'react';
import HeaderDefault from '~/components/shared/headers/HeaderMarketPlace2';
import HeaderMobile from '~/components/shared/headers/HeaderMobileTechnology';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';

const initHeaders = (
  <>
    <HeaderDefault isReady={false} />
    <HeaderMobile />
  </>
);

const HomepageDefaultPage = () => {
  return (
    <PageContainer header={initHeaders} title="">
      <main id="homepage-1">
        <HomeDefaultBanner />
        {/* <SiteFeatures />
        <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
        <HomeAdsColumns />
        <HomeDefaultTopCategories />
        <HomeDefaultProductListing
          collectionSlug="consumer-electronics"
          title="Consumer Electronics"
        />
        <HomeDefaultProductListing
          collectionSlug="clothings"
          title="Clothings"
        />
        <HomeDefaultProductListing
          collectionSlug="garden-and-kitchen"
          title="Garden & Kitchen"
        />
        <HomeAds />
        <DownLoadApp />
        <NewArrivals collectionSlug="new-arrivals-products" />
        <Newletters /> */}
      </main>
    </PageContainer>
  );
};

export default HomepageDefaultPage;
