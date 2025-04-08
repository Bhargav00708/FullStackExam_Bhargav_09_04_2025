const { Order, OrderItem } = require('../models/sql');
const Cart = require('../models/mongo/Cart');
const { clearCart } = require('./CartController');

const checkout = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    const order = await Order.create({ userId });

    const itemsToInsert = cart.items.map((item) => ({
      orderId: order.id,
      productId: item.productId._id.toString(),
      quantity: item.quantity,
      price: item.productId.price
    }));

    await OrderItem.bulkCreate(itemsToInsert);

    await clearCart(userId);

    return res.status(201).json({ msg: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    return res.status(500).json({ msg: 'Checkout failed', error: err.message });
  }
};

const getOrders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: { model: OrderItem }
    });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ msg: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = {
  checkout,
  getOrders
};
