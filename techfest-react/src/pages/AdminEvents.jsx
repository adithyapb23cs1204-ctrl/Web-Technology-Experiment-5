import React, { useState, useEffect } from 'react';
import api from '../api';

function AdminEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'technical',
    fee: '',
    seats: '',
    date: ''
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ text: '', isSuccess: false });

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data.data || []);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to fetch events',
        isSuccess: false
      });
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchEvents();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container">
        <h2>Admins only</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isSuccess: false });

    try {
      if (editId) {
        // PUT update
        const res = await api.put(`/events/${editId}`, formData);
        setMessage({ text: res.data.message || 'Event updated successfully', isSuccess: true });
        setEditId(null);
      } else {
        // POST create
        const res = await api.post('/events', formData);
        setMessage({ text: res.data.message || 'Event created successfully', isSuccess: true });
      }

      setFormData({ name: '', category: 'technical', fee: '', seats: '', date: '' });
      fetchEvents();
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Operation failed',
        isSuccess: false
      });
    }
  };

  const handleEdit = (ev) => {
    setEditId(ev._id);
    setFormData({
      name: ev.name,
      category: ev.category,
      fee: ev.fee,
      seats: ev.seats,
      date: ev.date ? ev.date.split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await api.delete(`/events/${id}`);
      setMessage({ text: res.data.message || 'Event deleted successfully', isSuccess: true });
      fetchEvents();
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to delete event',
        isSuccess: false
      });
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ name: '', category: 'technical', fee: '', seats: '', date: '' });
  };

  return (
    <div className="container">
      <h2>Manage Events (Admin)</h2>

      {message.text && (
        <div className={message.isSuccess ? 'success' : 'error'}>
          {message.text}
        </div>
      )}

      <div className="form-container" style={{ margin: '0 0 30px 0', maxWidth: '100%' }}>
        <h3>{editId ? 'Edit Event' : 'Add New Event'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="workshop">Workshop</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="form-group">
            <label>Registration Fee (₹)</label>
            <input
              type="number"
              name="fee"
              min="0"
              value={formData.fee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Seats Available</label>
            <input
              type="number"
              name="seats"
              min="0"
              value={formData.seats}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editId ? 'Update Event' : 'Create Event'}
          </button>
          {editId && (
            <button
              type="button"
              className="btn-danger"
              style={{ marginLeft: '10px' }}
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h3>All Events</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Fee</th>
            <th>Seats</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev._id}>
              <td>{ev.name}</td>
              <td>{ev.category}</td>
              <td>₹{ev.fee}</td>
              <td>{ev.seats}</td>
              <td>{new Date(ev.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(ev)}
                >
                  Edit
                </button>
                <button
                  className="btn-danger"
                  style={{ marginLeft: '6px' }}
                  onClick={() => handleDelete(ev._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEvents;
