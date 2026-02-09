import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Header from './components/Header/Header';
import ProductListing from './pages/ProductListing/ProductListing';
import CartPage from './pages/CartPage/CartPage';
import './styles/index.css';

/**
 * Main App Component
 * Configures routing and Redux provider
 */
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductListing />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;