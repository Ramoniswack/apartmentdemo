'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon, { Star } from './Icons';
import Gallery from './Gallery';
import BookingPanel from './BookingPanel';
import DateRange from './DateRange';
import MapView from './MapView';
import ListingCard from './ListingCard';
import Rail from './Rail';
import { useApp } from './Providers';
import { AMENITY_ICON, LISTINGS, REVIEW_CATS, REVIEW_POOL, AREAS } from '../lib/data';
import { blockedRanges, fmtShort, nightsBetween } from '../lib/dates';

export default function ListingView({ l }) {
  const { fmt, saved, toggleSave } = useApp();
  const [dates, setDates] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(Math.min(2, l.guests));
  const [toast, setToast] = useState('');
  const [showAllAm, setShowAllAm] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const blocked = useMemo(() => blockedRanges(l), [l]);
  const isSaved = saved.includes(l.id);
  const nights = dates.start && dates.end ? nightsBetween(dates.start, dates.end) : 0;
  const reviews = useMemo(() => { const k = l.title.length % REVIEW_POOL.length; return [...REVIEW_POOL.slice(k), ...REVIEW_POOL.slice(0, k)]; }, [l]);
  const area = AREAS.find((a) => a.name === l.area);
  const similar = LISTINGS.filter((x) => x.id !== l.id).slice(0, 4);
  const amenities = showAllAm ? l.amenities : l.amenities.slice(0, 8);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: l.title, url });
      else { await navigator.clipboard.writeText(url); setToast('Link copied'); setTimeout(() => setToast(''), 2000); }
    } catch { /* cancelled */ }
  };

  const scores = REVIEW_CATS.map((c, i) => [c, Math.min(5, Math.max(4.6, l.rating + ((i * 7 + l.title.length) % 5 - 2) * 0.03))]);

  return (
    <main className="listing">
      <div className="wrap-wide">
        <div className="l-head">
          <h1>{l.title}</h1>
          <div className="l-tools">
            <button className="tool" onClick={share}><Icon name="share" size={16} /> Share</button>
            <button className="tool" onClick={() => toggleSave(l.id)} aria-pressed={isSaved}><Icon name="heart" size={16} fill={isSaved} className={isSaved ? 'brand-c' : ''} /> {isSaved ? 'Saved' : 'Save'}</button>
          </div>
        </div>
        {toast && <p className="toast" role="status">{toast}</p>}

        <Gallery l={l} />

        <div className="l-grid">
          <div className="l-main">
            <section className="l-sec first">
              <h2>{l.type} in {l.area}, Pokhara</h2>
              <p className="muted">{l.guests} guests · {l.bedrooms} bedroom{l.bedrooms > 1 ? 's' : ''} · {l.beds} bed{l.beds > 1 ? 's' : ''} · {l.baths} bath{l.baths > 1 ? 's' : ''} · {l.size.toLocaleString('en-IN')} sq ft</p>
              <p className="rate big"><Star size={15} /> <b>{l.rating.toFixed(2)}</b> · <a href="#reviews" className="ul">{l.reviews} reviews</a>{l.badge && <span className="chip-s"><Icon name="award" size={14} /> {l.badge}</span>}</p>
            </section>

            <section className="l-sec host-row">
              <span className="host-av">{l.host.name[0]}</span>
              <div><b>Hosted by {l.host.name}</b><p className="muted">{l.host.superhost ? 'Superhost · ' : ''}{l.host.years} years hosting · {l.floor}</p></div>
            </section>

            <section className="l-sec hl">
              {l.highlights.map(([ic, t, d]) => (
                <div key={t}><Icon name={ic} size={26} /><div><b>{t}</b><p className="muted">{d}</p></div></div>
              ))}
            </section>

            <section className="l-sec">
              <p className={`desc${openDesc ? ' open' : ''}`}>{l.description}</p>
              <button className="link-btn ul" onClick={() => setOpenDesc(!openDesc)}>{openDesc ? 'Show less' : 'Show more'}</button>
            </section>

            <section className="l-sec" id="amenities">
              <h2>What this place offers</h2>
              <ul className="am">
                {amenities.map((a) => <li key={a}><Icon name={AMENITY_ICON[a] || 'check'} size={22} /> {a}</li>)}
              </ul>
              {l.amenities.length > 8 && <button className="btn out" onClick={() => setShowAllAm(!showAllAm)}>{showAllAm ? 'Show fewer amenities' : `Show all ${l.amenities.length} amenities`}</button>}
            </section>

            <section className="l-sec" id="calendar">
              <h2>{nights ? `${nights} night${nights > 1 ? 's' : ''} in ${l.area}` : 'Select check-in date'}</h2>
              <p className="muted">{nights ? `${fmtShort(dates.start)} to ${fmtShort(dates.end)}` : 'Add your travel dates for exact pricing'}</p>
              <DateRange start={dates.start} end={dates.end} onChange={setDates} blocked={blocked} months={2} />
            </section>
          </div>

          <aside className="l-side"><BookingPanel l={l} dates={dates} setDates={setDates} guests={guests} setGuests={setGuests} blocked={blocked} /></aside>
        </div>

        <section className="l-sec wide" id="reviews">
          <h2 className="rate big"><Star size={20} /> {l.rating.toFixed(2)} · {l.reviews} reviews</h2>
          <p className="note-s">Sample reviews (placeholder content).</p>
          <div className="scores">
            {scores.map(([c, v]) => (
              <div key={c}><span>{c}</span><div className="bar"><i style={{ width: `${(v / 5) * 100}%` }} /></div><b>{v.toFixed(1)}</b></div>
            ))}
          </div>
          <div className="rev-grid">
            {reviews.slice(0, 6).map((r) => (
              <article key={r.n} className="rev">
                <div className="rev-h"><span className="host-av s">{r.n[0]}</span><div><b>{r.n}</b><span className="muted small-t">{r.o}</span></div></div>
                <p className="muted small-t">{r.d} · Stayed a few nights</p>
                <p>{r.t}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="l-sec wide" id="location">
          <h2>Where you'll be</h2>
          <p className="muted">{l.area}, Pokhara, Nepal · {area?.blurb}</p>
          <div className="map-box"><MapView pins={[{ id: l.id, x: l.map[0], y: l.map[1], price: l.price, title: l.title, rating: l.rating, area: l.area, image: l.images[0] }]} single /></div>
        </section>

        <section className="l-sec wide" id="rules">
          <h2>Things to know</h2>
          <div className="rules">
            <div><h3>House rules</h3><ul><li>Check-in after 2:00 PM</li><li>Check-out before 11:00 AM</li><li>{l.guests} guests maximum</li><li>No smoking, no parties</li><li>Quiet hours 10 PM to 7 AM</li></ul></div>
            <div><h3>Safety and property</h3><ul><li>Smoke alarm installed</li><li>First-aid kit on site</li><li>Water tank and backup power</li><li>Security camera at building entrance</li></ul></div>
            <div><h3>Cancellation policy</h3><ul><li>Free cancellation up to 48 hours before check-in</li><li>After that, the first night is non-refundable</li><li>Sample policy (placeholder)</li></ul></div>
          </div>
        </section>

        <section className="l-sec wide host-card">
          <h2>Meet your host</h2>
          <div className="hc">
            <div className="hc-l"><span className="host-av l">{l.host.name[0]}</span><b>{l.host.name}</b><span className="muted small-t">{l.host.superhost ? 'Superhost' : 'Host'}</span></div>
            <div className="hc-m"><div><b>{l.reviews}</b><span>Reviews</span></div><div><b>{l.rating.toFixed(2)}</b><span>Rating</span></div><div><b>{l.host.years}</b><span>Years hosting</span></div></div>
            <div className="hc-r">
              <p className="muted">Response rate: {l.host.response}<br />Responds {l.host.time}</p>
              <p>{l.host.name} lives in Pokhara and loves sharing local tips: where to catch sunrise, which cafés open early and how to get around.</p>
              <Link href="/help" className="btn out">Message host</Link>
            </div>
          </div>
        </section>

        <section className="l-sec wide">
          <h2>More apartments you might like</h2>
          <Rail>{similar.map((s) => <div className="rail-i" key={s.id}><ListingCard l={s} /></div>)}</Rail>
        </section>
      </div>

      <div className="m-bar">
        <div><b>{fmt(l.price)}</b> <span className="muted">night</span><br /><span className="small-t ul">{nights ? `${fmtShort(dates.start)} to ${fmtShort(dates.end)}` : 'Add dates'}</span></div>
        <a href="#booking" className="btn brand">Make an offer</a>
      </div>
    </main>
  );
}
