const express = require('express');
const router = express.Router();
const { checkout, getOrders } = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/checkout', authMiddleware, checkout);
router.get('/', authMiddleware, getOrders);

module.exports = router;
