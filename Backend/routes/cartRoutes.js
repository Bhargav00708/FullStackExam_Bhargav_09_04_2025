const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);

module.exports = router;
