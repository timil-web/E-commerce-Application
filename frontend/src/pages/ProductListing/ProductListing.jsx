import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProducts, setError } from '../../redux/slices/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import api from '../../utils/api';
import styles from './ProductListing.module.css';

/**
 * ProductListing Page
 * Main page displaying all available jewelry products in a grid
 */
const ProductListing = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const response = await api.get('/products');
      dispatch(setProducts(response.data.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Failed to fetch products'));
      console.error('Error fetching products:', err);
    }
  }, [dispatch]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Exquisite Jewelry Collection</h1>
        <p className={styles.heroSubtitle}>
          Discover our handcrafted pieces that blend tradition with modern elegance
        </p>
      </section>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>Filter by Category:</div>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && <Loader message="Loading products..." />}

      {/* Error State */}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={fetchProducts} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {filteredProducts.length > 0 ? (
            <>
              <div className={styles.resultsCount}>
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </div>
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📦</div>
              <h2>No products found</h2>
              <p>Try selecting a different category</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;