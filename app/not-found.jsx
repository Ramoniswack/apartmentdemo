import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap-wide" style={{ padding: '60px 0 100px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 40 }}>We couldn't find that page</h1>
      <p className="muted" style={{ margin: '12px 0 28px' }}>The apartment may have moved, or the link is out of date.</p>
      <Link href="/apartments" className="btn dark">Browse apartments</Link>
    </main>
  );
}
