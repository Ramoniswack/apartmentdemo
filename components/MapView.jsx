'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AREAS, img } from '../lib/data';
import { useApp } from './Providers';
import Icon, { Star } from './Icons';

// Illustrative map of Pokhara (no tiles are loaded). Positions are approximate.
const POIS = [
  { n: 'World Peace Pagoda', x: 27, y: 62 },
  { n: 'Davis Falls', x: 57, y: 66 },
  { n: 'Airport', x: 70, y: 58 },
];

export default function MapView({ pins = [], activeId = null, onActive, single = false, showAreas = true }) {
  const { fmt } = useApp();
  const [picked, setPicked] = useState(null);
  const sel = pins.find((p) => p.id === picked);

  return (
    <div className="map" role="group" aria-label="Illustrative map of Pokhara">
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
        <rect width="100" height="80" fill="#eceef1" />
        <path d="M0 0h100v16c-8-3-12 2-20-1s-12 3-20 0-10-4-18-1-12 3-20 0-14-1-22 1z" fill="#e2e5ea" />
        <path d="M0 6c10-4 14 2 22-2s14 3 24 0 12-4 22 0 14 2 32-1v8c-10-4-14 1-24-1s-12 3-22 0-12-3-22 0-14 0-22-1S6 12 0 12z" fill="#d3d8e0" opacity=".7" />
        <path d="M0 40c8-6 12-18 22-22 8-3 14 2 20 0s10-8 20-6 14 8 22 6 10-2 16 0v82H0z" fill="#e4e6ea" opacity=".6" />
        <path d="M18 36c3-7 14-9 22-5 6 3 11 8 8 14-2 5-9 7-16 5-8-2-17-5-14-14z" fill="#bcd2f7" stroke="#93b4f0" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <circle cx="31" cy="42" r="1.1" fill="#8a8f98" />
        <path d="M2 74c14-4 24-2 36-6s22-10 34-8 20 6 28 4" fill="none" stroke="#bcd2f7" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        <g fill="none" stroke="#fff" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path d="M8 34c12 2 20 4 38 6s28 0 48-4" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <path d="M48 30c2 10 0 18-2 28-1 6 0 10 2 16" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
          <path d="M48 44c10 0 20 1 30 8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M22 26c2-4 6-6 10-8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M10 30c-1-3-1-5 0-8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      <span className="map-lake">Phewa Lake</span>
      <span className="map-peaks">Annapurna range ▲ Machhapuchhre</span>

      {showAreas && !single && AREAS.map((a) => <span key={a.id} className="map-area" style={{ left: `${a.x}%`, top: `${a.y + 7}%` }}>{a.name}</span>)}
      {showAreas && !single && POIS.map((p) => <span key={p.n} className="map-poi" style={{ left: `${p.x}%`, top: `${p.y}%` }}><i />{p.n}</span>)}

      {pins.map((p) => (
        <button
          key={p.id}
          className={`pin${activeId === p.id || picked === p.id ? ' on' : ''}${p.saved ? ' saved' : ''}${single ? ' solo' : ''}`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          onMouseEnter={() => onActive?.(p.id)}
          onMouseLeave={() => onActive?.(null)}
          onClick={() => (single ? null : setPicked(picked === p.id ? null : p.id))}
          aria-label={`${p.title}, ${fmt(p.price)} per night`}
        >
          {single ? <Icon name="home" size={18} /> : fmt(p.price)}
        </button>
      ))}

      {sel && (
        <Link href={`/apartments/${sel.id}`} className="map-card">
          <img src={img(sel.image)} alt="" />
          <div>
            <b>{sel.title}</b>
            <span><Star size={12} /> {sel.rating.toFixed(2)} · {sel.area}</span>
            <span>{fmt(sel.price)} night</span>
          </div>
          <button className="icon-btn" onClick={(e) => { e.preventDefault(); setPicked(null); }} aria-label="Close"><Icon name="close" size={14} /></button>
        </Link>
      )}
      {single && <span className="map-solo-note">Exact location shared by the host</span>}
      <span className="map-caption">Illustrative map. Locations are approximate.</span>
    </div>
  );
}
