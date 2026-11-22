import {
  Search, Heart, Share2, Globe, Menu, User, ChevronLeft, ChevronRight, ChevronDown, X,
  SlidersHorizontal, Map, List, Wifi, UtensilsCrossed, Car, ArrowUpDown, WashingMachine, Tv,
  Laptop, Bath, Mountain, Waves, Sun, Leaf, Flame, Coffee, Zap, Check, ShieldCheck, MapPin,
  MessageSquareText, BedDouble, Users, House, Calendar, KeyRound, Award, Camera, Wallet,
  CirclePlay, Minus, Plus, LayoutGrid, ArrowRight, Info, Star as StarIcon,
} from 'lucide-react';

// Icon names used across the app mapped to lucide-react components.
// `sparkle` (AI search) intentionally maps to a plain chat icon, not a "magic" icon.
const MAP = {
  search: Search, heart: Heart, share: Share2, globe: Globe, menu: Menu, user: User,
  chevL: ChevronLeft, chevR: ChevronRight, chevD: ChevronDown, close: X,
  sliders: SlidersHorizontal, map: Map, list: List, wifi: Wifi, kitchen: UtensilsCrossed,
  car: Car, lift: ArrowUpDown, wash: WashingMachine, tv: Tv, desk: Laptop, bath: Bath,
  mountain: Mountain, wave: Waves, sun: Sun, leaf: Leaf, flame: Flame, coffee: Coffee,
  bolt: Zap, check: Check, shield: ShieldCheck, pin: MapPin, sparkle: MessageSquareText,
  bed: BedDouble, users: Users, home: House, calendar: Calendar, key: KeyRound,
  award: Award, camera: Camera, wallet: Wallet, play: CirclePlay, minus: Minus, plus: Plus,
  grid: LayoutGrid, arrow: ArrowRight, info: Info,
};

export default function Icon({ name, size = 20, fill = false, className = '', strokeWidth = 1.8, ...rest }) {
  const C = MAP[name] || Check;
  return (
    <C className={className} size={size} strokeWidth={strokeWidth} fill={fill ? 'currentColor' : 'none'} aria-hidden="true" focusable="false" {...rest} />
  );
}

export function Star({ size = 14 }) {
  return <StarIcon size={size} fill="currentColor" strokeWidth={0} aria-hidden="true" focusable="false" />;
}

export function LogoMark({ size = 42 }) {
  return <img className="logo-image" src="/images/demostay-logo-navbar.png" alt="" style={{ width: size * 4.2, height: size }} aria-hidden="true" />;
}
