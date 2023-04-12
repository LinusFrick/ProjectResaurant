// useCartItems.js
import { useState, createContext, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const totalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartItems = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartItems must be used within a CartProvider');
  }

  return context;
};

export default useCartItems;
