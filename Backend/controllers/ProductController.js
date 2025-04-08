const Product = require("../models/mongo/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error creating product", error: err.message });
  }
};

const getProducts = async (req, res) => {
  const { search = "", category, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.$text = { $search: search };
  }
  if (category) {
    query.category = category;
  }

  try {
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    return res.status(200).json(products);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error fetching products", error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error fetching product", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error updating product", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json({ msg: "Product deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error deleting product", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
