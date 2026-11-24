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
  { href: '/neighborhoods', label: 'Neighborhoods', icon: 'pin' },
];

export default function Header() {
  const path = usePathname();
  const { cur, saved, loggedIn, openPicker } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mnav, setMnav] = useState(false);
  const [photo, setPhoto] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const loadPhoto = () => setPhoto(localStorage.getItem('ps-photo') || '');
    loadPhoto();
    window.addEventListener('ps-profile-updated', loadPhoto);
    return () => window.removeEventListener('ps-profile-updated', loadPhoto);
  }, []);

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

  const isActive = (h) => (h === '/apartments' ? path.startsWith('/apartments') : h === '/experiences' ? path === '/experiences' : h === '/neighborhoods' ? path.startsWith('/neighborhoods') : false);

  return (
    <header className={`hdr${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap-wide hdr-top">
        <Link href="/" className="logo" aria-label={`${BRAND} home`}>
          <LogoMark />
        </Link>

        <nav className="hdr-nav" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`nav-tab${isActive(n.href) ? ' on' : ''}`}>
              <Icon name={n.icon} size={18} /> {n.label}
            </Link>
          ))}
        </nav>

        <div className="hdr-right">
          <button className="icon-btn round" onClick={openPicker} aria-label={`Language and currency, ${cur}`}><Icon name="globe" size={18} /></button>
          <button className="hamburger" onClick={() => setMnav(true)} aria-label="Open navigation" aria-expanded={mnav} aria-controls="mobile-nav"><Icon name="menu" size={24} /></button>
          <div className="acct" ref={menuRef}>
            <div className="acct-btn">
              <Link href={loggedIn ? '/account' : '/login'} className="avatar" aria-label={loggedIn ? 'Open account page' : 'Log in or create an account'}>
                {photo ? <img src={photo} alt="" /> : <Icon name="user" size={16} />}
              </Link>
              <button type="button" className="acct-menu-btn" onClick={() => setMenu((value) => !value)} aria-label="Open account menu" aria-expanded={menu}>
                <Icon name="menu" size={18} />
              </button>
              {saved.length > 0 && <b className="dot" aria-label={`${saved.length} saved`} />}
            </div>
            {menu && <div className="menu-back" onClick={() => setMenu(false)} />}
            {menu && (
              <div className="menu" role="menu">
                <div className="menu-grab" aria-hidden="true" />
                <div className="menu-mobile-nav">
                  {NAV.map((n) => <Link key={n.href} href={n.href} role="menuitem"><Icon name={n.icon} size={18} /> {n.label}</Link>)}
                  <hr />
                </div>
                {loggedIn ? (
                  <>
                    <Link href="/account?tab=saved" role="menuitem"><Icon name="heart" size={20} /> Wishlists{saved.length ? ` (${saved.length})` : ''}</Link>
                    <Link href="/account?tab=trips" role="menuitem"><Icon name="calendar" size={20} /> Trips</Link>
                    <Link href="/account?tab=messages" role="menuitem"><Icon name="sparkle" size={20} /> Messages</Link>
                    <Link href="/account?tab=profile" role="menuitem"><Icon name="user" size={20} /> Profile</Link>
                    <hr />
                    <button type="button" role="menuitem" onClick={() => setMenu(false)}><Icon name="bell" size={20} /> Notifications</button>
                    <Link href="/account" role="menuitem"><Icon name="sliders" size={20} /> Account settings</Link>
                    <button type="button" role="menuitem" onClick={() => { setMenu(false); openPicker(); }}><Icon name="globe" size={20} /> Languages & currency</button>
                    <Link href="/help" role="menuitem"><Icon name="info" size={20} /> Help Center</Link>
                  </>
                ) : (
                  <>
                    <Link href="/apartments?saved=1" role="menuitem"><Icon name="heart" size={20} /> Wishlists</Link>
                    <Link href="/login" role="menuitem"><Icon name="calendar" size={20} /> Trips</Link>
                    <Link href="/login" role="menuitem"><Icon name="sparkle" size={20} /> Messages</Link>
                    <Link href="/login" role="menuitem"><Icon name="user" size={20} /> Log in or sign up</Link>
                    <hr />
                    <button type="button" role="menuitem" onClick={() => { setMenu(false); openPicker(); }}><Icon name="globe" size={20} /> Languages & currency</button>
                    <Link href="/help" role="menuitem"><Icon name="info" size={20} /> Help Center</Link>
                  </>
                )}
                <hr />
                {loggedIn && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      localStorage.removeItem('ps-auth');
                      window.location.assign('/login');
                    }}
                  >
                    <Icon name="user" size={20} /> Log out
                  </button>
                )}
                <Link href="/account?tab=hosting" role="menuitem" className="menu-host"><Icon name="key" size={20} /> <span><b>Become a host</b><small>It&apos;s easy to start hosting and earn extra income.</small></span></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {path !== '/' && path !== '/login' && path !== '/account' && <div className="wrap-wide hdr-search">
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
            <Link href="/" className="logo" aria-label={`${BRAND} home`}><LogoMark /></Link>
            <button className="hamburger" onClick={() => setMnav(false)} aria-label="Close navigation"><Icon name="close" size={24} /></button>
          </div>
          <nav className="mnav-links" aria-label="Mobile">
            {NAV.map((n) => <Link key={n.href} href={n.href} className={isActive(n.href) ? 'on' : ''}><Icon name={n.icon} size={20} /> {n.label}</Link>)}
            <Link href={loggedIn ? '/account' : '/apartments?saved=1'}><Icon name="heart" size={20} /> Saved apartments{saved.length ? ` (${saved.length})` : ''}</Link>
            <Link href={loggedIn ? '/account' : '/login'}><Icon name="user" size={20} /> {loggedIn ? 'My account' : 'Log in or sign up'}</Link>
            <Link href="/help"><Icon name="info" size={20} /> Help Centre</Link>
            {loggedIn && <button type="button" className="mnav-logout" onClick={() => { localStorage.removeItem('ps-auth'); window.location.assign('/login'); }}><Icon name="user" size={20} /> Log out</button>}
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
