'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from './Icons';
import Popover from './Popover';
import DateRange from './DateRange';
import ListingCard from './ListingCard';
import Link from 'next/link';
import { useApp } from './Providers';
import { AMENITIES, AREAS, CATEGORIES, LISTINGS } from '../lib/data';
import { blockedRanges, fmtShort, nightsBetween, rangeIsFree } from '../lib/dates';

const MAXP = 20000;
const csv = (s) => (s ? s.split(',').filter(Boolean) : []);

function Results({ sp }) {
  const { fmt, saved } = useApp();
  const open = sp.get('open');

  const [q] = useState(sp.get('q') || '');
  const [area, setArea] = useState(sp.get('area') || '');
  const [cats, setCats] = useState(csv(sp.get('cat')));
  const [guests, setGuests] = useState(+sp.get('guests') || 1);
  const [beds, setBeds] = useState(+sp.get('beds') || 0);
  const [max, setMax] = useState(+sp.get('max') || MAXP);
  const [am, setAm] = useState(csv(sp.get('am')));
  const [dates, setDates] = useState({ start: sp.get('in'), end: sp.get('out') });
  const [sort, setSort] = useState('recommended');
  const [savedOnly, setSavedOnly] = useState(sp.get('saved') === '1');
  const [filters, setFilters] = useState(false);

  const nights = dates.start && dates.end ? nightsBetween(dates.start, dates.end) : 0;

  const list = useMemo(() => {
    let r = LISTINGS.filter((l) =>
      (!area || l.area === area) &&
      (!cats.length || cats.some((c) => l.cats.includes(c))) &&
      l.guests >= guests && l.bedrooms >= beds && l.price <= max &&
      am.every((a) => l.amenities.includes(a)) &&
      (!savedOnly || saved.includes(l.id)) &&
      (!nights || rangeIsFree(dates.start, dates.end, blockedRanges(l))));
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [area, cats, guests, beds, max, am, dates, nights, sort, savedOnly, saved]);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const activeCount = (area ? 1 : 0) + (beds ? 1 : 0) + am.length + (savedOnly ? 1 : 0);
  const clearAll = () => { setArea(''); setCats([]); setGuests(1); setBeds(0); setMax(MAXP); setAm([]); setDates({ start: null, end: null }); setSavedOnly(false); };

  const chips = [];
  if (area) chips.push([area, () => setArea('')]);
  cats.forEach((c) => chips.push([CATEGORIES.find((x) => x.id === c)?.label || c, () => setCats(cats.filter((x) => x !== c))]));
  if (guests > 1) chips.push([`${guests}+ guests`, () => setGuests(1)]);
  if (beds) chips.push([`${beds}+ bedrooms`, () => setBeds(0)]);
  if (max < MAXP) chips.push([`Under ${fmt(max)}`, () => setMax(MAXP)]);
  am.forEach((a) => chips.push([a, () => setAm(am.filter((x) => x !== a))]));
  if (savedOnly) chips.push(['Saved only', () => setSavedOnly(false)]);


  return (
    <main className="results">
      <div className="filterbar">
        <div className="wrap-wide fb-in">
          <div className="cats" role="tablist" aria-label="Categories">
            {CATEGORIES.map((c) => (
              <button key={c.id} role="tab" aria-selected={cats.includes(c.id)} className={`cat${cats.includes(c.id) ? ' on' : ''}`} onClick={() => toggle(cats, setCats, c.id)}>
                <Icon name={c.icon} size={22} /><span>{c.label}</span>
              </button>
            ))}
          </div>
          <div className="fbtns">
            <Popover label="Dates" value={dates.start && dates.end ? `${fmtShort(dates.start)} to ${fmtShort(dates.end)}` : ''} active={!!nights} defaultOpen={open === 'dates'} title="Select dates">
              <DateRange start={dates.start} end={dates.end} onChange={setDates} months={2} />
            </Popover>
            <Popover label="Guests" value={guests > 1 ? `${guests}+` : ''} active={guests > 1} defaultOpen={open === 'guests'} title="Guests">
              <div className="stepper-row">
                <div><b>Guests</b><span className="muted small-t">Minimum capacity</span></div>
                <div className="stepper">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Fewer guests"><Icon name="minus" size={14} /></button>
                  <span aria-live="polite">{guests}</span>
                  <button onClick={() => setGuests(Math.min(6, guests + 1))} disabled={guests >= 6} aria-label="More guests"><Icon name="plus" size={14} /></button>
                </div>
              </div>
            </Popover>
            <Popover label="Price" value={max < MAXP ? `up to ${fmt(max)}` : ''} active={max < MAXP} title="Price per night">
              <label className="range-l">Maximum per night: <b>{max >= MAXP ? 'Any' : fmt(max)}</b>
                <input type="range" min="4000" max={MAXP} step="500" value={max} onChange={(e) => setMax(+e.target.value)} />
              </label>
            </Popover>
            <button className={`fbtn${activeCount ? ' on' : ''}`} onClick={() => setFilters(true)}><Icon name="sliders" size={16} /> Filters{activeCount ? ` · ${activeCount}` : ''}</button>
          </div>
        </div>
      </div>

      <div className="wrap-wide">
        {(q || chips.length > 0) && (
          <div className="interp">
            {q && <span className="ai-tag"><Icon name="sparkle" size={14} /> AI search: “{q}”</span>}
            {chips.map(([t, f]) => <button key={t} className="chip-x" onClick={f}>{t} <Icon name="close" size={12} strokeWidth={2.4} /></button>)}
            {chips.length > 0 && <button className="link-btn ul" onClick={clearAll}>Clear all</button>}
          </div>
        )}
      </div>

      <div className="wrap-wide res-body">
        <div className="s-head">
          <p role="status"><b>{list.length}</b> {list.length === 1 ? 'apartment' : 'apartments'} in Pokhara{nights ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}</p>
          <div className="s-tools">
            <Link href="/map" className="btn out sm"><Icon name="map" size={16} /> View on map</Link>
            <label className="sort">Sort <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></label>
          </div>
        </div>
        {list.length === 0 ? (
          <div className="empty"><h3>No apartments match these filters</h3><p className="muted">Try removing a filter or changing your dates.</p><button className="btn out" onClick={clearAll}>Clear all filters</button></div>
        ) : (
          <div className="l-cards">{list.map((l) => <ListingCard key={l.id} l={l} nights={nights} />)}</div>
        )}
      </div>

      {filters && (
        <div className="modal-back" onClick={() => setFilters(false)}>
          <div className="modal-box filters" role="dialog" aria-modal="true" aria-label="Filters" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top"><button className="icon-btn" onClick={() => setFilters(false)} aria-label="Close"><Icon name="close" size={18} /></button><b>Filters</b><span /></div>
            <div className="modal-body" data-lenis-prevent>
              <section><h3>Neighbourhood</h3>
                <div className="chip-row">
                  <button className={`chipb${!area ? ' on' : ''}`} onClick={() => setArea('')}>Anywhere</button>
                  {AREAS.map((a) => <button key={a.id} className={`chipb${area === a.name ? ' on' : ''}`} onClick={() => setArea(a.name)}>{a.name}</button>)}
                </div>
              </section>
              <section><h3>Bedrooms</h3>
                <div className="chip-row">{[[0, 'Any'], [1, '1+'], [2, '2+'], [3, '3+']].map(([v, t]) => <button key={v} className={`chipb${beds === v ? ' on' : ''}`} onClick={() => setBeds(v)}>{t}</button>)}</div>
              </section>
              <section><h3>Amenities</h3>
                <div className="am-pick">
                  {AMENITIES.map((a) => (
                    <label key={a.name} className={am.includes(a.name) ? 'on' : ''}><input type="checkbox" checked={am.includes(a.name)} onChange={() => toggle(am, setAm, a.name)} /><Icon name={a.icon} size={18} /> {a.name}</label>
                  ))}
                </div>
              </section>
              <section><h3>Saved</h3>
                <label className="am-pick-one"><input type="checkbox" checked={savedOnly} onChange={() => setSavedOnly(!savedOnly)} /> Show only my saved apartments ({saved.length})</label>
              </section>
            </div>
            <div className="modal-foot"><button className="link-btn ul" onClick={clearAll}>Clear all</button><button className="btn dark" onClick={() => setFilters(false)}>Show {list.length} apartment{list.length === 1 ? '' : 's'}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}

// Remount when the URL query changes so links such as /apartments?cat=lake
// re-apply their filters even if this page is already open.
export default function ApartmentsClient() {
  const sp = useSearchParams();
  return <Results key={sp.toString()} sp={sp} />;
}
