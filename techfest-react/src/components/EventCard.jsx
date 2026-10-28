import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Ticket, ShoppingBag, UserCheck, Calendar } from 'lucide-react';

export const EventCard = ({ event }) => {
  const { id, name, category, fee, seats: initialSeats, description, date, image } = event;
  const [seatsLeft, setSeatsLeft] = useState(initialSeats || 10);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (seatsLeft > 0) {
      setSeatsLeft((prev) => prev - 1);
      // Navigate to registration page pre-filling selected event
      navigate(`/register?eventId=${id}&eventName=${encodeURIComponent(name)}`);
    }
  };

  const handleAddToCart = () => {
    addToCart({ id, name, category, fee, date });
  };

  const getSeatBadgeClass = () => {
    if (seatsLeft === 0) return 'seat-badge seat-soldout';
    if (seatsLeft <= 3) return 'seat-badge seat-low';
    return 'seat-badge seat-available';
  };

  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img 
          src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'} 
          alt={name} 
          className="card-img" 
        />
        <span className="category-tag">{category}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-desc">{description}</p>

        <div className="card-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={15} /> {date || 'Oct 15, 2026'}
          </span>
          <span className={getSeatBadgeClass()}>
            {seatsLeft === 0 ? 'SOLD OUT' : `${seatsLeft} seats left`}
          </span>
        </div>

        <div className="card-meta" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
          <span>Entry Fee:</span>
          <span className="gradient-text">{fee === 0 ? 'Free' : `₹${fee}`}</span>
        </div>

        <div className="card-actions">
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={handleRegisterClick}
            disabled={seatsLeft === 0}
          >
            <Ticket size={16} />
            {seatsLeft === 0 ? 'SOLD OUT' : 'Register'}
          </button>
          
          <button
            className="btn btn-secondary"
            onClick={handleAddToCart}
            title="Add to Cart"
            disabled={seatsLeft === 0}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
