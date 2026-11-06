'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';

// A filter button with a dropdown on desktop and a bottom sheet on mobile.
export default function Popover({ label, value, active, children, defaultOpen = false, align = 'right', title }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [open]);

  return (
    <div className="pop" ref={ref}>
      <button className={`fbtn${active ? ' on' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
        {label}{value ? <b>: {value}</b> : null} <Icon name="chevD" size={14} />
      </button>
      {open && <div className="pop-back" onClick={() => setOpen(false)} />}
      {open && (
        <div className={`pop-panel ${align}`} data-lenis-prevent role="dialog" aria-label={title || label}>
          <div className="menu-grab" aria-hidden="true" />
          <div className="pop-head"><b>{title || label}</b><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close"><Icon name="close" size={16} /></button></div>
          {children}
        </div>
      )}
    </div>
  );
}
