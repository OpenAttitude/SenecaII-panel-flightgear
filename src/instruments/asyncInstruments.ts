import { defineAsyncComponent } from 'vue';

export const LazyClock = defineAsyncComponent(() =>
  import('@openattitude/steam-clock-generic').then((m) => m.GenericClock),
);
export const LazyASI = defineAsyncComponent(() =>
  import('@openattitude/steam-airspeedindicator-senecaii').then((m) => m.AirspeedIndicator),
);
export const LazyVSI = defineAsyncComponent(() =>
  import('@openattitude/steam-verticalspeedindicator-generic').then((m) => m.VerticalSpeedIndicator),
);
export const LazyAI = defineAsyncComponent(() =>
  import('@openattitude/steam-attitudegyro-senecaii').then((m) => m.AttitudeIndicator),
);
export const LazyAltimeter = defineAsyncComponent(() =>
  import('@openattitude/steam-altimeter20kft-senecaii').then((m) => m.Altimeter20kFt),
);
export const LazyTC = defineAsyncComponent(() =>
  import('@openattitude/steam-turncoordinator-generic').then((m) => m.TurnCoordinator),
);
export const LazyHSI = defineAsyncComponent(() =>
  import('@openattitude/steam-ki525-generic').then((m) => m.Ki525),
);
export const LazyRPM = defineAsyncComponent(() =>
  import('@openattitude/steam-enginerpm-senecaii').then((m) => m.EngineRpmGauge),
);
export const LazyADF = defineAsyncComponent(() =>
  import('@openattitude/steam-ki227-senecaii').then((m) => m.Ki227Adf),
);
export const LazyKI209 = defineAsyncComponent(() =>
  import('@openattitude/steam-ki209-generic').then((m) => m.Ki209),
);
export const LazyFF = defineAsyncComponent(() =>
  import('@openattitude/steam-fuelflow-senecaii').then((m) => m.DualFuelFlow),
);
export const LazyMP = defineAsyncComponent(() =>
  import('@openattitude/steam-manifoldpressure-senecaii').then((m) => m.DualManifoldPressure),
);
export const LazyEGT = defineAsyncComponent(() =>
  import('@openattitude/steam-egt-senecaii').then((m) => m.EgtIndicator),
);
export const LazyGyroPressure = defineAsyncComponent(() =>
  import('@openattitude/steam-gyropressure-senecaii').then((m) => m.GyroPressureGauge),
);
export const LazyEngineInstruments = defineAsyncComponent(() =>
  import('@openattitude/steam-engine-senecaii').then((m) => m.EngineInstruments),
);
export const LazyGPS = defineAsyncComponent(() =>
  import('@openattitude/other-gps-generic').then((m) => m.GenericGps),
);
export const LazyFlap = defineAsyncComponent(() =>
  import('@openattitude/steam-flapindicator-senecaii').then((m) => m.FlapIndicator),
);
