import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', isSuccess: false });
  const navigate = useNavigate();

  const fetchRegistrations = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/registrations/my');
      setRegistrations(res.data.data || []);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to load registrations',
        isSuccess: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await api.delete(`/registrations/${id}`);
      setMessage({
        text: res.data.message || 'Registration cancelled successfully',
        isSuccess: true
      });
      fetchRegistrations();
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to cancel registration',
        isSuccess: false
      });
    }
  };

  return (
    <div className="container">
      <h2>My Registrations</h2>

      {message.text && (
        <div className={message.isSuccess ? 'success' : 'error'}>
          {message.text}
        </div>
      )}

      {loading && <p>Loading...</p>}

      {!loading && registrations.length === 0 && (
        <p>No registrations found.</p>
      )}

      {!loading && registrations.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Fee</th>
              <th>Registered On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.event?.name || 'N/A'}</td>
                <td>{reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'N/A'}</td>
                <td>₹{reg.event?.fee ?? 'N/A'}</td>
                <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn-danger" onClick={() => handleCancel(reg._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRegistrations;
