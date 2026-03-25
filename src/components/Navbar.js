'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="nav-logo">TrackNFind</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link href="/matches" className="nav-link" style={{ color: 'var(--success)' }}>My Matches</Link>
              <Link href="/report" className="nav-link">Report Item</Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
            </>
          ) : (
             <>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Register</Link>
             </>
          )}
        </div>
      </div>
    </nav>
  );
}
