import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactData.name && contactData.email && contactData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          Contact <span className="gradient-text">Organizing Team</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have questions about registrations, sponsorships, or event rules? Reach out to us!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <MapPin size={28} color="var(--accent-color)" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>Campus Address</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>TechFest Innovation Complex, Tech University Campus, Delhi 110001</p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <Mail size={28} color="#10b981" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>Email Inquiries</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>support@techfest2026.org</p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <Phone size={28} color="#f59e0b" />
            <div>
              <h4 style={{ fontSize: '1rem' }}>Helpline</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>+91 1800-2026-TECH (Mon - Sat, 9 AM - 6 PM)</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="form-container" style={{ margin: 0, maxWidth: '100%' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <CheckCircle size={48} color="var(--success-color)" style={{ margin: '0 auto 1rem auto' }} />
              <h3>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Thank you for contacting TechFest 2026. We will respond within 24 hours.
              </p>
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '1.5rem' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="John Doe"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="john@example.com"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  required
                  placeholder="How can we help you?"
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
