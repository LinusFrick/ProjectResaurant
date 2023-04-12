import React from 'react';

export const AddToCartButton = ({ item, onAddToCart }) => {
    const handleAddToCart = () => {
        console.log('AddToCartButton clicked:', item);
        onAddToCart(item);
    };

    return <button onClick={handleAddToCart}>Add to cart</button>;
};