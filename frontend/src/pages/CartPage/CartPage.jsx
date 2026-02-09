import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import { formatCurrency } from '../../utils/helpers';
import api from '../../utils/api';
import styles from './CartPage.module.css';

/**
 * CartPage Component
 * Displays cart items, summary, and checkout options
 */
const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

  /**
   * Handle clear cart action
   */
  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;

    try {
      await api.delete('/cart');
      dispatch(clearCart());
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart. Please try again.');
    }
  };

  /**
   * Handle checkout (placeholder function)
   */
  const handleCheckout = () => {
    alert('Checkout functionality will be implemented in the next phase!');
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some beautiful jewelry pieces to your cart to get started</p>
          <Link to="/" className={styles.shopButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <button onClick={handleClearCart} className={styles.clearButton}>
          Clear Cart
        </button>
      </div>

      <div className={styles.content}>
        {/* Cart Items List */}
        <div className={styles.itemsList}>
          <div className={styles.itemsHeader}>
            <span>Items ({totalItems})</span>
          </div>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} items)</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={styles.free}>FREE</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Tax (estimated)</span>
            <span>{formatCurrency(totalPrice * 0.03)}</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{formatCurrency(totalPrice * 1.03)}</span>
          </div>

          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
          </button>

          <Link to="/" className={styles.continueLink}>
            ← Continue Shopping
          </Link>

          <div className={styles.securityBadge}>
            <span className={styles.lockIcon}>🔒</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;