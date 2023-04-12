import React from 'react';
import CheckOutButton from '../CheckOutButton';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <button onClick={() => onRemoveFromCart(item)}>Remove</button>
        </div>
      ))}
      <p>Total price: {totalPrice}</p>
      <CheckOutButton cartItems={cartItems}/>
    </div>
  );
}

export default ShoppingCart;
