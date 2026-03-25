'use client';
import { useState, useEffect } from 'react';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/matches')
      .then(res => res.json())
      .then(data => {
        setMatches(data.matches || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container" style={{ textAlign:'center', marginTop: '5rem' }}>Loading matches...</div>;

  return (
    <div className="container animate-fade-in">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Matches</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Potential found items matching what you have lost.</p>

      {matches.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🤷</div>
          <h3 style={{ color: 'var(--text-muted)' }}>No matches found yet.</h3>
          <p style={{ color: 'var(--text-muted)' }}>We will display matches here when a found item matches your lost reports.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {matches.map((m, i) => (
            <div key={i} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              {m.foundItem.imageUrl && (
                <div style={{ height: '200px', width: '100%', background: '#000' }}>
                  <img src={m.foundItem.imageUrl} alt={m.foundItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <div style={{color: 'var(--success)', fontWeight: 'bold', marginBottom: '0.5rem'}}>Match Score: {m.score}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Found: {m.foundItem.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{m.foundItem.description}</p>
                <div style={{ fontSize: '0.875rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                  <strong>Found At:</strong> {m.foundItem.location} <br/>
                  <strong>Reported By:</strong> {m.foundItem.reporter.name} ({m.foundItem.reporter.email})
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                  <strong>Matches Your Lost Item:</strong> {m.lostItem.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
