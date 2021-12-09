import React, { useEffect } from 'react';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
import useAccount from '~/hooks/useAccount';
import { useSelector } from 'react-redux';
import moment from 'moment';

const TableInvoices = () => {
  const { loading, orders, getOrders } = useAccount();

  const state = useSelector((state) => state);

  useEffect(() => {
    getOrders(state.auth.user.customer_id, { limit: 100, offset: 0 });
  }, [state.auth]);

  const tableColumn = [
    {
      title: 'Id',
      dataIndex: 'invoiceId',
      rowKey: 'invoiceId',
      key: 'invoiceId',
      width: '120px',
      render: (text, record) => (
        <Link href={`/account/order/${record.id}`}>{record.id}</Link>
      ),
    },
    {
      title: 'Date',
      rowKey: 'dateCreate',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      width: '120px',
      render: (text, record) => (
        <span className="text-right">
          {moment(record.created_at).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Amount',
      rowKey: 'amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <span className="text-right">₦{record.order_total}</span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      rowKey: 'status',
      width: '150px',
      render: (text, record) => (
        <span className="text-right">{record.status}</span>
      ),
    },
  ];
  return (
    <Table
      columns={tableColumn}
      dataSource={orders}
      rowKey={(record) => record.id}
    />
  );
};

export default TableInvoices;
