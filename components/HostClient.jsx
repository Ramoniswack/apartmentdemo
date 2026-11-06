'use client';
import { useState } from 'react';
import Icon from './Icons';
import { useApp } from './Providers';
import { AREAS } from '../lib/data';

const BASE = { Lakeside: 8500, Damside: 7000, Chhorepatan: 6800, Sarangkot: 9500, Hemja: 9000 };
const MULT = { 1: 1, 2: 1.45, 3: 1.9 };

export function Estimator() {
  const { fmt } = useApp();
  const [area, setArea] = useState('Lakeside');
  const [beds, setBeds] = useState(2);
  const [nights, setNights] = useState(16);
  const rate = Math.round((BASE[area] * MULT[beds]) / 100) * 100;
  const earn = Math.round(rate * nights * 0.9);
  return (
    <div className="est">
      <div className="est-out">
        <p className="muted">Estimated monthly earnings</p>
        <div className="est-n" aria-live="polite">{fmt(earn)}</div>
        <p className="muted small-t">{nights} nights at about {fmt(rate)} per night, after a 10% host fee. Sample numbers, not a guarantee.</p>
      </div>
      <div className="est-in">
        <label className="fld">Neighbourhood<select value={area} onChange={(e) => setArea(e.target.value)}>{AREAS.map((a) => <option key={a.id}>{a.name}</option>)}</select></label>
        <div className="fld">Bedrooms
          <div className="chip-row">{[1, 2, 3].map((b) => <button key={b} className={`chipb${beds === b ? ' on' : ''}`} onClick={() => setBeds(b)} aria-pressed={beds === b}>{b === 3 ? '3+' : b}</button>)}</div>
        </div>
        <label className="fld">Booked nights per month: <b>{nights}</b><input type="range" min="4" max="28" value={nights} onChange={(e) => setNights(+e.target.value)} /></label>
      </div>
    </div>
  );
}

const DAYS = Array.from({ length: 14 }, (_, i) => i);
const BOOKED = [2, 3, 4, 8, 9, 10, 11];

export function Dashboard() {
  const { fmt } = useApp();
  const rows = [
    ['Marc L.', 'Annapurna View Apartment', '12 to 17 Nov', 'Confirmed', 57500],
    ['Priya S.', 'Annapurna View Apartment', '21 to 24 Nov', 'Pending', 34500],
    ['Tom H.', 'Annapurna View Apartment', '2 to 9 Dec', 'Confirmed', 80500],
  ];
  return (
    <div className="dash" aria-label="Sample host dashboard">
      <div className="dash-top"><b>Today</b><span className="chip-s">Sample dashboard</span></div>
      <div className="dash-tiles">
        {[['This month', fmt(184000)], ['Upcoming check-ins', '3'], ['Occupancy', '68%'], ['Rating', '4.93']].map(([a, b]) => <div key={a}><span className="muted small-t">{a}</span><b>{b}</b></div>)}
      </div>
      <div className="dash-cal" aria-hidden="true">{DAYS.map((d) => <i key={d} className={BOOKED.includes(d) ? 'bk' : ''}><small>{d + 1}</small></i>)}</div>
      <p className="muted small-t">Next 14 days · filled = booked</p>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Guest</th><th>Apartment</th><th>Dates</th><th>Status</th><th>Payout</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><span className={`st ${r[3].toLowerCase()}`}>{r[3]}</span></td><td>{fmt(r[4])}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

export function ApplyForm() {
  const [v, setV] = useState({ name: '', phone: '', area: 'Lakeside' });
  const [err, setErr] = useState({});
  const [ok, setOk] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!v.name.trim()) x.name = 'Please enter your name.';
    if (!/^[+\d][\d\s-]{6,}$/.test(v.phone.trim())) x.phone = 'Please enter a valid phone number.';
    setErr(x); setOk(!Object.keys(x).length);
  };
  return (
    <form className="apply" onSubmit={submit} noValidate>
      <label className="fld">Your name<input type="text" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />{err.name && <span className="err">{err.name}</span>}</label>
      <label className="fld">Phone<input type="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />{err.phone && <span className="err">{err.phone}</span>}</label>
      <label className="fld">Neighbourhood<select value={v.area} onChange={(e) => setV({ ...v, area: e.target.value })}>{AREAS.map((a) => <option key={a.id}>{a.name}</option>)}</select></label>
      <button className="btn brand" type="submit">Start your application</button>
      {ok && <p className="ok" role="status">Thank you. This is a demo, so nothing was sent.</p>}
    </form>
  );
}


