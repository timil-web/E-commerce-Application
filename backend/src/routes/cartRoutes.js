const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const {
  validateCartItem,
  checkValidationErrors,
} = require('../middleware/validation');


router.get('/', getCart);

router.post(
  '/',
  validateCartItem,
  checkValidationErrors,
  addToCart
);

router.put('/:productId', updateCartItem);

router.delete('/:productId', removeFromCart);

router.delete('/', clearCart);

module.exports = router;