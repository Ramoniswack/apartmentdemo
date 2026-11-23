'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import { AREAS, byArea, img } from '../lib/data';

export default function NeighborhoodsClient() {
  const [open, setOpen] = useState(false);
  const [areas, setAreas] = useState([]);

  const visibleAreas = areas.length ? AREAS.filter((item) => areas.includes(item.name)) : AREAS;
  const toggleArea = (name) => setAreas((current) =>
    current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
  );

  return (
    <>
      <section className="wrap-wide sec">
        <div className="sec-h">
          <div>
            <h2>Explore Pokhara by neighbourhood</h2>
            <p className="muted">Different views, rhythms and ways to spend the day.</p>
          </div>
          <button
            type="button"
            className={`neighborhood-filter neighborhood-filter-dark${areas.length ? ' on' : ''}`}
            onClick={() => setOpen(true)}
            aria-label="Filter neighbourhoods"
          >
            <Icon name="sliders" size={16} />
            <span>Filter{areas.length ? ` · ${areas.length}` : ''}</span>
          </button>
        </div>
        {areas.length > 0 && (
          <div className="neighborhood-filter-chips">
            {areas.map((name) => (
              <div className="neighborhood-filter-chip" key={name}>
                <span><b>{name}</b></span>
                <button type="button" onClick={() => toggleArea(name)} aria-label={`Clear ${name} filter`}>
                  <Icon name="close" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="neighborhood-grid">
          {visibleAreas.map((item) => {
            const listings = byArea(item.name);
            return (
              <Link key={item.id} href={`/neighborhoods/${item.id}`} className="neighborhood-card">
                <div className="neighborhood-card-img">
                  <img src={img(item.img)} alt={`${item.name}, Pokhara`} loading="lazy" style={{ objectPosition: item.pos }} />
                  <span className="lc-badge">{listings.length} {listings.length === 1 ? 'stay' : 'stays'}</span>
                </div>
                <div className="neighborhood-card-body">
                  <div>
                    <b>{item.name}</b>
                    <p className="muted">{item.blurb}</p>
                  </div>
                  <Icon name="chevR" size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {open && (
        <div className="modal-back" onClick={() => setOpen(false)}>
          <div className="modal-box filters" role="dialog" aria-modal="true" aria-label="Neighbourhood filters" onClick={(event) => event.stopPropagation()}>
            <div className="modal-top">
              <button className="icon-btn" type="button" onClick={() => setOpen(false)} aria-label="Close">
                <Icon name="close" size={18} />
              </button>
              <b>Neighbourhood filters</b>
              <span />
            </div>
            <div className="modal-body" data-lenis-prevent>
              <section>
                <h3>Neighbourhood</h3>
                <div className="chip-row">
                  <button type="button" className={`chipb${!areas.length ? ' on' : ''}`} onClick={() => setAreas([])}>All places</button>
                  {AREAS.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`chipb${areas.includes(item.name) ? ' on' : ''}`}
                      onClick={() => toggleArea(item.name)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </section>
            </div>
            <div className="modal-foot">
              <button type="button" className="link-btn ul" onClick={() => setAreas([])}>Clear all</button>
              <button type="button" className="btn dark" onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
