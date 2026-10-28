import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Users, Award, ArrowRight, Zap, Shield, Code } from 'lucide-react';

export const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem 2rem 1rem',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '1rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          borderRadius: '2rem',
          background: 'rgba(99, 102, 241, 0.1)',
          color: 'var(--accent-color)',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1.5rem'
        }}>
          <Sparkles size={16} /> Annual National Tech Extravaganza
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
          Welcome to <span className="gradient-text">TechFest 2026</span>
        </h1>
        
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6'
        }}>
          Join over 5,000+ developers, designers, hardware hackers, and tech enthusiasts for 3 days of hackathons, robotics, AI workshops, and coding challenges!
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/events" className="btn btn-primary">
            Explore Events <ArrowRight size={18} />
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register Now
          </Link>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <Calendar size={32} color="var(--accent-color)" style={{ margin: '0 auto 0.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>3 Days</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Oct 15 - 17, 2026</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <Zap size={32} color="#a855f7" style={{ margin: '0 auto 0.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>25+</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Competitions & Tracks</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <Users size={32} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>5,000+</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Participants</p>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <Award size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem auto' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>₹500,000</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Prize Pool</p>
        </div>
      </section>

      {/* Highlights / Features */}
      <section>
        <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>
          Why Participate in <span className="gradient-text">TechFest 2026</span>?
        </h2>
        <div className="grid">
          <div className="card" style={{ padding: '1.5rem' }}>
            <Code size={28} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Hackathons & Coding</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Solve real-world industry problems in 24-hour non-stop coding challenges with expert mentorship.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <Shield size={28} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Cybersecurity CTF</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Test your penetration testing, cryptography, and reverse engineering skills in our Capture The Flag contest.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <Zap size={28} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>RoboWars & Hardware</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Witness combat robots clash in high-adrenaline arenas and showcase IoT embedded innovations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
