import React from 'react';
import { Cpu, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Cpu size={20} className="gradient-text" />
        <strong style={{ color: 'var(--text-primary)' }}>TechFest 2026 Portal</strong>
      </div>
      <p style={{ fontSize: '0.875rem' }}>
        Empowering Future Innovators & Code Architects. Built with React & Vite SPA.
      </p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
        &copy; 2026 TechFest Organizing Committee. All rights reserved.
      </p>
    </footer>
  );
};
