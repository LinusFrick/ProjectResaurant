import React from 'react';
import '../../styles/MenuCard.css';
import { AddToCartButton } from '../Cart/addToCartButton';

const DrinkCard = ({ drinks, onAddToCart }) => {
  return (
    <div>
      <h2 className="menu-main">Drinks</h2>
      <ul className="menu-main">
        {drinks.map((drink) => (
          <li key={drink._id} className="menu-card">
            <div className="menu-img-container">
              <img src={drink.image} alt={drink.name} className="menu-img" />
            </div>
            <div className="menu-info">
              <h3 className="menu-name">{drink.name}</h3>
              <p className="menu-desc">{drink.description}</p>
              <p className="menu-price">Price: {drink.price}</p>
              <AddToCartButton item={drink} onAddToCart={onAddToCart} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkCard;