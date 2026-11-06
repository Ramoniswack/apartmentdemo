'use client';
import { useMemo } from 'react';
import Rail from './Rail';
import ListingCard from './ListingCard';
import { useApp } from './Providers';
import { LISTINGS } from '../lib/data';

// Personalised row: based on saved apartments when there are any, otherwise top-rated picks.
export default function Recommended() {
  const { saved } = useApp();
  const { title, sub, items } = useMemo(() => {
    const picked = LISTINGS.filter((l) => saved.includes(l.id));
    if (!picked.length) {
      return { title: 'Picked for you', sub: 'Our highest-rated apartments right now', items: [...LISTINGS].sort((a, b) => b.rating - a.rating) };
    }
    const cats = new Set(picked.flatMap((l) => l.cats));
    const areas = new Set(picked.map((l) => l.area));
    const score = (l) => l.cats.filter((c) => cats.has(c)).length + (areas.has(l.area) ? 2 : 0);
    const rest = LISTINGS.filter((l) => !saved.includes(l.id)).sort((a, b) => score(b) - score(a) || b.rating - a.rating);
    return { title: 'Because you saved ' + picked[0].title, sub: 'Similar views, neighbourhoods and amenities', items: rest };
  }, [saved]);

  return (
    <section className="sec">
      <div className="sec-h"><div><h2>{title}</h2><p className="muted">{sub}</p></div></div>
      <Rail>{items.map((l) => <div className="rail-i" key={l.id}><ListingCard l={l} /></div>)}</Rail>
    </section>
  );
}
