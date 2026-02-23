import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Auriculares inalámbricos", price: 120000 },
  { id: 2, name: "Teclado mecánico", price: 180000 },
  { id: 3, name: "Mouse gamer", price: 95000 },
  { id: 4, name: "Monitor 24 pulgadas", price: 680000 }
];

function formatCurrency(value) {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP"
  });
}

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function handleIncrement(id) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecrement(id) {
    setCart(prevCart => {
      const updated = prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      return updated;
    });
  }

  function handleRemove(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-layout">
      <section className="products-section">
        <h2>Productos disponibles</h2>
        <ul className="products-list">
          {initialProducts.map(product => (
            <li key={product.id} className="product-card">
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-price">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="cart-section">
        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="btn-icon"
                        onClick={() => handleDecrement(item.id)}
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="btn-icon"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Cantidad total de productos</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row">
                <span>Total a pagar</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default ShoppingCart;