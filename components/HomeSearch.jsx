'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DateRange from './DateRange';
import Icon from './Icons';
import Popover from './Popover';
import { fmtShort } from '../lib/dates';

export default function HomeSearch() {
  const router = useRouter();
  const [dates, setDates] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const dateLabel = dates.start && dates.end
    ? `${fmtShort(dates.start)} – ${fmtShort(dates.end)}`
    : dates.start ? `${fmtShort(dates.start)} – Add checkout` : 'Add dates';
  const guestLabel = guests > 1 ? `${guests} guests` : 'Add guests';

  const search = () => {
    const params = new URLSearchParams();
    if (dates.start && dates.end) {
      params.set('in', dates.start);
      params.set('out', dates.end);
    }
    if (guests > 1) params.set('guests', String(guests));
    const query = params.toString();
    router.push(query ? `/apartments?${query}` : '/apartments');
  };

  return (
    <div className="glass-search home-search">
      <details className="glass-search-disclosure">
        <summary className="search-summary">
          <span>{dateLabel} · {guestLabel}</span>
          <span className="search-summary-button"><Icon name="search" size={19} strokeWidth={2.4} /></span>
        </summary>
      </details>
      <div className="glass-search-fields home-search-fields" role="search" aria-label="Search stays">
        <Link href="/apartments" className="gs-seg"><small>Where</small><span>Search neighbourhoods</span></Link>
        <Popover
          label={<span className="home-search-label"><small>When</small><span>{dateLabel}</span></span>}
          active={!!(dates.start && dates.end)}
          title="Select dates"
          align="left"
        >
          <DateRange start={dates.start} end={dates.end} onChange={setDates} months={2} />
        </Popover>
        <Popover
          label={<span className="home-search-label"><small>Who</small><span>{guestLabel}</span></span>}
          active={guests > 1}
          title="Guests"
          align="right"
        >
          <div className="stepper-row">
            <div><b>Guests</b><span className="muted small-t">Minimum capacity</span></div>
            <div className="stepper">
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="Fewer guests"><Icon name="minus" size={14} /></button>
              <span aria-live="polite">{guests}</span>
              <button type="button" onClick={() => setGuests(Math.min(6, guests + 1))} disabled={guests >= 6} aria-label="More guests"><Icon name="plus" size={14} /></button>
            </div>
          </div>
        </Popover>
        <button type="button" className="gs-go" onClick={search} aria-label="Search"><Icon name="search" size={20} strokeWidth={2.4} /></button>
      </div>
    </div>
  );
}
