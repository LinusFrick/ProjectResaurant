import React, { useEffect, useState } from 'react';
import DrinkCard from './DrinksCard';
import DishCard from './DishesCard';
import AsideCard from './AsidesCard';

function Menu({ onAddToCart }) {
  const [drinks, setDrinks] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [asides, setAsides] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchData(url, setData) {
      try {
        const response = await fetch(url);
        const data = await response.text();
        const jsonData = JSON.parse(data);
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData('http://localhost:8080/api/products/drinks', setDrinks);
    fetchData('http://localhost:8080/api/products/dishes', setDishes);
    fetchData('http://localhost:8080/api/products/asides', setAsides);
  }, []);

  return (
    <div className="Menu">
      <DishCard dishes={dishes} onAddToCart={onAddToCart} />
      <DrinkCard drinks={drinks} onAddToCart={onAddToCart} />
      <AsideCard asides={asides} onAddToCart={onAddToCart} />
    </div>
  );
}

export default Menu;
