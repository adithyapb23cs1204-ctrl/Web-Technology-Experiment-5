import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, Ticket } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalAmount } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <ShoppingBag size={64} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto' }} />
        <h2>Your TechFest Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          Explore our events and add competitions or workshops to your cart!
        </p>
        <Link to="/events" className="btn btn-primary">
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          Selected Events <span className="gradient-text">Cart</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review your selected event passes before proceeding to registration.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: 1 }}>
                <span className="category-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '0.25rem' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '1.15rem' }}>{item.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Date: {item.date || 'Oct 15, 2026'} | Quantity: {item.quantity}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {item.fee === 0 ? 'Free' : `₹${item.fee * item.quantity}`}
                </div>
                <button
                  className="btn btn-danger"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginTop: '0.5rem' }}
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total Summary */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <button className="btn btn-secondary" onClick={clearCart} style={{ fontSize: '0.85rem' }}>
              Clear Cart
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Fee:</span>
              <h2 className="gradient-text" style={{ fontSize: '1.8rem' }}>₹{totalAmount}</h2>
            </div>
            <Link to="/register" className="btn btn-primary">
              <Ticket size={18} /> Proceed to Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
