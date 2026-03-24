/** URL segment for `/instrument/:instrumentId` — matches each instrument on the main panel. */
export const INSTRUMENT_IDS = [
  'clock',
  'asi',
  'attitude',
  'altimeter',
  'gps',
  'adf',
  'turn-coordinator',
  'hsi',
  'vsi',
  'ki209',
  'rpm-1',
  'rpm-2',
  'manifold',
  'fuel-flow',
  'egt-1',
  'egt-2',
  'gyro-pressure',
  'flap',
  'engine-left',
  'engine-right',
] as const;

export type InstrumentId = (typeof INSTRUMENT_IDS)[number];

export function isInstrumentId(id: string | undefined): id is InstrumentId {
  if (id == null) return false;
  return (INSTRUMENT_IDS as readonly string[]).includes(id);
}

export const WIDE_INSTRUMENT_IDS: ReadonlySet<InstrumentId> = new Set(['engine-left', 'engine-right']);
