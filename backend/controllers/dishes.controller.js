const { Dishes } = require('../models/products.model');

exports.createDish = async (req, res, next) => {
  const { name, description, price, wait, image } = req.body;

  const product = new Dishes({
    name,
    description,
    price,
    wait,
    image
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDish = async (req, res) => {
  try {
    const products = await Dishes.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDishById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Dishes.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, wait, image } = req.body;

  try {
    const product = await Dishes.findByIdAndUpdate(id, { name, description, price, wait, image }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Dishes.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
