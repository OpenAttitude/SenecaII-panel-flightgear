import { useFlightGearPanelPropertiesStore } from '@openattitude/core';
import { watch } from 'vue';

type StringProp = () => string | undefined;

/**
 * Subscribes to all FlightGear properties used by the panel / fullscreen instruments.
 * Call once per view that needs live data.
 */
export function useFgPanelPropertyBindings(options: { fgfs: StringProp; dpi: StringProp }) {
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

  const clockUtcDaySeconds = flightGearPanelPropertiesStore.subscribe('/sim/time/utc/day-seconds', { e: 0.5 });

  const adfIndicatedBearingDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/adf/indicated-bearing-deg', { e: 0.2 });
  const adfCardHeadingDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/adf/rotation-deg', { e: 0.2 });

  const tcIndicatedTurnRate = flightGearPanelPropertiesStore.subscribe('/instrumentation/turn-indicator/indicated-turn-rate', { e: 0.05 });
  const tcIndicatedSlipSkid = flightGearPanelPropertiesStore.subscribe('/instrumentation/slip-skid-ball/indicated-slip-skid', { e: 0.05 });
  const vsiIndicatedSpeedFpm = flightGearPanelPropertiesStore.subscribe('/instrumentation/vertical-speed-indicator/indicated-speed-fpm', { e: 0.2 });
  const ki209SelectedObsDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/radials/selected-deg', { e: 0.1 });
  const ki209HeadingNeedleDeflectionNorm = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/nav[1]/heading-needle-deflection-norm',
    { e: 0.01 },
  );
  const ki209GsNeedleDeflectionNorm = flightGearPanelPropertiesStore.subscribe(
    '/instrumentation/nav[1]/gs-needle-deflection-filtered',
    { e: 0.01 },
  );
  const ki209SignalQualityNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/signal-quality-norm', { e: 0.2 });
  const ki209ToFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/to-flag', { e: 0.2 });
  const ki209FromFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/from-flag', { e: 0.2 });
  const ki209HasGlideslope = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/has-gs', { type: 'bool' });
  const ki209GsInRange = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/gs/in-range', { type: 'bool' });
  const ki209NavDataValid = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav[1]/data-is-valid', { type: 'bool' });

  const hsiIndicatedHeadingDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/kg102/indicated-heading-deg', { e: 0.2 });
  const hsiSelectedCourseDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/selected-course-deg', { e: 0.2 });
  const hsiCdiDeflection = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/cdi-deflection', { e: 0.01 });
  const hsiGsDeflection = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/gs-deflection', { e: 0.01 });
  const hsiNavFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/nav-flag', { e: 0.2 });
  const hsiHeadingFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/kg102/flag-norm', { e: 0.2 });
  const hsiSelectedHeadingDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/selected-heading-deg', { e: 0.2 });
  const hsiToFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/to-flag', { e: 0.2 });
  const hsiFromFlagNorm = flightGearPanelPropertiesStore.subscribe('/instrumentation/kcs55/ki525/from-flag', { e: 0.2 });
  const hsiHasGlideslope = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/has-gs', { type: 'bool' });
  const hsiGsInRange = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/gs/in-range', { type: 'bool' });
  const hsiNavDataValid = flightGearPanelPropertiesStore.subscribe('/instrumentation/nav/data-is-valid', { type: 'bool' });

  const altIndicatedAltitudeFt = flightGearPanelPropertiesStore.subscribe('/instrumentation/altimeter/indicated-altitude-ft', { e: 0.1 });
  const altSettingHpa = flightGearPanelPropertiesStore.subscribe('/instrumentation/altimeter/setting-hpa', { e: 0.1 });

  const gpsLatitudeDeg = flightGearPanelPropertiesStore.subscribe('/position/latitude-deg', { e: 0.000001 });
  const gpsLongitudeDeg = flightGearPanelPropertiesStore.subscribe('/position/longitude-deg', { e: 0.000001 });
  const gpsHeadingDeg = flightGearPanelPropertiesStore.subscribe('/orientation/heading-deg', { e: 0.2 });
  const gpsZoomLevel = flightGearPanelPropertiesStore.subscribe('/instrumentation/gps/zoom-level', { e: 0.5, type: 'float' });

  const asiIndicatedSpeedKt = flightGearPanelPropertiesStore.subscribe('/instrumentation/airspeed-indicator/indicated-speed-kt', { e: 0.2 });
  const asiTasFaceRotationDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/airspeed-indicator/tas-face-rotation', { e: 0.2 });

  const flapPosNorm = flightGearPanelPropertiesStore.subscribe('/surface-positions/flap-pos-norm', { e: 0.01 });
  const elevatorTrimNorm = flightGearPanelPropertiesStore.subscribe('/controls/flight/elevator-trim', { e: 0.01 });

  const aiPitchDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/attitude-indicator/indicated-pitch-deg', { e: 0.1 });
  const aiRollDeg = flightGearPanelPropertiesStore.subscribe('/instrumentation/attitude-indicator/indicated-roll-deg', { e: 0.1 });
  const aiGsLight = flightGearPanelPropertiesStore.subscribe('/autopilot/CENTURYIII/settings/gs-captured', { type: 'bool' });
  const aiGearLight = flightGearPanelPropertiesStore.subscribe('/gear/transit-light/on', { type: 'bool' });
  const aiFpLight1 = flightGearPanelPropertiesStore.subscribe('/controls/engines/engine/fuel-pump', { type: 'bool' });
  const aiFpLight2 = flightGearPanelPropertiesStore.subscribe('/controls/engines/engine[1]/fuel-pump', { type: 'bool' });
  const aiOvrLight1 = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/overboost', { type: 'bool' });
  const aiOvrLight2 = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/overboost[1]', { type: 'bool' });
  const aiOilLight = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/oil', { type: 'bool' });
  const aiGyroLight1 = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative', { type: 'bool' });
  const aiGyroLight2 = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative[1]', { type: 'bool' });
  const aiAltnLight = flightGearPanelPropertiesStore.subscribe('/instrumentation/annunciator/vacuum', { type: 'bool' });

  const rpmEng1 = flightGearPanelPropertiesStore.subscribe('/engines/engine/rpm', { e: 1 });
  const rpmEng2 = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/rpm', { e: 1 });
  const mpOsiLeft = flightGearPanelPropertiesStore.subscribe('/engines/engine/mp-osi', { e: 0.1 });
  const mpOsiRight = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/mp-osi', { e: 0.1 });
  const gyroSuctionInHg = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/suction-inhg', { e: 0.02 });
  const gyroVacuumInopLeft = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative', { type: 'bool' });
  const gyroVacuumInopRight = flightGearPanelPropertiesStore.subscribe('/instrumentation/vacuum/inoperative[1]', { type: 'bool' });

  const ffFuelFlowGphLeft = flightGearPanelPropertiesStore.subscribe('/engines/engine/fuel-flow-gph', { e: 0.1 });
  const ffFuelFlowGphRight = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/fuel-flow-gph', { e: 0.1 });

  const egtEng1DegF = flightGearPanelPropertiesStore.subscribe('/engines/engine/egt-degf', { e: 10 });
  const egtEng2DegF = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/egt-degf', { e: 10 });

  const engLeftBusA = flightGearPanelPropertiesStore.subscribe('/systems/electrical/bus/element[1]/i', { e: 1 });
  const engLeftChtDegF = flightGearPanelPropertiesStore.subscribe('/engines/engine/cht-degf', { e: 2 });
  const engLeftOilTempDegF = flightGearPanelPropertiesStore.subscribe('/engines/engine/oil-temperature-degf', { e: 1 });
  const engLeftOilPressurePsi = flightGearPanelPropertiesStore.subscribe('/engines/engine/oil-pressure-psi', { e: 1 });
  const engLeftFuelGalUs = flightGearPanelPropertiesStore.subscribe('/consumables/fuel/tank/level-gal_us', { e: 0.2 });

  const engRightBusA = flightGearPanelPropertiesStore.subscribe('/systems/electrical/bus/element[2]/i', { e: 1 });
  const engRightChtDegF = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/cht-degf', { e: 2 });
  const engRightOilTempDegF = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/oil-temperature-degf', { e: 1 });
  const engRightOilPressurePsi = flightGearPanelPropertiesStore.subscribe('/engines/engine[1]/oil-pressure-psi', { e: 1 });
  const engRightFuelGalUs = flightGearPanelPropertiesStore.subscribe('/consumables/fuel/tank[1]/level-gal_us', { e: 0.2 });

  return {
    flightGearPanelPropertiesStore,
    clockUtcDaySeconds,
    adfIndicatedBearingDeg,
    adfCardHeadingDeg,
    tcIndicatedTurnRate,
    tcIndicatedSlipSkid,
    vsiIndicatedSpeedFpm,
    ki209SelectedObsDeg,
    ki209HeadingNeedleDeflectionNorm,
    ki209GsNeedleDeflectionNorm,
    ki209SignalQualityNorm,
    ki209ToFlagNorm,
    ki209FromFlagNorm,
    ki209HasGlideslope,
    ki209GsInRange,
    ki209NavDataValid,
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
    gpsLatitudeDeg,
    gpsLongitudeDeg,
    gpsHeadingDeg,
    gpsZoomLevel,
    asiIndicatedSpeedKt,
    asiTasFaceRotationDeg,
    flapPosNorm,
    elevatorTrimNorm,
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
    rpmEng1,
    rpmEng2,
    mpOsiLeft,
    mpOsiRight,
    gyroSuctionInHg,
    gyroVacuumInopLeft,
    gyroVacuumInopRight,
    ffFuelFlowGphLeft,
    ffFuelFlowGphRight,
    egtEng1DegF,
    egtEng2DegF,
    engLeftBusA,
    engLeftChtDegF,
    engLeftOilTempDegF,
    engLeftOilPressurePsi,
    engLeftFuelGalUs,
    engRightBusA,
    engRightChtDegF,
    engRightOilTempDegF,
    engRightOilPressurePsi,
    engRightFuelGalUs,
  };
}
