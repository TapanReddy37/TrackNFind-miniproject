'use client';
import { useState } from 'react';

export default function ReportItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('LOST');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('date', date);
    if (file) formData.append('file', file);

    const res = await fetch('/api/items', {
      method: 'POST',
      body: formData
    });
    
    if (res.ok) {
      setMessage('Item reported successfully! Check "My Matches" to see probable matches.');
      setTitle(''); setDescription(''); setLocation(''); setDate(''); setFile(null);
    } else {
      const data = await res.json();
      setMessage(data.error || 'Failed to report item.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', textAlign: 'center' }}>Report Item</h2>
        {message && <div style={{ padding: '1rem', background: 'rgba(59,130,246,0.1)', border: '1px solid var(--primary)', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" required className="form-input" placeholder="E.g. Blue Backpack" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: '1' }}>
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="LOST">Lost</option>
                <option value="FOUND">Found</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: '1' }}>
              <label className="form-label">Date</label>
              <input type="date" required className="form-input" value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location (Where was it lost/found?)</label>
            <input type="text" required className="form-input" placeholder="E.g. Library 2nd Floor" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          
          {category === 'FOUND' && (
            <div className="form-group">
              <label className="form-label">Upload Image</label>
              <input type="file" accept="image/*" className="form-input" onChange={e => setFile(e.target.files[0])} style={{ padding: '0.6rem 1rem' }} />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Description & Contact Info</label>
            <textarea required className="form-textarea" rows="4" placeholder="Provide distinct features of the item..." value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Report</button>
        </form>
      </div>
    </div>
  );
}
