import React from 'react';
import  useCartItems  from './hooks/CartItems';


//TODO: fixa totalprice hook, den ger fel i konsol och ger inte totala pris
const CheckOut = () => {
    const { cartItems, onRemoveFromCart, totalPrice } = useCartItems();
    const handleOrder = () => {
    console.log('Order placed:');
  };

  return (
    <div>
      <h2>CHECKOUT</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <button onClick={() => onRemoveFromCart(item)}>Remove</button>
        </div>
      ))}
      <p>Total price: {totalPrice}</p>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default CheckOut;
