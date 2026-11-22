'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../../components/Icons';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    localStorage.setItem('ps-auth', '1');
    setSubmitted(true);

    const redirect = new URLSearchParams(window.location.search).get('redirect');
    if (redirect && redirect.startsWith('/')) {
      window.setTimeout(() => window.location.assign(redirect), 450);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <Link href="/" className="login-back"><Icon name="chevL" size={18} /> Back to DemoStay</Link>

        <div className="login-heading">
          <p className="eyebrow">Welcome to DemoStay</p>
          <h1 id="login-title">{mode === 'login' ? 'Log in to continue' : 'Create your account'}</h1>
          <p>{mode === 'login' ? 'Welcome back. Enter your details to continue.' : 'Save stays, send offers and manage your trips.'}</p>
        </div>

        <div className="login-tabs" role="tablist" aria-label="Account action">
          <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'on' : ''} onClick={() => { setMode('login'); setSubmitted(false); }}>Log in</button>
          <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'on' : ''} onClick={() => { setMode('signup'); setSubmitted(false); }}>Sign up</button>
        </div>

        <form className="login-form" onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              <span>Full name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
          )}

          <label>
            <span>Email address</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
          </label>

          <label>
            <span>Password</span>
            <div className="password-field">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={6} required />
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </label>

          {mode === 'login' && (
            <div className="login-options">
              <label className="remember"><input type="checkbox" name="remember" /> <span>Remember me</span></label>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>
          )}

          <button type="submit" className="btn brand login-submit">{mode === 'login' ? 'Log in' : 'Create account'}</button>
          {submitted && <p className="login-success" role="status">Demo form submitted successfully.</p>}
        </form>

        <div className="login-divider"><span>or continue with</span></div>

        <div className="social-logins">
          <button type="button"><span className="google-mark">G</span> Google</button>
          <button type="button"><span className="apple-mark">●</span> Apple</button>
        </div>

        <p className="login-terms">By continuing, you agree to DemoStay's <Link href="/help">Terms</Link> and <Link href="/help">Privacy Policy</Link>.</p>
      </section>
    </main>
  );
}
