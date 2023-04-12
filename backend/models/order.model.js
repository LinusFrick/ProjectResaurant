const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
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

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [OrderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.methods.populateProducts = async function () {
  for (const item of this.items) {
    const model = require('./products.model')[item.productModel];
    item.product = await model.findById(item.product);
  }
  return this;
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;