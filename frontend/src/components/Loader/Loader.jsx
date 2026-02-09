import React from 'react';
import styles from './Loader.module.css';

/**
 * Loader Component
 * Animated loading spinner with optional message
 * @param {String} message - Optional loading message
 */
const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Loader;