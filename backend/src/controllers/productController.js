const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');

const getAllProducts = async (req, res, next) => {
  try {
    const { category, inStock } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const seedProducts = async (req, res, next) => {
  try {
    const products = require('../../data/products.json');
    
    await Product.deleteMany({});
    
    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully',
      count: createdProducts.length,
      data: createdProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  seedProducts,
};