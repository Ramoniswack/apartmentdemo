'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { LogoMark } from './Icons';
import { useApp } from './Providers';
import { BRAND } from '../lib/data';

const NAV = [
  { href: '/apartments', label: 'Apartments', icon: 'home' },
  { href: '/map', label: 'Map', icon: 'map' },
  { href: '/experiences', label: 'Experiences', icon: 'sun' },
  { href: '/#neighborhoods', label: 'Neighborhoods', icon: 'pin' },
];

export default function Header() {
  const path = usePathname();
  const { cur, saved, openPicker } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mnav, setMnav] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    if (!menu) return;
    const down = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    const key = (e) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [menu]);

  useEffect(() => { setMnav(false); }, [path]);
  useEffect(() => {
    document.documentElement.style.overflow = mnav ? 'hidden' : '';
    const key = (e) => e.key === 'Escape' && setMnav(false);
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.documentElement.style.overflow = ''; };
  }, [mnav]);

  const isActive = (h) => (h === '/apartments' ? path.startsWith('/apartments') : h === '/experiences' ? path === '/experiences' : false);

  return (
    <header className={`hdr${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap-wide hdr-top">
        <Link href="/" className="logo" aria-label={`${BRAND} home`}>
          <LogoMark />
          <span className="logo-t">{BRAND.toUpperCase()}</span>
        </Link>

        <nav className="hdr-nav" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`nav-tab${isActive(n.href) ? ' on' : ''}`}>
              <Icon name={n.icon} size={18} /> {n.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-right">
          <Link href="/host" className="host-link">Host your apartment</Link>
          <button className="icon-btn round" onClick={openPicker} aria-label={`Language and currency, ${cur}`}><Icon name="globe" size={18} /></button>
          <button className="hamburger" onClick={() => setMnav(true)} aria-label="Open navigation" aria-expanded={mnav} aria-controls="mobile-nav"><Icon name="menu" size={24} /></button>
          <div className="acct" ref={menuRef}>
            <button className="acct-btn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-haspopup="menu" aria-label="Menu">
              <Icon name="menu" size={18} />
              <span className="avatar"><Icon name="user" size={16} /></span>
              {saved.length > 0 && <b className="dot" aria-label={`${saved.length} saved`} />}
            </button>
            {menu && <div className="menu-back" onClick={() => setMenu(false)} />}
            {menu && (
              <div className="menu" role="menu">
                <div className="menu-grab" aria-hidden="true" />
                <div className="menu-mobile-nav">
                  {NAV.map((n) => <Link key={n.href} href={n.href} role="menuitem"><Icon name={n.icon} size={18} /> {n.label}</Link>)}
                  <hr />
                </div>
                <Link href="/apartments?saved=1" role="menuitem"><Icon name="heart" size={18} /> Saved apartments{saved.length ? ` (${saved.length})` : ''}</Link>
                <Link href="/host" role="menuitem"><Icon name="key" size={18} /> Host your apartment</Link>
                <Link href="/help" role="menuitem"><Icon name="info" size={18} /> Help Centre</Link>
                <hr />
                <button role="menuitem" onClick={() => { setMenu(false); openPicker(); }}><Icon name="globe" size={18} /> Language and currency · {cur}</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {path !== '/' && <div className="wrap-wide hdr-search">
        <div className="pill" role="search">
          <Link href="/apartments" className="seg"><small>Where</small><span>Search neighbourhoods</span></Link>
          <Link href="/apartments?open=dates" className="seg"><small>When</small><span>Add dates</span></Link>
          <Link href="/apartments?open=guests" className="seg"><small>Who</small><span>Add guests</span></Link>
          <Link href="/apartments" className="pill-go" aria-label="Search"><Icon name="search" size={18} strokeWidth={2.4} /></Link>
        </div>
      </div>}
      {mnav && (
        <div className="mnav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation" data-lenis-prevent>
          <div className="mnav-top">
            <Link href="/" className="logo" aria-label={`${BRAND} home`}><LogoMark /><span className="logo-t">{BRAND.toUpperCase()}</span></Link>
            <button className="hamburger" onClick={() => setMnav(false)} aria-label="Close navigation"><Icon name="close" size={24} /></button>
          </div>
          <nav className="mnav-links" aria-label="Mobile">
            {NAV.map((n) => <Link key={n.href} href={n.href} className={isActive(n.href) ? 'on' : ''}><Icon name={n.icon} size={20} /> {n.label}</Link>)}
            <Link href="/apartments?saved=1"><Icon name="heart" size={20} /> Saved apartments{saved.length ? ` (${saved.length})` : ''}</Link>
            <Link href="/host"><Icon name="key" size={20} /> Host your apartment</Link>
            <Link href="/help"><Icon name="info" size={20} /> Help Centre</Link>
          </nav>
          <div className="mnav-foot">
            <Link href="/apartments" className="btn brand block"><Icon name="search" size={18} /> Search apartments</Link>
            <button className="link-btn" onClick={() => { setMnav(false); openPicker(); }}><Icon name="globe" size={16} /> Language and currency · {cur}</button>
          </div>
        </div>
      )}
    </header>
  );
}
