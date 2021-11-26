import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Newletters from '~/components/partials/commons/Newletters';
import VendorStore from '~/components/partials/vendor/VendorStore';
import PageContainer from '~/components/layouts/PageContainer';
import { baseStoreUrl } from '~/repositories/Repository.js';

const VendorStorePage = ({ store, products }) => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Vendor store',
    },
  ];

  return (
    <PageContainer footer={<FooterDefault />} title="Vendor store">
      <div className="ps-page--single ps-page--vendor">
        <BreadCrumb breacrumb={breadCrumb} />
        <VendorStore store={store} product={products} />
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};

export async function getServerSideProps({ params }) {
  const [shopRes, productsRes] = await Promise.all([
    fetch(`https://api.cle.ng:26623/shops/${params.vid}`),
    // fetch(`https://api.cle.ng:26623/shop/${params.unique_name}/products`),
  ]);
  const [store] = await Promise.all([
    shopRes.json(),
    // productsRes.json().data,
  ]);

  //   const res = await fetch(`https://api.cle.ng:26623/shops/${params.vid}`);
  //   const shop = await res.json();
  //   const res2 = await fetch(
  //     `https://api.cle.ng:26623/shop/${shop.data.unique_name}/products`
  //   );
  //   const products = await res2.json();
  return {
    props: { store: store.data }, // will be passed to the page component as props
  };
}

export default VendorStorePage;
