'use client';
import { useMemo } from 'react';
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
    <section className="home-recommendations">
      <div className="home-section-heading">
        <div><p className="eyebrow">Picked for your next stay</p><h2>{title}</h2></div>
        <p className="home-section-description">{sub}</p>
      </div>
      <div className="recommended-grid">
        {items.slice(0, 4).map((l) => <ListingCard key={l.id} l={l} cardClassName="lcard--horizontal" />)}
      </div>
    </section>
  );
}
