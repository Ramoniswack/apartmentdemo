'use client';
import Icon from './Icons';
import { useApp } from './Providers';

export function LangCurrencyButton({ className = 'foot-pill' }) {
  const { cur, openPicker } = useApp();
  return (
    <button className={className} onClick={openPicker}>
      <Icon name="globe" size={15} /> English · {cur === 'USD' ? '$ USD' : 'NPR'}
    </button>
  );
}

export function BackToTop({ className = 'foot-top' }) {
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <button className={className} onClick={toTop} aria-label="Back to top"><Icon name="arrow" size={18} className="up" /></button>;
}
