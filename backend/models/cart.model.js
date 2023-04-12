const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productModel: {
      type: String,
      enum: ['Dishes', 'Drinks', 'Asides'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  });
  

const CartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  });
  
  // Add this custom function to the CartSchema
  CartSchema.methods.populateProducts = async function () {
    for (const item of this.items) {
      const model = require('./products.model')[item.productModel];
      item.product = await model.findById(item.product);
    }
    return this;
  };
  
  const Cart = mongoose.model('Cart', CartSchema);
  
  module.exports = Cart;
  