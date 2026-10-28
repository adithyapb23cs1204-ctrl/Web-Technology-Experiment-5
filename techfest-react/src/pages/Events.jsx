import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [regMessage, setRegMessage] = useState({ text: '', isSuccess: false });
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/events');
      setEvents(res.data.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await api.post('/registrations', { eventId });
      setRegMessage({ text: res.data.message || 'Registered successfully', isSuccess: true });
      fetchEvents();
    } catch (err) {
      setRegMessage({
        text: err.response?.data?.message || 'Registration failed',
        isSuccess: false
      });
    }
  };

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = ev.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || ev.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h2>Upcoming TechFest Events</h2>

      {regMessage.text && (
        <div className={regMessage.isSuccess ? 'success' : 'error'}>
          {regMessage.text}
        </div>
      )}

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="technical">Technical</option>
          <option value="cultural">Cultural</option>
          <option value="workshop">Workshop</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && filteredEvents.length === 0 && (
        <p>No events found.</p>
      )}

      <div className="grid">
        {filteredEvents.map((ev) => (
          <div key={ev._id} className="card">
            <h3>{ev.name}</h3>
            <p><strong>Category:</strong> {ev.category}</p>
            <p><strong>Fee:</strong> ₹{ev.fee}</p>
            <p><strong>Date:</strong> {new Date(ev.date).toLocaleDateString()}</p>
            <p><strong>Seats Left:</strong> {ev.seats}</p>
            {ev.seats > 0 ? (
              <button
                className="btn-primary"
                onClick={() => handleRegister(ev._id)}
              >
                Register
              </button>
            ) : (
              <button className="btn-disabled" disabled>
                SOLD OUT
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
