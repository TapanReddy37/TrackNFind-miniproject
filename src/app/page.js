import Link from 'next/link';

export default function Home() {
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 10rem)', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Never Lose Track Again
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
        TrackNFind is the centralized, secure, and modern portal to report, search, and claim your valuable items.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/report" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Report an Item
        </Link>
        <Link href="/matches" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          View Matches
        </Link>
      </div>
      
      <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
          <h3 style={{ marginBottom: '1rem' }}>Smart Matching</h3>
          <p style={{ color: 'var(--text-muted)' }}>Our algorithm automatically checks reported lost items against found ones and shows you the best matches.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ marginBottom: '1rem' }}>Secure Claims</h3>
          <p style={{ color: 'var(--text-muted)' }}>All claims are verified by administrators ensuring secure and accurate recovery.</p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
          <h3 style={{ marginBottom: '1rem' }}>Fast Communication</h3>
          <p style={{ color: 'var(--text-muted)' }}>Real-time updates and an organized digital record make the process incredibly fast.</p>
        </div>
      </div>
    </div>
  );
}
