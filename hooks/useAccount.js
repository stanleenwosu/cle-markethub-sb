import React, { useState } from 'react';
import OrderRepository from '~/repositories/OrderRepository';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

export default function useAccount() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const [payments, setPayments] = useState(null);
  // const [cart, setCart] = useState(null);
  return {
    loading,
    orders,
    payments,

    getOrders: async (customerId, params) => {
      setLoading(true);
      const data = await OrderRepository.getOrders(customerId, params);
      setLoading(false);
      setOrders(data.data);
    },

    getPayments: async (customerId, params) => {
      setLoading(true);
      const data = await OrderRepository.getPayments(customerId, params);
      setLoading(false);
      setPayments(data.data);
    },
  };
}
