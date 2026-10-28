import React, { useState } from 'react';

const GALLERY_ITEMS = [
  { id: 1, title: 'Robot Arena Battle', category: 'Robotics', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80' },
  { id: 2, title: 'Hackathon Midnight Coding', category: 'Hackathon', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80' },
  { id: 3, title: 'AI & Neural Nets Seminar', category: 'Workshops', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80' },
  { id: 4, title: 'Cybersecurity Keynote', category: 'Workshops', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80' },
  { id: 5, title: 'Drone Obstacle Race', category: 'Robotics', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80' },
  { id: 6, title: 'Grand Awards Ceremony', category: 'Highlights', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80' }
];

export const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0f172a' }}>
          TechFest Photo Gallery
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Snapshots of innovation, teamwork, and excitement from past editions.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['All', 'Robotics', 'Hackathon', 'Workshops', 'Highlights'].map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-card">
            <div className="gallery-img-wrapper">
              <img 
                src={item.img} 
                alt={`TechFest highlight - ${item.title}`} 
                className="gallery-img" 
                loading="lazy" 
                decoding="async" 
              />
              <span className="gallery-tag">{item.category}</span>
            </div>
            <div className="gallery-body">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
