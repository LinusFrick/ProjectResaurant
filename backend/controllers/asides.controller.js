const { Asides } = require('../models/products.model');

exports.createAside = async (req, res, next) => {
  const { name, description, price, wait, image } = req.body;

  const product = new Asides({
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

exports.getAllAside = async (req, res) => {
  try {
    const products = await Asides.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAsideById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Asides.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAside = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, wait, image } = req.body;

  try {
    const product = await Asides.findByIdAndUpdate(id, { name, description, price, wait, image }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAside = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Asides.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
