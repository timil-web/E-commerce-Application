const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Pendants'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1, inStock: 1 });
productSchema.index({ id: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;