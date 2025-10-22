import React, { useState } from "react";
import AuthModal from "./AuthModal";
import "./MiniShop.css";

const MiniShop = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Wireless Earbuds", price: 49, img: "/Wireless Earbuds.jpg" },
    { id: 2, name: "Smart Watch", price: 79, img: "/Smart Watch.webp" },
    { id: 3, name: "Bluetooth Speaker", price: 59, img: "/Bluetooth Speaker.jpg" },
  ];

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleBuyAll = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`🎉 You purchased ${cart.length} item(s) for a total of $${totalPrice}!`);
    setCart([]); // Clear after purchase
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="minishop-container">
      <h1>🛍️ MiniShop</h1>

      {/* Product Section */}
      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.img} alt={item.name} className="product-image" />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h2>Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <p>No items yet. Start shopping!</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-image" />
                  <div>
                    <strong>{item.name}</strong> - ${item.price}
                  </div>
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <h3>Total: ${totalPrice}</h3>
              <button className="buy-btn" onClick={handleBuyAll}>
                Buy All
              </button>
            </div>
          </>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default MiniShop;
