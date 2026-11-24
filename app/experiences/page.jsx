import Link from 'next/link';
import Icon, { Star } from '../../components/Icons';
import { EXPERIENCES, img } from '../../lib/data';

export const metadata = { title: 'Experiences in Pokhara' };

export default function Experiences() {
  return (
    <main>
      <section className="wrap-wide experience-list-section">
        <div className="sec-h experience-sec-h"><div><p className="eyebrow">Popular this week</p><h2>Local experiences, hosted by neighbours</h2><p className="muted">Sample experiences. Prices are per person.</p></div></div>
        <div className="exp-grid">
          {EXPERIENCES.map((e) => (
            <article key={e.id} className="exp">
              <div className="exp-img">
                <img src={img(e.img)} alt={e.title} loading="lazy" style={{ objectPosition: e.pos }} />
                {e.tag && <span className="lc-badge">{e.tag}</span>}
                {e.time && <span className="experience-time">{e.time}</span>}
              </div>
              <div className="lc-row"><b>{e.title}</b></div>
              <p className="muted">{e.area} · {e.dur}</p>
              <p className="exp-p"><span className="rate"><Star size={13} /> {e.rating.toFixed(2)}</span> · from <b>NPR {e.price.toLocaleString('en-IN')}</b> person</p>
              <Link href={`/apartments?area=${e.area}`} className="more">Stay nearby in {e.area} <Icon name="chevR" size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
