import Link from 'next/link';
import Rail from '../components/Rail';
import ListingCard from '../components/ListingCard';
import Recommended from '../components/Recommended';
import Reveal from '../components/Reveal';
import StatsStrip from '../components/StatsStrip';
import Icon from '../components/Icons';
import HomeSearch from '../components/HomeSearch';
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

function SectionHeading({ eyebrow, title, description, children }) {
  return (
    <div className="home-section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <p className="home-section-description">{description}</p>
      {children && <div className="home-section-actions">{children}</div>}
    </div>
  );
}

function editorialLabel(listing) {
  if (listing.cats.includes('loft')) return 'Loft';
  if (listing.cats.includes('studio')) return 'Studio';
  return 'Garden flat';
}

export default function Home() {
  const mountain = LISTINGS.filter((l) => l.cats.includes('mountain'));
  const mountainPicks = mountain.slice(0, 3);
  const cosy = LISTINGS.filter((l) => l.cats.includes('studio') || l.cats.includes('loft') || l.cats.includes('garden'));
  const featured = LISTINGS.slice(0, 5);
  const averageRating = LISTINGS.reduce((sum, listing) => sum + listing.rating, 0) / LISTINGS.length;

  return (
    <main className="home-page">
      <section className="home-hero" id="home-hero">
        <div className="hero-card">
          <img src={img('hero')} alt="Apartment building glowing at dusk below the Annapurna range in Pokhara" fetchPriority="high" />
          <p className="eyebrow hero-loc">Pokhara, Nepal</p>
          <div className="hero-copy">
            <h1>Apartments with the<br />mountains for a view.</h1>
          </div>
          <HomeSearch />
        </div>
      </section>

      <Reveal as="section" className="home-band home-stats-band">
        <div className="home-content">
          <StatsStrip apartments={LISTINGS.length} neighborhoods={AREAS.length} rating={averageRating} trust={TRUST} />
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-feature-band" delay={40}>
        <div className="home-content">
          <SectionHeading
            eyebrow="Available stays"
            title="Available apartments in Pokhara"
            description="Every home on DemoStay, from lake studios to mountain-view penthouses."
          />
          <div className="featured-mosaic">
            {featured.map((l, index) => (
              <ListingCard
                key={l.id}
                l={l}
                cardClassName={`lcard--featured${index === 0 ? ' lcard--feature-main' : ''}`}
                showArrow={index === 0}
              />
            ))}
          </div>
          <div className="home-section-links">
            <Link href="/apartments" className="btn brand">Show all <Icon name="chevR" size={16} /></Link>
            <Link href="/map" className="more">View on map <Icon name="arrow" size={15} /></Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-neighborhood-band" delay={80}>
        <div className="home-content">
          <SectionHeading
            eyebrow="Explore Pokhara"
            title="Find your neighbourhood"
            description="Five very different corners of Pokhara, all within reach of the lake."
          />
          <div className="neighborhood-accordion">
            {AREAS.map((a) => {
              const count = byArea(a.name).length;
              return (
                <Link key={a.id} href={`/neighborhoods/${a.id}`} className="area-tile">
                  <img src={img(a.img)} alt={`${a.name}, Pokhara`} loading="lazy" style={{ objectPosition: a.pos }} />
                  <span className="area-shade" />
                  <span className="area-copy">
                    <b>{a.name}</b>
                    <span className="area-blurb">{a.blurb}</span>
                    <span className="area-description">{a.description}</span>
                    <em>{count} {count === 1 ? 'apartment' : 'apartments'}</em>
                  </span>
                  <span className="area-arrow"><Icon name="arrow" size={17} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-mountain-band" delay={80}>
        <div className="home-content mountain-content">
          <SectionHeading
            eyebrow="Mountain views"
            title="Wake up to the Annapurnas"
            description="Apartments with a mountain panorama from the window or the terrace."
          >
            <Link href="/apartments?cat=mountain" className="more">Show all <Icon name="chevR" size={14} /></Link>
          </SectionHeading>
          <div className="mountain-row">
            <div className="mountain-marquee-track">
              {mountainPicks.map((l) => (
                <div className="mountain-marquee-card" key={l.id}><ListingCard l={l} cardClassName="lcard--mountain" /></div>
              ))}
              {mountainPicks.map((l) => (
                <div className="mountain-marquee-card" key={`loop-${l.id}`} aria-hidden="true" inert><ListingCard l={l} cardClassName="lcard--mountain" /></div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-flex-band" delay={80}>
        <div className="home-content">
          <SectionHeading
            eyebrow="Find your pace"
            title="Stay your way"
            description="Short escape or long season, pick the pace that suits you."
          />
          <div className="flex-grid">
            {FLEX.map((f) => (
              <Link key={f.t} href={f.href} className="flex">
                <img src={img(f.i)} alt="" loading="lazy" style={{ objectPosition: f.pos }} />
                <div><b>{f.t}</b><span>{f.d}</span><em>Explore <Icon name="arrow" size={14} /></em></div>
                <span className="flex-arrow" aria-hidden="true"><Icon name="arrow" size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-editorial-band" delay={80}>
        <div className="home-content">
          <SectionHeading
            eyebrow="Smaller stays, big views"
            title="Lofts, studios and garden flats"
            description="Cosy, characterful and ideal for one or two travellers."
          >
            <Link href="/apartments" className="more">Show all <Icon name="chevR" size={14} /></Link>
          </SectionHeading>
          <Rail className="editorial-row">
            {cosy.map((l) => (
              <div className="rail-i editorial-item" key={l.id}>
                <ListingCard l={l} badgeLabel={editorialLabel(l)} cardClassName="lcard--editorial" />
              </div>
            ))}
          </Rail>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-recommendations-band" delay={80}>
        <div className="home-content"><Recommended /></div>
      </Reveal>

      <Reveal as="section" className="home-band home-tour-band" delay={80}>
        <div className="home-content">
          <div className="tour">
            <div className="tour-copy">
              <p className="eyebrow">Look closer</p>
              <h2>Walk through before you book.</h2>
              <p>Full photo galleries, honest floor details and finishes you can see up close: timber, stone and glass, framed by the Himalaya.</p>
              <Link href="/apartments/annapurna-view-apartment" className="btn dark"><Icon name="play" size={18} /> See the Annapurna View Apartment</Link>
            </div>
            <div className="tour-img big">
              <img src={img('virtual-tour')} alt="Living room with floor-to-ceiling windows over Phewa Lake" loading="lazy" />
              <span className="tour-pill"><Icon name="play" size={14} /> 360° tour</span>
              <span className="tour-info-card" aria-hidden="true"><Icon name="sparkle" size={16} /> Look closer</span>
            </div>
            <div className="tour-img tall">
              <img src={img('premium-finishes')} alt="Close-up of walnut panelling and stone finishes" loading="lazy" />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="home-band home-host-band" delay={80}>
        <div className="home-content">
          <div className="cta">
            <img src={img('rooftop-terrace')} alt="" loading="lazy" />
            <div className="cta-box">
              <p className="eyebrow">Host with DemoStay</p>
              <h2>Own an apartment in Pokhara?</h2>
              <p>List it on DemoStay and see what it could earn. We handle photos, guests and payouts.</p>
              <Link href="/account?tab=hosting" className="btn brand">Become a host <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Link href="/apartments" className="mobile-search-cta"><Icon name="search" size={18} /> Search</Link>
    </main>
  );
}
