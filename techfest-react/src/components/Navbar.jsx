import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="nav-brand">
        <Link to="/events">TechFest 2026</Link>
      </div>
      <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        {user && <Link to="/my-registrations">My Registrations</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user ? (
          <div className="user-section">
            <span className="user-greeting">Hi, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
