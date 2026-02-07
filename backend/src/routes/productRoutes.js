const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  seedProducts,
} = require('../controllers/productController');

router.get('/', getAllProducts);

router.post('/seed', seedProducts);

router.get('/:id', getProductById);

module.exports = router;