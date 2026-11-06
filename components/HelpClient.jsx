'use client';
import { useMemo, useState } from 'react';
import Icon from './Icons';
import { HELP, HELP_CATS } from '../lib/data';

export default function HelpClient() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [sel, setSel] = useState(HELP[0].id);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return HELP.filter((a) => (!cat || a.cat === cat) && (!t || a.title.toLowerCase().includes(t) || a.body.join(' ').toLowerCase().includes(t)));
  }, [q, cat]);
  const art = HELP.find((a) => a.id === sel);
  const showing = list.some((a) => a.id === sel) ? art : list[0];

  return (
    <>
      <div className="help-hero">
        <h1>How can we help?</h1>
        <label className="help-search"><Icon name="search" size={20} /><span className="sr">Search help articles</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, e.g. cancellation, check-in, payments" />
        </label>
      </div>
      <div className="wrap help-grid">
        <aside className="help-side">
          <nav aria-label="Help categories">
            <button className={!cat ? 'on' : ''} onClick={() => setCat('')}>All topics</button>
            {HELP_CATS.map((c) => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </nav>
        </aside>
        <section className="help-list" aria-label="Articles">
          <p className="muted small-t" role="status">{list.length} article{list.length === 1 ? '' : 's'}</p>
          {list.map((a) => (
            <button key={a.id} className={`help-item${showing?.id === a.id ? ' on' : ''}`} onClick={() => setSel(a.id)}>
              <span>{a.cat}</span><b>{a.title}</b>
            </button>
          ))}
          {list.length === 0 && <p className="muted">No articles found. Try a different word.</p>}
        </section>
        <article className="help-art">
          {showing ? (
            <>
              <p className="muted small-t">{showing.cat}</p>
              <h2>{showing.title}</h2>
              {showing.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="note-s">Sample help content (placeholder). Replace with your real policies.</p>
            </>
          ) : <p className="muted">Select an article.</p>}
        </article>
      </div>
    </>
  );
}
