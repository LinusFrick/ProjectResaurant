const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

const createOrder = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const cart = await Cart.findOne({ user: userId });
  
      const newOrder = new Order({
        user: userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
      });
  
      await newOrder.save();
  
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
  
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  };
  
  module.exports = {
    createOrder,
  };