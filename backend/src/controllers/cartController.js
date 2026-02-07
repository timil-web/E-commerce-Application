const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    
    const sessionId = req.headers['x-session-id'] || 'default-session';

    const product = await Product.findOne({ id: productId });
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    if (!product.inStock) {
      return next(new AppError('Product is currently out of stock', 400));
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = await Cart.create({
        sessionId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        item => item.productId === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [] },
      });
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findOne({ id: item.productId });
        return {
          ...item.toObject(),
          product,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        items: populatedItems,
        sessionId: cart.sessionId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const sessionId = req.headers['x-session-id'] || 'default-session';

    if (!quantity || quantity < 1 || quantity > 99) {
      return next(new AppError('Quantity must be between 1 and 99', 400));
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sessionId = req.headers['x-session-id'] || 'default-session';

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const sessionId = req.headers['x-session-id'] || 'default-session';

    await Cart.findOneAndDelete({ sessionId });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};