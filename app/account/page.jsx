'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ListingCard from '../../components/ListingCard';
import Icon from '../../components/Icons';
import { useApp } from '../../components/Providers';
import { LISTINGS } from '../../lib/data';

export default function AccountPage() {
  const router = useRouter();
  const { loggedIn, saved } = useApp();
  const liked = LISTINGS.filter((listing) => saved.includes(listing.id));

  useEffect(() => {
    if (!loggedIn && localStorage.getItem('ps-auth') !== '1') router.replace('/login');
  }, [loggedIn, router]);

  const logout = () => {
    localStorage.removeItem('ps-auth');
    window.location.assign('/login');
  };

  return (
    <main className="account-page">
      <section className="wrap-wide sec">
        <div className="account-head">
          <div>
            <p className="eyebrow">My account</p>
            <h1>Places I liked</h1>
            <p className="muted">{liked.length} {liked.length === 1 ? 'apartment' : 'apartments'} saved</p>
          </div>
          <button type="button" className="btn out" onClick={logout}><Icon name="user" size={16} /> Log out</button>
        </div>

        {liked.length ? (
          <div className="account-grid">
            {liked.map((listing) => <ListingCard key={listing.id} l={listing} />)}
          </div>
        ) : (
          <div className="account-empty">
            <Icon name="heart" size={30} />
            <h2>No liked places yet</h2>
            <p className="muted">Browse apartments and tap the heart to save them here.</p>
            <Link href="/apartments" className="btn dark">Browse apartments</Link>
          </div>
        )}
      </section>
    </main>
  );
}
