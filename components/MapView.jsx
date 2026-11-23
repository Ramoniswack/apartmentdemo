'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AREAS, img } from '../lib/data';
import { useApp } from './Providers';
import Icon, { Star } from './Icons';

export default function MapView({ pins = [], activeId = null, selectedId = null, onActive, onSelect, single = false, location = 'Pokhara, Nepal', title = 'Pokhara' }) {
  const { fmt } = useApp();
  const mapRef = useRef(null);
  const pinsRef = useRef(pins);
  const formatRef = useRef(fmt);
  const hoverRef = useRef(onActive);
  const selectRef = useRef(onSelect);
  const markersRef = useRef(new Map());
  const mapInstanceRef = useRef(null);
  const [picked, setPicked] = useState(null);
  const sel = pins.find((p) => p.id === picked);
  const mapQuery = encodeURIComponent(location);
  pinsRef.current = pins;
  formatRef.current = fmt;
  hoverRef.current = onActive;
  selectRef.current = onSelect;

  useEffect(() => {
    setPicked(selectedId);
    if (!selectedId || !mapInstanceRef.current) return;
    const pin = pinsRef.current.find((item) => item.id === selectedId);
    if (!pin) return;
    const area = AREAS.find((item) => item.name === pin.area);
    const hash = [...(pin.id || '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const lat = pin.lat ?? area?.lat ?? 28.2096;
    const lng = pin.lng ?? area?.lng ?? 83.9856;
    const position = single
      ? [lat, lng]
      : [lat + ((hash % 7) - 3) * 0.0012, lng + (((hash * 3) % 7) - 3) * 0.0015];
    mapInstanceRef.current.flyTo(position, 16, { duration: 0.8 });
  }, [selectedId]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const element = marker.getElement();
      element?.classList.toggle('is-active', id === selectedId || id === activeId);
    });
  }, [activeId, selectedId]);

  useEffect(() => {
    let cancelled = false;
    let map = null;
    let resizeTimer = null;
    import('leaflet').then((module) => {
      if (cancelled || !mapRef.current) return;
      const L = module.default;
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        preferCanvas: false,
        minZoom: 6,
        maxZoom: 18,
        maxBounds: [[26.3470, 80.0580], [30.4470, 88.2015]],
        maxBoundsViscosity: 1,
        worldCopyJump: false,
      }).setView(
        single && pinsRef.current[0]?.lat
          ? [pinsRef.current[0].lat, pinsRef.current[0].lng]
          : [28.2096, 83.9856],
        single ? 15 : 7,
      );
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      pinsRef.current.forEach((pin) => {
        const area = AREAS.find((item) => item.name === pin.area);
        const hash = [...(pin.id || '')].reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const lat = pin.lat ?? area?.lat ?? 28.2096;
        const lng = pin.lng ?? area?.lng ?? 83.9856;
        const spreadLat = single ? 0 : ((hash % 7) - 3) * 0.0012;
        const spreadLng = single ? 0 : (((hash * 3) % 7) - 3) * 0.0015;
        const position = [lat + spreadLat, lng + spreadLng];
        const label = single ? '' : formatRef.current(pin.price);
        const icon = L.divIcon({
          className: 'map-price-marker',
          html: single
            ? '<span class="map-home-marker"></span>'
            : `<span class="map-price-pill">${label}</span>`,
          iconSize: single ? [32, 32] : [100, 36],
          iconAnchor: single ? [16, 16] : [50, 18],
        });
        const marker = L.marker(position, { icon, title: pin.title }).addTo(map);
        markersRef.current.set(pin.id, marker);
        const markerElement = marker.getElement();
        markerElement?.classList.toggle('is-active', pin.id === selectedId || pin.id === activeId);
        marker.on('click', () => {
          setPicked(pin.id);
          selectRef.current?.(pin.id);
        });
        marker.on('mouseover', () => hoverRef.current?.(pin.id));
        marker.on('mouseout', () => hoverRef.current?.(null));
      });

      resizeTimer = window.setTimeout(() => {
        if (!cancelled && map) map.invalidateSize();
      }, 100);
    });
    return () => {
      cancelled = true;
      if (resizeTimer) window.clearTimeout(resizeTimer);
      markersRef.current.clear();
      if (map) {
        map.off();
        map.remove();
      }
      mapInstanceRef.current = null;
    };
  }, [single]);

  return (
    <div className="map" role="group" aria-label={`Google map of ${title}`}>
      <div ref={mapRef} className="interactive-map" />

      {sel && (
        <div className="map-card">
          <Link href={`/apartments/${sel.id}`} className="map-card-main">
            <img src={img(sel.image)} alt="" />
            <div>
              <b>{sel.title}</b>
              <span><Star size={12} /> {sel.rating.toFixed(2)} · {sel.area}</span>
              <span>{fmt(sel.price)} night</span>
            </div>
          </Link>
          <button className="map-card-close icon-btn" onClick={() => { setPicked(null); selectRef.current?.(null); }} aria-label="Close"><Icon name="close" size={14} /></button>
        </div>
      )}
      {single && <span className="map-solo-note">Exact location shared by the host</span>}
      <a
        className="map-caption"
        href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
