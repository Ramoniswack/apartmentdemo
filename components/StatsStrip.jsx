'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';

function KineticValue({ value, decimals = 0 }) {
  const text = Number(value).toFixed(decimals);
  return (
    <span className="stat-value" aria-label={text}>
      <span className="stat-odometer" aria-hidden="true">
        {text.split('').map((digit, index) => (
          digit === '.'
            ? <span className="stat-decimal" key={`${index}-dot`}>.</span>
            : (
            <span className="stat-digit" key={index}>
                <span className="stat-digit-strip" style={{ transform: `translateY(-${digit}em)` }}>
                  {Array.from({ length: 10 }, (_, number) => <span key={number}>{number}</span>)}
                </span>
              </span>
            )
        ))}
      </span>
    </span>
  );
}

export default function StatsStrip({ apartments, neighborhoods, rating, trust }) {
  const ref = useRef(null);
  const [values, setValues] = useState({ apartments: 0, neighborhoods: 0, rating: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let started = false;
    const targets = { apartments, neighborhoods, rating };
    const reveal = () => setValues(targets);

    if (!('IntersectionObserver' in window)) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        reveal();
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [apartments, neighborhoods, rating]);

  return (
    <div className="stats-strip" ref={ref} role="group" aria-label="DemoStay at a glance">
      <div className="stats-grid">
        <div className="stat-tile stat-light">
          <KineticValue value={values.apartments} />
          <span className="stat-label">Apartments</span>
        </div>
        <div className="stat-tile stat-blue">
          <KineticValue value={values.neighborhoods} />
          <span className="stat-label">Neighbourhoods</span>
        </div>
        <div className="stat-tile stat-navy">
          <KineticValue value={values.rating} decimals={2} />
          <span className="stat-label">Average guest rating</span>
        </div>
        <div className="stat-trust">
          {trust.map(([icon, title, description]) => (
          <div className="stat-trust-item" key={title}>
            <Icon name={icon} size={20} />
            <div><b>{title}</b><p>{description}</p></div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
