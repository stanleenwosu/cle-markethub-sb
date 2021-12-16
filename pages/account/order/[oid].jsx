import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';
import { connect } from 'react-redux';
import useSWR, { SWRConfig, useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';

const fetcherOrder = (customerId, orderId) =>
  axios
    .get(`https://api.cle.ng:26623/customers/${customerId}/orders/${orderId}`)
    .then((res) => res.data.data);

const fetcherPayment = (orderId) =>
  axios
    .get(`https://api.cle.ng:26623/${orderId}/delivery/info`)
    .then((res) => res.data.data);

const InvoiceDetailPage = ({ auth, ecomerce }) => {
  const Router = useRouter();
  const { oid } = Router.query;

  const {
    data: order,
    error,
    isValidating,
  } = useSWR([auth.user.customer_id, oid], fetcherOrder);

  // const {
  //   data: payment,
  //   error: paymentError,
  //   isValidating: paymentIsValidating,
  // } = useSWR(oid, fetcherPayment);
  // console.log('🚀 ~ InvoiceDetailPage ~ payment', payment);

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Order Detail',
    },
  ];
  if (!order) {
    return <div>loading...</div>;
  } else if (error) {
    return null;
  }
  return (
    <>
      <PageContainer title="Order detail">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <InvoiceDetail orders={order} />
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

// export async function getServerSideProps({ params, props }) {
//   console.log('🚀 ~ getServerSideProps ~ props', props);

//   const orderRes = await fetch(
//     `https://api.cle.ng:26623/${params.oid}/orders/${params.oid}`
//   );
//   const order = await orderRes.json();
//   console.log('🚀 ~ getServerSideProps ~ order', order);

//   return {
//     props: { orderItem: order }, // will be passed to the page component as props
//   };
// }

export default connect((state) => state)(InvoiceDetailPage);
