import Link from 'next/link';
import NeighborhoodsClient from '../../components/NeighborhoodsClient';

export const metadata = { title: 'Neighbourhoods in Pokhara' };

export default function Neighborhoods() {
  return (
    <main>
      <NeighborhoodsClient />

      <section className="wrap-wide sec">
        <div className="neighborhood-tip">
          <div>
            <p className="eyebrow">Not sure where to stay?</p>
            <h2>Compare every available apartment.</h2>
          </div>
          <Link href="/apartments" className="btn dark">Browse all apartments</Link>
        </div>
      </section>
    </main>
  );
}
