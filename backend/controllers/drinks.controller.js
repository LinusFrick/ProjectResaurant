const { Drinks } = require('../models/products.model');

exports.createDrink = async (req, res, next) => {
  const { name, description, price, wait, image } = req.body;

  const product = new Drinks({
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

exports.getAllDrink = async (req, res) => {
  try {
    const products = await Drinks.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDrinkById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Drinks.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDrink = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, wait, image } = req.body;

  try {
    const product = await Drinks.findByIdAndUpdate(id, { name, description, price, wait, image }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDrink = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Drinks.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
