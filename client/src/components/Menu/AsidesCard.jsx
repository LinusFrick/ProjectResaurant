import React from 'react';
import '../../styles/MenuCard.css';
import { AddToCartButton } from '../Cart/addToCartButton';

const AsideCard = ({ asides, onAddToCart }) => {
  return (
    <div>
      <h2 className="menu-main">Asides</h2>
      <ul className="menu-main">
        {asides.map((aside) => (
          <li key={aside._id} className="menu-card">
            <div className="menu-img-container">
              <img src={aside.image} alt={aside.name} className="menu-img" />
            </div>
            <div className="menu-info">
              <h3 className="menu-name">{aside.name}</h3>
              <p className="menu-desc">{aside.description}</p>
              <p className="menu-price">Price: {aside.price}</p>
              <AddToCartButton item={aside} onAddToCart={onAddToCart} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AsideCard;