'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import Popover from './Popover';
import DateRange from './DateRange';
import ListingCard from './ListingCard';
import MapView from './MapView';
import { useApp } from './Providers';
import { AREAS, LISTINGS } from '../lib/data';
import { blockedRanges, fmtShort, nightsBetween, rangeIsFree } from '../lib/dates';

// Map view: every apartment that is free for the chosen dates, pinned on the map.
export default function MapPageClient() {
  const { saved } = useApp();
  const [dates, setDates] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const [view, setView] = useState('map');
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);

  const nights = dates.start && dates.end ? nightsBetween(dates.start, dates.end) : 0;
  const list = useMemo(
    () => LISTINGS.filter((l) => l.guests >= guests && (!nights || rangeIsFree(dates.start, dates.end, blockedRanges(l)))),
    [dates, guests, nights],
  );
  const pins = list.map((l) => {
    const area = AREAS.find((item) => item.name === l.area);
    return { id: l.id, x: l.map[0], y: l.map[1], lat: area?.lat, lng: area?.lng, price: l.price, title: l.title, rating: l.rating, area: l.area, image: l.images[0], saved: saved.includes(l.id) };
  });

  const selectListing = (id) => {
    if (!id) {
      setSelected(null);
      return;
    }
    setSelected(id);
    window.requestAnimationFrame(() => {
      const card = [...document.querySelectorAll('[data-listing-card]')]
        .find((item) => item.dataset.listingCard === id);
      card?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    });
  };

  return (
    <main className="results">
      <div className="filterbar">
        <div className="wrap-wide fb-in">
          <div className="map-page-head">
            <h1 style={{ fontSize: 20 }}>Available apartments on the map</h1>
          </div>
          <div className="fbtns">
            <Popover label="Dates" value={dates.start && dates.end ? `${fmtShort(dates.start)} to ${fmtShort(dates.end)}` : ''} active={!!nights} title="Select dates">
              <DateRange start={dates.start} end={dates.end} onChange={setDates} months={2} />
            </Popover>
            <Popover label="Guests" value={guests > 1 ? `${guests}+` : ''} active={guests > 1} title="Guests">
              <div className="stepper-row">
                <div><b>Guests</b><span className="muted small-t">Minimum capacity</span></div>
                <div className="stepper">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Fewer guests"><Icon name="minus" size={14} /></button>
                  <span aria-live="polite">{guests}</span>
                  <button onClick={() => setGuests(Math.min(6, guests + 1))} disabled={guests >= 6} aria-label="More guests"><Icon name="plus" size={14} /></button>
                </div>
              </div>
            </Popover>
            <Link href="/apartments" className="fbtn"><Icon name="list" size={16} /> All apartments</Link>
          </div>
        </div>
      </div>

      <div className={`split v-${view}`}>
        <div className="s-list">
          <div className="s-head">
            <p role="status"><b>{list.length}</b> available {list.length === 1 ? 'apartment' : 'apartments'}{nights ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}</p>
          </div>
          {list.length === 0 ? (
            <div className="empty"><h3>No apartments available</h3><p className="muted">Try different dates or fewer guests.</p><button className="btn out" onClick={() => { setDates({ start: null, end: null }); setGuests(1); }}>Clear filters</button></div>
          ) : (
            <div className="l-cards one">{list.map((l) => <ListingCard key={l.id} l={l} nights={nights} active={hover === l.id || selected === l.id} onHover={setHover} onSelect={selectListing} disableNavigation />)}</div>
          )}
        </div>
        <div className="s-map"><MapView pins={pins} activeId={hover} selectedId={selected} onActive={setHover} onSelect={selectListing} /></div>
      </div>

      <button className="view-toggle" onClick={() => setView(view === 'map' ? 'list' : 'map')}>
        {view === 'map' ? <><Icon name="list" size={16} /> List</> : <><Icon name="map" size={16} /> Map</>}
      </button>
    </main>
  );
}
