import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name || !email || !password) {
      setIsSuccess(false);
      setMessage('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setIsSuccess(false);
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await api.post('/auth/signup', { name, email, password });
      setIsSuccess(true);
      setMessage(res.data.message || 'User registered successfully');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setIsSuccess(false);
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {message && (
        <div className={isSuccess ? 'success' : 'error'}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
