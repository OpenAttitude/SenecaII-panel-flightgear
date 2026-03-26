/** Vite testbed dev servers (run from the `library/` instruments monorepo). */
export interface TestbedEntry {
  /** Short label for lists. */
  title: string;
  /** Dev server port. */
  port: number;
  /** npm package / workspace name, e.g. @openattitude/steam-clock-generic */
  packageName: string;
}

export const TESTBED_ENTRIES: TestbedEntry[] = [
  { title: 'Airspeed indicator', port: 5175, packageName: '@openattitude/steam-airspeedindicator-senecaii' },
  { title: 'Altimeter (20k ft)', port: 5177, packageName: '@openattitude/steam-altimeter20kft-senecaii' },
  { title: 'Attitude indicator', port: 5174, packageName: '@openattitude/steam-attitudegyro-senecaii' },
  { title: 'Clock', port: 5178, packageName: '@openattitude/steam-clock-generic' },
  { title: 'EGT', port: 5179, packageName: '@openattitude/steam-egt-senecaii' },
  { title: 'Engine instruments strip', port: 5180, packageName: '@openattitude/steam-engine-senecaii' },
  { title: 'Engine RPM', port: 5184, packageName: '@openattitude/steam-enginerpm-senecaii' },
  { title: 'Flap / trim', port: 5185, packageName: '@openattitude/steam-flapindicator-senecaii' },
  { title: 'Fuel flow', port: 5181, packageName: '@openattitude/steam-fuelflow-senecaii' },
  { title: 'GI-275 (generic)', port: 5191, packageName: '@openattitude/glass-gi275-generic' },
  { title: 'GPS (moving map)', port: 5190, packageName: '@openattitude/other-gps-generic' },
  { title: 'Gyro pressure', port: 5182, packageName: '@openattitude/steam-gyropressure-senecaii' },
  { title: 'Ki209 nav indicator', port: 5188, packageName: '@openattitude/steam-ki209-generic' },
  { title: 'Ki227 ADF', port: 5176, packageName: '@openattitude/steam-ki227-senecaii' },
  { title: 'Ki525 HSI', port: 5189, packageName: '@openattitude/steam-ki525-generic' },
  { title: 'Manifold pressure', port: 5183, packageName: '@openattitude/steam-manifoldpressure-senecaii' },
  { title: 'Turn coordinator', port: 5186, packageName: '@openattitude/steam-turncoordinator-generic' },
  { title: 'Vertical speed', port: 5187, packageName: '@openattitude/steam-verticalspeedindicator-generic' },
];

/** Sorted copy for stable UI. */
export const TESTBED_ENTRIES_SORTED = [...TESTBED_ENTRIES].sort((a, b) => a.title.localeCompare(b.title));
