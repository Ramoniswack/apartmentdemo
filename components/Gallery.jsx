'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icons';
import { img } from '../lib/data';

export default function Gallery({ l }) {
  const [open, setOpen] = useState(null);
  const [idx, setIdx] = useState(0);
  const strip = useRef(null);
  const n = l.images.length;
  const grid = l.images.slice(0, 5);

  const move = useCallback((d) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const key = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); };
    document.addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [open, move]);

  const onScroll = () => { const el = strip.current; if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth)); };

  return (
    <>
      <div className="gal">
        {grid.map((name, i) => (
          <button key={name} className={`gal-i i${i}`} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${n}`}>
            <img src={img(name)} alt={i === 0 ? `${l.title}, main photo` : `${l.title}, photo ${i + 1}`} style={{ objectPosition: l.pos[i] || '50% 50%' }} />
          </button>
        ))}
        <button className="gal-all" onClick={() => setOpen(0)}><Icon name="grid" size={16} /> Show all {n} photos</button>
      </div>

      <div className="gal-m">
        <div className="gal-strip" ref={strip} onScroll={onScroll}>
          {l.images.map((name, i) => (
            <button key={name} onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`}>
              <img src={img(name)} alt={i === 0 ? `${l.title}, main photo` : `${l.title}, photo ${i + 1}`} style={{ objectPosition: l.pos[i] || '50% 50%' }} />
            </button>
          ))}
        </div>
        <span className="gal-count">{idx + 1} / {n}</span>
      </div>

      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo gallery">
          <div className="lb-top">
            <button className="icon-btn" onClick={() => setOpen(null)} aria-label="Close gallery"><Icon name="close" size={20} /></button>
            <span>{open + 1} / {n}</span>
            <span />
          </div>
          <div className="lb-stage">
            <button className="lb-nav l" onClick={() => move(-1)} aria-label="Previous photo"><Icon name="chevL" size={22} /></button>
            <img src={img(l.images[open])} alt={`${l.title}, photo ${open + 1}`} />
            <button className="lb-nav r" onClick={() => move(1)} aria-label="Next photo"><Icon name="chevR" size={22} /></button>
          </div>
          <div className="lb-thumbs">
            {l.images.map((name, i) => (
              <button key={name} className={i === open ? 'on' : ''} onClick={() => setOpen(i)} aria-label={`Photo ${i + 1}`}><img src={img(name)} alt="" /></button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
