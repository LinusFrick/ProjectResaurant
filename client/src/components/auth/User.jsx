import React, { useState } from 'react';
import Logout from './Logout';
import Menu from '../Menu/Menu';
import ShoppingCart from '../Cart/ShoppingCart';

function UserPanel(){
    const [cartItems, setCartItems] = useState([]);

    const onAddToCart = (item) => {
      setCartItems([...cartItems, item]);
    };
  
    const removeFromCart = (item) => {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
      if (itemIndex > -1) {
        setCartItems([
          ...cartItems.slice(0, itemIndex),
          ...cartItems.slice(itemIndex + 1),
        ]);
      }
    };

    return (
        <div>
            <h1>User Panel</h1>
            <>
            <Logout />
            <ShoppingCart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
            <Menu onAddToCart={onAddToCart} />
            </>
        </div>
    )
}

export default UserPanel;