const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
