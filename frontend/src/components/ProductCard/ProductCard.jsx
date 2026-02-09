import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import api from '../../utils/api';
import styles from './ProductCard.module.css';

/**
 * ProductCard Component
 * Displays individual product with image, details, and add to cart button
 * @param {Object} product - Product object with id, name, price, image, etc.
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Handle add to cart action
   * Makes API call and updates Redux state
   */
  const handleAddToCart = async () => {
    if (isAdding) return;

    setIsAdding(true);
    
    try {
      // Add to cart via API
      await api.post('/cart', {
        productId: product.id,
        quantity: 1,
      });

      // Update Redux state
      dispatch(addToCart({ product, quantity: 1 }));

      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        {!product.inStock && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.footer}>
          <div className={styles.price}>{formatCurrency(product.price)}</div>
          <button
            className={`${styles.addButton} ${showSuccess ? styles.success : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
          >
            {showSuccess ? '✓ Added!' : isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;