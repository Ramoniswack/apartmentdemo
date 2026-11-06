'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { USD_RATE } from '../lib/data';
import Icon from './Icons';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const safeGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export default function Providers({ children }) {
  const [cur, setCurState] = useState('NPR');
  const [saved, setSaved] = useState([]);
  const [picker, setPicker] = useState(false);

  useEffect(() => {
    const c = safeGet('ps-cur');
    if (c === 'USD' || c === 'NPR') setCurState(c);
    try { const s = JSON.parse(safeGet('ps-saved') || '[]'); if (Array.isArray(s)) setSaved(s); } catch { /* ignore */ }
  }, []);

  const setCur = useCallback((c) => { setCurState(c); safeSet('ps-cur', c); }, []);
  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      safeSet('ps-saved', JSON.stringify(next));
      return next;
    });
  }, []);

  const fmt = useCallback(
    (npr) => (cur === 'USD' ? `$${Math.round(npr / USD_RATE).toLocaleString('en-US')}` : `NPR ${Math.round(npr).toLocaleString('en-IN')}`),
    [cur],
  );

  const value = useMemo(() => ({ cur, setCur, fmt, saved, toggleSave, openPicker: () => setPicker(true) }), [cur, setCur, fmt, saved, toggleSave]);

  useEffect(() => {
    if (!picker) return;
    const onKey = (e) => e.key === 'Escape' && setPicker(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picker]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {picker && (
        <div className="modal-back" onClick={() => setPicker(false)}>
          <div className="modal-box small" role="dialog" aria-modal="true" aria-label="Language and currency" onClick={(e) => e.stopPropagation()}>
            <button className="icon-btn modal-x" onClick={() => setPicker(false)} aria-label="Close"><Icon name="close" size={18} /></button>
            <h2 className="modal-h">Language and currency</h2>
            <p className="muted small-t">Language</p>
            <div className="opt-grid">
              <button className="opt on" aria-pressed="true"><b>English</b><span>United States</span></button>
            </div>
            <p className="muted small-t" style={{ marginTop: 22 }}>Currency</p>
            <div className="opt-grid">
              {[['NPR', 'Nepalese rupee', 'NPR'], ['USD', 'US dollar', '$']].map(([c, n, s]) => (
                <button key={c} className={`opt${cur === c ? ' on' : ''}`} aria-pressed={cur === c} onClick={() => setCur(c)}>
                  <b>{n}</b><span>{c} · {s}</span>
                </button>
              ))}
            </div>
            <p className="muted small-t" style={{ marginTop: 18 }}>Sample rate: 1 USD = {USD_RATE} NPR. Only English is available in this demo.</p>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
