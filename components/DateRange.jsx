'use client';
import { useState } from 'react';
import Icon from './Icons';
import { MONTHS, startOfDay, toISO, fromISO, rangeIsFree, isBlockedDay } from '../lib/dates';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Month({ year, month, start, end, today, blocked, onPick }) {
  const first = new Date(year, month, 1);
  const lead = first.getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(<span key={`b${i}`} />);
  for (let d = 1; d <= count; d++) {
    const date = new Date(year, month, d);
    const iso = toISO(date);
    const past = date < today;
    const blk = isBlockedDay(iso, blocked);
    const isStart = iso === start;
    const isEnd = iso === end;
    const inR = start && end && iso > start && iso < end;
    const cls = ['day', isStart && 'start', isEnd && 'end', inR && 'mid', blk && 'blocked', iso === toISO(today) && 'today'].filter(Boolean).join(' ');
    cells.push(
      <button key={d} type="button" className={cls} disabled={past || (blk && !(start && !end && iso > start))} onClick={() => onPick(iso)} aria-label={`${d} ${MONTHS[month]} ${year}${blk ? ', unavailable' : ''}`} aria-pressed={isStart || isEnd}>
        {d}
      </button>,
    );
  }
  return (
    <div className="cal-month">
      <h4>{MONTHS[month]} {year}</h4>
      <div className="cal-dow">{DOW.map((x, i) => <span key={i}>{x}</span>)}</div>
      <div className="cal-grid">{cells}</div>
    </div>
  );
}

export default function DateRange({ start, end, onChange, blocked = [], months = 2 }) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => { const b = start ? fromISO(start) : today; return new Date(b.getFullYear(), b.getMonth(), 1); });

  const pick = (iso) => {
    if (!start || end || iso <= start) return onChange({ start: iso, end: null });
    if (!rangeIsFree(start, iso, blocked)) return isBlockedDay(iso, blocked) ? undefined : onChange({ start: iso, end: null });
    onChange({ start, end: iso });
  };
  const shift = (n) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const list = Array.from({ length: months }, (_, i) => new Date(view.getFullYear(), view.getMonth() + i, 1));

  return (
    <div className="cal">
      <button type="button" className="icon-btn cal-nav l" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month"><Icon name="chevL" size={16} /></button>
      <button type="button" className="icon-btn cal-nav r" onClick={() => shift(1)} aria-label="Next month"><Icon name="chevR" size={16} /></button>
      <div className={`cal-months m${months}`}>
        {list.map((m, i) => (
          <div key={`${m.getFullYear()}-${m.getMonth()}`} className={i > 0 ? 'cal-second' : ''}>
            <Month year={m.getFullYear()} month={m.getMonth()} start={start} end={end} today={today} blocked={blocked} onPick={pick} />
          </div>
        ))}
      </div>
      <div className="cal-foot">
        <span className="muted small-t">{!start ? 'Select your check-in date' : !end ? 'Select your check-out date' : 'Dates selected'}</span>
        {(start || end) && <button type="button" className="link-btn" onClick={() => onChange({ start: null, end: null })}>Clear dates</button>}
      </div>
    </div>
  );
}
