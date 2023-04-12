import React from 'react';
import { Link, redirect } from 'react-router-dom';

const CheckOutButton = ({ cartItems }) => {

  return(
    <Link to="/checkout">
    <button disabled={cartItems.length === 0} >Proceed to checkout</button>
    </Link>
  )
}

export default CheckOutButton;