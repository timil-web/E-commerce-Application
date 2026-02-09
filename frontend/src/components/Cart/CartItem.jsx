import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import api from '../../utils/api';
import styles from './Cart.module.css';

/**
 * CartItem Component
 * Displays individual cart item with quantity controls and remove button
 * @param {Object} item - Cart item object with product and quantity
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, quantity } = item;

  /**
   * Handle quantity change
   * Updates both API and Redux state
   */
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;

    try {
      await api.put(`/cart/${product.id}`, { quantity: newQuantity });
      dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  /**
   * Handle item removal
   * Removes from both API and Redux state
   */
  const handleRemove = async () => {
    if (!window.confirm('Remove this item from cart?')) return;

    try {
      await api.delete(`/cart/${product.id}`);
      dispatch(removeFromCart(product.id));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img src={product.image} alt={product.name} />
      </div>

      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{product.name}</h3>
        <p className={styles.itemCategory}>{product.category}</p>
        <p className={styles.itemPrice}>{formatCurrency(product.price)} each</p>
      </div>

      <div className={styles.itemControls}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className={styles.itemTotal}>{formatCurrency(itemTotal)}</div>

        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;