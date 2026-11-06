const pad = (n) => String(n).padStart(2, '0');
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return startOfDay(x); };
export const nightsBetween = (a, b) => Math.round((fromISO(b) - fromISO(a)) / 86400000);
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtShort = (s) => { if (!s) return ''; const d = fromISO(s); return `${d.getDate()} ${MON[d.getMonth()]}`; };

// Convert a listing's relative blocked offsets into ISO ranges (inclusive nights).
export function blockedRanges(listing, today = startOfDay(new Date())) {
  return (listing.blocked || []).map(([a, b]) => [toISO(addDays(today, a)), toISO(addDays(today, b))]);
}
export const isBlockedDay = (iso, ranges) => ranges.some(([a, b]) => iso >= a && iso <= b);
// A stay occupies nights start .. end-1.
export function rangeIsFree(start, end, ranges) {
  for (let d = fromISO(start); toISO(d) < end; d = addDays(d, 1)) if (isBlockedDay(toISO(d), ranges)) return false;
  return true;
}
