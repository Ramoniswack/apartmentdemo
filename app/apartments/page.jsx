import { Suspense } from 'react';
import ApartmentsClient from '../../components/ApartmentsClient';

export const metadata = { title: 'Apartments in Pokhara' };

export default function Apartments() {
  return (
    <Suspense fallback={<main className="results"><div className="wrap-wide"><p className="muted" style={{ padding: '40px 0' }}>Loading apartments…</p></div></main>}>
      <ApartmentsClient />
    </Suspense>
  );
}
