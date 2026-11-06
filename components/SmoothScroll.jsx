'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis smooth scrolling for the whole page. Skipped for reduced-motion users.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -100 } });
    window.__lenis = lenis;
    let raf;
    const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);
  return null;
}
