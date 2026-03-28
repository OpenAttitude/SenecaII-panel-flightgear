/** URL query `layout` — default is full instrument panel. */
export type PanelLayout = 'full' | 'sixpack';

export function panelLayoutFromQuery(query: Record<string, unknown>): PanelLayout {
  return query.layout === 'sixpack' ? 'sixpack' : 'full';
}
