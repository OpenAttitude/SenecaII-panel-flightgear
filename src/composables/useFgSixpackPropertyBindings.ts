import { useFlightGearPanelPropertiesStore } from '@openattitude/core';
import { watch } from 'vue';

type StringProp = () => string | undefined;

/** FlightGear property subscriptions for the sixpack (ASI, AI, ALT, TC, HSI, VSI). */
export function useFgSixpackPropertyBindings(options: { fgfs: StringProp; dpi: StringProp }) {
  const flightGearPanelPropertiesStore = useFlightGearPanelPropertiesStore();

  watch(
    () => options.fgfs(),
    (v) => {
      flightGearPanelPropertiesStore.host = v ?? '';
    },
    { immediate: true },
  );

  watch(
    () => options.dpi(),
    (d) => {
      if (d && Number(d) > 10) {
        document.documentElement.style.setProperty('--mydpi', String(Number(d)));
      }
    },
    { immediate: true },
  );

  const tcIndicatedTurnRate = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/turn-indicator/indicated-turn-rate',
    { e: 0.05 },
  );
  const tcIndicatedSlipSkid = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/slip-skid-ball/indicated-slip-skid',
    { e: 0.05 },
  );
  const vsiIndicatedSpeedFpm = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/vertical-speed-indicator/indicated-speed-fpm',
    { e: 0.2 },
  );

  const hsiIndicatedHeadingDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/kg102/indicated-heading-deg',
    { e: 0.2 },
  );
  const hsiSelectedCourseDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/ki525/selected-course-deg',
    { e: 0.2 },
  );
  const hsiCdiDeflection = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/ki525/cdi-deflection',
    { e: 0.01 },
  );
  const hsiGsDeflection = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/ki525/gs-deflection',
    { e: 0.01 },
  );
  const hsiNavFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/nav-flag', { e: 0.2 });
  const hsiHeadingFlagNorm = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/kg102/flag-norm',
    { e: 0.2 },
  );
  const hsiSelectedHeadingDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/kcs55/ki525/selected-heading-deg',
    { e: 0.2 },
  );
  const hsiToFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/to-flag', { e: 0.2 });
  const hsiFromFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/from-flag', {
    e: 0.2,
  });
  const hsiHasGlideslope = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/has-gs', { type: 'bool' });
  const hsiGsInRange = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/gs/in-range', { type: 'bool' });
  const hsiNavDataValid = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/data-is-valid', {
    type: 'bool',
  });

  const altIndicatedAltitudeFt = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/altimeter/indicated-altitude-ft',
    { e: 0.1 },
  );
  const altSettingHpa = flightGearPanelPropertiesStore.subscribe('/instrumentation/altimeter/setting-hpa', {
    e: 0.1,
  });

  const asiIndicatedSpeedKt = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/airspeed-indicator/indicated-speed-kt',
    { e: 0.2 },
  );
  const asiTasFaceRotationDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/airspeed-indicator/tas-face-rotation',
    { e: 0.2 },
  );

  const aiPitchDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/attitude-indicator/indicated-pitch-deg',
    { e: 0.1 },
  );
  const aiRollDeg = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/attitude-indicator/indicated-roll-deg',
    { e: 0.1 },
  );
  const aiGsLight = flightGearPanelPropertiesStore.subscribe('/autopilot/CENTURYIII/settings/gs-captured', {
    type: 'bool',
  });
  const aiGearLight = flightGearPanelPropertiesStore.subscribe('/gear/transit-light/on', { type: 'bool' });
  const aiFpLight1 = flightGearPanelPropertiesStore.subscribe('/controls/engines/engine/fuel-pump', { type: 'bool' });
  const aiFpLight2 = flightGearPanelPropertiesStore.subscribe('/controls/engines/engine[1]/fuel-pump', {
    type: 'bool',
  });
  const aiOvrLight1 = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/overboost', {
    type: 'bool',
  });
  const aiOvrLight2 = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/overboost[1]', {
    type: 'bool',
  });
  const aiOilLight = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/oil', { type: 'bool' });
  const aiGyroLight1 = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative', {
    type: 'bool',
  });
  const aiGyroLight2 = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative[1]', {
    type: 'bool',
  });
  const aiAltnLight = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/vacuum', {
    type: 'bool',
  });

  return {
    flightGearPanelPropertiesStore,
    tcIndicatedTurnRate,
    tcIndicatedSlipSkid,
    vsiIndicatedSpeedFpm,
    hsiIndicatedHeadingDeg,
    hsiSelectedCourseDeg,
    hsiCdiDeflection,
    hsiGsDeflection,
    hsiNavFlagNorm,
    hsiHeadingFlagNorm,
    hsiSelectedHeadingDeg,
    hsiToFlagNorm,
    hsiFromFlagNorm,
    hsiHasGlideslope,
    hsiGsInRange,
    hsiNavDataValid,
    altIndicatedAltitudeFt,
    altSettingHpa,
    asiIndicatedSpeedKt,
    asiTasFaceRotationDeg,
    aiPitchDeg,
    aiRollDeg,
    aiGsLight,
    aiGearLight,
    aiFpLight1,
    aiFpLight2,
    aiOvrLight1,
    aiOvrLight2,
    aiOilLight,
    aiGyroLight1,
    aiGyroLight2,
    aiAltnLight,
  };
}
