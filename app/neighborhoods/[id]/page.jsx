import Link from 'next/link';
import { notFound } from 'next/navigation';
import ListingCard from '../../../components/ListingCard';
import Icon from '../../../components/Icons';
import { AREAS, byArea, img } from '../../../lib/data';

export function generateStaticParams() {
  return AREAS.map((area) => ({ id: area.id }));
}

export function generateMetadata({ params }) {
  const area = AREAS.find((item) => item.id === params.id);
  return { title: area ? `Apartments in ${area.name}` : 'Neighbourhood' };
}

export default function NeighborhoodDetail({ params }) {
  const area = AREAS.find((item) => item.id === params.id);
  if (!area) notFound();

  const listings = byArea(area.name);
  return (
    <main>
      <section className="wrap-wide neighborhood-detail-hero">
        <div className="neighborhood-detail-image">
          <img src={img(area.img)} alt={`${area.name}, Pokhara`} style={{ objectPosition: area.pos }} />
          <div className="neighborhood-detail-overlay">
            <p className="eyebrow">Neighbourhood guide</p>
            <h1>{area.name}</h1>
          </div>
        </div>
      </section>

      <section className="wrap-wide neighborhood-detail-intro">
        <div>
          <p className="eyebrow">Around {area.name}</p>
          <h2>{area.blurb}</h2>
        </div>
        <p className="muted">{area.description}</p>
      </section>

      <section className="wrap-wide neighborhood-highlights">
        {area.highlights.map((highlight, index) => (
          <div key={highlight}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Icon name={index === 0 ? 'pin' : index === 1 ? 'sun' : 'mountain'} size={22} />
            <b>{highlight}</b>
          </div>
        ))}
      </section>

      <section className="wrap-wide sec">
        <div className="sec-h neighborhood-sec-h">
          <div className="neighborhood-title">
            <Link href="/neighborhoods" className="icon-btn neighborhood-back" aria-label="Back to neighbourhoods">
              <Icon name="chevL" size={20} />
            </Link>
            <div>
              <h2>Apartments in {area.name}</h2>
              <p className="muted">{listings.length} {listings.length === 1 ? 'hand-picked stay' : 'hand-picked stays'} available.</p>
            </div>
          </div>
        </div>
        {listings.length ? (
          <div className="neighborhood-listings">
            {listings.map((listing) => <ListingCard key={listing.id} l={listing} />)}
          </div>
        ) : (
          <div className="empty"><h3>No apartments listed here yet</h3><Link href="/apartments" className="btn out">Browse all apartments</Link></div>
        )}
      </section>

      <section className="wrap-wide sec">
        <div className="neighborhood-tip">
          <div>
            <p className="eyebrow">More ways to explore</p>
            <h2>See every corner of Pokhara.</h2>
          </div>
          <Link href="/neighborhoods" className="btn out">Explore all neighbourhoods</Link>
        </div>
      </section>
    </main>
  );
}
