const { sequelize } = require('../config/db');
const Product = require('../models/mongo/Product');

const topSpenders = async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT u.id AS userId, u.name, SUM(oi.quantity * oi.price) AS totalSpent
      FROM users u
      JOIN orders o ON u.id = o.userId
      JOIN order_items oi ON o.id = oi.orderId
      GROUP BY u.id
      ORDER BY totalSpent DESC
      LIMIT 3
    `);

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ msg: 'SQL report failed', error: err.message });
  }
};

const salesByCategory = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $unwind: '$category' },
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' }
        }
      },
      { $sort: { totalProducts: -1 } }
    ]);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ msg: 'MongoDB report failed', error: err.message });
  }
};

module.exports = {
  topSpenders,
  salesByCategory
};
