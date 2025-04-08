const Cart = require('../models/mongo/Cart');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
    return res.status(200).json(cart || { items: [] });
  } catch (err) {
    return res.status(500).json({ msg: 'Error fetching cart', error: err.message });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: 'Error adding to cart', error: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ msg: 'Cart not found' });

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: 'Error removing item', error: err.message });
  }
};

// Clear cart (used after successful checkout)
const clearCart = async (userId) => {
  await Cart.findOneAndDelete({ userId });
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};
