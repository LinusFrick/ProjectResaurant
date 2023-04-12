import React from 'react';
import '../../styles/MenuCard.css';
import { AddToCartButton } from '../Cart/addToCartButton';

const DishCard = ({ dishes, onAddToCart }) => {
  return (
    <div>
      <h2 className="menu-main">Pizza</h2>
      <ul className="menu-main">
        {dishes.map((dish) => (
          <li key={dish._id} className="menu-card">
            <div className="menu-img-container">
              <img src={dish.image} alt={dish.name} className="menu-img" />
            </div>
            <div className="menu-info">
              <h3 className="menu-name">{dish.name}</h3>
              <p className="menu-desc">{dish.description}</p>
              <p className="menu-price">Price: {dish.price}</p>
              <AddToCartButton item={dish} onAddToCart={onAddToCart} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishCard;
