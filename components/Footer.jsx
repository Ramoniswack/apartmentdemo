import Link from 'next/link';
import Icon, { LogoMark } from './Icons';
import { LangCurrencyButton, BackToTop } from './FooterClient';
import { BRAND } from '../lib/data';

const COLS = [
  { title: 'Explore', links: [['Apartments', '/apartments'], ['Map', '/map'], ['Experiences', '/experiences'], ['Neighbourhoods', '/#neighborhoods']] },
  { title: 'Hosting', links: [['List your apartment', '/host'], ['Earnings estimator', '/host'], ['Hosting standards', '/help'], ['Photo visit', '/host']] },
  { title: 'Support', links: [['Help Centre', '/help'], ['Safety information', '/help'], ['Cancellation options', '/help'], ['Contact', '/help']] },
];
const LEGAL = [['Privacy', '/help'], ['Terms', '/help'], ['Cookies', '/help'], ['Sitemap', '/help']];

export default function Footer() {
  return (
    <footer className="wrap-wide foot">
      <div className="foot-card">
        <div className="foot-cta">
          <div>
            <p className="eyebrow">Pokhara, Nepal</p>
            <h2>Your mountain view is waiting.</h2>
          </div>
          <div className="foot-cta-btns">
            <Link href="/apartments" className="btn brand">Browse apartments <Icon name="arrow" size={16} /></Link>
            <Link href="/host" className="btn ghost">Become a host</Link>
          </div>
        </div>

        <div className="foot-main">
          <div className="foot-brand">
            <Link href="/" className="foot-logo" aria-label={`${BRAND} home`}>
              <LogoMark size={30} />
              <span>{BRAND.toUpperCase()}</span>
            </Link>
            <p>Hand-picked apartments with Phewa Lake and Annapurna views, hosted by people who live in Pokhara.</p>
            <LangCurrencyButton />
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h4>{c.title}</h4>
              <ul>{c.links.map(([l, h]) => <li key={l}><Link href={h}>{l}</Link></li>)}</ul>
            </nav>
          ))}
        </div>

        <div className="foot-bottom">
          <span>© 2026 {BRAND}. All rights reserved.</span>
          <ul className="foot-legal">
            {LEGAL.map(([l, h]) => <li key={l}><Link href={h}>{l}</Link></li>)}
          </ul>
          <BackToTop />
        </div>
        <p className="foot-note">Demo website. Listings, prices, ratings and reviews are sample content to be replaced with real information.</p>
      </div>
    </footer>
  );
}
