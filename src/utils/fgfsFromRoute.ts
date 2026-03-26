import type { LocationQueryValue } from 'vue-router';

/** Normalize `?fgfs=` (Vue Router may use `string | string[]`). */
export function fgfsHostFromQuery(fgfs: LocationQueryValue | LocationQueryValue[] | undefined): string {
  if (fgfs == null || fgfs === '') return '';
  const s = Array.isArray(fgfs) ? fgfs[0] : fgfs;
  return String(s ?? '').trim();
}
