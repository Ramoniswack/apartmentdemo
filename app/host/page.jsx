import Icon from '../../components/Icons';
import { Estimator, Dashboard, ApplyForm } from '../../components/HostClient';
import { img } from '../../lib/data';

export const metadata = { title: 'Host your apartment' };

const VALUES = [
  ['camera', 'Professional photos', 'We visit, photograph and write up your apartment so it looks its best.'],
  ['shield', 'Host protection', 'Property damage cover and verified guests on every reservation (sample terms).'],
  ['wallet', 'Simple payouts', 'Payouts land in your bank account the day after guests check in.'],
];
const STEPS = [
  ['Tell us about your apartment', 'Share the neighbourhood, bedrooms and a few phone photos.'],
  ['Photo visit and review', 'We visit, take professional photos and agree house rules with you.'],
  ['Publish and welcome guests', 'Go live, manage your calendar and reply to guests from your dashboard.'],
];

export default function Host() {
  return (
    <main>
      <section className="wrap-wide page-hero">
        <div className="banner tall">
          <img src={img('strip-banner')} alt="Apartment tower in Pokhara under a stormy evening sky" style={{ objectPosition: '60% 50%' }} />
          <div className="banner-in"><p className="eyebrow">Hosting</p><h1>Your apartment could<br />earn while you're away.</h1><a href="#estimate" className="btn brand">See what you could earn</a></div>
        </div>
      </section>

      <section className="wrap-wide sec">
        <div className="trust">{VALUES.map(([ic, t, d]) => <div key={t}><Icon name={ic} size={30} /><b>{t}</b><p className="muted">{d}</p></div>)}</div>
      </section>

      <section className="wrap-wide sec" id="estimate">
        <div className="sec-h"><div><h2>Estimate your earnings</h2><p className="muted">Adjust the details to see a rough monthly figure for your neighbourhood.</p></div></div>
        <Estimator />
      </section>

      <section className="wrap-wide sec">
        <div className="sec-h"><div><h2>Start in three steps</h2></div></div>
        <ol className="steps">{STEPS.map(([t, d], i) => <li key={t}><span>{i + 1}</span><b>{t}</b><p className="muted">{d}</p></li>)}</ol>
      </section>

      <section className="wrap-wide sec">
        <div className="sec-h"><div><h2>Everything in one dashboard</h2><p className="muted">Calendar, reservations, payouts and guest messages, simple enough to run from your phone.</p></div></div>
        <Dashboard />
      </section>

      <section className="wrap-wide sec" id="start">
        <div className="apply-wrap">
          <div><h2>Ready to host?</h2><p className="muted">Tell us a little and a Pokhara-based advisor will be in touch (demo form, nothing is sent).</p></div>
          <ApplyForm />
        </div>
      </section>
    </main>
  );
}
