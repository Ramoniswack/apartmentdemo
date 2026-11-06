'use client';
import { useRef } from 'react';
import Icon from './Icons';

// Horizontal scroll-snap row with arrow buttons (desktop) and touch scroll (mobile).
export default function Rail({ children, className = '' }) {
  const ref = useRef(null);
  const go = (d) => { const el = ref.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.85, behavior: 'smooth' }); };
  return (
    <div className="rail-wrap">
      <button className="rail-btn l" onClick={() => go(-1)} aria-label="Scroll left"><Icon name="chevL" size={16} /></button>
      <div className={`rail ${className}`} ref={ref}>{children}</div>
      <button className="rail-btn r" onClick={() => go(1)} aria-label="Scroll right"><Icon name="chevR" size={16} /></button>
    </div>
  );
}
