import React from 'react';
import OrderComplete from '../components/OrderComplete';
import { useLocation } from 'react-router';

const Checkout = ({ history }) => {
  const location = useLocation();
  return (
    <div>
      <OrderComplete></OrderComplete>
      <p>{location.orderInfo}</p>
    </div>
  );
};

export default Checkout;
