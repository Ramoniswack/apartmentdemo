'use client';
import { useState } from 'react';
import Icon, { Star } from './Icons';
import DateRange from './DateRange';
import { useApp } from './Providers';
import { PLANS, rateFor } from '../lib/data';
import { fmtShort, nightsBetween } from '../lib/dates';

// Nightly price and offer panel (demo: nothing is sent).
export default function BookingPanel({ l, dates, setDates, guests, setGuests, blocked }) {
  const { fmt } = useApp();
  const [cal, setCal] = useState(false);
  const [gOpen, setGOpen] = useState(false);
  const [mode, setMode] = useState('offer'); // 'offer' | 'inquiry'
  const [offer, setOffer] = useState(l.price);
  const [f, setF] = useState({ name: '', contact: '', msg: '' });
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(null);

  const P = PLANS[0];
  const price = rateFor(l, 'night');
  const nights = dates.start && dates.end ? nightsBetween(dates.start, dates.end) : 0;
  const units = nights;
  const stay = units * price;
  const service = Math.round(stay * 0.1);
  const total = stay + (units ? l.cleaning : 0) + service;
  const minOffer = Math.round((price * 0.6) / P.step) * P.step;
  const diff = Math.round(((price - offer) / price) * 100);
  const offerTotal = units ? units * offer + l.cleaning : 0;
  const unitLabel = (n) => (n === 1 ? P.unit : P.plural);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(''); };
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr('Please enter your name.');
    if (!f.contact.trim()) return setErr('Add a phone number or email so the host can reply.');
    if (mode === 'offer' && (!offer || offer < minOffer)) return setErr(`Offers start from ${fmt(minOffer)} per ${P.unit}.`);
    setSent({ mode, name: f.name.trim(), offer, units, unit: P.unit, plural: P.plural });
  };

  return (
    <div className="book" id="booking">
      <div className="book-price">
        <span><b>{fmt(price)}</b> <span className="muted">{P.unit}</span></span>
        <span className="rate"><Star size={13} /> {l.rating.toFixed(2)} · <a href="#reviews" className="ul">{l.reviews} reviews</a></span>
      </div>
      <p className="book-sub muted small-t">
        {fmt(l.cleaning)} one-time cleaning fee · <b className="brand-c">Offers welcome</b>
      </p>

      <div className="book-fields">
        <button className="bf" onClick={() => { setCal(!cal); setGOpen(false); }} aria-expanded={cal}>
          <small>Check-in</small><span>{dates.start ? fmtShort(dates.start) : 'Add date'}</span>
        </button>
        <button className="bf" onClick={() => { setCal(!cal); setGOpen(false); }} aria-expanded={cal}>
          <small>Check-out</small><span>{dates.end ? fmtShort(dates.end) : 'Add date'}</span>
        </button>
        <button className="bf wide" onClick={() => { setGOpen(!gOpen); setCal(false); }} aria-expanded={gOpen}>
          <small>Guests</small><span>{guests} guest{guests > 1 ? 's' : ''}</span><Icon name="chevD" size={16} />
        </button>
      </div>
      {cal && <div className="book-cal"><DateRange start={dates.start} end={dates.end} onChange={(d) => { setDates(d); setSent(null); }} blocked={blocked} months={1} /></div>}

      {gOpen && (
        <div className="book-g">
          <div><b>Guests</b><span className="muted small-t">Up to {l.guests} guests</span></div>
          <div className="stepper">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Fewer guests"><Icon name="minus" size={14} /></button>
            <span aria-live="polite">{guests}</span>
            <button onClick={() => setGuests(Math.min(l.guests, guests + 1))} disabled={guests >= l.guests} aria-label="More guests"><Icon name="plus" size={14} /></button>
          </div>
        </div>
      )}

      {units > 0 ? (
        <div className="sum">
          <div><span>{fmt(price)} × {units} {unitLabel(units)}</span><span>{fmt(stay)}</span></div>
          <div><span>Cleaning fee</span><span>{fmt(l.cleaning)}</span></div>
          <div><span>Service fee</span><span>{fmt(service)}</span></div>
          <div className="tot"><span>Asking total</span><span>{fmt(total)}</span></div>
        </div>
      ) : (
        <p className="center muted small-t" style={{ marginTop: 12 }}>Add dates to see the total price</p>
      )}
      <div className="deal">
        <div className="deal-tabs" role="tablist" aria-label="How would you like to proceed?">
          <button role="tab" aria-selected={mode === 'offer'} className={mode === 'offer' ? 'on' : ''} onClick={() => { setMode('offer'); setSent(null); }}>Make an offer</button>
          <button role="tab" aria-selected={mode === 'inquiry'} className={mode === 'inquiry' ? 'on' : ''} onClick={() => { setMode('inquiry'); setSent(null); }}>Ask the host</button>
        </div>

        {sent ? (
          <div className="ok" role="status">
            <b>{sent.mode === 'offer' ? 'Offer sent' : 'Message sent'}, {sent.name}.</b>{' '}
            {sent.mode === 'offer'
              ? `You offered ${fmt(sent.offer)} per ${sent.unit}${sent.units ? ` for ${sent.units} ${sent.units === 1 ? sent.unit : sent.plural}` : ''}. The host usually replies within a few hours.`
              : 'The host will get back to you with availability and details.'}
            <br /><span className="muted small-t">Demo only: nothing was actually sent.</span>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            {mode === 'offer' && (
              <div className="offer-box">
                <label htmlFor="offer-in">Your offer per {P.unit}</label>
                <div className="offer-row">
                  <button type="button" className="icon-btn" onClick={() => setOffer(Math.max(minOffer, offer - P.step))} aria-label="Lower offer"><Icon name="minus" size={14} /></button>
                  <input id="offer-in" type="number" inputMode="numeric" min={minOffer} step={P.step} value={offer} onChange={(e) => { setOffer(+e.target.value); setErr(''); }} />
                  <button type="button" className="icon-btn" onClick={() => setOffer(offer + P.step)} aria-label="Raise offer"><Icon name="plus" size={14} /></button>
                </div>
                <p className="small-t muted">
                  {diff > 0 ? <><b className="brand-c">{diff}% below</b> asking price</> : diff < 0 ? 'Above asking price' : 'Matches the asking price'}
                  {units > 0 ? <> · your total {fmt(offerTotal)}</> : null}
                </p>
              </div>
            )}
            <label className="fld"><span>Your name</span><input type="text" value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label className="fld"><span>Phone or email</span><input type="text" value={f.contact} onChange={set('contact')} autoComplete="email" /></label>
            <label className="fld"><span>Message (optional)</span><textarea rows={3} value={f.msg} onChange={set('msg')} placeholder={mode === 'offer' ? 'e.g. Looking for a one-year lease, can pay 3 months upfront' : 'Ask about availability, long stays or facilities'} /></label>
            {err && <p className="err" role="alert">{err}</p>}
            <button type="submit" className="btn brand block">{mode === 'offer' ? 'Send offer to host' : 'Send message'}</button>
            <p className="center muted small-t">No payment taken. You and the host agree the final price.</p>
          </form>
        )}
      </div>
    </div>
  );
}
