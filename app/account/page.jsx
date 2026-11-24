'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ListingCard from '../../components/ListingCard';
import Icon from '../../components/Icons';
import { useApp } from '../../components/Providers';
import { LISTINGS } from '../../lib/data';
import { Estimator, ApplyForm } from '../../components/HostClient';

const TABS = [
  ['profile', 'Profile', 'user'],
  ['trips', 'My trips', 'calendar'],
  ['saved', 'Saved apartments', 'heart'],
  ['messages', 'Messages', 'sparkle'],
  ['hosting', 'Host your apartment', 'key'],
];

export default function AccountPage() {
  const router = useRouter();
  const { loggedIn, saved } = useApp();
  const liked = LISTINGS.filter((listing) => saved.includes(listing.id));
  const [active, setActive] = useState('profile');
  const [username, setUsername] = useState('Guest');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (!loggedIn && localStorage.getItem('ps-auth') !== '1') router.replace('/login');
    const storedName = localStorage.getItem('ps-name');
    if (storedName) setUsername(storedName);
    setBirthday(localStorage.getItem('ps-birthday') || '');
    setPhone(localStorage.getItem('ps-phone') || '');
    setPhoto(localStorage.getItem('ps-photo') || '');
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (TABS.some(([id]) => id === tab)) setActive(tab);
  }, [loggedIn, router]);

  const selectTab = (tab) => {
    setActive(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  };

  const logout = () => {
    localStorage.removeItem('ps-auth');
    window.location.assign('/login');
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    const nextName = username.trim() || 'Guest';
    setUsername(nextName);
    localStorage.setItem('ps-name', nextName);
    localStorage.setItem('ps-birthday', birthday);
    localStorage.setItem('ps-phone', phone);
    if (photo) localStorage.setItem('ps-photo', photo);
    window.dispatchEvent(new Event('ps-profile-updated'));
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <main className="account-page">
      <section className="wrap-wide account-wrap">
        <div className="account-head">
          <div>
            <p className="eyebrow">My account</p>
            <h1>Welcome, {username}</h1>
            <p className="muted">Manage your stays, favourites and hosting from one place.</p>
          </div>
        </div>

        <div className="account-shell">
          <aside className="account-sidebar" aria-label="Account navigation">
            {TABS.map(([id, label, icon]) => (
              <button key={id} type="button" className={active === id ? 'active' : ''} onClick={() => selectTab(id)} aria-current={active === id ? 'page' : undefined}>
                <Icon name={icon} size={19} /> {label}
              </button>
            ))}
          </aside>

          <div className="account-content">
            {active === 'profile' && (
              <div className="profile-page">
                <div className="account-section-head"><div><p className="eyebrow">Personal details</p><h2>Profile</h2></div></div>
                <form className="profile-form" onSubmit={saveProfile}>
                  <div className="profile-photo-row">
                    <label className="profile-photo" aria-label="Change profile photo">
                      {photo ? <img src={photo} alt="Profile" /> : <Icon name="user" size={38} />}
                      <input type="file" accept="image/*" onChange={handlePhoto} />
                    </label>
                    <div><h3>Profile photo</h3><p className="muted">Choose a clear photo of yourself.</p><label className="profile-upload-link">Change photo<input type="file" accept="image/*" onChange={handlePhoto} /></label></div>
                  </div>
                  <label className="profile-field"><span>Username</span><input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your name" /></label>
                  <label className="profile-field"><span>Birthday</span><input type="date" value={birthday} onChange={(event) => setBirthday(event.target.value)} /></label>
                  <label className="profile-field"><span>Phone number</span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+977 98..." /></label>
                  <div className="profile-actions">
                    <button type="submit" className="btn brand">Save changes</button>
                    {profileSaved && <p className="ok" role="status">Profile updated.</p>}
                  </div>
                </form>
              </div>
            )}

            {active === 'trips' && (
              <div>
                <div className="account-section-head"><div><p className="eyebrow">Travel</p><h2>My trips</h2></div></div>
                <div className="account-empty"><Icon name="calendar" size={30} /><h2>No upcoming trips</h2><p className="muted">When you book an apartment, it will appear here.</p><Link href="/apartments" className="btn dark">Explore apartments</Link></div>
              </div>
            )}

            {active === 'saved' && (
              <div>
                <div className="account-section-head"><div><p className="eyebrow">Favourites</p><h2>Saved apartments</h2><p className="muted">{liked.length} saved</p></div></div>
                {liked.length ? <div className="account-grid">{liked.map((listing) => <ListingCard key={listing.id} l={listing} />)}</div> : (
                  <div className="account-empty"><Icon name="heart" size={30} /><h2>No liked places yet</h2><p className="muted">Browse apartments and tap the heart to save them here.</p><Link href="/apartments" className="btn dark">Browse apartments</Link></div>
                )}
              </div>
            )}

            {active === 'messages' && (
              <div>
                <div className="account-section-head"><div><p className="eyebrow">Inbox</p><h2>Messages</h2></div></div>
                <div className="account-empty"><Icon name="sparkle" size={30} /><h2>No messages yet</h2><p className="muted">Messages with hosts and guests will appear here.</p></div>
              </div>
            )}

            {active === 'hosting' && (
              <div className="hosting-dashboard">
                <div className="account-section-head hosting-head"><div><p className="eyebrow">Hosting</p><h2>Host your apartment</h2><p className="muted">Estimate your earnings and share a few details to get started.</p></div></div>
                <section className="host-account-section">
                  <h3>Estimate your earnings</h3>
                  <Estimator />
                </section>
                <section className="host-account-section apply-account">
                  <div><p className="eyebrow">Next step</p><h3>Start an application</h3><p className="muted">Add your contact details and neighbourhood. Nothing is submitted outside this demo.</p></div>
                  <ApplyForm />
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
