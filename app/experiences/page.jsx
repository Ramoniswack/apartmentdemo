import Link from 'next/link';
import Icon, { Star } from '../../components/Icons';
import { EXPERIENCES, img } from '../../lib/data';

export const metadata = { title: 'Experiences in Pokhara' };

export default function Experiences() {
  const featured = EXPERIENCES[0];
  const moreExperiences = EXPERIENCES.slice(1);

  // Split 12 tiles into three gallery clusters
  const clusterA = moreExperiences.slice(0, 5);   // bands 1–2
  const clusterB = moreExperiences.slice(5, 7);   // band 3
  const clusterC = moreExperiences.slice(7, 12);  // bands 4–5

  const renderTile = (e, globalIndex) => (
    <article key={e.id} className="experience-tile exp" data-index={globalIndex + 1}>
      <img src={img(e.img)} alt={e.title} loading="lazy" style={{ objectPosition: e.pos }} />
      <span className="experience-tile-shade" />
      <div className="experience-tile-top">
        {e.tag ? <span className="experience-tile-tag">{e.tag}</span> : <span />}
        {e.time && <span className="experience-tile-time">{e.time}</span>}
      </div>
      <div className="experience-tile-copy">
        <div className="experience-tile-meta">
          <span>{e.area} <i /> {e.dur}</span>
          <span className="experience-tile-rating"><Star size={13} /> {e.rating.toFixed(2)}</span>
        </div>
        <h3>{e.title}</h3>
        <div className="experience-tile-bottom">
          <p>· from <b>NPR {e.price.toLocaleString('en-IN')}</b> person</p>
          <Link href={`/apartments?area=${e.area}`}>Stay nearby in {e.area} <Icon name="chevR" size={14} /></Link>
        </div>
      </div>
    </article>
  );

  return (
    <main className="experiences-page">
      <section className="experience-hero">
        <div className="wrap-wide experience-hero-layout">
          <div className="experience-hero-copy">
            <p className="eyebrow">Pokhara, beyond the usual</p>
            <h1>Make room<br /><em>for wonder.</em></h1>
            <p>From early starts above the clouds to slow afternoons by the lake, find a local experience that stays with you.</p>
            <Link href="#experience-list" className="experience-explore-link">Explore local experiences <Icon name="arrow" size={17} /></Link>
            <div className="experience-hero-foot"><span>LOCAL HOSTS</span><i /> <span>MEMORABLE MOMENTS</span></div>
          </div>

          <article className="experience-feature">
            <img src={img(featured.img)} alt={featured.title} style={{ objectPosition: featured.pos }} fetchPriority="high" />
            <span className="experience-feature-shade" />
            <div className="experience-feature-top">
              <span className="experience-feature-count">A local favourite <i /> 01 / {String(EXPERIENCES.length).padStart(2, '0')}</span>
              <div className="experience-feature-tags">
                {featured.tag && <span>{featured.tag}</span>}
                {featured.time && <span>{featured.time}</span>}
              </div>
            </div>
            <div className="experience-feature-copy">
              <p>{featured.area} <i /> {featured.dur}</p>
              <h2>{featured.title}</h2>
              <div className="experience-feature-details">
                <span className="experience-feature-rating"><Star size={14} /> {featured.rating.toFixed(2)}</span>
                <span>from <b>NPR {featured.price.toLocaleString('en-IN')}</b> person</span>
              </div>
              <Link href={`/apartments?area=${featured.area}`} className="experience-feature-link">Stay nearby in {featured.area} <Icon name="arrow" size={16} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="experience-list-section" id="experience-list">

        {/* ── Intro header ── */}
        <div className="exp-intro-band">
          <div className="wrap-wide">
            <div className="experience-section-intro">
              <div>
                <p className="eyebrow">Popular this week</p>
                <h2>Local experiences,<br />hosted by neighbours</h2>
              </div>
              <p className="experience-section-note">Sample experiences. Prices are per person.</p>
            </div>
          </div>
        </div>

        {/* ── Cluster A: bands 1–2 (tiles 1–5) ── */}
        <div className="exp-cluster">
          <div className="wrap-wide">
            <div className="experience-mosaic experience-mosaic--a">
              {clusterA.map((e, i) => renderTile(e, i))}
            </div>
          </div>
        </div>

        {/* ── Breaker 1: typographic pull-quote ── */}
        <div className="exp-breaker exp-breaker--quote">
          <div className="wrap-wide exp-breaker-inner">
            <blockquote className="exp-pull-quote">
              <span className="exp-pull-mark" aria-hidden="true">"</span>
              Every experience is led by someone who calls Pokhara home.
              <span className="exp-pull-mark exp-pull-mark--close" aria-hidden="true">"</span>
            </blockquote>
            <div className="exp-breaker-stats">
              <div className="exp-stat"><b>13</b><span>experiences</span></div>
              <div className="exp-stat-sep" aria-hidden="true" />
              <div className="exp-stat"><b>4.93</b><span>avg rating</span></div>
              <div className="exp-stat-sep" aria-hidden="true" />
              <div className="exp-stat"><b>Local</b><span>hosts only</span></div>
            </div>
          </div>
        </div>

        {/* ── Cluster B: band 3 (tiles 6–7) — full-bleed tinted surface ── */}
        <div className="exp-cluster exp-cluster--tinted">
          <div className="exp-cluster-tint-bg" aria-hidden="true" />
          <div className="exp-cluster-label">
            <span className="eyebrow">In & around Sarangkot</span>
          </div>
          <div className="wrap-wide">
            <div className="experience-mosaic experience-mosaic--b">
              {clusterB.map((e, i) => renderTile(e, i + 5))}
            </div>
          </div>
        </div>

        {/* ── Breaker 2: minimal divider with area tags ── */}
        <div className="exp-breaker exp-breaker--divider">
          <div className="wrap-wide exp-breaker-divider-inner">
            <span className="exp-divider-line" aria-hidden="true" />
            <div className="exp-area-tags">
              {['Lakeside', 'Hemja', 'Damside', 'Sarangkot', 'Chhorepatan'].map(a => (
                <span key={a} className="exp-area-tag">{a}</span>
              ))}
            </div>
            <span className="exp-divider-line" aria-hidden="true" />
          </div>
        </div>

        {/* ── Cluster C: bands 4–5 (tiles 8–12) ── */}
        <div className="exp-cluster">
          <div className="wrap-wide">
            <div className="experience-mosaic experience-mosaic--c">
              {clusterC.map((e, i) => renderTile(e, i + 7))}
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
