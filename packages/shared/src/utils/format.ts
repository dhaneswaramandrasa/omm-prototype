const INDONESIAN_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/**
 * Format integer Rupiah value with dot-separated thousands.
 * formatRupiah(50000000) → "Rp 50.000.000"
 */
export function formatRupiah(amount: number): string {
  const formatted = Math.floor(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}

/**
 * Format integer Rupiah value with short suffix (jt for juta/million, M for miliar/billion).
 * formatRupiahShort(4200000) → "Rp 4.2jt"
 * formatRupiahShort(1500000000) → "Rp 1.5M"
 */
export function formatRupiahShort(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1).replace('.', ',');
    return `Rp ${val}M`;
  }
  if (abs >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1).replace('.', ',');
    return `Rp ${val}jt`;
  }
  if (abs >= 1_000) {
    const val = (amount / 1_000).toFixed(1).replace('.', ',');
    return `Rp ${val}rb`;
  }
  return formatRupiah(amount);
}

/**
 * Format a Date (or ISO string) to Indonesian long format.
 * formatDate(new Date('2026-03-08')) → "8 Maret 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const month = INDONESIAN_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a decimal fraction as an Indonesian-style percentage string.
 * formatPercent(0.125) → "12,5%"
 */
export function formatPercent(value: number): string {
  const pct = value * 100;
  const fixed = pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1).replace('.', ',');
  return `${fixed}%`;
}

/**
 * Format total seconds into HH:MM:SS string.
 * formatTimer(5025) → "1:23:45"
 */
export function formatTimer(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return `${h}:${mm}:${ss}`;
}
