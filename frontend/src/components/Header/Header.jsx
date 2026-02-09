import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

/**
 * Header Component
 * Navigation bar with logo, links, and cart icon with item count
 */
const Header = () => {
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>💎</span>
          <span className={styles.logoText}>Naksh Jewels</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Products
          </Link>
          <Link to="/cart" className={styles.cartLink}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartText}>Cart</span>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;