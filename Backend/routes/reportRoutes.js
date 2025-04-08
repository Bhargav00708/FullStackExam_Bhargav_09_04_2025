const express = require('express');
const router = express.Router();
const { topSpenders, salesByCategory } = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/sql/top-spenders', authMiddleware, topSpenders);
router.get('/mongo/sales-by-category', authMiddleware, salesByCategory);

module.exports = router;
