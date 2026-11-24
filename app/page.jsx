import Link from 'next/link';
import Rail from '../components/Rail';
import ListingCard from '../components/ListingCard';
import Recommended from '../components/Recommended';
import Icon from '../components/Icons';
import { AREAS, LISTINGS, byArea, img } from '../lib/data';

const FLEX = [
  { t: 'Weekend escapes', d: '2 to 3 nights by the lake', i: 'rooftop-terrace', href: '/apartments?cat=lake', pos: '50% 60%' },
  { t: 'A week in Pokhara', d: 'Mountain-view apartments with a kitchen', i: 'living-room', href: '/apartments?cat=mountain', pos: '50% 50%' },
  { t: 'Monthly stays', d: 'Desks, fast wifi and long-stay rates', i: 'phewa-lake-studio', href: '/apartments?cat=long', pos: '50% 55%' },
];
const TRUST = [
  ['camera', 'Verified photos', 'Every apartment is photographed on a site visit, so what you see is what you get.'],
  ['shield', 'Free cancellation', 'Most stays can be cancelled free of charge up to 48 hours before check-in.'],
  ['key', 'Responsive local hosts', 'Hosts live in Pokhara and reply fast, from airport pickup to the best sunrise route.'],
];

export default function Home() {
  const mountain = LISTINGS.filter((l) => l.cats.includes('mountain'));
  const cosy = LISTINGS.filter((l) => l.cats.includes('studio') || l.cats.includes('loft') || l.cats.includes('garden'));

  return (
    <main>
      {/* ---- Hero ---- */}
      <section className="wrap-wide hero">
        <div className="hero-card">
          <img src={img('hero')} alt="Apartment building glowing at dusk below the Annapurna range in Pokhara" />
          <nav className="hero-pill" aria-label="Quick search">
            <Link href="/apartments">Anywhere</Link><i aria-hidden="true" />
            <Link href="/apartments?open=dates">Any week</Link><i aria-hidden="true" />
            <Link href="/apartments?open=guests">Add guests</Link>
          </nav>
          <p className="eyebrow hero-loc">Pokhara, Nepal</p>
          <div className="hero-copy">
            <h1>Apartments with the<br />mountains for a view.</h1>
          </div>
          <div className="glass-search" role="search">
            <Link href="/apartments" className="gs-seg"><small>Where</small><span>Search neighbourhoods</span></Link>
            <Link href="/apartments?open=dates" className="gs-seg"><small>When</small><span>Add dates</span></Link>
            <Link href="/apartments?open=guests" className="gs-seg"><small>Who</small><span>Add guests</span></Link>
            <Link href="/apartments" className="gs-go" aria-label="Search"><Icon name="search" size={20} strokeWidth={2.4} /></Link>
          </div>
        </div>
      </section>

      {/* ---- All available apartments ---- */}
      <section className="wrap-wide sec" id="apartments">
        <div className="sec-h"><div><h2>Available apartments in Pokhara</h2><p className="muted">Every home on DemoStay, from lake studios to mountain-view penthouses.</p></div><div className="s-tools"><Link href="/map" className="more">View on map <Icon name="chevR" size={14} /></Link><Link href="/apartments" className="more">Show all <Icon name="chevR" size={14} /></Link></div></div>
        <div className="home-grid">{LISTINGS.map((l) => <ListingCard key={l.id} l={l} />)}</div>
      </section>

      {/* ---- Destination inspiration ---- */}
      <section className="wrap-wide sec" id="neighborhoods">
        <div className="sec-h"><div><h2>Find your neighbourhood</h2><p className="muted">Five very different corners of Pokhara, all within reach of the lake.</p></div><Link href="/neighborhoods" className="more">Explore neighbourhoods <Icon name="chevR" size={14} /></Link></div>
        <Rail>
          {AREAS.map((a) => {
            const n = byArea(a.name).length;
            return (
              <Link key={a.id} href={`/neighborhoods/${a.id}`} className="dest rail-i">
                <img src={img(a.img)} alt={`${a.name}, Pokhara`} loading="lazy" style={{ objectPosition: a.pos }} />
                <div className="dest-t"><b>{a.name}</b><span>{a.blurb}</span><em>{n} {n === 1 ? 'apartment' : 'apartments'}</em></div>
              </Link>
            );
          })}
        </Rail>
      </section>

      {/* ---- Flexible stays ---- */}
      <section className="wrap-wide sec">
        <div className="sec-h"><div><h2>Stay your way</h2><p className="muted">Short escape or long season, pick the pace that suits you.</p></div></div>
        <div className="flex-grid">
          {FLEX.map((f) => (
            <Link key={f.t} href={f.href} className="flex">
              <img src={img(f.i)} alt="" loading="lazy" style={{ objectPosition: f.pos }} />
              <div><b>{f.t}</b><span>{f.d}</span><em>Explore <Icon name="arrow" size={14} /></em></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Curated collections ---- */}
      <section className="wrap-wide sec">
        <div className="sec-h"><div><h2>Wake up to the Annapurnas</h2><p className="muted">Apartments with a mountain panorama from the window or the terrace.</p></div><Link href="/apartments?cat=mountain" className="more">Show all <Icon name="chevR" size={14} /></Link></div>
        <Rail>{mountain.map((l) => <div className="rail-i" key={l.id}><ListingCard l={l} /></div>)}</Rail>
      </section>

      <section className="wrap-wide sec">
        <div className="sec-h"><div><h2>Lofts, studios and garden flats</h2><p className="muted">Cosy, characterful and ideal for one or two travellers.</p></div><Link href="/apartments" className="more">Show all <Icon name="chevR" size={14} /></Link></div>
        <Rail>{cosy.map((l) => <div className="rail-i" key={l.id}><ListingCard l={l} /></div>)}</Rail>
      </section>

      {/* ---- Personalised recommendations ---- */}
      <div className="wrap-wide"><Recommended /></div>

      {/* ---- Virtual tour ---- */}
      <section className="wrap-wide sec">
        <div className="tour">
          <div className="tour-copy">
            <p className="eyebrow">Look closer</p>
            <h2>Walk through before you book.</h2>
            <p>Full photo galleries, honest floor details and finishes you can see up close: timber, stone and glass, framed by the Himalaya.</p>
            <Link href="/apartments/annapurna-view-apartment" className="btn dark"><Icon name="play" size={18} /> See the Annapurna View Apartment</Link>
          </div>
          <div className="tour-img big"><img src={img('virtual-tour')} alt="Living room with floor-to-ceiling windows over Phewa Lake" loading="lazy" /></div>
          <div className="tour-img tall"><img src={img('premium-finishes')} alt="Close-up of walnut panelling and stone finishes" loading="lazy" /></div>
        </div>
      </section>

      {/* ---- Trust ---- */}
      <section className="wrap-wide sec">
        <div className="trust">
          {TRUST.map(([ic, t, d]) => <div key={t}><Icon name={ic} size={30} /><b>{t}</b><p className="muted">{d}</p></div>)}
        </div>
      </section>

      {/* ---- Host CTA ---- */}
      <section className="wrap-wide sec">
        <div className="cta">
          <img src={img('rooftop-terrace')} alt="" loading="lazy" />
          <div className="cta-box">
            <h2>Own an apartment in Pokhara?</h2>
            <p>List it on DemoStay and see what it could earn. We handle photos, guests and payouts.</p>
            <Link href="/account?tab=hosting" className="btn brand">Become a host</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
