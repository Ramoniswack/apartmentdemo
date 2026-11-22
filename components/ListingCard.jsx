'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon, { Star } from './Icons';
import { useApp } from './Providers';
import { img } from '../lib/data';

export default function ListingCard({ l, nights = 0, active = false, onHover }) {
  const { fmt, saved, toggleSave } = useApp();
  const [i, setI] = useState(0);
  const imgs = l.images.slice(0, 5);
  const isSaved = saved.includes(l.id);
  const step = (d) => (e) => { e.preventDefault(); e.stopPropagation(); setI((i + d + imgs.length) % imgs.length); };

  return (
    <article className={`lcard${active ? ' active' : ''}`} onMouseEnter={() => onHover?.(l.id)} onMouseLeave={() => onHover?.(null)}>
      <div className="lc-media">
        <Link href={`/apartments/${l.id}`} className="lc-link" aria-label={`${l.title}, ${l.area}`} />
        <div className="lc-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {imgs.map((n, k) => (
            <img key={n} src={img(n)} alt={k === 0 ? `${l.title} in ${l.area}, Pokhara` : ''} loading="lazy" style={{ objectPosition: l.pos[k] || '50% 50%' }} />
          ))}
        </div>
        {l.badge && <span className="lc-badge">{l.badge}</span>}
        <button className={`lc-heart${isSaved ? ' on' : ''}`} onClick={(e) => { e.preventDefault(); toggleSave(l.id); }} aria-pressed={isSaved} aria-label={isSaved ? 'Remove from saved' : 'Save apartment'}>
          <Icon name="heart" size={22} fill={isSaved} />
        </button>
        {imgs.length > 1 && (
          <>
            <button className="lc-arr l" onClick={step(-1)} aria-label="Previous photo"><Icon name="chevL" size={14} strokeWidth={2.4} /></button>
            <button className="lc-arr r" onClick={step(1)} aria-label="Next photo"><Icon name="chevR" size={14} strokeWidth={2.4} /></button>
            <div className="lc-dots" aria-hidden="true">{imgs.map((n, k) => <i key={n} className={k === i ? 'on' : ''} />)}</div>
          </>
        )}
      </div>
      <Link href={`/apartments/${l.id}`} className="lc-body">
        <div className="lc-location"><b>{l.type.replace('Entire apartment', 'Apartment').replace('Entire studio', 'Studio').replace('Entire loft', 'Loft').replace('Entire suite', 'Suite').replace('Entire villa', 'Villa')} in {l.area}</b><span className="rate"><Star size={13} /> {l.rating.toFixed(2)}</span></div>
        <p className="lc-title">{l.title}</p>
        <p className="lc-meta">{l.bedrooms === 1 ? '1 bedroom' : `${l.bedrooms} bedrooms`} · Up to {l.guests} guests</p>
        <p className="lc-price"><b>{fmt(l.price)}</b><span> / night</span>{nights > 0 ? <span className="muted mo">{fmt(l.price * nights)} total for {nights} nights</span> : null}</p>
      </Link>
    </article>
  );
}
