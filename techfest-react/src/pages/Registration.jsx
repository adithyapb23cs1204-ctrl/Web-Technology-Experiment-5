import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, User, Mail, Phone, School, Ticket, ArrowLeft } from 'lucide-react';

export const Registration = () => {
  const [searchParams] = useSearchParams();
  const initialEventId = searchParams.get('eventId') || 'ev-1';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    selectedEvent: initialEventId,
    ticketType: 'Student Pass'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState(null);

  const eventOptions = [
    { id: 'ev-1', name: 'HackAI 2026 Hackathon (₹300)' },
    { id: 'ev-2', name: 'RoboWars Grand Prix (₹500)' },
    { id: 'ev-3', name: 'CyberShield CTF (₹250)' },
    { id: 'ev-4', name: 'Web3 & Blockchain Summit (Free)' },
    { id: 'ev-5', name: 'CodeSprint Speed Typing (₹100)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on field edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.college.trim()) newErrors.college = 'College/Organization is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const ticketId = 'TF2026-' + Math.floor(100000 + Math.random() * 900000);
      setRegisteredTicket({
        ...formData,
        ticketId,
        eventName: eventOptions.find(ev => ev.id === formData.selectedEvent)?.name || formData.selectedEvent,
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      selectedEvent: 'ev-1',
      ticketType: 'Student Pass'
    });
    setErrors({});
    setIsSubmitted(false);
    setRegisteredTicket(null);
  };

  if (isSubmitted && registeredTicket) {
    return (
      <div className="form-container" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <CheckCircle size={64} color="var(--success-color)" style={{ margin: '0 auto 1rem auto' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Registration Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Your entry pass for <strong style={{ color: 'var(--text-primary)' }}>{registeredTicket.eventName}</strong> has been generated successfully.
        </p>

        <div style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          textAlign: 'left',
          marginBottom: '2rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: '700', marginBottom: '0.5rem' }}>
            TICKET ID: {registeredTicket.ticketId}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div><strong>Participant:</strong> {registeredTicket.fullName}</div>
            <div><strong>Email:</strong> {registeredTicket.email}</div>
            <div><strong>Phone:</strong> {registeredTicket.phone}</div>
            <div><strong>Institution:</strong> {registeredTicket.college}</div>
            <div><strong>Pass Type:</strong> {registeredTicket.ticketType}</div>
            <div><strong>Time:</strong> {registeredTicket.registeredAt}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleReset}>
            Register Another Event
          </button>
          <Link to="/events" className="btn btn-secondary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          Event <span className="gradient-text">Registration Form</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Complete the form below to secure your spot at TechFest 2026.
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="fullName"
                type="text"
                name="fullName"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>

          {/* Email & Phone grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="10-digit phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && <div className="error-text">{errors.phone}</div>}
            </div>
          </div>

          {/* College / Institution */}
          <div className="form-group">
            <label className="form-label" htmlFor="college">College / Institution *</label>
            <div style={{ position: 'relative' }}>
              <School size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                id="college"
                type="text"
                name="college"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="e.g. National Institute of Technology"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
            {errors.college && <div className="error-text">{errors.college}</div>}
          </div>

          {/* Event Selection */}
          <div className="form-group">
            <label className="form-label" htmlFor="selectedEvent">Select Event Track *</label>
            <div style={{ position: 'relative' }}>
              <Ticket size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <select
                id="selectedEvent"
                name="selectedEvent"
                className="form-select"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.selectedEvent}
                onChange={handleChange}
              >
                {eventOptions.map((ev) => (
                  <option key={ev.id} value={ev.id}>{ev.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ticket Type */}
          <div className="form-group">
            <label className="form-label">Pass Category</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Student Pass', 'VIP Delegate', 'Online Viewer'].map((type) => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="radio"
                    name="ticketType"
                    value={type}
                    checked={formData.ticketType === type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};
